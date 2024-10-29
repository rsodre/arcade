//! Store struct and component management methods.

// Starknet imports

use starknet::SyscallResultTrait;

// Dojo imports

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

// Models imports

use achievement::models::game::Game;
use achievement::models::achievement::Achievement;

// Events imports

use achievement::events::trophy::{Trophy, TrophyTrait};
use achievement::events::task::{Task, TaskTrait};
use achievement::events::progress::{Progress, ProgressTrait};

// Structs

#[derive(Copy, Drop)]
struct Store {
    world: IWorldDispatcher,
}

// Implementations

#[generate_trait]
impl StoreImpl of StoreTrait {
    #[inline]
    fn new(world: IWorldDispatcher) -> Store {
        Store { world: world }
    }

    #[inline]
    fn get_game(self: Store, world_address: felt252, namespace: felt252) -> Game {
        get!(self.world, (world_address, namespace), (Game))
    }

    #[inline]
    fn get_achievement(
        self: Store, world_address: felt252, namespace: felt252, id: felt252
    ) -> Achievement {
        get!(self.world, (world_address, namespace, id), Achievement)
    }

    #[inline]
    fn set_game(self: Store, game: Game) {
        set!(self.world, (game))
    }

    #[inline]
    fn set_achievement(self: Store, achievement: Achievement) {
        set!(self.world, (achievement))
    }

    #[inline]
    fn create(
        self: Store,
        id: felt252,
        hidden: bool,
        page_count: u8,
        points: u16,
        group: felt252,
        icon: felt252,
        title: felt252,
        description: ByteArray,
        tasks: Span<Task>,
        data: ByteArray,
    ) {
        let _event: Trophy = TrophyTrait::new(
            id, hidden, page_count, points, group, icon, title, description, tasks, data
        );
        emit!(self.world, (_event,));
    }

    #[inline]
    fn update(self: Store, player_id: felt252, task_id: felt252, count: u32, time: u64,) {
        let _event: Progress = ProgressTrait::new(player_id, task_id, count, time);
        emit!(self.world, (_event,));
    }
}
