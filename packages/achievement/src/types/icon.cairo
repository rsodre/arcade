// Types

#[derive(Copy, Drop)]
pub enum AchievementIcon {
    None,
    Khanda,
    Dice,
    Bolt,
    Skull,
}

impl IntoAchievementIconFelt252 of core::Into<AchievementIcon, felt252> {
    #[inline]
    fn into(self: AchievementIcon) -> felt252 {
        match self {
            AchievementIcon::None => 0,
            AchievementIcon::Khanda => 'KHANDA',
            AchievementIcon::Dice => 'DICE',
            AchievementIcon::Bolt => 'BOLT',
            AchievementIcon::Skull => 'SKULL',
        }
    }
}

