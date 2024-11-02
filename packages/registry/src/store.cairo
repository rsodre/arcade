//! Store struct and component management methods.

// Starknet imports

use starknet::SyscallResultTrait;

// Dojo imports

use dojo::world::WorldStorage;
use dojo::model::ModelStorage;
// Models imports

use bushido_registry::models::game::Game;
use bushido_registry::models::achievement::Achievement;

// Structs

#[derive(Copy, Drop)]
struct Store {
    world: WorldStorage,
}

// Implementations

#[generate_trait]
impl StoreImpl of StoreTrait {
    #[inline]
    fn new(world: WorldStorage) -> Store {
        Store { world: world }
    }

    #[inline]
    fn get_game(self: Store, world_address: felt252, namespace: felt252) -> Game {
        self.world.read_model((world_address, namespace))
    }

    #[inline]
    fn get_achievement(
        self: Store, world_address: felt252, namespace: felt252, id: felt252
    ) -> Achievement {
        self.world.read_model((world_address, namespace, id))
    }

    #[inline]
    fn set_game(ref self: Store, game: Game) {
        self.world.write_model(@game);
    }

    #[inline]
    fn set_achievement(ref self: Store, achievement: Achievement) {
        self.world.write_model(@achievement);
    }
}
