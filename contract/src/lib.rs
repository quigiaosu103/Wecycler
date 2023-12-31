pub mod events;
pub mod user;
pub mod product;
pub mod functions;
pub mod campaign;
use campaign::{Campaign,CampaignId, CampaignMetaData, Status};
use user::{User, UserMetaData, Role};
use product::{Product, ProductId, ProductMetaData, State};
use events::{PurchaseProduct, EventLog, EventLogVariant};
use near_sdk::{near_bindgen, collections::{UnorderedMap, LookupMap}, AccountId, Balance, borsh::BorshSerialize, env::{self}, PanicOnDefault, Promise, serde::{Deserialize, Serialize}};
use near_sdk::borsh::{self, BorshDeserialize};
pub const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000; 

#[near_bindgen]
#[derive(PanicOnDefault, BorshDeserialize, BorshSerialize)]
pub struct Contract {
    contract_owner: AccountId,
    users: UnorderedMap<i32, User>,
    user_by_id: LookupMap<AccountId, User>,
    product_by_id: LookupMap<ProductId, Product>,
    products_by_campaign: LookupMap<CampaignId, Vec<Product>>, //sản phẩm của 1 chiến dịch
    collectors_by_campaign: LookupMap<CampaignId, Vec<User>>,
    new_transaction_product: UnorderedMap<i32, Product>, // các sản phẩm đã thành công với 1 chiến dịch
    campaigns: UnorderedMap<i32, Campaign>, // tất cả các chiến dịch
    campaign_by_id: LookupMap<CampaignId, Campaign>, 
    collectors: UnorderedMap<i32, User>, //tất cả collectors 
    total_users: i32,
    total_campaign: i32,
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct AllCampaignsData {
    pub campaign: Vec<Campaign>,
    pub products: Vec<Product>,
    
}

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct CampaignData {
    pub campaign: Campaign,
    pub products: Vec<Product>,
    
}

pub trait Function {
    fn new()->Self;
    fn get_signer_account(&mut self)-> User;  // lấy về thông tin của tài khoản đang đăng nhập
    fn new_user(&mut self) ->User; //tạo tài khoản người dùng mới
    fn check_new_user(&self, id: AccountId)-> bool; //kiểm tra tài khoản đã tồn tại trong hệ thống hay chưa
    fn get_user_by_id(&self, id: AccountId)-> User; // lấy thông tin của 1 user
    fn update_user(&mut self, name: String, email_address: String, image: String); // cập nhật thông tin user
    fn new_collector(&mut self) -> User; //tạo collector mới
    fn get_checkers_by_campaign(&self, camp_id: CampaignId) -> Vec<User>; //lấy thông tin của tất cả collector của 1 chiến dịch
    fn return_collector_stake(&mut self, cammp_id: CampaignId); // trả lại cho collector lượng phí mà họ đã bỏ ra khi tham gia vào chiến dịch

    fn new_campaign(&mut self, id: CampaignId, fund: Balance, title: String,content :String, image: String, amount: u32, total_checkers: u32, init_time: u64, deadline: u64) -> Campaign;// tạo chiến dịch mới
    fn get_campaign_by_id(&self, id: CampaignId)->Campaign; // lấy thông tin của 1 chiến dịch
    fn set_camp_status(&mut self, status: Status, camp_id: CampaignId)-> Campaign; // dành cho owner của chiến dịch để thay đổi trạng thái của chiến dịch
    fn update_camp_data(&mut self, camp_id: CampaignId, camp: &mut Campaign); // cập nhật chiến dịch vào contract
    fn get_all_campaigns(&self) -> Vec<Campaign>; // lấy thông tin cua tất cả chiến dịch
    fn update_total_prds_camp(&mut self, camp_id: CampaignId);// cập nhật tổng số sản phẩm người dùng đã đóng góp vào chiến dịch

