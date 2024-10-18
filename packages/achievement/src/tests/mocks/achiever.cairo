#[starknet::interface]
trait IAchiever<TContractState> {
    fn create(
        self: @TContractState,
        identifier: felt252,
        hidden: bool,
        points: u16,
        total: u32,
        title: ByteArray,
        hidden_title: ByteArray,
        description: ByteArray,
        hidden_description: ByteArray,
        image_uri: ByteArray,
        icon: felt252,
    );
    fn update(self: @TContractState, identifier: felt252, player_id: felt252, progress: u32,);
}

#[dojo::contract]
pub mod Achiever {
    // Starknet imports

    use starknet::{ContractAddress, get_block_timestamp, get_contract_address};

    // Dojo imports

    use dojo::contract::{IContractDispatcher, IContractDispatcherTrait};

    // Internal imports

    use achievement::components::achievable::AchievableComponent;

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
            hidden: bool,
            points: u16,
            total: u32,
            title: ByteArray,
            hidden_title: ByteArray,
            description: ByteArray,
            hidden_description: ByteArray,
            image_uri: ByteArray,
            icon: felt252,
        ) {
            self
                .achievable
                .create(
                    self.world(),
                    identifier,
                    hidden,
                    points,
                    total,
                    title,
                    hidden_title,
                    description,
                    hidden_description,
                    image_uri,
                    icon
                );
        }

        fn update(self: @ContractState, identifier: felt252, player_id: felt252, progress: u32,) {
            self.achievable.update(self.world(), identifier, player_id, progress);
        }
    }
}
