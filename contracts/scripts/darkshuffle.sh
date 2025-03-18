# Register game

starkli invoke \
    --rpc https://api.cartridge.gg/x/starknet/mainnet \
    --account ./account_mainnet.json \
    --keystore ./keystore_mainnet.json \
    0xc46f7e578f31c3fa6bb669164f04d696427818ba69f177ddc152f31ed5f119 register_game \
        0x6a9e4c6f0799160ea8ddc43ff982a5f83d7f633e9732ce42701de1288ff705f \
        str:"ds_v1_1_4" \
        str:"darkshuffle-mainnet" \
        str:"dark-shuffle" \
        str:"#F59100" \
        0 str:"Dark Shuffle" 0xc \
        2 str:"A Provable Roguelike Deck-building Game on Starknet, powered by LORDS." 0x8 \
        2 str:"https://github.com/cartridge-gg/presets/blob/main/configs/dark-shuffle/icon.svg?raw=true" 0x1a \
        2 str:"https://github.com/cartridge-gg/presets/blob/main/configs/dark-shuffle/cover.png?raw=true" 0x1b \
        0 str:"https://discord.gg/CEXUEJF3" 0x1b \
        0 0 0 \
        0 str:"https://x.com/await_0x" 0x16 \
        0 0 0 \
        0 str:"https://darkshuffle.dev/" 0x18