    fn new_product(&mut self, name: String, description: String, image: String, total_supply: u32, camp_id: CampaignId); // tạo product mưới
    fn set_state_product(&mut self, id: ProductId, camp_id: CampaignId, is_valid: bool); // collector và owner của chiến dịch sẽ dùng để validate cho sản phẩm
    fn get_product_by_id(&self, id: ProductId)-> Product; // lấy thông tin của một sản phẩm
    fn update_product_data(&mut self, product: Product, key: &String, camp_id: CampaignId); // cập nhật thay đổi của sản phẩm vào contract
    fn get_products_by_campaign(&self, id: CampaignId)-> Vec<Product>; // lấy ra tất cả product của 1 chiến dịchn
    fn apply_collector_in_camp(&mut self, camp_id: CampaignId); // collector sẽ bỏ một lượng phí để tham gia vào chiến dịch
    fn distribute_reward(&mut self, camp_id: CampaignId); // chia pool ra cho tất cả các users và collectors có đóng góp vào chiến dịch
    fn send_reward(&mut self, id: AccountId, amount: Balance)-> Promise; // thực hiện giao dịch
    fn get_camp_data(&self, camp_id: CampaignId) -> CampaignData;

    fn get_camp_info(&self) -> AllCampaignsData;
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
            products_by_campaign: LookupMap::new(b"products by campaign".try_to_vec().unwrap()),
            new_transaction_product: UnorderedMap::new(b"new_transaction_product".try_to_vec().unwrap()),
            collectors_by_campaign: LookupMap::new(b"collectors by campaign".try_to_vec().unwrap()),
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
        return self.user_by_id.get(&id).unwrap();
    }


    fn check_new_user(&self, id: AccountId)-> bool {
        self.user_by_id.contains_key(&id)
    }

