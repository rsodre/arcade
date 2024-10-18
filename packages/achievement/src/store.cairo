//! Store struct and component management methods.

// Starknet imports

use starknet::SyscallResultTrait;

// Dojo imports

use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

// Models imports

use achievement::models::game::Game;
use achievement::models::achievement::Achievement;

// Events imports

use achievement::events::creation::{AchievementCreation, AchievementCreationTrait};
use achievement::events::completion::{AchievementCompletion, AchievementCompletionTrait};

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
        namespace: felt252,
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
        time: u64,
    ) {
        let _event: AchievementCreation = AchievementCreationTrait::new(
            namespace,
            identifier,
            hidden,
            points,
            total,
            title,
            hidden_title,
            description,
            hidden_description,
            image_uri,
            icon,
            time
        );
        emit!(self.world, (_event,));
    }

    #[inline]
    fn update(
        self: Store,
        namespace: felt252,
        identifier: felt252,
        player_id: felt252,
        progress: u32,
        time: u64,
    ) {
        let _event: AchievementCompletion = AchievementCompletionTrait::new(
            namespace, identifier, player_id, progress, time
        );
        emit!(self.world, (_event,));
    }
}
