// Internal imports

use achievement::events::index::AchievementCompletion;
use achievement::constants;

// Errors

pub mod errors {
    pub const ACHIEVEMENT_INVALID_NAMESPACE: felt252 = 'Achievement: invalid namespace';
    pub const ACHIEVEMENT_INVALID_QUEST: felt252 = 'Achievement: invalid quest';
}

// Implementations

#[generate_trait]
impl AchievementCompletionImpl of AchievementCompletionTrait {
    #[inline]
    fn new(player_id: felt252, quest: felt252, count: u32, time: u64,) -> AchievementCompletion {
        // [Check] Inputs
        AchievementCompletionAssert::assert_valid_identifier(quest);
        // [Return] Achievement
        AchievementCompletion { player_id, quest, count, time }
    }
}

#[generate_trait]
impl AchievementCompletionAssert of AssertTrait {
    #[inline]
    fn assert_valid_identifier(quest: felt252) {
        assert(quest != 0, errors::ACHIEVEMENT_INVALID_QUEST);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::AchievementCompletionTrait;

    // Constants

    const PLAYER_ID: felt252 = 'PLAYER_ID';
    const QUEST: felt252 = 'QUEST';
    const COUNT: u32 = 100;
    const TIME: u64 = 1000000000;

    #[test]
    fn test_achievement_completion_new() {
        let completion = AchievementCompletionTrait::new(PLAYER_ID, QUEST, COUNT, TIME,);

        assert_eq!(completion.player_id, PLAYER_ID);
        assert_eq!(completion.quest, QUEST);
        assert_eq!(completion.count, COUNT);
        assert_eq!(completion.time, TIME);
    }
    #[test]
    #[should_panic(expected: ('Achievement: invalid quest',))]
    fn test_achievement_completion_new_invalid_identifier() {
        AchievementCompletionTrait::new(PLAYER_ID, 0, COUNT, TIME);
    }
}
