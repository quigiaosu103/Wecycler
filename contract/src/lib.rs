
pub mod events;
pub mod user;
pub mod product;
pub mod functions;
pub mod campaign;
use campaign::{Campaign,CampaignId, CampaignMetaData, Status};
use user::{User, UserMetaData, Role};
use product::{Product, ProductId, ProductMetaData, State};
use events::{PurchaseProduct, EventLog, EventLogVariant};
use near_sdk::{near_bindgen, collections::{UnorderedMap, LookupMap}, AccountId, Balance, borsh::BorshSerialize, env::{self}, PanicOnDefault, Promise};
use near_sdk::borsh::{self, BorshDeserialize};
pub const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000; 

#[near_bindgen]
#[derive(PanicOnDefault, BorshDeserialize, BorshSerialize)]
pub struct Contract {
    contract_owner: AccountId,
    users: UnorderedMap<i32, User>,
    user_by_id: LookupMap<AccountId, User>,
    product_by_id: LookupMap<ProductId, Product>,
    campaigns: UnorderedMap<i32, Campaign>,
    campaign_by_id: LookupMap<CampaignId, Campaign>,
    collectors: UnorderedMap<i32, User>,
    total_users: i32,
    total_campaign: i32,
}

pub trait Function {
    fn new()->Self;
    fn get_signer_account(&mut self)-> User;  //load account
    fn new_user(&mut self) ->User; //call after check whether it is the first time this account connect;
    fn check_new_user(&self)-> bool; //check whether this id is already exist;
    fn get_user_by_id(&self, id: AccountId)-> User;
    fn update_user(&mut self, name: String, email_address: String);
    fn new_collector(&mut self) -> User;
    fn get_checkers(&self, camp_id: CampaignId) -> Vec<AccountId>;
    fn return_collector_fee(&self, cammp_id: CampaignId);

    fn new_campaign(&mut self, fund: Balance, title: String,content :String, amount: u32, total_checkers: u32, init_time: u64, deadline: u64) -> Campaign;
    fn get_campaign_by_id(&self, id: CampaignId)->Campaign;
    fn set_camp_status(&mut self, status: Status, camp_id: CampaignId)-> Campaign;
    fn update_camp_data(&mut self, camp_id: CampaignId, camp: &mut Campaign);
    fn get_all_campaigns(&self) -> Vec<Campaign>;

    fn new_product(&mut self, name: String, description: String, image: String, total_supply: u32, camp_id: CampaignId);
    fn clear_product(&mut self);
    fn set_state_product(&mut self, id: ProductId, camp_id: CampaignId, is_valid: bool);
    fn get_product_by_id(&self, id: ProductId)-> Product;
    fn update_product_data(&mut self, product: Product, key: &String);
    fn get_products_by_campaign(&self, id: CampaignId)-> Vec<Product>;
    // fn payment(&mut self, product_id : ProductId) -> Promise;  
    fn apply_collector_in_camp(&mut self, camp_id: CampaignId, fee: Balance) -> Promise;
    fn distribute_reward(&mut self, camp_id: CampaignId);
    fn send_reward(&mut self, id: AccountId, amount: Balance)-> Promise;
    
}

#[near_bindgen]
impl Function for Contract {
    #[init]
    fn new()->Self {
        Self {
            contract_owner: env::signer_account_id(),
            users: UnorderedMap::new(b"users".try_to_vec().unwrap()),
            user_by_id: LookupMap::new(b"users by id".try_to_vec().unwrap()),
            product_by_id: LookupMap::new(b"product by id".try_to_vec().unwrap()),
            campaigns: UnorderedMap::new(b"campaigns".try_to_vec().unwrap()),
            collectors: UnorderedMap::new(b"collectors".try_to_vec().unwrap()),
            campaign_by_id: LookupMap::new(b"product by id".try_to_vec().unwrap()),
            total_users: 0,
            total_campaign: 0

        }
    }
  
//User----------------
    fn get_signer_account(&mut self)-> User {  //load account
        let id: AccountId = env::signer_account_id();
        assert!(self.user_by_id.contains_key(&id));
        // if self.check_new_user() {
        // }
        return self.user_by_id.get(&id).unwrap();
        // self.new_user()
    }

    fn check_new_user(&self)-> bool { //check whether this id is already existed
        let id = env::signer_account_id();
        self.user_by_id.contains_key(&id)
    }

    fn new_user(&mut self) ->User{ //call after check whether it is the first time this account connected
        let id = env::signer_account_id();
        let user = User {
            id: id.clone(),
            meta_data: UserMetaData {
                name: "".to_string(),
                balance: env::account_balance(),
                email_address: "".to_string(),
            }, 
            role: Role::Producer,
        };
        let total_users = self.total_users +1;
        self.total_users = total_users;
        self.users.insert(&total_users, &user);
        self.user_by_id.insert(&id, &user);
        user
    }
    
