// Internal imports

use achievement::events::index::AchievementCreation;
use achievement::constants;

// Errors

pub mod errors {
    pub const ACHIEVEMENT_INVALID_IDENTIFIER: felt252 = 'Achievement: invalid id';
    pub const ACHIEVEMENT_INVALID_TITLE: felt252 = 'Achievement: invalid title';
    pub const ACHIEVEMENT_INVALID_DESCRIPTION: felt252 = 'Achievement: invalid desc.';
}

// Implementations

#[generate_trait]
impl AchievementCreationImpl of AchievementCreationTrait {
    #[inline]
    fn new(
        identifier: felt252,
        quest: felt252,
        hidden: bool,
        points: u16,
        total: u32,
        title: felt252,
        description: ByteArray,
        icon: felt252,
        time: u64,
    ) -> AchievementCreation {
        // [Check] Inputs
        // [Info] We don't check points here, leave free the game to decide
        AchievementCreationAssert::assert_valid_identifier(identifier);
        AchievementCreationAssert::assert_valid_identifier(quest);
        AchievementCreationAssert::assert_valid_title(title);
        AchievementCreationAssert::assert_valid_description(@description);
        // [Return] Achievement
        AchievementCreation {
            identifier, quest, hidden, points, total, title, description, icon, time
        }
    }
}

#[generate_trait]
impl AchievementCreationAssert of AssertTrait {
    #[inline]
    fn assert_valid_identifier(identifier: felt252) {
        assert(identifier != 0, errors::ACHIEVEMENT_INVALID_IDENTIFIER);
    }

    #[inline]
    fn assert_valid_title(title: felt252) {
        assert(title != 0, errors::ACHIEVEMENT_INVALID_TITLE);
    }

    #[inline]
    fn assert_valid_description(description: @ByteArray) {
        assert(description.len() > 0, errors::ACHIEVEMENT_INVALID_DESCRIPTION);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::AchievementCreationTrait;

    // Constants

    const IDENTIFIER: felt252 = 'ACHIEVEMENT';
    const QUEST: felt252 = 'QUEST';
    const HIDDEN: bool = false;
    const POINTS: u16 = 100;
    const TOTAL: u32 = 100;
    const TITLE: felt252 = 'TITLE';
    const ICON: felt252 = 'ICON';

    #[test]
    fn test_achievement_creation_new() {
        let achievement = AchievementCreationTrait::new(
            IDENTIFIER, QUEST, HIDDEN, POINTS, TOTAL, TITLE, "DESCRIPTION", ICON, 1000000000,
        );
        assert_eq!(achievement.identifier, IDENTIFIER);
        assert_eq!(achievement.quest, QUEST);
        assert_eq!(achievement.hidden, HIDDEN);
        assert_eq!(achievement.points, POINTS);
        assert_eq!(achievement.total, TOTAL);
        assert_eq!(achievement.title, TITLE);
        assert_eq!(achievement.description, "DESCRIPTION");
        assert_eq!(achievement.icon, ICON);

        assert_eq!(achievement.time, 1000000000);
    }

    #[test]
    #[should_panic(expected: ('Achievement: invalid id',))]
    fn test_achievement_creation_new_invalid_identifier() {
        AchievementCreationTrait::new(
            0, QUEST, HIDDEN, POINTS, TOTAL, TITLE, "DESCRIPTION", ICON, 1000000000
        );
    }

    #[test]
    #[should_panic(expected: ('Achievement: invalid id',))]
    fn test_achievement_creation_new_invalid_quest() {
        AchievementCreationTrait::new(
            IDENTIFIER, 0, HIDDEN, POINTS, TOTAL, TITLE, "DESCRIPTION", ICON, 1000000000
        );
    }

    #[test]
    #[should_panic(expected: ('Achievement: invalid title',))]
    fn test_achievement_creation_new_invalid_title() {
        AchievementCreationTrait::new(
            IDENTIFIER, QUEST, HIDDEN, POINTS, TOTAL, 0, "DESCRIPTION", ICON, 1000000000
        );
    }

    #[test]
    #[should_panic(expected: ('Achievement: invalid desc.',))]
    fn test_achievement_creation_new_invalid_description() {
        AchievementCreationTrait::new(
            IDENTIFIER, QUEST, HIDDEN, POINTS, TOTAL, TITLE, "", ICON, 1000000000
        );
    }
}

