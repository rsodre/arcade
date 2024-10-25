#[starknet::component]
mod AchievableComponent {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::info::{get_caller_address, get_block_timestamp, get_contract_address};

    // Dojo imports

    use dojo::world::IWorldDispatcher;

    // Internal imports

    use achievement::store::{Store, StoreTrait};

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
        fn create(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
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
        ) {
            // [Setup] Store
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement creation
            let time: u64 = get_block_timestamp();
            store
                .create(
                    identifier,
                    hidden,
                    points,
                    total,
                    title,
                    hidden_title,
                    description,
                    hidden_description,
                    icon,
                    icon_style,
                    time
                );
        }

        fn update(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            identifier: felt252,
            player_id: felt252,
            count: u32,
        ) {
            // [Setup] Store
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement completion
            let time: u64 = get_block_timestamp();
            store.update(player_id, identifier, count, time);
        }
    }
}
