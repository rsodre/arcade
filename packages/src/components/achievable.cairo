#[starknet::component]
mod AchievableComponent {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::info::{get_caller_address, get_block_timestamp, get_contract_address};

    // Dojo imports

    use dojo::world::{IWorldDispatcher, IWorldProvider};
    use dojo::contract::{IContract, IContractDispatcher, IContractDispatcherTrait};

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
        TContractState,
        +IWorldProvider<TContractState>,
        +IContract<TContractState>,
        +HasComponent<TContractState>
    > of InternalTrait<TContractState> {
        fn create(
            self: @ComponentState<TContractState>,
            achievement_id: felt252,
            points: u16,
            total: u32,
            title: ByteArray,
            description: ByteArray,
            image_uri: ByteArray,
        ) {
            // [Setup] Store
            let contract_address = get_contract_address();
            let world = IWorldDispatcher { contract_address };
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement creation
            let contract = IContractDispatcher { contract_address };
            let namespace = contract.namespace_hash();
            let time: u64 = get_block_timestamp();
            store
                .create(
                    namespace, achievement_id, points, total, title, description, image_uri, time
                );
        }

        fn update(
            self: @ComponentState<TContractState>,
            achievement_id: felt252,
            player_id: felt252,
            count: u32,
            total: u32,
        ) {
            // [Setup] Store
            let contract_address = get_contract_address();
            println!("update-contract_address: {:?}", contract_address);
            let world = IWorldDispatcher { contract_address };
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement completion
            let namespace = IContractDispatcher { contract_address }.namespace_hash();
            let time: u64 = get_block_timestamp();
            store.update(namespace, achievement_id, player_id, count, total, time);
        }
    }
}
