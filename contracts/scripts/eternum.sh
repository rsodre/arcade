# Register game

starkli invoke \
    --rpc https://api.cartridge.gg/x/arcade/katana \
    --account ./account.json \
    --keystore ./keystore.json \
    0x574699971f23a9d40eb5ce9b078854386f0db3b46988d90ff7a1fd18ee15e93 register_game \
        0x6a9e4c6f0799160ea8ddc43ff982a5f83d7f633e9732ce42701de1288ff705f \
        str:"s0_eternum" \
        str:"eternum-prod" \
        1 1 1 1 1 1 1 1 1 1

# Publish game

starkli invoke \
    --rpc https://api.cartridge.gg/x/arcade/katana \
    --account ./account.json \
    --keystore ./keystore.json \
    0x574699971f23a9d40eb5ce9b078854386f0db3b46988d90ff7a1fd18ee15e93 publish_game \
        0x6a9e4c6f0799160ea8ddc43ff982a5f83d7f633e9732ce42701de1288ff705f \
        str:"s0_eternum"

# Whitelist game

starkli invoke \
    --rpc https://api.cartridge.gg/x/arcade/katana \
    --account ./account.json \
    --keystore ./keystore.json \
    0x574699971f23a9d40eb5ce9b078854386f0db3b46988d90ff7a1fd18ee15e93 whitelist_game \
        0x6a9e4c6f0799160ea8ddc43ff982a5f83d7f633e9732ce42701de1288ff705f \
        str:"s0_eternum"

