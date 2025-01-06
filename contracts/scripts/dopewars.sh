# Register game

starkli invoke \
    --rpc https://api.cartridge.gg/x/arcade/katana \
    --account ./account.json \
    --keystore ./keystore.json \
    0x574699971f23a9d40eb5ce9b078854386f0db3b46988d90ff7a1fd18ee15e93 register_game \
        0x4f3dccb47477c087ad9c76b8067b8aadded57f8df7f2d7543e6066bcb25332c \
        str:"dopewars" \
        str:"ryomainnet" \
        1 1 1 1 1 1 1 1 1 1

# Publish game

starkli invoke \
    --rpc https://api.cartridge.gg/x/arcade/katana \
    --account ./account.json \
    --keystore ./keystore.json \
    0x574699971f23a9d40eb5ce9b078854386f0db3b46988d90ff7a1fd18ee15e93 publish_game \
        0x4f3dccb47477c087ad9c76b8067b8aadded57f8df7f2d7543e6066bcb25332c \
        str:"dopewars"

# Whitelist game

starkli invoke \
    --rpc https://api.cartridge.gg/x/arcade/katana \
    --account ./account.json \
    --keystore ./keystore.json \
    0x574699971f23a9d40eb5ce9b078854386f0db3b46988d90ff7a1fd18ee15e93 whitelist_game \
        0x4f3dccb47477c087ad9c76b8067b8aadded57f8df7f2d7543e6066bcb25332c \
        str:"dopewars"

