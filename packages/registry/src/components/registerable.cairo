#[starknet::component]
pub mod RegisterableComponent {
    // Dojo imports

    use dojo::world::WorldStorage;

    // Internal imports

    use registry::store::{Store, StoreTrait};
    use registry::models::access::{AccessAssert};
    use registry::models::game::{GameTrait, GameAssert};
    use registry::types::config::{ConfigTrait};
    use registry::types::role::Role;

    // Storage

    #[storage]
    pub struct Storage {}

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {}

    #[generate_trait]
    pub impl InternalImpl<
        TContractState, +HasComponent<TContractState>,
    > of InternalTrait<TContractState> {
        fn register(
            self: @ComponentState<TContractState>,
            world: WorldStorage,
            caller_id: felt252,
            world_address: felt252,
            namespace: felt252,
            project: ByteArray,
            rpc: ByteArray,
            policies: ByteArray,
            metadata: ByteArray,
            socials: ByteArray,
        ) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Game does not exist
            let game = store.get_game(world_address, namespace);
            game.assert_does_not_exist();

            // [Effect] Create game
            let config = ConfigTrait::new(project, rpc, policies);
            let game = GameTrait::new(
                world_address, namespace, config, metadata, socials, caller_id,
            );

            // [Effect] Store game
            store.set_game(@game);
        }

        fn update(
            self: @ComponentState<TContractState>,
            world: WorldStorage,
            caller_id: felt252,
            world_address: felt252,
            namespace: felt252,
            project: ByteArray,
            rpc: ByteArray,
            policies: ByteArray,
            metadata: ByteArray,
            socials: ByteArray,
        ) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Caller is owner
            game.assert_is_owner(caller_id);

            // [Effect] Update game
            let config = ConfigTrait::new(project, rpc, policies);
            game.update(config, metadata, socials);

            // [Effect] Update game
            store.set_game(@game);
        }

        fn publish(
            self: @ComponentState<TContractState>,
            world: WorldStorage,
            caller_id: felt252,
            world_address: felt252,
            namespace: felt252,
        ) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Caller is owner
            game.assert_is_owner(caller_id);

            // [Effect] Publish game
            game.publish();

            // [Effect] Store game
            store.set_game(@game);
        }

        fn hide(
            self: @ComponentState<TContractState>,
            world: WorldStorage,
            caller_id: felt252,
            world_address: felt252,
            namespace: felt252,
        ) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Caller is owner
            game.assert_is_owner(caller_id);

            // [Effect] Hide game
            game.hide();

            // [Effect] Store game
            store.set_game(@game);
        }

        fn whitelist(
            self: @ComponentState<TContractState>,
            world: WorldStorage,
            caller_id: felt252,
            world_address: felt252,
            namespace: felt252,
        ) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Caller is allowed
            let access = store.get_access(caller_id);
            access.assert_is_allowed(Role::Admin);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Effect] Whitelist game
            game.whitelist();

            // [Effect] Store game
            store.set_game(@game);
        }

        fn blacklist(
            self: @ComponentState<TContractState>,
            world: WorldStorage,
            caller_id: felt252,
            world_address: felt252,
            namespace: felt252,
        ) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Caller is allowed
            let access = store.get_access(caller_id);
            access.assert_is_allowed(Role::Admin);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Effect] Blacklist game
            game.blacklist();

            // [Effect] Store game
            store.set_game(@game);
        }

        fn remove(
            self: @ComponentState<TContractState>,
            world: WorldStorage,
            caller_id: felt252,
            world_address: felt252,
            namespace: felt252,
        ) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Caller is owner
            game.assert_is_owner(caller_id);

            // [Effect] Remove game
            game.nullify();

            // [Effect] Store game
            store.delete_game(@game);
        }
    }
}
