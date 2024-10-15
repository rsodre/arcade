mod setup {
    // Core imports

    use core::debug::PrintTrait;

    // Starknet imports

    use starknet::ContractAddress;
    use starknet::testing::{set_contract_address, set_block_timestamp};

    // Dojo imports

    use dojo::world::{IWorldDispatcherTrait, IWorldDispatcher};
    use dojo::utils::test::{spawn_test_world};

    // Internal imports

    use quest::models::index;
    use quest::tests::mocks::achiever::{Achiever, IAchiever, IAchieverDispatcher};

    // Constants

    fn PLAYER() -> ContractAddress {
        starknet::contract_address_const::<'PLAYER'>()
    }

    #[derive(Drop)]
    struct Systems {
        achiever: IAchieverDispatcher,
    }

    #[derive(Drop)]
    struct Context {
        player_id: felt252,
    }

    #[inline]
    fn spawn_game() -> (IWorldDispatcher, Systems, Context) {
        // [Setup] World
        let models = array![index::game::TEST_CLASS_HASH, index::achievement::TEST_CLASS_HASH,];
        let world = spawn_test_world(array!["quest"].span(), models.span());

        // [Setup] Systems
        let achiever_address = world
            .deploy_contract('actions', Achiever::TEST_CLASS_HASH.try_into().unwrap());
        let systems = Systems {
            achiever: IAchieverDispatcher { contract_address: achiever_address },
        };
        world.grant_writer(dojo::utils::bytearray_hash(@"quest"), achiever_address);
        world.grant_writer(dojo::utils::bytearray_hash(@"quest"), PLAYER());

        // [Setup] Context
        let context = Context { player_id: PLAYER().into() };

        // [Return]
        (world, systems, context)
    }
}
