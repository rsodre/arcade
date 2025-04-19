use tokens::types::contract_metadata::ContractMetadata;
use tokens::types::token_metadata::TokenMetadata;

#[starknet::interface]
pub trait CollectionTrait<TContractState> {
    fn mint(
        ref self: TContractState,
        to: starknet::ContractAddress,
        token_id: u256,
        metadata: TokenMetadata,
    );
    fn burn(ref self: TContractState, token_id: u256);
    fn set_contract_metadata(ref self: TContractState, metadata: ContractMetadata);
    fn set_token_metadata(ref self: TContractState, token_id: u256, metadata: TokenMetadata);
}
