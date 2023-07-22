
pub mod events;
pub mod user;
pub mod product;
pub mod transaction;
pub mod functions;
pub mod agent;
pub mod campaign;
use campaign::{Campaign,CampaignId, CampaignMetaData};
// use functions::{find_index_pro_vec,find_index_prod_unord};
use transaction::Transaction;
// use agent::{}
use user::{User, UserMetaData};
use product::{Product, ProductId, ProductMetaData};
use events::{PurchaseProduct, EventLog, EventLogVariant};
use near_sdk::{near_bindgen, collections::{UnorderedMap, LookupMap}, AccountId, Balance, borsh::BorshSerialize, env::{self, sha256}, PanicOnDefault, Promise};
use sha2::{Sha256, Digest};
use near_sdk::borsh::{self, BorshDeserialize};


#[near_bindgen]
#[derive(PanicOnDefault, BorshDeserialize, BorshSerialize)]
pub struct Contract {
    contract_owner: AccountId,
    users: UnorderedMap<i32, User>,
    user_by_id: LookupMap<AccountId, User>,
    products: UnorderedMap<i32, Product>,
    products_by_seller: LookupMap<AccountId, Vec<Product>>,
    product_by_id: LookupMap<ProductId, Product>,
    campaigns: UnorderedMap<i32, Campaign>,
    campaign_by_id: LookupMap<CampaignId, Campaign>,
    total_sellers: i32,
    total_users: i32,
    total_product: i32,
    total_transaction: i32,
    total_campaign: i32,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new()->Self {
        Self {
            contract_owner: env::signer_account_id(),
            users: UnorderedMap::new(b"users".try_to_vec().unwrap()),
            user_by_id: LookupMap::new(b"users by id".try_to_vec().unwrap()),
            products: UnorderedMap::new(b"products".try_to_vec().unwrap()),
            products_by_seller: LookupMap::new(b"products by user".try_to_vec().unwrap()),
            product_by_id: LookupMap::new(b"product by id".try_to_vec().unwrap()),
            campaigns: UnorderedMap::new(b"users".try_to_vec().unwrap()),
            campaign_by_id: LookupMap::new(b"product by id".try_to_vec().unwrap()),
            total_sellers: 0,
            total_users: 0,
            total_product: 0,
            total_transaction: 0,
            total_campaign: 0

        }
    }
//User----------------
    pub fn get_signer_account(&mut self)-> User {  //load account
        let id = env::signer_account_id();
        if self.check_new_user() {
            return self.user_by_id.get(&id).unwrap();
        }
        self.new_user()
    }

    pub fn check_new_user(&self)-> bool { //check whether this id is already existed
        let id = env::signer_account_id();
        self.user_by_id.contains_key(&id)
    }

    pub fn new_user(&mut self) ->User{ //call after check whether it is the first time this account connected
        let id = env::signer_account_id();
        let user = User {
            id: id.clone(),
            meta_data: UserMetaData {
                name: "".to_string(),
                email_address: "".to_string(),
            }
        };
        let total_users = self.total_users +1;
        self.total_users = total_users;
        self.users.insert(&total_users, &user);
        self.user_by_id.insert(&id, &user);
        user
    }
    
    pub fn get_user_by_id(&self, id: AccountId)-> User {
        assert!(self.user_by_id.contains_key(&id), "User is not exist");
        self.user_by_id.get(&id).unwrap()
    }

    pub fn update_user(&mut self, name: String, email_address: String) {
        let id = env::signer_account_id();
        let mut user = self.user_by_id.get(&id).unwrap();
        user.set_name(name);
        user.set_email(email_address);
        self.user_by_id.insert(&id, &user);
        let mut index = 0;
        for us in &self.users {
            if us.1.id == id {
                break;
            }
            index+=1;
        }
        self.users.insert(&index, &user);
    }

//Product=============================================================
    pub fn new_product(&mut self, name: String, price: Balance) {
        let total_products = self.total_product+1;
        //--------------------hash
        let data = price.to_string() + &total_products.to_string();
        let mut hash = Sha256::new();
        hash.update(data.as_bytes());

        // Finalize the hash and obtain the output
        let hashed_data = hash.finalize();
        let hashed_key_str = format!("{:x}", hashed_data);
        //---------hash
        let owner = env::signer_account_id();
        let mut owner_products = self.products_by_seller.get(&owner).unwrap_or_else(|| Vec::new());
        let product  = Product {
            id: hashed_key_str.clone(),
            price,
            meta_data: ProductMetaData {
                name,
                description: "".to_string(),
                image: "".to_string(),
            },
            owner: owner.clone(),
            state: "init".to_string()
        };

        self.products.insert(&total_products, &product);
        self.product_by_id.insert(&hashed_key_str, &product);
        owner_products.push(product);
        self.products_by_seller.insert(&owner, &owner_products);
        self.total_product = total_products;
    }


