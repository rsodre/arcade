// Internal imports

use arcade::systems::starterpack::{
    IAdministrationDispatcher, IAdministrationDispatcherTrait, IStarterpackRegistryDispatcherTrait,
};
use arcade::tests::setup::setup::{OWNER, PLAYER, spawn};
use models::rbac::types::role::Role;
use starknet::testing;
use starterpack::types::item::ItemTrait;
use starterpack::types::metadata::MetadataTrait;

// Constants

const VOUCHER_KEY: felt252 = 'VOUCHER_KEY';

pub fn METADATA() -> ByteArray {
    MetadataTrait::new(
        name: "Test Pack",
        description: "Test",
        image_uri: "https://example.com/image.png",
        items: [
            ItemTrait::new(
                name: "Starter Item",
                description: "A basic starter item",
                image_uri: "https://example.com/item.png",
            ),
        ]
            .span(),
        tokens: array![].span(),
        conditions: array![].span(),
    )
        .jsonify()
}

// Tests

#[test]
fn test_allow() {
    // [Setup]
    let (_world, systems, context) = spawn();

    // [Initialize]
    testing::set_contract_address(OWNER());
    testing::set_block_timestamp(1);

    // [Register] Conditional starterpack
    testing::set_contract_address(context.creator);
    let starterpack_id = systems
        .starterpack
        .register(
            implementation: 0x1234.try_into().unwrap(),
            referral_percentage: 0,
            reissuable: false,
            price: 0,
            payment_token: 0.try_into().unwrap(),
            payment_receiver: Option::None,
            metadata: METADATA(),
            conditional: true,
        );

    // [Grant] Admin role to ADMIN
    testing::set_contract_address(OWNER());
    let admin = IAdministrationDispatcher {
        contract_address: systems.starterpack.contract_address,
    };
    admin.grant_role(context.admin, Role::Admin.into());

    // [Allow] Should not panic because ADMIN has admin role
    testing::set_contract_address(context.admin);
    systems
        .starterpack
        .allow(recipient: PLAYER(), starterpack_id: starterpack_id, voucher_key: VOUCHER_KEY);
}

#[test]
#[should_panic(expected: ('Moderator: not allowed', 'ENTRYPOINT_FAILED'))]
fn test_allow_not_admin() {
    // [Setup]
    let (_world, systems, context) = spawn();

    // [Initialize]
    testing::set_contract_address(OWNER());
    testing::set_block_timestamp(1);

    // [Register] Conditional starterpack
    testing::set_contract_address(context.creator);
    let starterpack_id = systems
        .starterpack
        .register(
            implementation: 0x1234.try_into().unwrap(),
            referral_percentage: 0,
            reissuable: false,
            price: 0,
            payment_token: 0.try_into().unwrap(),
            payment_receiver: Option::None,
            metadata: METADATA(),
            conditional: true,
        );

    // [Allow] Should panic because PLAYER does not have admin role
    testing::set_contract_address(PLAYER());
    systems
        .starterpack
        .allow(recipient: PLAYER(), starterpack_id: starterpack_id, voucher_key: VOUCHER_KEY);
}
