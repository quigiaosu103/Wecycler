use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::borsh::{self, BorshDeserialize};
use near_sdk::{AccountId, Balance, borsh::BorshSerialize};
pub type ProductId = String;

#[derive(BorshDeserialize, BorshSerialize, Deserialize, Serialize, Clone, PartialEq)]
#[serde(crate = "near_sdk::serde")]
pub struct Product {
    pub id: ProductId,
    pub name: String,
    pub price: Balance,
    pub owner: AccountId
}