// Core imports

use core::num::traits::Zero;

// Starknet imports

use starknet::ContractAddress;
use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

// Internal imports

use quest::components::achievable::AchievableComponent::InternalTrait;
use quest::components::achievable::AchievableComponent;
use quest::tests::mocks::achiever::{Achiever, IAchieverDispatcher, IAchieverDispatcherTrait};
use quest::tests::setup::setup::{spawn_game, Systems, PLAYER};

// Constants

const ACHIEVEMENT_ID: felt252 = 'ACHIEVEMENT';
const POINTS: u16 = 10;
const TOTAL: u32 = 100;

// Helpers

// Tests

#[test]
fn test_achievable_create() {
    let (_world, systems, _context) = spawn_game();
    systems.achiever.create(ACHIEVEMENT_ID, POINTS, TOTAL, "Title", "Description", "Image");
}
