//! Events

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct Follow {
    #[key]
    pub follower: felt252,
    #[key]
    pub followed: felt252,
    pub time: u64,
}
