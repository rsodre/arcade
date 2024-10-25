// Internal imports

use achievement::events::index::AchievementCompletion;
use achievement::constants;

// Errors

pub mod errors {
    pub const ACHIEVEMENT_INVALID_NAMESPACE: felt252 = 'Achievement: invalid namespace';
    pub const ACHIEVEMENT_INVALID_ACHIEVEMENT: felt252 = 'Achievement: invalid identifier';
}

// Implementations

#[generate_trait]
impl AchievementCompletionImpl of AchievementCompletionTrait {
    #[inline]
    fn new(
        identifier: felt252, player_id: felt252, count: u32, time: u64,
    ) -> AchievementCompletion {
        // [Check] Inputs
        AchievementCompletionAssert::assert_valid_identifier(identifier);
        // [Return] Achievement
        AchievementCompletion { identifier, player_id, count, time }
    }
}

#[generate_trait]
impl AchievementCompletionAssert of AssertTrait {
    #[inline]
    fn assert_valid_identifier(identifier: felt252) {
        assert(identifier != 0, errors::ACHIEVEMENT_INVALID_ACHIEVEMENT);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::AchievementCompletionTrait;

    // Constants

    const IDENTIFIER: felt252 = 'ACHIEVEMENT';
    const PLAYER_ID: felt252 = 'PLAYER_ID';
    const COUNT: u32 = 100;
    const TIME: u64 = 1000000000;

    #[test]
    fn test_achievement_completion_new() {
        let completion = AchievementCompletionTrait::new(IDENTIFIER, PLAYER_ID, COUNT, TIME,);

        assert_eq!(completion.identifier, IDENTIFIER);
        assert_eq!(completion.player_id, PLAYER_ID);
        assert_eq!(completion.count, COUNT);
        assert_eq!(completion.time, TIME);
    }
    #[test]
    #[should_panic(expected: ('Achievement: invalid identifier',))]
    fn test_achievement_completion_new_invalid_identifier() {
        AchievementCompletionTrait::new(0, PLAYER_ID, COUNT, TIME);
    }
}
