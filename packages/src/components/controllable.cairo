#[starknet::component]
mod ControllableComponent {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::info::{get_tx_info};

    // Dojo imports

    use dojo::world::{IWorldProvider, IWorldDispatcher, IWorldDispatcherTrait};
    use dojo::contract::IContract;

    // Internal imports

    use quest::store::{Store, StoreTrait};
    use quest::models::game::{Game, GameTrait, GameAssert};

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
        fn assert_is_authorized(self: @ComponentState<TContractState>) {
            let world = self.get_contract().world();
            let namespace = self.get_contract().namespace_hash();
            let caller = get_tx_info().unbox().account_contract_address;
            let is_owner = world.is_owner(namespace, caller);
            let is_writer = world.is_writer(namespace, caller);
            assert(is_owner || is_writer, errors::CONTROLLABLE_UNAUTHORIZED_CALLER);
        }

        fn assert_is_game_owner(
            self: @ComponentState<TContractState>, world: felt252, namespace: felt252
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(self.get_contract().world());

            // [Return] Game owner
            let game = store.get_game(world, namespace);
            let caller = get_tx_info().unbox().account_contract_address;
            assert(game.owner == caller.into(), errors::CONTROLLABLE_UNAUTHORIZED_CALLER);
        }
    }
}
