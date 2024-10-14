// Interfaces

#[starknet::interface]
trait IActions<TContractState> {
    fn register_game(
        self: @TContractState,
        world: felt252,
        namespace: felt252,
        name: ByteArray,
        description: ByteArray,
        torii_url: ByteArray,
        image_uri: ByteArray
    );
    fn update_game(
        self: @TContractState,
        world: felt252,
        namespace: felt252,
        name: ByteArray,
        description: ByteArray,
        torii_url: ByteArray,
        image_uri: ByteArray
    );
    fn publish_game(self: @TContractState, world: felt252, namespace: felt252);
    fn hide_game(self: @TContractState, world: felt252, namespace: felt252);
    fn whitelist_game(self: @TContractState, world: felt252, namespace: felt252);
    fn blacklist_game(self: @TContractState, world: felt252, namespace: felt252);
    fn remove_game(self: @TContractState, world: felt252, namespace: felt252);
    fn register_achievement(
        self: @TContractState,
        world: felt252,
        namespace: felt252,
        achievement_id: felt252,
        points: u16
    );
    fn update_achievement(
        self: @TContractState,
        world: felt252,
        namespace: felt252,
        achievement_id: felt252,
        points: u16
    );
    fn publish_achievement(
        self: @TContractState, world: felt252, namespace: felt252, achievement_id: felt252
    );
    fn hide_achievement(
        self: @TContractState, world: felt252, namespace: felt252, achievement_id: felt252
    );
    fn whitelist_achievement(
        self: @TContractState, world: felt252, namespace: felt252, achievement_id: felt252
    );
    fn blacklist_achievement(
        self: @TContractState, world: felt252, namespace: felt252, achievement_id: felt252
    );
    fn remove_achievement(
        self: @TContractState, world: felt252, namespace: felt252, achievement_id: felt252
    );
}

// Contracts

#[dojo::contract]
mod Actions {
    // Core imports

    use core::poseidon::poseidon_hash_span;

    // Starknet imports

    use starknet::get_caller_address;

    // Component imports

    use quest::components::controllable::ControllableComponent;
    use quest::components::registrable::RegistrableComponent;

    // Local imports

    use super::IActions;

    // Components

    component!(path: ControllableComponent, storage: controllable, event: ControllableEvent);
    impl ControllableInternalImpl = ControllableComponent::InternalImpl<ContractState>;
    component!(path: RegistrableComponent, storage: registrable, event: RegistrableEvent);
    impl RegistrableInternalImpl = RegistrableComponent::InternalImpl<ContractState>;

    // Storage

    #[storage]
    struct Storage {
        #[substorage(v0)]
        controllable: ControllableComponent::Storage,
        #[substorage(v0)]
        registrable: RegistrableComponent::Storage,
    }

    // Events

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ControllableEvent: ControllableComponent::Event,
        #[flat]
        RegistrableEvent: RegistrableComponent::Event,
    }

    // Errors

    mod errors {
        const ACTIONS_CALLER_NOT_OWNER: felt252 = 'Actions: caller not owner';
    }

    // Implementations

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn register_game(
            self: @ContractState,
            world: felt252,
            namespace: felt252,
            name: ByteArray,
            description: ByteArray,
            torii_url: ByteArray,
            image_uri: ByteArray,
        ) {
            let owner: felt252 = get_caller_address().into();
            self
                .registrable
                .register_game(
                    self.world(), world, namespace, name, description, torii_url, image_uri, owner
                )
        }

        fn update_game(
            self: @ContractState,
            world: felt252,
            namespace: felt252,
            name: ByteArray,
            description: ByteArray,
            torii_url: ByteArray,
            image_uri: ByteArray,
        ) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Update game
            self
                .registrable
                .update_game(
                    self.world(), world, namespace, name, description, torii_url, image_uri
                )
        }

        fn publish_game(self: @ContractState, world: felt252, namespace: felt252) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Publish game
            self.registrable.publish_game(self.world(), world, namespace);
        }

        fn hide_game(self: @ContractState, world: felt252, namespace: felt252) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Hide game
            self.registrable.hide_game(self.world(), world, namespace);
        }

        fn whitelist_game(self: @ContractState, world: felt252, namespace: felt252) {
            // [Check] Caller is a resource owner or writer
            self.controllable.assert_is_authorized();
            // [Effect] Whitelist game
            self.registrable.whitelist_game(self.world(), world, namespace);
        }

        fn blacklist_game(self: @ContractState, world: felt252, namespace: felt252) {
            // [Check] Caller is a resource owner or writer
            self.controllable.assert_is_authorized();
            // [Effect] Blacklist game
            self.registrable.blacklist_game(self.world(), world, namespace);
        }

        fn remove_game(self: @ContractState, world: felt252, namespace: felt252) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Remove game
            self.registrable.remove_game(self.world(), world, namespace)
        }

        fn register_achievement(
            self: @ContractState,
            world: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
        ) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Register achievement
            self
                .registrable
                .register_achievement(self.world(), world, namespace, achievement_id, points)
        }

        fn update_achievement(
            self: @ContractState,
            world: felt252,
            namespace: felt252,
            achievement_id: felt252,
            points: u16,
        ) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Update achievement
            self
                .registrable
                .update_achievement(self.world(), world, namespace, achievement_id, points)
        }

        fn publish_achievement(
            self: @ContractState, world: felt252, namespace: felt252, achievement_id: felt252
        ) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Publish achievement
            self.registrable.publish_achievement(self.world(), world, namespace, achievement_id);
        }

        fn hide_achievement(
            self: @ContractState, world: felt252, namespace: felt252, achievement_id: felt252
        ) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Whitelist achievement
            self.registrable.whitelist_achievement(self.world(), world, namespace, achievement_id);
        }

        fn whitelist_achievement(
            self: @ContractState, world: felt252, namespace: felt252, achievement_id: felt252
        ) {
            // [Check] Caller is a resource owner or writer
            self.controllable.assert_is_authorized();
            // [Effect] Whitelist achievement
            self.registrable.whitelist_achievement(self.world(), world, namespace, achievement_id);
        }

        fn blacklist_achievement(
            self: @ContractState, world: felt252, namespace: felt252, achievement_id: felt252
        ) {
            // [Check] Caller is a resource owner or writer
            self.controllable.assert_is_authorized();
            // [Effect] Blacklist achievement
            self.registrable.blacklist_achievement(self.world(), world, namespace, achievement_id);
        }

        fn remove_achievement(
            self: @ContractState, world: felt252, namespace: felt252, achievement_id: felt252
        ) {
            // [Check] Caller is the game owner
            self.controllable.assert_is_game_owner(world, namespace);
            // [Effect] Remove achievement
            self.registrable.remove_achievement(self.world(), world, namespace, achievement_id);
        }
    }
}
