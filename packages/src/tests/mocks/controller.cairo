#[starknet::interface]
trait IController<TContractState> {
    fn assert_is_authorized(self: @TContractState) {}
    fn assert_is_game_owner(self: @TContractState, world_address: felt252, namespace: felt252);
}

#[dojo::contract]
pub mod Controller {
    // Internal imports

    use quest::components::controllable::ControllableComponent;

    // Local imports

    use super::IController;

    // Components

    component!(path: ControllableComponent, storage: controllable, event: ControllableEvent);
    impl InternalImpl = ControllableComponent::InternalImpl<ContractState>;

    #[storage]
    pub struct Storage {
        #[substorage(v0)]
        pub controllable: ControllableComponent::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ControllableEvent: ControllableComponent::Event
    }

    #[abi(embed_v0)]
    impl ControllerImpl of IController<ContractState> {
        fn assert_is_authorized(self: @ContractState) {
            self.controllable.assert_is_authorized(self.world());
        }

        fn assert_is_game_owner(self: @ContractState, world_address: felt252, namespace: felt252) {
            self.controllable.assert_is_game_owner(self.world(), world_address, namespace);
        }
    }
}
