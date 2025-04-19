#[starknet::component]
pub mod MetadataComponent {
    use core::starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use core::starknet::storage::{Map, StorageMapReadAccess, StorageMapWriteAccess};
    use openzeppelin_introspection::src5::{
        SRC5Component, SRC5Component::InternalImpl as SRC5InternalImpl,
    };
    use tokens::components::erc4906::erc4906::{
        ERC4906Component, ERC4906Component::InternalImpl as ERC4906InternalImpl,
    };
    use tokens::components::metadata::interface::{IERC721_METADATA_ID, IERC721Metadata};
    use tokens::types::token_metadata::{TokenMetadata, TokenMetadataTrait};

    #[storage]
    pub struct Storage {
        metadata_name: ByteArray,
        metadata_symbol: ByteArray,
        metadata_token_uri: Map<u256, ByteArray>,
    }

    #[embeddable_as(MetadataImpl)]
    impl Metadata<
        TContractState,
        +HasComponent<TContractState>,
        +Drop<TContractState>,
        impl SRC5: SRC5Component::HasComponent<TContractState>,
    > of IERC721Metadata<ComponentState<TContractState>> {
        fn name(self: @ComponentState<TContractState>) -> ByteArray {
            self.metadata_name.read()
        }

        fn symbol(self: @ComponentState<TContractState>) -> ByteArray {
            self.metadata_symbol.read()
        }

        fn token_uri(self: @ComponentState<TContractState>, token_id: u256) -> ByteArray {
            self.metadata_token_uri.read(token_id)
        }
    }

    #[generate_trait]
    pub impl InternalImpl<
        TContractState,
        +HasComponent<TContractState>,
        +Drop<TContractState>,
        impl SRC5: SRC5Component::HasComponent<TContractState>,
        impl ERC4906: ERC4906Component::HasComponent<TContractState>,
    > of InternalTrait<TContractState> {
        fn initializer(
            ref self: ComponentState<TContractState>, name: ByteArray, symbol: ByteArray,
        ) {
            // [Effect] Initialize SRC5
            let mut src5 = get_dep_component_mut!(ref self, SRC5);
            src5.register_interface(IERC721_METADATA_ID);
            self.metadata_name.write(name);
            self.metadata_symbol.write(symbol);
        }

        fn set_token_metadata(
            ref self: ComponentState<TContractState>, token_id: u256, metadata: TokenMetadata,
        ) {
            // [Effect] Set the token metadata
            self.set_metadata_token_uri(token_id, metadata.jsonify());
        }

        fn reset_token_metadata(ref self: ComponentState<TContractState>, token_id: u256) {
            // [Effect] Reset the token metadata
            self.metadata_token_uri.write(token_id, Default::default());
        }

        fn set_metadata_token_uri(
            ref self: ComponentState<TContractState>, token_id: u256, uri: ByteArray,
        ) {
            // [Effect] Set the token URI
            self.metadata_token_uri.write(token_id, uri);
            // [Event] Token metadata updated event
            let mut erc4906 = get_dep_component_mut!(ref self, ERC4906);
            erc4906.update_metadata(token_id);
        }
    }
}
