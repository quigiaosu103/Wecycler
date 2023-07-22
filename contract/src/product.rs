use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::borsh::{self, BorshDeserialize};
use near_sdk::{AccountId, Balance, borsh::BorshSerialize};
pub type ProductId = String;

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, PartialEq)]
#[serde(crate = "near_sdk::serde")]
pub struct Product {
    pub id: ProductId,
    pub price: Balance,
    pub owner: AccountId,
    pub meta_data: ProductMetaData,
    pub state: String,
}
//add quatity(suply)
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, PartialEq)]
#[serde(crate = "near_sdk::serde")]
pub struct ProductMetaData {
    pub name: String,
    pub description: String,
    pub image: String,
}

impl Product {
    pub fn get_name(&self) -> String {
        self.meta_data.name.clone()
    }

    pub fn set_name(&mut self, name:String) {
        self.meta_data.name = name;
    }

    pub fn get_description(&self) -> String {
        self.meta_data.description.clone()
    }

    pub fn set_description(&mut self, des:String) {
        self.meta_data.description = des;
    }
    
    pub fn get_image(&self) -> String {
        self.meta_data.description.clone()
    }

    pub fn set_image(&mut self, src:String) {
        self.meta_data.image = src;
    }
}