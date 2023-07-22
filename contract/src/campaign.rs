use near_sdk::{AccountId, Balance};
pub struct Campaign {
    pub id: CampaignId,
    pub owner: AccountId,
    pub fund: Balance,
    pub checkers: Vec<AccountId>,
    pub meta_data: CampaignMetaData,
}

pub type CampaignId = String;

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
}