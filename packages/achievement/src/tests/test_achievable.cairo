// Core imports

use core::num::traits::Zero;

// Starknet imports

use starknet::ContractAddress;
use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
use starknet::testing;

// Internal imports

use achievement::events::index::{AchievementCreation, AchievementCompletion};
use achievement::tests::mocks::achiever::{Achiever, IAchieverDispatcher, IAchieverDispatcherTrait};
use achievement::tests::setup::setup::{spawn_game, clear_events, Systems, PLAYER};

// Constants

const IDENTIFIER: felt252 = 'ACHIEVEMENT';
const HIDDEN: bool = false;
const POINTS: u16 = 10;
const TOTAL: u32 = 100;
const COUNT: u32 = 1;
const TITLE: felt252 = 'Title';
const ICON: felt252 = 'fa-khanda';

// Tests

#[test]
fn test_achievable_create() {
    let (world, systems, _context) = spawn_game();
    clear_events(world.contract_address);
    systems.achiever.create(IDENTIFIER, HIDDEN, POINTS, TOTAL, TITLE, "Description", ICON,);
    let event = starknet::testing::pop_log::<AchievementCreation>(world.contract_address).unwrap();
    // FIXME: Cannot check keys because they are shifted due to dojo macros
    assert_eq!(event.hidden, HIDDEN);
    assert_eq!(event.points, POINTS);
    assert_eq!(event.total, TOTAL);
    assert_eq!(event.title, TITLE);
    assert_eq!(event.description, "Description");
    assert_eq!(event.icon, ICON);
}

#[test]
fn test_achievable_update() {
    let (world, systems, context) = spawn_game();
    clear_events(world.contract_address);
    systems.achiever.update(context.player_id, IDENTIFIER, COUNT);
    let event = starknet::testing::pop_log::<AchievementCompletion>(world.contract_address)
        .unwrap();
    // FIXME: Cannot check keys because they are shifted due to dojo macros
    assert_eq!(event.count, COUNT);
}
