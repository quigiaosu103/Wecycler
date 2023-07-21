
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::borsh::{self, BorshDeserialize};
use near_sdk::{AccountId, Balance, borsh::BorshSerialize};
pub type ProductId= String;


#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Transaction {
    pub seller: AccountId,
    pub customer: AccountId,
    pub product: ProductId,
    pub price: Balance
}