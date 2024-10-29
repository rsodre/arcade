#[derive(Clone, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct Trophy {
    #[key]
    id: felt252,
    hidden: bool,
    points: u16,
    group: felt252,
    icon: felt252,
    title: felt252,
    description: ByteArray,
    tasks: Span<Task>,
    data: ByteArray,
}

#[derive(Clone, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct Task {
    #[key]
    id: felt252,
    total: u32,
    description: ByteArray,
}

#[derive(Copy, Drop, Serde)]
#[dojo::model]
#[dojo::event]
pub struct Progress {
    #[key]
    player_id: felt252,
    #[key]
    task_id: felt252,
    count: u32,
    time: u64,
}