    fn get_user_by_id(&self, id: AccountId)-> User {
        assert!(self.user_by_id.contains_key(&id), "User is not exist");
        self.user_by_id.get(&id).unwrap()
    }

    fn update_user(&mut self, name: String, email_address: String) {
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
//Campaign====================================
    #[payable]
    fn new_campaign(&mut self, fund: Balance, title: String,content :String, total_checkers: u32, amount: u32, init_time: u64, deadline: u64) -> Campaign {
        assert!(env::account_balance()>=fund, "Your balance is not enough!");
        assert_eq!(env::attached_deposit(), fund, "Wrong deponsit!");
        let id = functions::generate_hash_key(env::signer_account_id().to_string()+ &init_time.to_string());
        let total_camp = self.campaigns.len();
        let new_camp = Campaign {
            id: id.clone(),
            owner: env::signer_account_id(),
            fund,
            checkers: Vec::new(),
            products: Vec::new(),
            meta_data: CampaignMetaData {
                title,
                content,
            },
            total_products_expected: amount,
            total_products: 0,
            total_checkers,
            deadline,
            init_time,
            status: Status::Init,
        };

        self.campaigns.insert(&(total_camp as i32), &new_camp);
        self.campaign_by_id.insert(&id, &new_camp);
        new_camp
    }  

    fn get_campaign_by_id(&self, id: CampaignId)-> Campaign {
        self.campaign_by_id.get(&id).clone().unwrap()
    }

    fn get_all_campaigns(&self) -> Vec<Campaign> {
        let campaigns = &self.campaigns;
        let mut vec_camps:Vec<Campaign> = vec![];
        for i in 0..campaigns.len() {
            if let Some(campaign) = campaigns.get(&(i as i32)) {
                vec_camps.push(campaign);
            }
        }
        vec_camps
    }


    fn get_products_by_campaign(&self, id: CampaignId) -> Vec<Product> {
        self.get_campaign_by_id(id).get_all_products().clone()
    }

    fn set_camp_status(&mut self, status: Status, camp_id: CampaignId) -> Campaign{
        let mut camp = self.campaign_by_id.get(&camp_id).unwrap();
        camp.status = status;
        self.update_camp_data(camp_id.clone(), &mut camp);
        self.update_camp_data(camp_id, &mut camp);
        camp
    }

    fn send_reward(&mut self, id: AccountId, amount: Balance)-> Promise {
        let payment_info = EventLog { //info of transaction
            standard: "e-comerce-1.0.0".to_string(),
            event: EventLogVariant::Purchase(vec![PurchaseProduct {
                receiver: id.to_string(),
                sender: env::signer_account_id().to_string(),
                amount: amount,
                memo: None,
            }])
        };
        //add new checker into checkers of this campaign
        env::log_str(&payment_info.to_string());    
        Promise::new(id).transfer(amount)
    }

    fn distribute_reward(&mut self, camp_id: CampaignId) {
        let camp = self.campaign_by_id.get(&camp_id).unwrap();
        assert_eq!(camp.status, Status::Done, "The reward had been distributed!");
        assert_eq!(camp.status, Status::End, "Campaign have not been ended!");
        assert_eq!(camp.owner, env::signer_account_id(), "You are not owner of this campaign!");
        let products = camp.clone().products;
        for i in products {
            let reward = functions::calculate_reward(i.clone(), camp.clone());
            self.send_reward(i.owner.clone(), (reward * 0.8 *  (ONE_NEAR as f32)) as u128);
            self.send_reward(i.collector, (reward * 0.2 *  (ONE_NEAR as f32)) as u128);
        }
        self.set_camp_status(Status::Done, camp_id);
    }

    fn return_collector_fee(&self, camp_id: CampaignId) { //modifie
        let camp = self.campaign_by_id.get(&camp_id).unwrap();
        assert_eq!(camp.status, Status::Done, "The reward had been distributed!");
        assert_eq!(camp.status, Status::End, "Campaign have not been ended!");
        assert_eq!(camp.owner, env::signer_account_id(), "You are not owner of this campaign!");
        let collectors = camp.clone().checkers;
        let return_token = camp.fund / 10;
        for i in collectors {
            Promise::new(i).transfer(return_token as u128);
        }
    }

    

//Collector==========================================================

    fn new_collector(&mut self) -> User {
        let mut new_producer = self.get_user_by_id(env::signer_account_id());
        assert_ne!(new_producer.role, Role::Collector, "You had been a collector already!");
        let users = &self.users;
        new_producer.role = Role::Collector;
        self.collectors.insert(&(self.collectors.len() as i32), &new_producer);
        let index = functions::find_index_user_unor(users, env::signer_account_id());
        self.users.remove(&index);
        self.users.insert(&index, &new_producer);
        self.user_by_id.insert(&env::signer_account_id(), &new_producer);
        new_producer
    }

    #[payable]
    fn apply_collector_in_camp(&mut self, camp_id: CampaignId, fee: Balance) -> Promise{
        let id = env::signer_account_id();
        let user = self.user_by_id.get(&id).unwrap();
        assert_eq!(user.role, Role::Collector, "You are not a collector!");//check role
        let mut camp = self.campaign_by_id.get(&camp_id).unwrap();
        assert!(!camp.contains_checker(id.clone()), "You have been a checker before!"); //check if this account is a checker
        assert_eq!(env::attached_deposit(), fee*ONE_NEAR, "Incorrect tooken");//check if input amount is mess with the amount had been set
        camp.checkers.insert(camp.checkers.len(), id);
        let payment_info = EventLog { //info of transaction
                standard: "e-comerce-1.0.0".to_string(),
                event: EventLogVariant::Purchase(vec![PurchaseProduct {
                    receiver: camp.owner.to_string(),
                    sender: env::signer_account_id().to_string(),
                    amount: fee,
                    memo: None,
                }])
            };
        self.update_camp_data(camp_id, &mut camp); //add new checker into checkers of this campaign
        env::log_str(&payment_info.to_string());    
        Promise::new(camp.owner).transfer(fee) //give tooken from checker to owner of campaign
    }

    fn set_state_product(&mut self, id: ProductId, camp_id: CampaignId, is_valid: bool) {
        let mut camp = self.campaign_by_id.get(&camp_id).unwrap();
        let mut product = self.get_product_by_id(id.clone());
        let index = functions::find_index_pro_vec(camp.clone().products, id);
        camp.products.remove(index as usize); //remove this product out of campaign
        if is_valid {
            if env::signer_account_id() != camp.owner {
                assert!(camp.contains_checker(env::signer_account_id()), "you are not a checker in this campaign");
                product.state = State::Validated;
            }else {
                product.state = State::Confirmed;
                camp.products.push(product.clone());
                self.update_camp_data(camp_id.clone(), &mut camp);
            }   
            //if valid: set state and insert into this campaign
            camp.products.insert(index as usize, product.clone());
        }
        //save new data of product
        self.update_product_data(product.clone(), &product.id);
        //save new data of campaign
        self.update_camp_data(camp_id, &mut camp);
    }

    fn get_checkers(&self, camp_id: CampaignId) -> Vec<AccountId> {
        self.get_campaign_by_id(camp_id).checkers
    }


//Product=============================================================
    fn new_product(&mut self, name: String, description: String, image: String, total_supply: u32, camp_id: CampaignId) {
        assert!(self.campaign_by_id.contains_key(&camp_id), "Campaign id is not valid!");
        let mut camp = self.campaign_by_id.get(&camp_id).unwrap();
        let total_products = camp.products.len();
        //--------------------hash
        let data = total_products.to_string();
        let hashed_key_str = functions::generate_hash_key(data);
        let owner = env::signer_account_id();
        let product  = Product {
            id: hashed_key_str.clone(),
            meta_data: ProductMetaData {
                name,
                description,
                image,
            },
            collector: owner.clone(),
            owner: owner.clone(),
            total_supply,
            state: State::Init,
            campaign_id: camp_id.clone()
        };
        //new product will be stored in products of campaign, and will be remove if it is not valid 
        camp.products.insert(camp.products.len(), product.clone());
        //save new product into lookupmap
        self.update_product_data(product.clone(), &product.id);
        //save new state of campaign
        self.update_camp_data(camp_id, &mut camp);
    }
    
    fn update_product_data(&mut self, product: Product, key: &String) {
        self.product_by_id.insert(key, &product);
        
    }
    
    fn update_camp_data(&mut self, camp_id: CampaignId, camp: &mut Campaign) {
        self.campaign_by_id.insert(&camp_id, &camp);
        let index = functions::find_index_camp_vec(&self.campaigns, camp_id);
        self.campaigns.remove(&index);
        self.campaigns.insert(&index, &camp);
    }
    // //clear data for testing contract==============
    fn clear_product(&mut self) {
        // self.products.clear();
        self.product_by_id = LookupMap::new(b"product_by_id".try_to_vec().unwrap());
    }
    
    fn get_product_by_id(&self, id: ProductId)-> Product {
        self.product_by_id.get(&id).unwrap()
    }

}
