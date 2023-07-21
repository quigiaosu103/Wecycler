
pub mod events;
pub mod user;
pub mod product;
pub mod transaction;
pub mod functions;
// use functions::{find_index_pro_vec,find_index_prod_unord};
use transaction::Transaction;
use user::User;
use product::{Product, ProductId};
use events::{PurchaseProduct, EventLog, EventLogVariant};
use near_sdk::{near_bindgen, collections::{UnorderedMap, LookupMap}, AccountId, Balance, borsh::BorshSerialize, env::{self}, PanicOnDefault, Promise};
use near_sdk::borsh::{self, BorshDeserialize};


#[near_bindgen]
#[derive(PanicOnDefault, BorshDeserialize, BorshSerialize)]
pub struct Contract {
    users: UnorderedMap<i32, User>,
    user_by_id: LookupMap<AccountId, User>,
    sellers: UnorderedMap<i32, User>,
    seller_by_id: LookupMap<i32, User>,
    products: UnorderedMap<i32, Product>,
    products_by_seller: LookupMap<AccountId, Vec<Product>>,
    product_by_id: LookupMap<ProductId, Product>,
    total_sellers: i32,
    total_users: i32,
    total_product: i32,
    total_transaction: i32
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new()->Self {
        Self {
            users: UnorderedMap::new(b"users".try_to_vec().unwrap()),
            user_by_id: LookupMap::new(b"users by id".try_to_vec().unwrap()),
            sellers: UnorderedMap::new(b"seller".try_to_vec().unwrap()),
            seller_by_id: LookupMap::new(b"sellers by id".try_to_vec().unwrap()),
            products: UnorderedMap::new(b"products".try_to_vec().unwrap()),
            products_by_seller: LookupMap::new(b"products by user".try_to_vec().unwrap()),
            product_by_id: LookupMap::new(b"product by id".try_to_vec().unwrap()),
            total_sellers: 0,
            total_users: 0,
            total_product: 0,
            total_transaction: 0,
        }
    }
//User----------------
    //load account
    pub fn get_signer_account(&mut self)-> User {
        let id = env::signer_account_id();
        if self.check_new_user() {
            return self.user_by_id.get(&id).unwrap();
        }
        self.new_user()
    }

    //check whether this id is already existed
    pub fn check_new_user(&self)-> bool {
        let id = env::signer_account_id();
        self.user_by_id.contains_key(&id)
    }

    //call after check whether it is the first time this account connected
    pub fn new_user(&mut self) ->User{
        let id = env::signer_account_id();
        let user = User {
            id: id.clone(),
            name: "".to_string(),
            email_address: "".to_string(),
            role: "customer".to_string(),
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
        user.name = name;
        user.email_address = email_address;
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




    // pub fn register_seller(&self)
//Product-----------------
    pub fn new_product(&mut self, name: String, price: Balance) {
        let owner = env::signer_account_id();
        let total_products = self.total_product+1;
        let id = total_products.to_string();
        let mut owner_products = self.products_by_seller.get(&owner).unwrap_or_else(|| Vec::new());
        let product  = Product {
            id: id.clone(),
            name,
            price,
            owner: owner.clone()
        };

        self.products.insert(&total_products, &product);
        self.product_by_id.insert(&id, &product);
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
                product_name: product.name.clone(),
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
        self.products.insert(&index_in_unord, &product);

        env::log_str(&payment_info.to_string());
        Promise::new(owner).transfer(price)
    }    
}
