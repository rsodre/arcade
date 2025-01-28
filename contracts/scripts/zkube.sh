# Register game

starkli invoke \
    --rpc https://api.cartridge.gg/x/starknet/mainnet \
    --account ./account_mainnet.json \
    --keystore ./keystore_mainnet.json \
    0xc46f7e578f31c3fa6bb669164f04d696427818ba69f177ddc152f31ed5f119 register_game \
        0x030d5d5c610dd736faea146b20b850af64e34ca6e5c5a66462f76f32f48dd997 \
        str:"zkube" \
        str:"zkube-mainnet" \
        str:"zkube" \
        str:"#5bc3e6" \
        0 str:"zKube" 0x5 \
        0 str:"Reversed tetris fully onchain." 0x1e \
        2 str:"https://github.com/cartridge-gg" str:"/presets/blob/main/configs/zkub" str:"e/icon.png?raw=true" 0x13 \
        2 str:"https://github.com/cartridge-gg" str:"/presets/blob/main/configs/zkub" str:"e/cover.png?raw=true" 0x14 \
        0 str:"https://discord.gg/CEXUEJF3" 0x1b \
        0 0 0 \
        0 str:"https://x.com/zKorp_" 0x14 \
        0 0 0 \
        0 str:"https://app.zkube.xyz/" 0x16