    pub fn update_price(&mut self, id: ProductId, price: Balance) {
        let mut product = self.product_by_id.get(&id).unwrap();
        assert_eq!(env::signer_account_id(), product.owner, "You dont have permission to update!");
        product.price = price;
        //update product by id
        self.product_by_id.insert(&id, &product);
        //update products
        self.products.insert(&self.find_index_prod_unord(id.clone()), &product);
        //update product_by_seller 
        let mut vec_products = self.products_by_seller.get(&env::signer_account_id()).unwrap_or_else(||Vec::new());
        let index  = self.find_index_pro_vec(id, &env::signer_account_id()) as usize;
        let _replace_element = std::mem::replace(&mut vec_products[index], product);
        self.products_by_seller.insert(&env::signer_account_id(), &vec_products);
    }

    pub fn find_index_pro_vec(&self, id: ProductId, owner: &AccountId) ->i32 {
        let vec_products = self.products_by_seller.get(owner).unwrap_or_else(||Vec::new());
        let mut i = 0;
        for pr in &vec_products {
            if pr.id == id {
                return i;
            }
            i+=1;
        }
        -1
    }

    pub fn find_index_prod_unord(&self, id: ProductId)->i32 {
        let mut i = 0;
        let products = &self.products;
        for prd in products{
            if prd.1.id == id {
                return i;
            }
            i+=1;
        }
        -1
    }

    // //clear data for testing contract==============
    pub fn clear_product(&mut self) {
        self.products.clear();
        self.product_by_id = LookupMap::new(b"product_by_id".try_to_vec().unwrap());
        self.products_by_seller = LookupMap::new(b"products_by_seller".try_to_vec().unwrap());
        self.total_product = 0;
    }
    
    pub fn get_all_products(&self)-> Vec<Product> {
        let mut all_products: Vec<Product> = Vec::new();
        let products = &self.products;
        let len = self.products.len();
        for i in 0..=len {
            if let Some(product) = products.get(&(i as i32)) {
                all_products.push(product);
            }
        }
        all_products
    }

    pub fn set_state(&mut self, state: String, id: ProductId) {
        let mut product = self.get_product_by_id(id);
        
        product.state = state;

    }

    pub fn get_product_by_owner(&self, id: AccountId)-> Vec<Product> {
        self.products_by_seller.get(&id).unwrap_or_else(||Vec::new())
    }

    pub fn get_total_products(&self)-> i32 {
        self.total_product
    }

    pub fn get_product_by_id(&self, id: ProductId)-> Product {
        self.product_by_id.get(&id).unwrap()
    }

    #[payable]
    pub fn payment(&mut self, product_id : ProductId) -> Promise {
        let mut product = self.get_product_by_id(product_id.clone());
        let owner = product.clone().owner;
        const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000;
        let price = product.price*ONE_NEAR;
        let customer= env::signer_account_id();
        assert_ne!(owner, customer, "You are owner");
        assert_eq!(price, env::attached_deposit(), "Not correct coin");
        
        let payment_info = EventLog {
            standard: "e-comerce-1.0.0".to_string(),
            event: EventLogVariant::Purchase(vec![PurchaseProduct {
                owner_id: owner.to_string(),
                product_name: product.get_name().clone(),
                customer: customer.to_string(),
                price,
                memo: None,
            }])
        };

        let index = self.find_index_pro_vec(product_id.clone(), &owner);
        self.products_by_seller.get(&owner).unwrap().remove(index as usize);//remove product from user

        product.owner = customer;
        self.product_by_id.insert(&product_id, &product);

        let index_in_unord = self.find_index_prod_unord(product_id);
        self.products.remove(&index_in_unord);
        self.products.insert(&index_in_unord, &product);

        env::log_str(&payment_info.to_string());
        Promise::new(owner).transfer(price)
    }    
}
