use crate::product::Product;
use crate::user::User;
use near_sdk::{Balance, env, Promise};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::borsh::{self, BorshDeserialize};
use near_sdk::{AccountId, borsh::BorshSerialize, collections::LookupMap};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum Status{
    Init,
    Active,
    End,
    Done
}
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Campaign {
    pub id: CampaignId,
    pub owner: AccountId,
    pub fund: Balance, //total of stake of campaign
    pub checkers: Vec<AccountId>,
    pub products: Vec<Product>, //product had been confrimed
    pub meta_data: CampaignMetaData,
    pub total_products: u32,
    pub total_products_expected: u32,
    pub total_producers: u32, 
    pub deadline: u64,
    pub init_time: u64,
    pub status: Status,
}

pub type CampaignId = String;

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct CampaignMetaData {
    pub title: String,
    pub content: String,
    pub image: String,
}

impl Campaign {
    pub fn get_title(&self) -> String {
        self.meta_data.title.clone()
    }

    pub fn set_title(&mut self, title: String) {
        self.meta_data.title = title;
    }

    pub fn get_content(&self) -> String {
        self.meta_data.content.clone()
    }

    pub fn set_content(&mut self, content: String) {
        self.meta_data.content = content;
    }

    pub fn get_image(&self) -> String {
        self.meta_data.image.clone()
    }

    pub fn set_image(&mut self, image: String) {
        self.meta_data.image = image;
    }

    pub fn contains_checker(&self, id: AccountId) -> bool {
        for i in self.checkers.clone() {
            if  i == id {
                return true;
            }
        }
        false
    }

    pub fn get_all_products(&self) -> Vec<Product> {
        self.products.clone()
    }

    pub fn get_all_checkers(&self) -> Vec<AccountId> {
        self.checkers.clone()
    }

    

}