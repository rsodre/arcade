#[derive(Introspect, Clone, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct AchievementCreation {
    #[key]
    namespace: felt252,
    #[key]
    identifier: felt252,
    points: u16,
    total: u32,
    title: ByteArray,
    description: ByteArray,
    image_uri: ByteArray,
    time: u64,
}

#[derive(IntrospectPacked, Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct AchievementCompletion {
    #[key]
    namespace: felt252,
    #[key]
    identifier: felt252,
    #[key]
    player_id: felt252,
    count: u32,
    total: u32,
    time: u64,
}
