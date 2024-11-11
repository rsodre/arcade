//! Store struct and component management methods.

// Starknet imports

use starknet::SyscallResultTrait;

// Dojo imports

use dojo::world::WorldStorage;
use dojo::event::EventStorage;

// Events imports

use arcade_trophy::events::trophy::{TrophyCreation, TrophyTrait};
use arcade_trophy::events::progress::{TrophyProgression, ProgressTrait};

// Internal imports

use arcade_trophy::types::task::{Task, TaskTrait};

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
    fn create(
        mut self: Store,
        id: felt252,
        hidden: bool,
        index: u8,
        points: u16,
        start: u64,
        end: u64,
        group: felt252,
        icon: felt252,
        title: felt252,
        description: ByteArray,
        tasks: Span<Task>,
        data: ByteArray,
    ) {
        let event: TrophyCreation = TrophyTrait::new(
            id, hidden, index, points, start, end, group, icon, title, description, tasks, data
        );
        self.world.emit_event(@event);
    }

    #[inline]
    fn progress(mut self: Store, player_id: felt252, task_id: felt252, count: u32, time: u64,) {
        let event: TrophyProgression = ProgressTrait::new(player_id, task_id, count, time);
        self.world.emit_event(@event);
    }
}
