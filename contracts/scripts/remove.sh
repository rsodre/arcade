# Register game

starkli invoke \
    --rpc https://api.cartridge.gg/x/starknet/mainnet \
    --account ./account_mainnet.json \
    --keystore ./keystore_mainnet.json \
    0xc46f7e578f31c3fa6bb669164f04d696427818ba69f177ddc152f31ed5f119 remove_game \
        0x030d5d5c610dd736faea146b20b850af64e34ca6e5c5a66462f76f32f48dd997 \
        str:"zkube"
