#[starknet::component]
mod RegistrableComponent {
    // Dojo imports

    use dojo::world::IWorldDispatcher;

    // Internal imports

    use quest::store::{Store, StoreTrait};
    use quest::models::game::{Game, GameTrait, GameAssert};
    use quest::models::achievement::{Achievement, AchievementTrait, AchievementAssert};

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
        fn owner(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
        ) -> felt252 {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Return] Game owner
            let game = store.get_game(world_address, namespace);
            game.owner
        }

        fn register_game(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
            name: ByteArray,
            description: ByteArray,
            torii_url: ByteArray,
            image_uri: ByteArray,
            owner: felt252,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game does not exist
            let game = store.get_game(world_address, namespace);
            game.assert_does_not_exist();

            // [Effect] Create game
            let game = GameTrait::new(
                world_address, namespace, name, description, torii_url, image_uri, owner
            );

            // [Effect] Store game
            store.set_game(game);
        }

        fn update_game(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
            name: ByteArray,
            description: ByteArray,
            torii_url: ByteArray,
            image_uri: ByteArray,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Effect] Update game
            game.update(name, description, torii_url, image_uri);

            // [Effect] Update game
            store.set_game(game);
        }

        fn whitelist_game(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Effect] Whitelist game
            game.whitelist();

            // [Effect] Store game
            store.set_game(game);
        }

        fn blacklist_game(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Effect] Blacklist game
            game.blacklist();

            // [Effect] Store game
            store.set_game(game);
        }

        fn remove_game(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Effect] Remove game
            game.nullify();

            // [Effect] Store game
            store.set_game(game);
        }

        fn register_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Achievement does not exist
            let achievement = store.get_achievement(world_address, namespace, achievement_id);
            achievement.assert_does_not_exist();

            // [Effect] Create achievement
            let achievement = AchievementTrait::new(
                world_address, namespace, achievement_id, points
            );

            // [Effect] Add achievement to game
            game.add(achievement.points);

            // [Effect] Store entities
            store.set_achievement(achievement);
            store.set_game(game);
        }

        fn update_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Achievement exists
            let mut achievement = store.get_achievement(world_address, namespace, achievement_id);
            achievement.assert_does_exist();

            // [Effect] Update achievement and game
            game.remove(achievement.points);
            achievement.update(points);
            game.add(achievement.points);

            // [Effect] Update entities
            store.set_achievement(achievement);
            store.set_game(game);
        }

        fn whitelist_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
            achievement_id: felt252,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Achievement exists
            let mut achievement = store.get_achievement(world_address, namespace, achievement_id);
            achievement.assert_does_exist();

            // [Effect] Whitelist achievement
            achievement.whitelist();

            // [Effect] Store achievement
            store.set_achievement(achievement);
        }

        fn blacklist_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
            achievement_id: felt252,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Achievement exists
            let mut achievement = store.get_achievement(world_address, namespace, achievement_id);
            achievement.assert_does_exist();

            // [Effect] Blacklist achievement
            achievement.blacklist();

            // [Effect] Store achievement
            store.set_achievement(achievement);
        }

        fn remove_achievement(
            self: @ComponentState<TContractState>,
            world: IWorldDispatcher,
            world_address: felt252,
            namespace: felt252,
            achievement_id: felt252,
        ) {
            // [Setup] Datastore
            let store: Store = StoreTrait::new(world);

            // [Check] Game exists
            let mut game = store.get_game(world_address, namespace);
            game.assert_does_exist();

            // [Check] Achievement exists
            let mut achievement = store.get_achievement(world_address, namespace, achievement_id);
            achievement.assert_does_exist();

            // [Effect] Remove achievement
            game.remove(achievement.points);
            achievement.nullify();

            // [Effect] Store entities
            store.set_achievement(achievement);
            store.set_game(game);
        }
    }
}
