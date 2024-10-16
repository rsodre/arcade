#[starknet::interface]
trait IAchiever<TContractState> {
    fn create(
        self: @TContractState,
        identifier: felt252,
        points: u16,
        total: u32,
        title: ByteArray,
        description: ByteArray,
        image_uri: ByteArray,
    );
    fn update(
        self: @TContractState, identifier: felt252, player_id: felt252, count: u32, total: u32,
    );
}

#[dojo::contract]
pub mod Achiever {
    // Starknet imports

    use starknet::{ContractAddress, get_block_timestamp, get_contract_address};

    // Dojo imports

    use dojo::contract::{IContractDispatcher, IContractDispatcherTrait};

    // Internal imports

    use quest::components::achievable::AchievableComponent;

    // Local imports

    use super::IAchiever;

    // Components

    component!(path: AchievableComponent, storage: achievable, event: AchievableEvent);
    impl InternalImpl = AchievableComponent::InternalImpl<ContractState>;

    #[storage]
    pub struct Storage {
        #[substorage(v0)]
        pub achievable: AchievableComponent::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        AchievableEvent: AchievableComponent::Event
    }

    #[abi(embed_v0)]
    impl AchieverImpl of IAchiever<ContractState> {
        fn create(
            self: @ContractState,
            identifier: felt252,
            points: u16,
            total: u32,
            title: ByteArray,
            description: ByteArray,
            image_uri: ByteArray,
        ) {
            self
                .achievable
                .create(self.world(), identifier, points, total, title, description, image_uri);
        }

        fn update(
            self: @ContractState, identifier: felt252, player_id: felt252, count: u32, total: u32,
        ) {
            self.achievable.update(self.world(), identifier, player_id, count, total);
        }
    }
}
