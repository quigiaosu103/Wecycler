use near_sdk::Balance;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::borsh::{self, BorshDeserialize};
use near_sdk::{AccountId, borsh::BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, PartialEq, Debug, Clone, Copy)]
#[serde(crate = "near_sdk::serde")]
pub enum Role {
    Producer,
    Collector
}
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct User {
    pub id: AccountId,
    pub meta_data: UserMetaData,
    pub role: Role,
    
}
#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct  UserMetaData {
    pub name: String,
    pub email_address: String,
    pub balance: Balance,
}

impl User {
    pub fn set_name(&mut self, name: String) {
        self.meta_data.name = name;
    }

    pub fn set_email(&mut self, mail: String) {
        self.meta_data.email_address = mail;
    }

    pub fn set_balance(&mut self, balance: Balance) {
        self.meta_data.balance = balance;
    }

    pub fn get_name(&self) -> String {
        self.meta_data.name.clone()
    }

    pub fn get_email(&self) -> String {
        self.meta_data.email_address.clone()
    }

    pub fn get_balance(&self) -> Balance {
        self.meta_data.balance
    }
}