// Core imports

use core::num::traits::Zero;

// Starknet imports

use starknet::ContractAddress;
use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
use starknet::testing;

// Internal imports

use quest::events::index::{AchievementCreation, AchievementCompletion};
use quest::tests::mocks::achiever::{Achiever, IAchieverDispatcher, IAchieverDispatcherTrait};
use quest::tests::setup::setup::{spawn_game, clear_events, Systems, PLAYER};

// Constants

const IDENTIFIER: felt252 = 'ACHIEVEMENT';
const POINTS: u16 = 10;
const TOTAL: u32 = 100;
const COUNT: u32 = 1;

// Tests

#[test]
fn test_achievable_create() {
    let (world, systems, _context) = spawn_game();
    clear_events(world.contract_address);
    systems.achiever.create(IDENTIFIER, POINTS, TOTAL, "Title", "Description", "Image");
    let event = starknet::testing::pop_log::<AchievementCreation>(world.contract_address).unwrap();
    // FIXME: Cannot check keys because they are shifted due to dojo macros
    assert_eq!(event.points, POINTS);
    assert_eq!(event.total, TOTAL);
    assert_eq!(event.title, "Title");
    assert_eq!(event.description, "Description");
    assert_eq!(event.image_uri, "Image");
}

#[test]
fn test_achievable_update() {
    let (world, systems, context) = spawn_game();
    clear_events(world.contract_address);
    systems.achiever.update(IDENTIFIER, context.player_id, COUNT, TOTAL);
    let event = starknet::testing::pop_log::<AchievementCompletion>(world.contract_address)
        .unwrap();
    // FIXME: Cannot check keys because they are shifted due to dojo macros
    assert_eq!(event.count, COUNT);
    assert_eq!(event.total, TOTAL);
}
