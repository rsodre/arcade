// Internal imports

use achievement::events::index::Task;

// Errors

pub mod errors {
    pub const TROPHY_INVALID_ID: felt252 = 'Task: invalid id';
    pub const TROPHY_INVALID_DESCRIPTION: felt252 = 'Task: invalid description';
    pub const TROPHY_INVALID_TOTAL: felt252 = 'Task: invalid total';
    pub const TROPHY_INVALID_PAGE: felt252 = 'Task: invalid page';
}

// Implementations

#[generate_trait]
impl TaskImpl of TaskTrait {
    #[inline]
    fn new(id: felt252, page: u8, total: u32, description: ByteArray,) -> Task {
        // [Check] Inputs
        TaskAssert::assert_valid_id(id);
        TaskAssert::assert_valid_page(page);
        TaskAssert::assert_valid_total(total);
        TaskAssert::assert_valid_description(@description);
        // [Return] Task
        Task { id, page, total, description }
    }
}

#[generate_trait]
impl TaskAssert of AssertTrait {
    #[inline]
    fn assert_valid_id(id: felt252) {
        assert(id != 0, errors::TROPHY_INVALID_ID);
    }

    #[inline]
    fn assert_valid_page(page: u8) {
        assert(page > 0, errors::TROPHY_INVALID_PAGE);
    }

    #[inline]
    fn assert_valid_total(total: u32) {
        assert(total > 0, errors::TROPHY_INVALID_TOTAL);
    }

    #[inline]
    fn assert_valid_description(description: @ByteArray) {
        assert(description.len() > 0, errors::TROPHY_INVALID_DESCRIPTION);
    }
}

#[cfg(test)]
mod tests {
    // Local imports

    use super::{TaskTrait, Task};

    // Constants

    const ID: felt252 = 'TROPHY';
    const PAGE: u8 = 1;
    const TOTAL: u32 = 100;

    #[test]
    fn test_achievement_creation_new() {
        let achievement = TaskTrait::new(ID, PAGE, TOTAL, "DESCRIPTION");
        assert_eq!(achievement.id, ID);
        assert_eq!(achievement.page, PAGE);
        assert_eq!(achievement.total, TOTAL);
        assert_eq!(achievement.description, "DESCRIPTION");
    }

    #[test]
    #[should_panic(expected: ('Task: invalid id',))]
    fn test_achievement_creation_new_invalid_id() {
        TaskTrait::new(0, PAGE, TOTAL, "DESCRIPTION");
    }

    #[test]
    #[should_panic(expected: ('Task: invalid page',))]
    fn test_achievement_creation_new_invalid_page() {
        TaskTrait::new(ID, 0, TOTAL, "DESCRIPTION");
    }

    #[test]
    #[should_panic(expected: ('Task: invalid total',))]
    fn test_achievement_creation_new_invalid_total() {
        TaskTrait::new(ID, PAGE, 0, "DESCRIPTION");
    }

    #[test]
    #[should_panic(expected: ('Task: invalid description',))]
    fn test_achievement_creation_new_invalid_description() {
        TaskTrait::new(ID, PAGE, TOTAL, "");
    }
}

