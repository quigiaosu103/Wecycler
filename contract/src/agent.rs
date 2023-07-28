use near_sdk::{AccountId, Balance};

struct Agent {
    id: AccountId,
    token: Balance,
    meta_data: AgentMetaData,
}

pub struct AgentMetaData {
    pub name: String,
    pub location: String, 
}