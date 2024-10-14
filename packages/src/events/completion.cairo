// Internal imports

use quest::events::index::AchievementCompletion;
use quest::constants;

// Errors

pub mod errors {
    pub const ACHIEVEMENT_INVALID_WORLD: felt252 = 'Achievement: invalid world';
    pub const ACHIEVEMENT_INVALID_NAMESPACE: felt252 = 'Achievement: invalid namespace';
    pub const ACHIEVEMENT_INVALID_ACHIEVEMENT: felt252 = 'Achievement: invalid id';
    pub const ACHIEVEMENT_INVALID_PROGRESS: felt252 = 'Achievement: invalid progress';
}

// Implementations

#[generate_trait]
impl AchievementCompletionImpl of AchievementCompletionTrait {
    #[inline]
    fn new(
        namespace: felt252, id: felt252, player_id: felt252, count: u32, total: u32, time: u64,
    ) -> AchievementCompletion {
        // [Check] Inputs
        AchievementCompletionAssert::assert_valid_namespace(namespace);
        AchievementCompletionAssert::assert_valid_id(id);
        AchievementCompletionAssert::assert_valid_progress(count, total);
        // [Return] Achievement
        AchievementCompletion { namespace, id, player_id, count, total, time }
    }
}

#[generate_trait]
impl AchievementCompletionAssert of AssertTrait {
    #[inline]
    fn assert_valid_namespace(namespace: felt252) {
        assert(namespace != 0, errors::ACHIEVEMENT_INVALID_NAMESPACE);
    }

    #[inline]
    fn assert_valid_id(achivement_id: felt252) {
        assert(achivement_id != 0, errors::ACHIEVEMENT_INVALID_ACHIEVEMENT);
    }

    #[inline]
    fn assert_valid_progress(progress: u32, total: u32) {
        assert(progress <= total, errors::ACHIEVEMENT_INVALID_PROGRESS);
    }
}
