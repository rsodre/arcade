#[derive(Clone, Drop, Serde)]
#[dojo::model]
pub struct Game {
    #[key]
    world_address: felt252,
    #[key]
    namespace: felt252,
    whitelisted: bool,
    total_points: u16,
    name: ByteArray,
    description: ByteArray,
    torii_url: ByteArray,
    image_uri: ByteArray,
    owner: felt252,
}

#[derive(IntrospectPacked, Copy, Drop, Serde)]
#[dojo::model]
pub struct Achievement {
    #[key]
    world_address: felt252,
    #[key]
    namespace: felt252,
    #[key]
    id: felt252,
    whitelisted: bool,
    points: u16,
}