    fn new_user(&mut self) ->User{ 
        let id = env::signer_account_id();
        let user = User {
            id: id.clone(),
            meta_data: UserMetaData {
                name: "".to_string(),
                balance: env::account_balance(),
                email_address: "".to_string(),
                image: "".to_string()
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

    fn update_user(&mut self, name: String, email_address: String, image: String) {
        let id = env::signer_account_id();
        let mut user = self.user_by_id.get(&id).unwrap();
        user.set_name(name);
        user.set_email(email_address);
        user.set_image(image);
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
    fn new_campaign(&mut self, id: CampaignId, fund: Balance, title: String,content :String, image: String, total_checkers: u32, amount: u32, init_time: u64, deadline: u64) -> Campaign {
        assert!(env::account_balance()>=fund, "Your balance is not enough!"); // kiểm tra người khởi tạo có đủ balance không
        assert_eq!(env::attached_deposit(), fund* ONE_NEAR, "Wrong deponsit!"); //kiểm tra amount nhập vào với pool
        // let id = functions::generate_hash_key(env::signer_account_id().to_string()+ &init_time.to_string());
        let total_camp = self.campaigns.len();
        let new_camp = Campaign {
            id: id.clone(),
            owner: env::signer_account_id(),
            fund,
            meta_data: CampaignMetaData {
                title,
                content,
                image
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
        let prods_by_camp: Vec<Product> = self.products_by_campaign.get(&id).unwrap_or_else(||Vec::new());
        let mut vec_prods: Vec<Product> = vec![]; 
        for i in  prods_by_camp{
            vec_prods.push(i);
        }
        vec_prods
    }

    fn set_camp_status(&mut self, status: Status, camp_id: CampaignId) -> Campaign{
        let mut camp = self.campaign_by_id.get(&camp_id).unwrap();
        assert_eq!(env::signer_account_id(), camp.owner, "You do not have permission to change status");
        camp.status = status.clone();
        self.update_camp_data(camp_id.clone(), &mut camp);
        // self.update_camp_data(camp_id.clone(), &mut camp);
        if status == Status::Done {
            self.distribute_reward(camp_id);
        }
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
        self.update_total_prds_camp(camp_id.clone());
        let camp = self.campaign_by_id.get(&camp_id).unwrap();
        assert_eq!(camp.status, Status::Done, "Campaign have not been finised!");
        assert_eq!(camp.owner, env::signer_account_id(), "You are not owner of this campaign!");
        let products = self.products_by_campaign.get(&camp_id).unwrap(); 
        for mut i in products.clone() {
            if i.state == State::Confirmed {
                let reward = (i.total_supply as f32 / camp.total_products as f32) * camp.fund as f32;// tính toán phần thưởng của từng sản phẩm dựa trên số lượng đóng góp/tổng số lượng
                // let reward = functions::calculate_reward(i.clone(), camp.clone()); 
                self.send_reward(i.owner.clone(), (reward * 0.8 *  (ONE_NEAR as f32)) as u128); //owner của product sẽ được 80%
                self.send_reward(i.collector.clone(), (reward * 0.2 *  (ONE_NEAR as f32)) as u128); //collector của product đó sẽ được 20%
                i.set_reward(reward as u128); // cập nhật phần thưởng của sản phẩm
                if self.new_transaction_product.len()>99 { // giới hạn 99 sản phẩm 
                self.new_transaction_product.remove(&99);
            }
            self.new_transaction_product.insert(&(self.new_transaction_product.len() as i32), &i);
            }
        }
        self.return_collector_stake(camp_id);
    }

    fn update_total_prds_camp(&mut self, camp_id: CampaignId) {
        let mut camp = self.campaign_by_id.get(&camp_id).unwrap();
        let vec_prods: Vec<Product> = self.products_by_campaign.get(&camp_id).unwrap_or_else(|| Vec::new());
        let mut new_total = 0;
        for i in vec_prods {
            new_total += i.total_supply;
        }
        camp.total_products = new_total;
        self.update_camp_data(camp_id, &mut camp);
    }

    fn return_collector_stake(&mut self, camp_id: CampaignId) {
        let camp = self.campaign_by_id.get(&camp_id).unwrap();
        assert_eq!(camp.status, Status::Done, "The campign had not been finished!");
        assert_eq!(camp.owner, env::signer_account_id(), "You are not owner of this campaign!");
        let collectors: Vec<User> = self.collectors_by_campaign.get(&camp_id).unwrap_or_else(|| Vec::new());
        let return_token = (camp.fund / 10) * ONE_NEAR;
        for i in collectors {
            // Promise::new(i.id).transfer(return_token as u128);
            self.send_reward(i.id, return_token);
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
        self.users.remove(&index); // cập nhật danh sách user
        self.users.insert(&index, &new_producer);
        self.user_by_id.insert(&env::signer_account_id(), &new_producer);
        new_producer
    }

    #[payable]
    fn apply_collector_in_camp(&mut self, camp_id: CampaignId){
        let id = env::signer_account_id();
        let user = self.user_by_id.get(&id).unwrap();
        assert_eq!(user.role, Role::Collector, "You are not a collector!");//check role
        let vec_collectors_by_camp: Vec<User> = self.collectors_by_campaign.get(&camp_id).unwrap_or_else(|| Vec::new());
        let camp = self.campaign_by_id.get(&camp_id).unwrap();
        assert!(!functions::contains_checker(vec_collectors_by_camp, id.clone()), "You have been a checker before!"); //check if this account is a checker
        let fee = camp.fund / 10;
        assert_eq!(env::attached_deposit(), fee*ONE_NEAR, "Incorrect tooken");//check if input amount is mess with the amount had been set
        let mut vec_collectors_by_camp:Vec<User> = self.collectors_by_campaign.get(&camp_id).unwrap_or_else(|| Vec::new());
        vec_collectors_by_camp.push(user);
        let payment_info = EventLog { //info of transaction
                standard: "e-comerce-1.0.0".to_string(),
                event: EventLogVariant::Purchase(vec![PurchaseProduct {
                    receiver: camp.owner.to_string(),
                    sender: env::signer_account_id().to_string(),
                    amount: fee,
                    memo: None,
                }])
            };
        self.collectors_by_campaign.insert(&camp_id, &vec_collectors_by_camp);
        // self.update_camp_data(camp_id, &mut camp); //add new checker into checkers of this campaign
        env::log_str(&payment_info.to_string());    
    }

    fn set_state_product(&mut self, id: ProductId, camp_id: CampaignId, is_valid: bool) {
        let mut camp = self.campaign_by_id.get(&camp_id).unwrap();
        let mut product = self.get_product_by_id(id.clone());
        let mut vec_prods_by_camp = self.products_by_campaign.get(&camp_id).unwrap();
        let vec_collectors_by_camp: Vec<User> = self.collectors_by_campaign.get(&camp_id).unwrap_or_else(|| Vec::new());
        let index = functions::find_index_pro_vec(vec_prods_by_camp.clone(), id.clone());
        vec_prods_by_camp.remove(index as usize); //remove this product out of campaign
        if is_valid {
            if env::signer_account_id() != camp.owner {
                assert!(functions::contains_checker(vec_collectors_by_camp, env::signer_account_id()), "you are not a checker in this campaign");
                product.state = State::Validated;
                product.collector = env::signer_account_id();
                vec_prods_by_camp.insert(index as usize, product.clone());
            }else {
                product.state = State::Confirmed;
                vec_prods_by_camp.insert(index as usize, product.clone());
                self.update_camp_data(camp_id.clone(), &mut camp);
            }   
        }
        //save new data of product
        self.products_by_campaign.insert(&camp_id, &vec_prods_by_camp);
        self.product_by_id.insert(&id, &product);
        self.update_camp_data(camp_id.clone(), &mut camp);
        self.update_total_prds_camp(camp_id);
    }

    fn get_checkers_by_campaign(&self, camp_id: CampaignId) -> Vec<User> {
        let collectors_by_camp: Vec<User> = self.collectors_by_campaign.get(&camp_id).unwrap_or_else(|| Vec::new());
        let mut vec_prods: Vec<User> = vec![]; 
        for i in  collectors_by_camp{
            vec_prods.push(i);
        }
        vec_prods
        
    }

//Product============================================================= 
    fn new_product(&mut self, name: String, description: String, image: String, total_supply: u32, camp_id: CampaignId) {
        assert!(self.campaign_by_id.contains_key(&camp_id), "Campaign id is not valid!");
        let mut camp = self.campaign_by_id.get(&camp_id).unwrap();
        let mut vec_prods_by_camp: Vec<Product> = self.products_by_campaign.get(&camp_id).unwrap_or_else(|| Vec::new());
        let total_products = vec_prods_by_camp.len();
        let data = total_products.to_string();
        let hashed_key_str = functions::generate_hash_key(data); // tạo id cho product
        let owner = env::signer_account_id();
        let product  = Product {
            id: hashed_key_str.clone(),
            meta_data: ProductMetaData {
                name,
                description,
                image,
                reward: 0,
            },
            collector: owner.clone(),
            owner: owner.clone(),
            total_supply,
            state: State::Init,
            campaign_id: camp_id.clone()
        };
        self.product_by_id.insert(&product.id, &product); //cập nhật product mới vào contract
        vec_prods_by_camp.push(product);
        self.products_by_campaign.insert(&camp_id, &vec_prods_by_camp);
        self.update_camp_data(camp_id.clone(), &mut camp);
        self.update_total_prds_camp(camp_id);
    }
    
    fn update_product_data(&mut self, product: Product, key: &String, camp_id: CampaignId) {
        let mut prods = self.products_by_campaign.get(&camp_id).unwrap();
        let id = functions::find_index_pro_vec(prods.clone(), product.clone().id);
        prods.remove(id as usize);
        prods.insert(id as usize, product.clone());
        self.products_by_campaign.insert(&camp_id, &prods);
        self.product_by_id.insert(key, &product);
    }
    
    fn update_camp_data(&mut self, camp_id: CampaignId, camp: &mut Campaign) {
        self.campaign_by_id.insert(&camp_id, &camp);
        let index = functions::find_index_camp_vec(&self.campaigns, camp_id);
        self.campaigns.remove(&index);
        self.campaigns.insert(&index, &camp);
    }

    fn get_product_by_id(&self, id: ProductId)-> Product {
        self.product_by_id.get(&id).unwrap()
    }


    fn get_camp_info(&self) -> AllCampaignsData {
        let mut new_vec_camps: Vec<Campaign> = vec![];
        let mut new_vec_prods: Vec<Product>= vec![];
        let camps = self.get_all_campaigns();
        let prods = &self.new_transaction_product;
        for i in camps{
            new_vec_camps.push(i);
        }
        for i in 0..prods.len(){
            new_vec_prods.push(prods.get(&(i as i32)).unwrap());
        }

        AllCampaignsData { campaign: new_vec_camps, products: new_vec_prods }
    }

    fn get_camp_data(&self, camp_id: CampaignId) -> CampaignData {
        let camp: Campaign = self.campaign_by_id.get(&camp_id).unwrap();
        let mut new_vec_prods: Vec<Product>= vec![];
        let prods: Vec<Product> = self.products_by_campaign.get(&camp_id).unwrap_or_else(|| Vec::new());

        for i in prods{
            new_vec_prods.push(i);
        }
        CampaignData {
            campaign:camp,
            products: new_vec_prods
        }
    }


}
