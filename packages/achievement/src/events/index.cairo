#[derive(Introspect, Clone, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct AchievementCreation {
    #[key]
    identifier: felt252,
    hidden: bool,
    points: u16,
    total: u32,
    title: ByteArray,
    hidden_title: ByteArray,
    description: ByteArray,
    hidden_description: ByteArray,
    icon: felt252,
    icon_style: felt252,
    time: u64,
}

#[derive(IntrospectPacked, Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct AchievementCompletion {
    #[key]
    player_id: felt252,
    #[key]
    identifier: felt252,
    count: u32,
    time: u64,
}
