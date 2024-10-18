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
        TContractState, +IContract<TContractState>, +HasComponent<TContractState>
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
            image_uri: ByteArray,
            icon: ByteArray,
        ) {
            // [Setup] Store
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement creation
            let contract_address = get_contract_address();
            let contract = IContractDispatcher { contract_address };
            let namespace = contract.namespace_hash();
            let time: u64 = get_block_timestamp();
            store
                .create(
                    namespace,
                    identifier,
                    hidden,
                    points,
                    total,
                    title,
                    hidden_title,
                    description,
                    hidden_description,
                    image_uri,
                    icon,
                    time
                );
        }

        fn update(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            identifier: felt252,
            player_id: felt252,
            progress: u32,
        ) {
            // [Setup] Store
            let store: Store = StoreTrait::new(world);

            // [Event] Emit achievement completion
            let contract_address = get_contract_address();
            let namespace = IContractDispatcher { contract_address }.namespace_hash();
            let time: u64 = get_block_timestamp();
            store.update(namespace, identifier, player_id, progress, time);
        }
    }
}
