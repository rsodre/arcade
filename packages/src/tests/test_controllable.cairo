// Core imports

use core::num::traits::Zero;

// Starknet imports

use starknet::ContractAddress;
use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
use starknet::testing;

// Internal imports

use quest::store::{Store, StoreTrait};
use quest::models::game::{Game, GameTrait};
use quest::models::achievement::{Achievement, AchievementTrait};
use quest::tests::mocks::controller::{
    Controller, IControllerDispatcher, IControllerDispatcherTrait
};
use quest::tests::setup::setup::{spawn_game, Systems, Context, OWNER, PLAYER};

// Constants

const WORLD_ADDRESS: felt252 = 'WORLD';
const NAMEPSACE: felt252 = 'NAMESPACE';

// Tests

#[test]
fn test_controllable_assert_is_authorized() {
    // [Setup]
    let (_world, systems, _context) = spawn_game();
    systems.controller.assert_is_authorized();
}

#[test]
#[should_panic(expected: ('Controllable: unauthorized call', 'ENTRYPOINT_FAILED'))]
fn test_controllable_assert_is_authorized_revert() {
    // [Setup]
    let (_world, systems, _context) = spawn_game();
    testing::set_contract_address(PLAYER());
    systems.controller.assert_is_authorized();
}

#[test]
fn test_controllable_assert_is_game_owner() {
    // [Setup]
    let (world, systems, _context) = spawn_game();
    let store = StoreTrait::new(world);
    let game = GameTrait::new(
        WORLD_ADDRESS, NAMEPSACE, "NAME", "DESCRIPTION", "TORII_URL", "IMAGE_URI", OWNER().into()
    );
    store.set_game(game);
    // [Assert]
    systems.controller.assert_is_game_owner(WORLD_ADDRESS, NAMEPSACE);
}

#[test]
#[should_panic(expected: ('Controllable: unauthorized call', 'ENTRYPOINT_FAILED'))]
fn test_controllable_assert_is_game_owner_revert() {
    // [Setup]
    let (world, systems, _context) = spawn_game();
    let store = StoreTrait::new(world);
    let game = GameTrait::new(
        WORLD_ADDRESS, NAMEPSACE, "NAME", "DESCRIPTION", "TORII_URL", "IMAGE_URI", OWNER().into()
    );
    store.set_game(game);
    // [Assert]
    testing::set_contract_address(PLAYER());
    systems.controller.assert_is_game_owner(WORLD_ADDRESS, NAMEPSACE);
}
