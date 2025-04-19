pub const IERC721_METADATA_ID: felt252 =
    0xabbcd595a567dce909050a1038e055daccb3c42af06f0add544fa90ee91f25;

#[starknet::interface]
pub trait IERC721Metadata<TState> {
    fn name(self: @TState) -> ByteArray;
    fn symbol(self: @TState) -> ByteArray;
    fn token_uri(self: @TState, token_id: u256) -> ByteArray;
}
