#[derive(Introspect, Clone, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct AchievementCreation {
    #[key]
    namespace: felt252,
    #[key]
    identifier: felt252,
    hidden: bool,
    points: u16,
    total: u32,
    title: ByteArray,
    hidden_title: ByteArray,
    description: ByteArray,
    hidden_description: ByteArray,
    image_uri: ByteArray,
    icon: ByteArray,
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
    progress: u32,
    time: u64,
}
