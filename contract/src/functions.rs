

// pub fn find_index_pro_vec(&self, id: ProductId, owner: &AccountId) ->i32 {
//     let vec_products = self.products_by_seller.get(owner).unwrap_or_else(||Vec::new());
//     let mut i = 0;
//     for pr in &vec_products {
//         if pr.id == id {
//             return i;
//         }
//         i+=1;
//     }
//     -1
// }

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
