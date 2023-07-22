use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::borsh::{self, BorshDeserialize};
use near_sdk::{AccountId, borsh::BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    pub id: AccountId,
    pub meta_data: UserMetaData,
    
}
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct  UserMetaData {
    pub name: String,
    pub email_address: String,
}

impl User {
    pub fn set_name(&mut self, name: String) {
        self.meta_data.name = name;
    }

    pub fn set_email(&mut self, mail: String) {
        self.meta_data.email_address = mail;
    }

    pub fn get_name(&self) -> String {
        self.meta_data.name.clone()
    }

    pub fn get_email(&self) -> String {
        self.meta_data.email_address.clone()
    }
}