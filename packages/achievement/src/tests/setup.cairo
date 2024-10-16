mod setup {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::ContractAddress;
    use starknet::testing;
    use starknet::testing::{set_contract_address, set_block_timestamp};

    // Dojo imports

    use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};
    use dojo::utils::test::{spawn_test_world};

    // Internal imports

    use achievement::models::index;
    use achievement::tests::mocks::achiever::{Achiever, IAchiever, IAchieverDispatcher};
    use achievement::tests::mocks::controller::{Controller, IController, IControllerDispatcher};
    use achievement::tests::mocks::registrer::{Registrer, IRegistrer, IRegistrerDispatcher};

    // Constant

    fn OWNER() -> ContractAddress {
        starknet::contract_address_const::<'OWNER'>()
    }

    fn PLAYER() -> ContractAddress {
        starknet::contract_address_const::<'PLAYER'>()
    }

    #[derive(Copy, Drop)]
    struct Systems {
        achiever: IAchieverDispatcher,
        controller: IControllerDispatcher,
        registrer: IRegistrerDispatcher,
    }

    #[derive(Copy, Drop)]
    struct Context {
        player_id: felt252,
    }

    /// Drop all events from the given contract address
    pub fn clear_events(address: ContractAddress) {
        loop {
            match starknet::testing::pop_log_raw(address) {
                core::option::Option::Some(_) => {},
                core::option::Option::None => { break; },
            };
        }
    }

    #[inline]
    fn spawn_game() -> (IWorldDispatcher, Systems, Context) {
        // [Setup] World
        set_contract_address(OWNER());
        let models = array![index::game::TEST_CLASS_HASH, index::achievement::TEST_CLASS_HASH,];
        let world = spawn_test_world(array!["achievement"].span(), models.span());

        // [Setup] Systems
        let achiever_address = world
            .deploy_contract('achiever', Achiever::TEST_CLASS_HASH.try_into().unwrap());
        let controller_address = world
            .deploy_contract('controller', Controller::TEST_CLASS_HASH.try_into().unwrap());
        let registrer_address = world
            .deploy_contract('registrer', Registrer::TEST_CLASS_HASH.try_into().unwrap());
        let systems = Systems {
            achiever: IAchieverDispatcher { contract_address: achiever_address },
            controller: IControllerDispatcher { contract_address: controller_address },
            registrer: IRegistrerDispatcher { contract_address: registrer_address },
        };
        world.grant_writer(dojo::utils::bytearray_hash(@"achievement"), achiever_address);
        world.grant_writer(dojo::utils::bytearray_hash(@"achievement"), controller_address);
        world.grant_writer(dojo::utils::bytearray_hash(@"achievement"), registrer_address);
        world.grant_writer(dojo::utils::bytearray_hash(@"achievement"), OWNER());

        // [Setup] Context
        let context = Context { player_id: PLAYER().into() };

        // [Return]
        (world, systems, context)
    }
}
