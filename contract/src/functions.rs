use near_sdk::{collections::UnorderedMap, AccountId};
use sha2::{Sha256, Digest};

use crate::{product::{Product, ProductId}, campaign::{Campaign, CampaignId}, user::User};



pub fn find_index_pro_vec(vec_products: Vec<Product>, id: ProductId) ->i32 {
    let mut i = 0;
    for pr in &vec_products {
        if pr.id == id {
            return i;
        }
        i+=1;
    }
    -1
}

pub fn find_index_camp_vec(vec_products: &UnorderedMap<i32, Campaign>, id: CampaignId) ->i32 {
    let mut i = 0;
    for pr in vec_products {
        if pr.1.id == id {
            return i;
        }
        i+=1;
    }
    -1
}

pub fn find_index_user_unor(vec_products: &UnorderedMap<i32, User>, id: AccountId) ->i32 {
    let mut i = 0;
    for pr in vec_products {
        if pr.1.id == id {
            return i;
        }
        i+=1;
    }
    -1
}

pub fn generate_hash_key(data: String)-> String {
    let mut hash = Sha256::new();
    hash.update(data.as_bytes());

    // Finalize the hash and obtain the output
    let hashed_data = hash.finalize();
    format!("{:x}", hashed_data)
}

pub fn calculate_reward(product: Product, camp: Campaign)->f32 {
    (product.total_supply as f32 / camp.total_products as f32) * camp.fund as f32
}

// pub fn find_index_prod_unord(&self, id: ProductId)->i32 {
//     let mut i = 0;
//     let products = &self.products;
//     for prd in products{
//         if prd.1.id == id {
//             return i;
//         }
//         i+=1;
//     }
//     -1
// }
