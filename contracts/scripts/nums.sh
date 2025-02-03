# Register game

starkli invoke \
    --rpc https://api.cartridge.gg/x/starknet/mainnet \
    --account ./account_mainnet.json \
    --keystore ./keystore_mainnet.json \
    0xc46f7e578f31c3fa6bb669164f04d696427818ba69f177ddc152f31ed5f119 register_game \
        0x05f2358c005acf2a63616a32b76a01d632463b84609954ff846998f898a49778 \
        str:"nums" \
        str:"balnums" \
        str:"nums" \
        str:"#11ED83" \
        0 str:"Nums" 0x4 \
        3 str:"Dope Wars is an onchain adaptat" str:"ion of the classic arbitrage ga" str:"me Drug Wars, built by Cartridg" str:"e in partnership with Dope DAO." 0x1f \
        2 str:"https://github.com/cartridge-gg" str:"/presets/blob/main/configs/dope" str:"-wars/icon.png?raw=true" 0x17 \
        2 str:"https://github.com/cartridge-gg" str:"/presets/blob/main/configs/dope" str:"-wars/cover.png?raw=true" 0x18 \
        0 str:"https://discord.gg/dopewars" 0x1b \
        0 0 0 \
        0 str:"https://x.com/TheDopeWars" 0x19 \
        0 0 0 \
        0 str:"https://dopewars.game/" 0x16

