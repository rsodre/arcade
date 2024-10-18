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
        namespace: felt252, identifier: felt252, player_id: felt252, progress: u32, time: u64,
    ) -> AchievementCompletion {
        // [Check] Inputs
        AchievementCompletionAssert::assert_valid_namespace(namespace);
        AchievementCompletionAssert::assert_valid_identifier(identifier);
        // [Return] Achievement
        AchievementCompletion { namespace, identifier, player_id, progress, time }
    }
}

#[generate_trait]
impl AchievementCompletionAssert of AssertTrait {
    #[inline]
    fn assert_valid_namespace(namespace: felt252) {
        assert(namespace != 0, errors::ACHIEVEMENT_INVALID_NAMESPACE);
    }

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

    const NAMESPACE: felt252 = 'NAMESPACE';
    const IDENTIFIER: felt252 = 'ACHIEVEMENT';
    const PLAYER_ID: felt252 = 'PLAYER_ID';
    const PROGRESS: u32 = 100;
    const TIME: u64 = 1000000000;

    #[test]
    fn test_achievement_completion_new() {
        let completion = AchievementCompletionTrait::new(
            NAMESPACE, IDENTIFIER, PLAYER_ID, PROGRESS, TIME,
        );

        assert_eq!(completion.namespace, NAMESPACE);
        assert_eq!(completion.identifier, IDENTIFIER);
        assert_eq!(completion.player_id, PLAYER_ID);
        assert_eq!(completion.progress, PROGRESS);
        assert_eq!(completion.time, TIME);
    }

    #[test]
    #[should_panic(expected: ('Achievement: invalid namespace',))]
    fn test_achievement_completion_new_invalid_namespace() {
        AchievementCompletionTrait::new(0, IDENTIFIER, PLAYER_ID, PROGRESS, TIME);
    }

    #[test]
    #[should_panic(expected: ('Achievement: invalid identifier',))]
    fn test_achievement_completion_new_invalid_identifier() {
        AchievementCompletionTrait::new(NAMESPACE, 0, PLAYER_ID, PROGRESS, TIME);
    }
}
