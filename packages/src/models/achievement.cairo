// Intenral imports

use quest::models::index::Achievement;
use quest::constants;

// Errors

pub mod errors {
    pub const ACHIEVEMENT_ALREADY_EXISTS: felt252 = 'Achievement: already exists';
    pub const ACHIEVEMENT_NOT_EXIST: felt252 = 'Achievement: does not exist';
    pub const ACHIEVEMENT_INVALID_WORLD: felt252 = 'Achievement: invalid world';
    pub const ACHIEVEMENT_INVALID_NAMESPACE: felt252 = 'Achievement: invalid namespace';
    pub const ACHIEVEMENT_INVALID_ACHIEVEMENT: felt252 = 'Achievement: invalid id';
    pub const ACHIEVEMENT_TOO_MUCH_POINTS: felt252 = 'Achievement: cannot exceed 100';
    pub const ACHIEVEMENT_TOO_FEW_POINTS: felt252 = 'Achievement: must be at least 1';
}

#[generate_trait]
impl AchievementImpl of AchievementTrait {
    #[inline]
    fn new(
        world_address: felt252, namespace: felt252, achievement_id: felt252, points: u16
    ) -> Achievement {
        // [Check] Inputs
        AchievementAssert::assert_valid_world(world_address);
        AchievementAssert::assert_valid_namespace(namespace);
        AchievementAssert::assert_valid_achievement(achievement_id);
        AchievementAssert::assert_valid_points(points);
        // [Return] Achievement
        Achievement { world_address, namespace, id: achievement_id, whitelisted: false, points, }
    }

    #[inline]
    fn whitelist(ref self: Achievement) {
        self.whitelisted = true;
    }

    #[inline]
    fn blacklist(ref self: Achievement) {
        self.whitelisted = false;
    }

    #[inline]
    fn update(ref self: Achievement, points: u16) {
        // [Check] Inputs
        AchievementAssert::assert_valid_points(points);
        // [Update] Points
        self.points = points;
    }

    #[inline]
    fn nullify(ref self: Achievement) {
        self.points = 0;
        self.whitelisted = false;
    }
}

#[generate_trait]
impl AchievementAssert of AssertTrait {
    #[inline]
    fn assert_does_not_exist(self: Achievement) {
        assert(self.points == 0, errors::ACHIEVEMENT_ALREADY_EXISTS);
    }

    #[inline]
    fn assert_does_exist(self: Achievement) {
        assert(self.points != 0, errors::ACHIEVEMENT_NOT_EXIST);
    }

    #[inline]
    fn assert_valid_world(world: felt252) {
        assert(world != 0, errors::ACHIEVEMENT_INVALID_WORLD);
    }

    #[inline]
    fn assert_valid_namespace(namespace: felt252) {
        assert(namespace != 0, errors::ACHIEVEMENT_INVALID_NAMESPACE);
    }

    #[inline]
    fn assert_valid_achievement(achivement_id: felt252) {
        assert(achivement_id != 0, errors::ACHIEVEMENT_INVALID_ACHIEVEMENT);
    }

    #[inline]
    fn assert_valid_points(points: u16) {
        assert(points >= constants::MIN_ACHIEVEMENT_POINTS, errors::ACHIEVEMENT_TOO_FEW_POINTS);
        assert(points <= constants::MAX_ACHIEVEMENT_POINTS, errors::ACHIEVEMENT_TOO_MUCH_POINTS);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{Achievement, AchievementTrait, AchievementAssert};

    // Constants

    const WORLD_ADDRESS: felt252 = 'WORLD';
    const NAMESPACE: felt252 = 'NAMESPACE';
    const ACHIEVEMENT_ID: felt252 = 'ID';
    const POINTS: u16 = 42;

    #[test]
    fn test_achievement_new() {
        let achievement = AchievementTrait::new(WORLD_ADDRESS, NAMESPACE, ACHIEVEMENT_ID, POINTS);
        assert_eq!(achievement.world_address, WORLD_ADDRESS);
        assert_eq!(achievement.namespace, NAMESPACE);
        assert_eq!(achievement.id, ACHIEVEMENT_ID);
        assert_eq!(achievement.points, POINTS);
    }

    #[test]
    fn test_achievement_whitelist() {
        let mut achievement = AchievementTrait::new(
            WORLD_ADDRESS, NAMESPACE, ACHIEVEMENT_ID, POINTS
        );
        achievement.whitelist();
        assert_eq!(achievement.whitelisted, true);
    }

    #[test]
    fn test_achievement_blacklist() {
        let mut achievement = AchievementTrait::new(
            WORLD_ADDRESS, NAMESPACE, ACHIEVEMENT_ID, POINTS
        );
        achievement.blacklist();
        assert_eq!(achievement.whitelisted, false);
    }

    #[test]
    fn test_achievement_update() {
        let mut achievement = AchievementTrait::new(
            WORLD_ADDRESS, NAMESPACE, ACHIEVEMENT_ID, POINTS
        );
        achievement.update(POINTS + 1);
        assert_eq!(achievement.points, POINTS + 1);
    }

    #[test]
    fn test_achievement_nullify() {
        let mut achievement = AchievementTrait::new(
            WORLD_ADDRESS, NAMESPACE, ACHIEVEMENT_ID, POINTS
        );
        achievement.nullify();
        assert_eq!(achievement.points, 0);
        assert_eq!(achievement.whitelisted, false);
    }

    #[test]
    #[should_panic(expected: 'Achievement: cannot exceed 100')]
    fn test_achievement_set_points_exceeds_max() {
        let mut achievement = AchievementTrait::new(
            WORLD_ADDRESS, NAMESPACE, ACHIEVEMENT_ID, POINTS
        );
        achievement.update(101);
    }

    #[test]
    #[should_panic(expected: 'Achievement: invalid world')]
    fn test_achievement_assert_valid_world_zero() {
        AchievementAssert::assert_valid_world(0);
    }

    #[test]
    #[should_panic(expected: 'Achievement: invalid namespace')]
    fn test_achievement_assert_valid_namespace_zero() {
        AchievementAssert::assert_valid_namespace(0);
    }

    #[test]
    #[should_panic(expected: 'Achievement: invalid id')]
    fn test_achievement_assert_valid_achievement_zero() {
        AchievementAssert::assert_valid_achievement(0);
    }

    #[test]
    #[should_panic(expected: 'Achievement: must be at least 1')]
    fn test_achievement_assert_valid_points_too_few() {
        AchievementAssert::assert_valid_points(0);
    }

    #[test]
    #[should_panic(expected: 'Achievement: cannot exceed 100')]
    fn test_achievement_assert_valid_points_exceeds_max() {
        AchievementAssert::assert_valid_points(101);
    }
}
