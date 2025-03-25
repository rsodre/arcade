// Starknet imports

use starknet::testing;

// Internal imports

use registry::store::StoreTrait;
use registry::tests::mocks::register::IRegisterDispatcherTrait;
use registry::tests::mocks::tracker::ITrackerDispatcherTrait;
use registry::tests::setup::setup::{spawn, Systems, PLAYER, OWNER};

// Constants

const WORLD_ADDRESS: felt252 = 'WORLD';
const NAMEPSACE: felt252 = 'NAMESPACE';

// Helpers

fn register(systems: @Systems) {
    testing::set_contract_address(PLAYER());
    (*systems)
        .register
        .register(
            WORLD_ADDRESS,
            NAMEPSACE,
            "PROJECT",
            "RPC",
            "POLICIES",
            Option::None,
            Option::None,
            Option::None,
            Option::None,
            Option::None,
            Option::None,
            Option::None,
            Option::None,
            Option::None,
            Option::None,
            Option::None,
        );
}

// Tests

#[test]
fn test_trackable_register_achievement() {
    // [Setup]
    let (world, systems, _context) = spawn();
    register(@systems);
    // [Register] Achievement
    let identifier: felt252 = 'IDENTIFIER';
    let points: u16 = 10;
    systems.tracker.register(WORLD_ADDRESS, NAMEPSACE, identifier, points);
    // [Assert] Achievement
    let store = StoreTrait::new(world);
    let achievement = store.get_achievement(WORLD_ADDRESS, NAMEPSACE, identifier);
    assert_eq!(achievement.id, identifier);
    assert_eq!(achievement.points, points);
    // [Assert] Game
    let game = store.get_game(WORLD_ADDRESS, NAMEPSACE);
    assert_eq!(game.points, points);
}

#[test]
fn test_trackable_update_achievement() {
    // [Setup]
    let (world, systems, _context) = spawn();
    register(@systems);
    // [Register] Achievement
    let identifier: felt252 = 'IDENTIFIER';
    let points: u16 = 10;
    systems.tracker.register(WORLD_ADDRESS, NAMEPSACE, identifier, points);
    // [Update] Achievement
    let new_points: u16 = 20;
    systems.tracker.update(WORLD_ADDRESS, NAMEPSACE, identifier, new_points);
    // [Assert] Achievement
    let store = StoreTrait::new(world);
    let achievement = store.get_achievement(WORLD_ADDRESS, NAMEPSACE, identifier);
    assert_eq!(achievement.points, new_points);
    // [Assert] Game
    let game = store.get_game(WORLD_ADDRESS, NAMEPSACE);
    assert_eq!(game.points, new_points);
}

#[test]
fn test_trackable_publish_achievement() {
    // [Setup]
    let (world, systems, _context) = spawn();
    register(@systems);
    // [Register] Achievement
    let identifier: felt252 = 'IDENTIFIER';
    let points: u16 = 10;
    systems.tracker.register(WORLD_ADDRESS, NAMEPSACE, identifier, points);
    // [Publish] Achievement
    systems.tracker.publish(WORLD_ADDRESS, NAMEPSACE, identifier);
    // [Assert] Achievement
    let store = StoreTrait::new(world);
    let achievement = store.get_achievement(WORLD_ADDRESS, NAMEPSACE, identifier);
    assert_eq!(achievement.published, true);
}

#[test]
fn test_trackable_whitelist_achievement() {
    // [Setup]
    let (world, systems, _context) = spawn();
    register(@systems);
    // [Register] Achievement
    let identifier: felt252 = 'IDENTIFIER';
    let points: u16 = 10;
    systems.tracker.register(WORLD_ADDRESS, NAMEPSACE, identifier, points);
    // [Whitelist] Achievement
    systems.tracker.publish(WORLD_ADDRESS, NAMEPSACE, identifier);
    testing::set_contract_address(OWNER());
    systems.tracker.whitelist(WORLD_ADDRESS, NAMEPSACE, identifier);
    // [Assert] Achievement
    let store = StoreTrait::new(world);
    let achievement = store.get_achievement(WORLD_ADDRESS, NAMEPSACE, identifier);
    assert_eq!(achievement.whitelisted, true);
}
