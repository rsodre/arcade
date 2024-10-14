#[starknet::component]
mod AchievableComponent {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::info::{get_caller_address, get_block_timestamp};

    // Dojo imports

    use dojo::world::IWorldDispatcher;

    // Internal imports

    use quest::store::{Store, StoreTrait};

    // Errors

    mod errors {}

    // Storage

    #[storage]
    struct Storage {}

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    #[generate_trait]
    impl InternalImpl<
        TContractState, +HasComponent<TContractState>
    > of InternalTrait<TContractState> {
        fn create_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
            total: u32,
            title: ByteArray,
            description: ByteArray,
            image_uri: ByteArray,
        ) {
            // [Setup] Store
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement creation
            let time: u64 = get_block_timestamp();
            store
                .create(
                    namespace,
                    achievement_id,
                    points,
                    total,
                    title,
                    description,
                    image_uri,
                    time
                );
        }

        fn update_achievement_progress(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            namespace: felt252,
            achievement_id: felt252,
            player_id: felt252,
            count: u32,
            total: u32,
        ) {
            // [Setup] Store
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement completion
            let time: u64 = get_block_timestamp();
            store
                .update(
                    namespace,
                    achievement_id,
                    player_id,
                    count,
                    total,
                    time
                );
        }
    }
}
