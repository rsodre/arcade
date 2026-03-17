// Internal imports

use crate::models::index::Voucher;

// Errors

pub mod errors {
    pub const VOUCHER_INVALID_KEY: felt252 = 'Voucher: invalid key';
    pub const VOUCHER_INVALID_RECIPIENT: felt252 = 'Voucher: invalid recipient';
    pub const VOUCHER_ALREADY_CLAIMED: felt252 = 'Voucher: already claimed';
    pub const VOUCHER_NOT_RECIPIENT: felt252 = 'Voucher: not recipient';
}

// Traits

#[generate_trait]
pub impl VoucherImpl of VoucherTrait {
    fn allow(ref self: Voucher, recipient: starknet::ContractAddress) {
        self.recipient = recipient;
    }

    fn claim(ref self: Voucher, time: u64) {
        self.claimed_at = time;
    }
}

// Asserts

#[generate_trait]
pub impl VoucherAssert of VoucherAssertTrait {
    fn assert_valid_key(voucher_key: felt252) {
        assert(voucher_key != 0, errors::VOUCHER_INVALID_KEY);
    }

    fn assert_valid_recipient(recipient: starknet::ContractAddress) {
        assert(recipient != 0.try_into().unwrap(), errors::VOUCHER_INVALID_RECIPIENT);
    }

    fn assert_not_claimed(self: @Voucher) {
        assert(*self.claimed_at == 0, errors::VOUCHER_ALREADY_CLAIMED);
    }

    fn assert_is_recipient(self: @Voucher, address: starknet::ContractAddress) {
        assert(*self.recipient == address, errors::VOUCHER_NOT_RECIPIENT);
    }
}
