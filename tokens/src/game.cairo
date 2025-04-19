#[starknet::contract]
mod Game {
    use openzeppelin_upgrades::UpgradeableComponent;
    use openzeppelin_upgrades::interface::IUpgradeable;
    use openzeppelin_access::ownable::OwnableComponent;
    use openzeppelin_introspection::src5::SRC5Component;
    use openzeppelin_token::erc721::{ERC721Component, ERC721HooksEmptyImpl};
    use tokens::components::mintable::mintable::MintableComponent;
    use tokens::components::erc4906::erc4906::ERC4906Component;
    use tokens::components::erc7572::erc7572::ERC7572Component;
    use tokens::components::metadata::metadata::MetadataComponent;
    use tokens::types::contract_metadata::ContractMetadata;
    use tokens::types::token_metadata::TokenMetadata;
    use tokens::interface::CollectionTrait;

    component!(path: UpgradeableComponent, storage: upgradeable, event: UpgradeableEvent);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: MintableComponent, storage: mintable, event: MintableEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: ERC4906Component, storage: erc4906, event: ERC4906Event);
    component!(path: ERC7572Component, storage: erc7572, event: ERC7572Event);
    component!(path: MetadataComponent, storage: metadata, event: MetadataEvent);

    impl UpgradeableInternalImpl = UpgradeableComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableTwoStepMixinImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl MintableImpl = MintableComponent::MintableImpl<ContractState>;
    impl MintableInternalImpl = MintableComponent::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;
    impl SRC5InternalImpl = SRC5Component::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721CamelOnlyImpl = ERC721Component::ERC721CamelOnlyImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    impl ERC4906InternalImpl = ERC4906Component::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl ERC7572Impl = ERC7572Component::ERC7572Impl<ContractState>;
    impl ERC7572InternalImpl = ERC7572Component::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl MetadataImpl = MetadataComponent::MetadataImpl<ContractState>;
    impl MetadataInternalImpl = MetadataComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        upgradeable: UpgradeableComponent::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        #[substorage(v0)]
        mintable: MintableComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        erc7572: ERC7572Component::Storage,
        #[substorage(v0)]
        erc4906: ERC4906Component::Storage,
        #[substorage(v0)]
        metadata: MetadataComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        UpgradeableEvent: UpgradeableComponent::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        #[flat]
        MintableEvent: MintableComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        ERC7572Event: ERC7572Component::Event,
        #[flat]
        ERC4906Event: ERC4906Component::Event,
        #[flat]
        MetadataEvent: MetadataComponent::Event,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        minter: starknet::ContractAddress,
        owner: starknet::ContractAddress,
    ) {
        self.ownable.initializer(owner);
        self.mintable.initializer(minter);
        self.erc721.initializer(Default::default(), Default::default(), Default::default());
        self.metadata.initializer("Arcade Game", "GAME");
        self.erc4906.initializer();
        self.erc7572.initializer();
    }

    #[abi(embed_v0)]
    impl UpgradeableImpl of IUpgradeable<ContractState> {
        /// Upgrades the contract class hash to `new_class_hash`.
        /// This may only be called by the contract owner.
        fn upgrade(ref self: ContractState, new_class_hash: starknet::ClassHash) {
            self.ownable.assert_only_owner();
            self.upgradeable.upgrade(new_class_hash);
        }
    }

    #[abi(embed_v0)]
    pub impl GameImpl of CollectionTrait<ContractState> {
        fn mint(
            ref self: ContractState,
            to: starknet::ContractAddress,
            token_id: u256,
            metadata: TokenMetadata,
        ) {
            // [Checks] Only minter can mint
            self.mintable.assert_only_minter();
            // [Effect] Mint token
            self.erc721.mint(to, token_id);
            // [Effect] Set token metadata
            self.metadata.set_token_metadata(token_id, metadata);
        }

        fn burn(ref self: ContractState, token_id: u256) {
            // [Check] Only token owner
            self.assert_token_owner(token_id);
            // [Effect] Burn token
            self.erc721.burn(token_id);
            // [Effect] Reset token metadata
            self.metadata.reset_token_metadata(token_id);
        }

        fn set_contract_metadata(ref self: ContractState, metadata: ContractMetadata) {
            // [Checks] Only owner can set contract metadata
            self.ownable.assert_only_owner();
            // [Effect] Set contract metadata
            self.erc7572.set_contract_metadata(metadata);
        }

        fn set_token_metadata(ref self: ContractState, token_id: u256, metadata: TokenMetadata) {
            // [Checks] Only token authorized
            self.assert_token_authorized(token_id);
            // [Effect] Set token metadata
            self.metadata.set_token_metadata(token_id, metadata);
        }
    }

    #[generate_trait]
    pub impl InternalImpl of InternalTrait {
        fn assert_token_owner(ref self: ContractState, token_id: u256) {
            // [Checks] Token must be owned by the caller
            let owner = self.erc721._require_owned(token_id);
            let spender = starknet::get_caller_address();
            assert(owner == spender, ERC721Component::Errors::UNAUTHORIZED);
        }

        fn assert_token_authorized(ref self: ContractState, token_id: u256) {
            // [Checks] Token must be owned or authorized by the caller
            let owner = self.erc721.owner_of(token_id);
            let spender = starknet::get_caller_address();
            self.erc721._check_authorized(owner, spender, token_id);
        }
    }
}
