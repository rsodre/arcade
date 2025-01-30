# Register game

starkli invoke \
    --rpc https://api.cartridge.gg/x/starknet/mainnet \
    --account ./account_mainnet.json \
    --keystore ./keystore_mainnet.json \
    0xc46f7e578f31c3fa6bb669164f04d696427818ba69f177ddc152f31ed5f119 update_game \
        0x6a9e4c6f0799160ea8ddc43ff982a5f83d7f633e9732ce42701de1288ff705f \
        str:"s0_eternum" \
        str:"eternum-prod" \
        str:"eternum" \
        str:"#dc8b07" \
        0 str:"Eternum" 0x7 \
        0 str:"Rule the Hex." 0xd \
        2 str:"https://github.com/cartridge-gg" str:"/presets/blob/main/configs/eter" str:"num/icon.gif?raw=true" 0x15 \
        2 str:"https://github.com/cartridge-gg" str:"/presets/blob/main/configs/eter" str:"num/cover.png?raw=true" 0x16 \
        0 str:"https://discord.gg/CEXUEJF3" 0x1b \
        0 0 0 \
        0 str:"https://x.com/RealmsEternum" 0x1b \
        0 0 0 \
        0 str:"https://eternum.realms.world/" 0x1d
