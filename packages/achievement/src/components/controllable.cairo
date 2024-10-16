#[starknet::component]
mod ControllableComponent {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::info::{get_caller_address};

    // Dojo imports

    use dojo::world::{IWorldProvider, IWorldDispatcher, IWorldDispatcherTrait};
    use dojo::contract::IContract;

    // Internal imports

    use achievement::store::{Store, StoreTrait};
    use achievement::models::game::{Game, GameTrait, GameAssert};

    // Storage

    #[storage]
    struct Storage {}

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    // Errors

    mod errors {
        const CONTROLLABLE_UNAUTHORIZED_CALLER: felt252 = 'Controllable: unauthorized call';
    }

    #[generate_trait]
    impl InternalImpl<
        TContractState,
        +HasComponent<TContractState>,
        +IWorldProvider<TContractState>,
        +IContract<TContractState>
    > of InternalTrait<TContractState> {
        fn assert_is_authorized(self: @ComponentState<TContractState>, world: IWorldDispatcher) {
            let namespace = self.get_contract().namespace_hash();
            let caller = get_caller_address();
            let is_owner = world.is_owner(namespace, caller);
            let is_writer = world.is_writer(namespace, caller);
            assert(is_owner || is_writer, errors::CONTROLLABLE_UNAUTHORIZED_CALLER);
        }

        fn assert_is_game_owner(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(self.get_contract().world());

            // [Return] Game owner
            let game = store.get_game(world_address, namespace);
            let caller = get_caller_address();
            assert(game.owner == caller.into(), errors::CONTROLLABLE_UNAUTHORIZED_CALLER);
        }
    }
}
