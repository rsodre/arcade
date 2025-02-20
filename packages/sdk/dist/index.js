"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AchievementModel: () => AchievementModel,
  AllianceModel: () => AllianceModel,
  ArcadeProvider: () => ArcadeProvider,
  DojoEmitterProvider: () => DojoEmitterProvider,
  FollowEvent: () => FollowEvent,
  GameModel: () => GameModel,
  GuildModel: () => GuildModel,
  MemberModel: () => MemberModel,
  Metadata: () => Metadata,
  ModelsMapping: () => ModelsMapping,
  NAMESPACE: () => NAMESPACE,
  Network: () => Network,
  PinEvent: () => PinEvent,
  Registry: () => Registry2,
  Social: () => Social2,
  Socials: () => Socials,
  TransactionType: () => TransactionType,
  getRegistryPolicies: () => getRegistryPolicies,
  getSocialPolicies: () => getSocialPolicies,
  initSDK: () => initSDK,
  manifests: () => manifests,
  schema: () => schema,
  sepolia: () => manifest_sepolia_default,
  setupWorld: () => setupWorld,
  slot: () => manifest_slot_default
});
module.exports = __toCommonJS(index_exports);

// src/constants/index.ts
var NAMESPACE = "ARCADE";

// src/provider/index.ts
var import_core2 = require("@dojoengine/core");
var torii = __toESM(require("@dojoengine/torii-client"));
var import_eventemitter3 = __toESM(require("eventemitter3"));

// src/provider/types.ts
var TransactionType = /* @__PURE__ */ ((TransactionType2) => {
  TransactionType2["FOLLOW"] = "follow";
  TransactionType2["UNFOLLOW"] = "unfollow";
  TransactionType2["CREATE_ALLIANCE"] = "create_alliance";
  TransactionType2["OPEN_ALLIANCE"] = "open_alliance";
  TransactionType2["CLOSE_ALLIANCE"] = "close_alliance";
  TransactionType2["CROWN_GUILD"] = "crown_guild";
  TransactionType2["HIRE_GUILD"] = "hire_guild";
  TransactionType2["FIRE_GUILD"] = "fire_guild";
  TransactionType2["REQUEST_ALLIANCE"] = "request_alliance";
  TransactionType2["CANCEL_ALLIANCE"] = "cancel_alliance";
  TransactionType2["LEAVE_ALLIANCE"] = "leave_alliance";
  TransactionType2["CREATE_GUILD"] = "create_guild";
  TransactionType2["OPEN_GUILD"] = "open_guild";
  TransactionType2["CLOSE_GUILD"] = "close_guild";
  TransactionType2["CROWN_MEMBER"] = "crown_member";
  TransactionType2["PROMOTE_MEMBER"] = "promote_member";
  TransactionType2["DEMOTE_MEMBER"] = "demote_member";
  TransactionType2["HIRE_MEMBER"] = "hire_member";
  TransactionType2["FIRE_MEMBER"] = "fire_member";
  TransactionType2["REQUEST_GUILD"] = "request_guild";
  TransactionType2["CANCEL_GUILD"] = "cancel_guild";
  TransactionType2["LEAVE_GUILD"] = "leave_guild";
  TransactionType2["PIN"] = "pin";
  TransactionType2["UNPIN"] = "unpin";
  TransactionType2["REGISTER_GAME"] = "register_game";
  TransactionType2["UPDATE_GAME"] = "update_game";
  TransactionType2["PUBLISH_GAME"] = "publish_game";
  TransactionType2["HIDE_GAME"] = "hide_game";
  TransactionType2["WHITELIST_GAME"] = "whitelist_game";
  TransactionType2["BLACKLIST_GAME"] = "blacklist_game";
  TransactionType2["REMOVE_GAME"] = "remove_game";
  TransactionType2["REGISTER_ACHIEVEMENT"] = "register_achievement";
  TransactionType2["UPDATE_ACHIEVEMENT"] = "update_achievement";
  TransactionType2["PUBLISH_ACHIEVEMENT"] = "publish_achievement";
  TransactionType2["HIDE_ACHIEVEMENT"] = "hide_achievement";
  TransactionType2["WHITELIST_ACHIEVEMENT"] = "whitelist_achievement";
  TransactionType2["BLACKLIST_ACHIEVEMENT"] = "blacklist_achievement";
  TransactionType2["REMOVE_ACHIEVEMENT"] = "remove_achievement";
  TransactionType2["DEPLOY"] = "deploy";
  TransactionType2["REMOVE"] = "remove";
  TransactionType2["HIRE"] = "hire";
  TransactionType2["FIRE"] = "fire";
  return TransactionType2;
})(TransactionType || {});

// src/provider/helpers.ts
var getContractByName = (manifest, name) => {
  const contract = manifest.contracts.find((contract2) => contract2.tag === name);
  if (!contract) {
    throw new Error(`Contract ${name} not found in manifest`);
  }
  return contract.address;
};

// src/provider/social.ts
var Social = class {
  manifest;
  name;
  constructor(manifest) {
    this.manifest = manifest;
    this.name = `${NAMESPACE}-Social`;
  }
  pin(props) {
    const { achievementId } = props;
    const entrypoint = "pin";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [achievementId]
    };
  }
  unpin(props) {
    const { achievementId } = props;
    const entrypoint = "unpin";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [achievementId]
    };
  }
  follow(props) {
    const { target } = props;
    const entrypoint = "follow";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [target]
    };
  }
  unfollow(props) {
    const { target } = props;
    const entrypoint = "unfollow";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [target]
    };
  }
  create_alliance(props) {
    const { color, name, description, image, banner, discord, telegram, twitter, youtube } = props;
    const entrypoint = "create_alliance";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [color, name, description, image, banner, discord, telegram, twitter, youtube]
    };
  }
  open_alliance(props) {
    const { free } = props;
    const entrypoint = "open_alliance";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [free]
    };
  }
  close_alliance() {
    const entrypoint = "close_alliance";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: []
    };
  }
  crown_guild(props) {
    const { guildId } = props;
    const entrypoint = "crown_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [guildId]
    };
  }
  hire_guild(props) {
    const { guildId } = props;
    const entrypoint = "hire_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [guildId]
    };
  }
  fire_guild(props) {
    const { guildId } = props;
    const entrypoint = "fire_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [guildId]
    };
  }
  request_alliance(props) {
    const { allianceId } = props;
    const entrypoint = "request_alliance";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [allianceId]
    };
  }
  cancel_alliance() {
    const entrypoint = "cancel_alliance";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: []
    };
  }
  leave_alliance() {
    const entrypoint = "leave_alliance";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: []
    };
  }
  create_guild(props) {
    const { color, name, description, image, banner, discord, telegram, twitter, youtube } = props;
    const entrypoint = "create_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [color, name, description, image, banner, discord, telegram, twitter, youtube]
    };
  }
  open_guild(props) {
    const { free } = props;
    const entrypoint = "open_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [free]
    };
  }
  close_guild() {
    const entrypoint = "close_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: []
    };
  }
  crown_member(props) {
    const { memberId } = props;
    const entrypoint = "crown_member";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [memberId]
    };
  }
  promote_member(props) {
    const { memberId } = props;
    const entrypoint = "promote_member";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [memberId]
    };
  }
  demote_member(props) {
    const { memberId } = props;
    const entrypoint = "demote_member";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [memberId]
    };
  }
  hire_member(props) {
    const { memberId } = props;
    const entrypoint = "hire_member";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [memberId]
    };
  }
  fire_member(props) {
    const { memberId } = props;
    const entrypoint = "fire_member";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [memberId]
    };
  }
  request_guild(props) {
    const { guildId } = props;
    const entrypoint = "request_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [guildId]
    };
  }
  cancel_guild() {
    const entrypoint = "cancel_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: []
    };
  }
  leave_guild() {
    const entrypoint = "leave_guild";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: []
    };
  }
};

// src/provider/registry.ts
var Registry = class {
  manifest;
  name;
  constructor(manifest) {
    this.manifest = manifest;
    this.name = `${NAMESPACE}-Registry`;
  }
  register_game(props) {
    const {
      worldAddress,
      namespace,
      project,
      color,
      name,
      description,
      image,
      banner,
      discord,
      telegram,
      twitter,
      youtube,
      website
    } = props;
    const entrypoint = "register_game";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [
        worldAddress,
        namespace,
        project,
        color,
        name,
        description,
        image,
        banner,
        discord,
        telegram,
        twitter,
        youtube,
        website
      ]
    };
  }
  update_game(props) {
    const {
      worldAddress,
      namespace,
      color,
      name,
      description,
      image,
      banner,
      discord,
      telegram,
      twitter,
      youtube,
      website
    } = props;
    const entrypoint = "update_game";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [
        worldAddress,
        namespace,
        color,
        name,
        description,
        image,
        banner,
        discord,
        telegram,
        twitter,
        youtube,
        website
      ]
    };
  }
  publish_game(props) {
    const { worldAddress, namespace } = props;
    const entrypoint = "publish_game";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [worldAddress, namespace]
    };
  }
  hide_game(props) {
    const { worldAddress, namespace } = props;
    const entrypoint = "hide_game";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [worldAddress, namespace]
    };
  }
  whitelist_game(props) {
    const { worldAddress, namespace } = props;
    const entrypoint = "whitelist_game";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [worldAddress, namespace]
    };
  }
  blacklist_game(props) {
    const { worldAddress, namespace } = props;
    const entrypoint = "blacklist_game";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [worldAddress, namespace]
    };
  }
  remove_game(props) {
    const { worldAddress, namespace } = props;
    const entrypoint = "remove_game";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [worldAddress, namespace]
    };
  }
  register_achievement(props) {
    const { worldAddress, namespace, identifier, karma } = props;
    const entrypoint = "register_achievement";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [worldAddress, namespace, identifier, karma]
    };
  }
  update_achievement(props) {
    const { worldAddress, namespace, identifier, karma } = props;
    const entrypoint = "update_achievement";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [worldAddress, namespace, identifier, karma]
    };
  }
  remove_achievement(props) {
    const { worldAddress, namespace, identifier } = props;
    const entrypoint = "remove_achievement";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [worldAddress, namespace, identifier]
    };
  }
};

// src/provider/slot.ts
var Slot = class {
  manifest;
  name;
  constructor(manifest) {
    this.manifest = manifest;
    this.name = `${NAMESPACE}-Slot`;
  }
  deploy(props) {
    const { service, project, tier } = props;
    const entrypoint = "deploy";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [service, project, tier]
    };
  }
  remove(props) {
    const { service, project } = props;
    const entrypoint = "remove";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [service, project]
    };
  }
  hire(props) {
    const { project, accountId, role } = props;
    const entrypoint = "hire";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [project, accountId, role]
    };
  }
  fire(props) {
    const { project, accountId } = props;
    const entrypoint = "fire";
    return {
      contractAddress: getContractByName(this.manifest, this.name),
      entrypoint,
      calldata: [project, accountId]
    };
  }
};

// src/configs/index.ts
var import_core = require("@dojoengine/core");

// ../../contracts/manifest_sepolia.json
var manifest_sepolia_default = {
  world: {
    class_hash: "0x45575a88cc5cef1e444c77ce60b7b4c9e73a01cbbe20926d5a4c72a94011410",
    address: "0x389e47f34690ea699218305cc28cc910028533d61d27773e1db20e0b78e7b65",
    seed: "Arcade",
    name: "Cartridge World",
    entrypoints: [
      "uuid",
      "set_metadata",
      "register_namespace",
      "register_event",
      "register_model",
      "register_contract",
      "init_contract",
      "upgrade_event",
      "upgrade_model",
      "upgrade_contract",
      "emit_event",
      "emit_events",
      "set_entity",
      "set_entities",
      "delete_entity",
      "delete_entities",
      "grant_owner",
      "revoke_owner",
      "grant_writer",
      "revoke_writer",
      "upgrade"
    ],
    abi: [
      {
        type: "impl",
        name: "World",
        interface_name: "dojo::world::iworld::IWorld"
      },
      {
        type: "struct",
        name: "core::byte_array::ByteArray",
        members: [
          {
            name: "data",
            type: "core::array::Array::<core::bytes_31::bytes31>"
          },
          {
            name: "pending_word",
            type: "core::felt252"
          },
          {
            name: "pending_word_len",
            type: "core::integer::u32"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::world::resource::Resource",
        variants: [
          {
            name: "Model",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Event",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Contract",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Namespace",
            type: "core::byte_array::ByteArray"
          },
          {
            name: "World",
            type: "()"
          },
          {
            name: "Unregistered",
            type: "()"
          }
        ]
      },
      {
        type: "struct",
        name: "dojo::model::metadata::ResourceMetadata",
        members: [
          {
            name: "resource_id",
            type: "core::felt252"
          },
          {
            name: "metadata_uri",
            type: "core::byte_array::ByteArray"
          },
          {
            name: "metadata_hash",
            type: "core::felt252"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::felt252>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::felt252>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::array::Span::<core::felt252>>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::array::Span::<core::felt252>>"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::model::definition::ModelIndex",
        variants: [
          {
            name: "Keys",
            type: "core::array::Span::<core::felt252>"
          },
          {
            name: "Id",
            type: "core::felt252"
          },
          {
            name: "MemberId",
            type: "(core::felt252, core::felt252)"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::integer::u8>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::integer::u8>"
          }
        ]
      },
      {
        type: "struct",
        name: "dojo::meta::layout::FieldLayout",
        members: [
          {
            name: "selector",
            type: "core::felt252"
          },
          {
            name: "layout",
            type: "dojo::meta::layout::Layout"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::meta::layout::FieldLayout>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::meta::layout::FieldLayout>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::meta::layout::Layout>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::meta::layout::Layout>"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::meta::layout::Layout",
        variants: [
          {
            name: "Fixed",
            type: "core::array::Span::<core::integer::u8>"
          },
          {
            name: "Struct",
            type: "core::array::Span::<dojo::meta::layout::FieldLayout>"
          },
          {
            name: "Tuple",
            type: "core::array::Span::<dojo::meta::layout::Layout>"
          },
          {
            name: "Array",
            type: "core::array::Span::<dojo::meta::layout::Layout>"
          },
          {
            name: "ByteArray",
            type: "()"
          },
          {
            name: "Enum",
            type: "core::array::Span::<dojo::meta::layout::FieldLayout>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::model::definition::ModelIndex>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::model::definition::ModelIndex>"
          }
        ]
      },
      {
        type: "enum",
        name: "core::bool",
        variants: [
          {
            name: "False",
            type: "()"
          },
          {
            name: "True",
            type: "()"
          }
        ]
      },
      {
        type: "interface",
        name: "dojo::world::iworld::IWorld",
        items: [
          {
            type: "function",
            name: "resource",
            inputs: [
              {
                name: "selector",
                type: "core::felt252"
              }
            ],
            outputs: [
              {
                type: "dojo::world::resource::Resource"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "uuid",
            inputs: [],
            outputs: [
              {
                type: "core::integer::u32"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "metadata",
            inputs: [
              {
                name: "resource_selector",
                type: "core::felt252"
              }
            ],
            outputs: [
              {
                type: "dojo::model::metadata::ResourceMetadata"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "set_metadata",
            inputs: [
              {
                name: "metadata",
                type: "dojo::model::metadata::ResourceMetadata"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_namespace",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_event",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_model",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_contract",
            inputs: [
              {
                name: "salt",
                type: "core::felt252"
              },
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [
              {
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "init_contract",
            inputs: [
              {
                name: "selector",
                type: "core::felt252"
              },
              {
                name: "init_calldata",
                type: "core::array::Span::<core::felt252>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_event",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_model",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_contract",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [
              {
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "emit_event",
            inputs: [
              {
                name: "event_selector",
                type: "core::felt252"
              },
              {
                name: "keys",
                type: "core::array::Span::<core::felt252>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::felt252>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "emit_events",
            inputs: [
              {
                name: "event_selector",
                type: "core::felt252"
              },
              {
                name: "keys",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [
              {
                type: "core::array::Span::<core::felt252>"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [
              {
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "set_entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "values",
                type: "core::array::Span::<core::felt252>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "set_entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "delete_entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "delete_entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "is_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [
              {
                type: "core::bool"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "grant_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "revoke_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "is_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [
              {
                type: "core::bool"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "grant_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "revoke_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          }
        ]
      },
      {
        type: "impl",
        name: "UpgradeableWorld",
        interface_name: "dojo::world::iworld::IUpgradeableWorld"
      },
      {
        type: "interface",
        name: "dojo::world::iworld::IUpgradeableWorld",
        items: [
          {
            type: "function",
            name: "upgrade",
            inputs: [
              {
                name: "new_class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          }
        ]
      },
      {
        type: "constructor",
        name: "constructor",
        inputs: [
          {
            name: "world_class_hash",
            type: "core::starknet::class_hash::ClassHash"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WorldSpawned",
        kind: "struct",
        members: [
          {
            name: "creator",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WorldUpgraded",
        kind: "struct",
        members: [
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::NamespaceRegistered",
        kind: "struct",
        members: [
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "hash",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ModelRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "salt",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ModelUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "prev_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "prev_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractInitialized",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "init_calldata",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventEmitted",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "system_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "keys",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::MetadataUpdate",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "uri",
            type: "core::byte_array::ByteArray",
            kind: "data"
          },
          {
            name: "hash",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreSetRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "keys",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreUpdateRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreUpdateMember",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "member_selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreDelRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WriterUpdated",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "contract",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "value",
            type: "core::bool",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::OwnerUpdated",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "contract",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "value",
            type: "core::bool",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::Event",
        kind: "enum",
        variants: [
          {
            name: "WorldSpawned",
            type: "dojo::world::world_contract::world::WorldSpawned",
            kind: "nested"
          },
          {
            name: "WorldUpgraded",
            type: "dojo::world::world_contract::world::WorldUpgraded",
            kind: "nested"
          },
          {
            name: "NamespaceRegistered",
            type: "dojo::world::world_contract::world::NamespaceRegistered",
            kind: "nested"
          },
          {
            name: "ModelRegistered",
            type: "dojo::world::world_contract::world::ModelRegistered",
            kind: "nested"
          },
          {
            name: "EventRegistered",
            type: "dojo::world::world_contract::world::EventRegistered",
            kind: "nested"
          },
          {
            name: "ContractRegistered",
            type: "dojo::world::world_contract::world::ContractRegistered",
            kind: "nested"
          },
          {
            name: "ModelUpgraded",
            type: "dojo::world::world_contract::world::ModelUpgraded",
            kind: "nested"
          },
          {
            name: "EventUpgraded",
            type: "dojo::world::world_contract::world::EventUpgraded",
            kind: "nested"
          },
          {
            name: "ContractUpgraded",
            type: "dojo::world::world_contract::world::ContractUpgraded",
            kind: "nested"
          },
          {
            name: "ContractInitialized",
            type: "dojo::world::world_contract::world::ContractInitialized",
            kind: "nested"
          },
          {
            name: "EventEmitted",
            type: "dojo::world::world_contract::world::EventEmitted",
            kind: "nested"
          },
          {
            name: "MetadataUpdate",
            type: "dojo::world::world_contract::world::MetadataUpdate",
            kind: "nested"
          },
          {
            name: "StoreSetRecord",
            type: "dojo::world::world_contract::world::StoreSetRecord",
            kind: "nested"
          },
          {
            name: "StoreUpdateRecord",
            type: "dojo::world::world_contract::world::StoreUpdateRecord",
            kind: "nested"
          },
          {
            name: "StoreUpdateMember",
            type: "dojo::world::world_contract::world::StoreUpdateMember",
            kind: "nested"
          },
          {
            name: "StoreDelRecord",
            type: "dojo::world::world_contract::world::StoreDelRecord",
            kind: "nested"
          },
          {
            name: "WriterUpdated",
            type: "dojo::world::world_contract::world::WriterUpdated",
            kind: "nested"
          },
          {
            name: "OwnerUpdated",
            type: "dojo::world::world_contract::world::OwnerUpdated",
            kind: "nested"
          }
        ]
      }
    ]
  },
  contracts: [
    {
      address: "0xc46f7e578f31c3fa6bb669164f04d696427818ba69f177ddc152f31ed5f119",
      class_hash: "0x5e1763655cb615aa7e6296c0ee1350198266ccf335c191d7cc0cb3b2c203341",
      abi: [
        {
          type: "impl",
          name: "Registry__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Registry__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [
            {
              name: "owner",
              type: "core::felt252"
            }
          ],
          outputs: [],
          state_mutability: "external"
        },
        {
          type: "impl",
          name: "RegistryImpl",
          interface_name: "arcade::systems::registry::IRegistry"
        },
        {
          type: "interface",
          name: "arcade::systems::registry::IRegistry",
          items: [
            {
              type: "function",
              name: "register_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "preset",
                  type: "core::felt252"
                },
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "update_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "preset",
                  type: "core::felt252"
                },
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "publish_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hide_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "whitelist_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "blacklist_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "remove_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "register_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                },
                {
                  name: "karma",
                  type: "core::integer::u16"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "update_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                },
                {
                  name: "karma",
                  type: "core::integer::u16"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "publish_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hide_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "whitelist_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "blacklist_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "remove_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::initializable::InitializableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::registerable::RegisterableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::trackable::TrackableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::registry::Registry::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "InitializableEvent",
              type: "registry::components::initializable::InitializableComponent::Event",
              kind: "flat"
            },
            {
              name: "RegisterableEvent",
              type: "registry::components::registerable::RegisterableComponent::Event",
              kind: "flat"
            },
            {
              name: "TrackableEvent",
              type: "registry::components::trackable::TrackableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [
        "0x059b1a0c489b635d7c7f43594d187362ddd2dcea6c82db4eef2579fd185b3753"
      ],
      tag: "ARCADE-Registry",
      selector: "0x54d3bcd441104e039ceaec4a413e72de393b65f79d1df74dc3346dc7f861173",
      systems: [
        "dojo_init",
        "register_game",
        "update_game",
        "publish_game",
        "hide_game",
        "whitelist_game",
        "blacklist_game",
        "remove_game",
        "register_achievement",
        "update_achievement",
        "publish_achievement",
        "hide_achievement",
        "whitelist_achievement",
        "blacklist_achievement",
        "remove_achievement",
        "upgrade"
      ]
    },
    {
      address: "0x76c0c3d2c504f9fedc98b238ca010916d62f8ed563bbcf9b5dd8bef927fd8aa",
      class_hash: "0x2d7bba9a10d280fc47fef76ad11406f6fcc0bec0a173e3e169c4b05a111bb83",
      abi: [
        {
          type: "impl",
          name: "Slot__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Slot__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "external"
        },
        {
          type: "impl",
          name: "SlotImpl",
          interface_name: "arcade::systems::slot::ISlot"
        },
        {
          type: "interface",
          name: "arcade::systems::slot::ISlot",
          items: [
            {
              type: "function",
              name: "deploy",
              inputs: [
                {
                  name: "service",
                  type: "core::integer::u8"
                },
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "tier",
                  type: "core::integer::u8"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "remove",
              inputs: [
                {
                  name: "service",
                  type: "core::integer::u8"
                },
                {
                  name: "project",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hire",
              inputs: [
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "account_id",
                  type: "core::felt252"
                },
                {
                  name: "role",
                  type: "core::integer::u8"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "fire",
              inputs: [
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "account_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "provider::components::deployable::DeployableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "provider::components::groupable::GroupableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::slot::Slot::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "DeployableEvent",
              type: "provider::components::deployable::DeployableComponent::Event",
              kind: "flat"
            },
            {
              name: "GroupableEvent",
              type: "provider::components::groupable::GroupableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Slot",
      selector: "0x16361cb59732e8b56d69550297b7d8f86c6d1be2fc71b5dde135aeb1d16f3f7",
      systems: [
        "dojo_init",
        "deploy",
        "remove",
        "hire",
        "fire",
        "upgrade"
      ]
    },
    {
      address: "0x4d776373427434a22f7d60d0f7fe0e336fd830edf4294acec33d9f2e1275327",
      class_hash: "0x7c1d38f9d0fd0327e7a693a8280b0ef66e3d5b1ccf3d5ccc19d22ccd3af7bdd",
      abi: [
        {
          type: "impl",
          name: "Social__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Social__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "SocialImpl",
          interface_name: "arcade::systems::social::ISocial"
        },
        {
          type: "enum",
          name: "core::bool",
          variants: [
            {
              name: "False",
              type: "()"
            },
            {
              name: "True",
              type: "()"
            }
          ]
        },
        {
          type: "interface",
          name: "arcade::systems::social::ISocial",
          items: [
            {
              type: "function",
              name: "pin",
              inputs: [
                {
                  name: "achievement_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "unpin",
              inputs: [
                {
                  name: "achievement_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "follow",
              inputs: [
                {
                  name: "target",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "unfollow",
              inputs: [
                {
                  name: "target",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "create_alliance",
              inputs: [
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "open_alliance",
              inputs: [
                {
                  name: "free",
                  type: "core::bool"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "close_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "crown_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hire_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "fire_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "request_alliance",
              inputs: [
                {
                  name: "alliance_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "cancel_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "leave_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "create_guild",
              inputs: [
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "open_guild",
              inputs: [
                {
                  name: "free",
                  type: "core::bool"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "close_guild",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "crown_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "promote_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "demote_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hire_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "fire_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "request_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "cancel_guild",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "leave_guild",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "view"
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "achievement::components::pinnable::PinnableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::allianceable::AllianceableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::followable::FollowableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::guildable::GuildableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::social::Social::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "PinnableEvent",
              type: "achievement::components::pinnable::PinnableComponent::Event",
              kind: "flat"
            },
            {
              name: "AllianceableEvent",
              type: "social::components::allianceable::AllianceableComponent::Event",
              kind: "flat"
            },
            {
              name: "FollowableEvent",
              type: "social::components::followable::FollowableComponent::Event",
              kind: "flat"
            },
            {
              name: "GuildableEvent",
              type: "social::components::guildable::GuildableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Social",
      selector: "0x28532a65d3bfdb030133a56031e467c489058fee53a3bd903adc719735aa6c5",
      systems: [
        "pin",
        "unpin",
        "follow",
        "unfollow",
        "create_alliance",
        "open_alliance",
        "close_alliance",
        "crown_guild",
        "hire_guild",
        "fire_guild",
        "request_alliance",
        "cancel_alliance",
        "leave_alliance",
        "create_guild",
        "open_guild",
        "close_guild",
        "crown_member",
        "promote_member",
        "demote_member",
        "hire_member",
        "fire_member",
        "request_guild",
        "cancel_guild",
        "leave_guild",
        "upgrade"
      ]
    },
    {
      address: "0x4486181df39da00d44b9cfb743962a473e3e955bb85390c570ffcd6cdeb6c47",
      class_hash: "0x580ba5d9a580a061630f436f0565dc5bb048f5daee84d79741fda5ce765c2f",
      abi: [
        {
          type: "impl",
          name: "Wallet__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Wallet__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "WalletImpl",
          interface_name: "arcade::systems::wallet::IWallet"
        },
        {
          type: "interface",
          name: "arcade::systems::wallet::IWallet",
          items: []
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "view"
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "controller::components::controllable::ControllableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::wallet::Wallet::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "ControllableEvent",
              type: "controller::components::controllable::ControllableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Wallet",
      selector: "0x69ba9525fdd6458dfaea7f06bcfd0cf5fef14d66c5516cf8548c2e2b845c6a5",
      systems: [
        "upgrade"
      ]
    }
  ],
  models: [
    {
      members: [],
      class_hash: "0x4e2a4a65e9597fae6a3db15dbf8360cbb90ac4b00803eb24715b0d3c6b62867",
      tag: "ARCADE-Access",
      selector: "0x4de83c9f22c74953e76afcef63ce27a77e04d2304133da1ec46fa2e46a0c40f"
    },
    {
      members: [],
      class_hash: "0x4e923487edecb8caba2730b7eb7ada85e31c9a3ab2bc6b865cb7a7723d7d4eb",
      tag: "ARCADE-Account",
      selector: "0x7e96bc903044d45737e5ec7e23b596e8e7f110a1b1f80d413b53725c7bbb2f6"
    },
    {
      members: [],
      class_hash: "0x509b4c7c85a5ad6ede5f70f838fe3b039e09fe9e1537e522e562a8c2fa887b4",
      tag: "ARCADE-Achievement",
      selector: "0x4909446396e41e99e20f04d9f5d9e83ab83beea6089c76d0fef29b034de9736"
    },
    {
      members: [],
      class_hash: "0x7df003249b5e6e8245535a62572e64cc5e659bbf0dfd8371a7535f2d5e35fcf",
      tag: "ARCADE-Alliance",
      selector: "0x74a88ab0bed983c65d7e57761329312c125ef0be4ef7889f560153000132866"
    },
    {
      members: [],
      class_hash: "0x8d4d1e78893b9b0e541eb5e20913057e7f70acd6e0302d9a8357c594db1015",
      tag: "ARCADE-Controller",
      selector: "0x7b2fac00792560d241723d9852f29e952bb0ecc88219dd3fb86b61796dc5952"
    },
    {
      members: [],
      class_hash: "0x707deea7afe8c277a3de09d5ccb124bf1f727ea61f0bcb618c5e7f2de4c2d5f",
      tag: "ARCADE-Deployment",
      selector: "0x5354f17394d652912bae10be363d24d155edbdb936fa275f855491253cb63a4"
    },
    {
      members: [],
      class_hash: "0x46ee9af02075375a761b271a5fb5896bf34f7040f35d3f4d2793006f2db5e37",
      tag: "ARCADE-Factory",
      selector: "0x59995d7c14b165cb6738a67e319c6ad553a58d9c05f87f0c35190b13e1c223"
    },
    {
      members: [],
      class_hash: "0x5876a589e9560234a646049af8ad29933dfee9f97ac5f12648b60d572f0fac5",
      tag: "ARCADE-Game",
      selector: "0x6143bc86ed1a08df992c568392c454a92ef7e7b5ba08e9bf75643cf5cfc8b14"
    },
    {
      members: [],
      class_hash: "0x1185b7a812122ae5f379da16f06cd9fcd04c2772f7175d50b13540f4989c1fc",
      tag: "ARCADE-Guild",
      selector: "0x95501f151f575b4fab06c5ceb7237739dd0608982727cbc226273aecf006aa"
    },
    {
      members: [],
      class_hash: "0x4a047a959c45cda7b6e9abced79278c26c08413a829e15165004dc964749678",
      tag: "ARCADE-Member",
      selector: "0x7b9b4b91d2d7823ac5c041c32867f856e6393905bedb2c4b7f58d56bf13ec43"
    },
    {
      members: [],
      class_hash: "0x693b5887e2b62bea0163daae7ecfc98e02aa1c32469ccb4d831de4bc19ab719",
      tag: "ARCADE-Signer",
      selector: "0x79493096b3a4188aade984eaf8272a97748ee48111c1f7e6683a89f64406c1a"
    },
    {
      members: [],
      class_hash: "0x398bdccbc7f8450bb139af04a99a0fddd8367b3bd21202095ec1df96108df98",
      tag: "ARCADE-Team",
      selector: "0x56407a8963e9ebbb56d8c167c40bc0bd8ce7e38ac48c632421d5cf3dc865a01"
    },
    {
      members: [],
      class_hash: "0x6fd8d97850b3e9d127a5b457bfa76d3048a74f25074ce40f929e9e6b4d356fd",
      tag: "ARCADE-Teammate",
      selector: "0x56a4d220830ecdcb5e816e49c743a4e0f784b7bdea24737be188d1f1059308e"
    }
  ],
  events: [
    {
      members: [],
      class_hash: "0x1d83651f32df4a5e3a1c8ef52c8f77fc9b99463c41246839203d11a54c8e631",
      tag: "ARCADE-Follow",
      selector: "0x38866790c8a50b1c2d43786d8d06856b7ab65ce7a59e136bc47fbae18b147f1"
    },
    {
      members: [],
      class_hash: "0x40ce2ebeff98431ff013e5b8deeff73fbb562a38950c8eb391998f022ac18a5",
      tag: "ARCADE-TrophyPinning",
      selector: "0x7b9d51ffd54b6bfa69d849bf8f35fb7bb08820e792d3eeca9dd990f4905aacb"
    }
  ]
};

// ../../contracts/manifest_mainnet.json
var manifest_mainnet_default = {
  world: {
    class_hash: "0x45575a88cc5cef1e444c77ce60b7b4c9e73a01cbbe20926d5a4c72a94011410",
    address: "0x389e47f34690ea699218305cc28cc910028533d61d27773e1db20e0b78e7b65",
    seed: "Arcade",
    name: "Cartridge World",
    entrypoints: [
      "uuid",
      "set_metadata",
      "register_namespace",
      "register_event",
      "register_model",
      "register_contract",
      "init_contract",
      "upgrade_event",
      "upgrade_model",
      "upgrade_contract",
      "emit_event",
      "emit_events",
      "set_entity",
      "set_entities",
      "delete_entity",
      "delete_entities",
      "grant_owner",
      "revoke_owner",
      "grant_writer",
      "revoke_writer",
      "upgrade"
    ],
    abi: [
      {
        type: "impl",
        name: "World",
        interface_name: "dojo::world::iworld::IWorld"
      },
      {
        type: "struct",
        name: "core::byte_array::ByteArray",
        members: [
          {
            name: "data",
            type: "core::array::Array::<core::bytes_31::bytes31>"
          },
          {
            name: "pending_word",
            type: "core::felt252"
          },
          {
            name: "pending_word_len",
            type: "core::integer::u32"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::world::resource::Resource",
        variants: [
          {
            name: "Model",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Event",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Contract",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Namespace",
            type: "core::byte_array::ByteArray"
          },
          {
            name: "World",
            type: "()"
          },
          {
            name: "Unregistered",
            type: "()"
          }
        ]
      },
      {
        type: "struct",
        name: "dojo::model::metadata::ResourceMetadata",
        members: [
          {
            name: "resource_id",
            type: "core::felt252"
          },
          {
            name: "metadata_uri",
            type: "core::byte_array::ByteArray"
          },
          {
            name: "metadata_hash",
            type: "core::felt252"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::felt252>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::felt252>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::array::Span::<core::felt252>>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::array::Span::<core::felt252>>"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::model::definition::ModelIndex",
        variants: [
          {
            name: "Keys",
            type: "core::array::Span::<core::felt252>"
          },
          {
            name: "Id",
            type: "core::felt252"
          },
          {
            name: "MemberId",
            type: "(core::felt252, core::felt252)"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::integer::u8>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::integer::u8>"
          }
        ]
      },
      {
        type: "struct",
        name: "dojo::meta::layout::FieldLayout",
        members: [
          {
            name: "selector",
            type: "core::felt252"
          },
          {
            name: "layout",
            type: "dojo::meta::layout::Layout"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::meta::layout::FieldLayout>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::meta::layout::FieldLayout>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::meta::layout::Layout>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::meta::layout::Layout>"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::meta::layout::Layout",
        variants: [
          {
            name: "Fixed",
            type: "core::array::Span::<core::integer::u8>"
          },
          {
            name: "Struct",
            type: "core::array::Span::<dojo::meta::layout::FieldLayout>"
          },
          {
            name: "Tuple",
            type: "core::array::Span::<dojo::meta::layout::Layout>"
          },
          {
            name: "Array",
            type: "core::array::Span::<dojo::meta::layout::Layout>"
          },
          {
            name: "ByteArray",
            type: "()"
          },
          {
            name: "Enum",
            type: "core::array::Span::<dojo::meta::layout::FieldLayout>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::model::definition::ModelIndex>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::model::definition::ModelIndex>"
          }
        ]
      },
      {
        type: "enum",
        name: "core::bool",
        variants: [
          {
            name: "False",
            type: "()"
          },
          {
            name: "True",
            type: "()"
          }
        ]
      },
      {
        type: "interface",
        name: "dojo::world::iworld::IWorld",
        items: [
          {
            type: "function",
            name: "resource",
            inputs: [
              {
                name: "selector",
                type: "core::felt252"
              }
            ],
            outputs: [
              {
                type: "dojo::world::resource::Resource"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "uuid",
            inputs: [],
            outputs: [
              {
                type: "core::integer::u32"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "metadata",
            inputs: [
              {
                name: "resource_selector",
                type: "core::felt252"
              }
            ],
            outputs: [
              {
                type: "dojo::model::metadata::ResourceMetadata"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "set_metadata",
            inputs: [
              {
                name: "metadata",
                type: "dojo::model::metadata::ResourceMetadata"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_namespace",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_event",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_model",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_contract",
            inputs: [
              {
                name: "salt",
                type: "core::felt252"
              },
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [
              {
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "init_contract",
            inputs: [
              {
                name: "selector",
                type: "core::felt252"
              },
              {
                name: "init_calldata",
                type: "core::array::Span::<core::felt252>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_event",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_model",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_contract",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [
              {
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "emit_event",
            inputs: [
              {
                name: "event_selector",
                type: "core::felt252"
              },
              {
                name: "keys",
                type: "core::array::Span::<core::felt252>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::felt252>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "emit_events",
            inputs: [
              {
                name: "event_selector",
                type: "core::felt252"
              },
              {
                name: "keys",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [
              {
                type: "core::array::Span::<core::felt252>"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [
              {
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "set_entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "values",
                type: "core::array::Span::<core::felt252>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "set_entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "delete_entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "delete_entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "is_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [
              {
                type: "core::bool"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "grant_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "revoke_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "is_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [
              {
                type: "core::bool"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "grant_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "revoke_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          }
        ]
      },
      {
        type: "impl",
        name: "UpgradeableWorld",
        interface_name: "dojo::world::iworld::IUpgradeableWorld"
      },
      {
        type: "interface",
        name: "dojo::world::iworld::IUpgradeableWorld",
        items: [
          {
            type: "function",
            name: "upgrade",
            inputs: [
              {
                name: "new_class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          }
        ]
      },
      {
        type: "constructor",
        name: "constructor",
        inputs: [
          {
            name: "world_class_hash",
            type: "core::starknet::class_hash::ClassHash"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WorldSpawned",
        kind: "struct",
        members: [
          {
            name: "creator",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WorldUpgraded",
        kind: "struct",
        members: [
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::NamespaceRegistered",
        kind: "struct",
        members: [
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "hash",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ModelRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "salt",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ModelUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "prev_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "prev_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractInitialized",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "init_calldata",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventEmitted",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "system_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "keys",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::MetadataUpdate",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "uri",
            type: "core::byte_array::ByteArray",
            kind: "data"
          },
          {
            name: "hash",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreSetRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "keys",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreUpdateRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreUpdateMember",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "member_selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreDelRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WriterUpdated",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "contract",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "value",
            type: "core::bool",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::OwnerUpdated",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "contract",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "value",
            type: "core::bool",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::Event",
        kind: "enum",
        variants: [
          {
            name: "WorldSpawned",
            type: "dojo::world::world_contract::world::WorldSpawned",
            kind: "nested"
          },
          {
            name: "WorldUpgraded",
            type: "dojo::world::world_contract::world::WorldUpgraded",
            kind: "nested"
          },
          {
            name: "NamespaceRegistered",
            type: "dojo::world::world_contract::world::NamespaceRegistered",
            kind: "nested"
          },
          {
            name: "ModelRegistered",
            type: "dojo::world::world_contract::world::ModelRegistered",
            kind: "nested"
          },
          {
            name: "EventRegistered",
            type: "dojo::world::world_contract::world::EventRegistered",
            kind: "nested"
          },
          {
            name: "ContractRegistered",
            type: "dojo::world::world_contract::world::ContractRegistered",
            kind: "nested"
          },
          {
            name: "ModelUpgraded",
            type: "dojo::world::world_contract::world::ModelUpgraded",
            kind: "nested"
          },
          {
            name: "EventUpgraded",
            type: "dojo::world::world_contract::world::EventUpgraded",
            kind: "nested"
          },
          {
            name: "ContractUpgraded",
            type: "dojo::world::world_contract::world::ContractUpgraded",
            kind: "nested"
          },
          {
            name: "ContractInitialized",
            type: "dojo::world::world_contract::world::ContractInitialized",
            kind: "nested"
          },
          {
            name: "EventEmitted",
            type: "dojo::world::world_contract::world::EventEmitted",
            kind: "nested"
          },
          {
            name: "MetadataUpdate",
            type: "dojo::world::world_contract::world::MetadataUpdate",
            kind: "nested"
          },
          {
            name: "StoreSetRecord",
            type: "dojo::world::world_contract::world::StoreSetRecord",
            kind: "nested"
          },
          {
            name: "StoreUpdateRecord",
            type: "dojo::world::world_contract::world::StoreUpdateRecord",
            kind: "nested"
          },
          {
            name: "StoreUpdateMember",
            type: "dojo::world::world_contract::world::StoreUpdateMember",
            kind: "nested"
          },
          {
            name: "StoreDelRecord",
            type: "dojo::world::world_contract::world::StoreDelRecord",
            kind: "nested"
          },
          {
            name: "WriterUpdated",
            type: "dojo::world::world_contract::world::WriterUpdated",
            kind: "nested"
          },
          {
            name: "OwnerUpdated",
            type: "dojo::world::world_contract::world::OwnerUpdated",
            kind: "nested"
          }
        ]
      }
    ]
  },
  contracts: [
    {
      address: "0xc46f7e578f31c3fa6bb669164f04d696427818ba69f177ddc152f31ed5f119",
      class_hash: "0x1a07f7bce8ac8fd51cc09b5a9d4072023a3f001eb1f483c0879e9ee6bf5c304",
      abi: [
        {
          type: "impl",
          name: "Registry__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Registry__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [
            {
              name: "owner",
              type: "core::felt252"
            }
          ],
          outputs: [],
          state_mutability: "external"
        },
        {
          type: "impl",
          name: "RegistryImpl",
          interface_name: "arcade::systems::registry::IRegistry"
        },
        {
          type: "interface",
          name: "arcade::systems::registry::IRegistry",
          items: [
            {
              type: "function",
              name: "register_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "preset",
                  type: "core::felt252"
                },
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "update_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "preset",
                  type: "core::felt252"
                },
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "publish_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hide_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "whitelist_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "blacklist_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "remove_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "register_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                },
                {
                  name: "karma",
                  type: "core::integer::u16"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "update_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                },
                {
                  name: "karma",
                  type: "core::integer::u16"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "publish_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hide_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "whitelist_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "blacklist_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "remove_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::initializable::InitializableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::registerable::RegisterableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::trackable::TrackableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::registry::Registry::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "InitializableEvent",
              type: "registry::components::initializable::InitializableComponent::Event",
              kind: "flat"
            },
            {
              name: "RegisterableEvent",
              type: "registry::components::registerable::RegisterableComponent::Event",
              kind: "flat"
            },
            {
              name: "TrackableEvent",
              type: "registry::components::trackable::TrackableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [
        "0x041aad5a7493b75f240f418cb5f052d1a68981af21e813ed0a35e96d3e83123b"
      ],
      tag: "ARCADE-Registry",
      selector: "0x54d3bcd441104e039ceaec4a413e72de393b65f79d1df74dc3346dc7f861173",
      systems: [
        "dojo_init",
        "register_game",
        "update_game",
        "publish_game",
        "hide_game",
        "whitelist_game",
        "blacklist_game",
        "remove_game",
        "register_achievement",
        "update_achievement",
        "publish_achievement",
        "hide_achievement",
        "whitelist_achievement",
        "blacklist_achievement",
        "remove_achievement",
        "upgrade"
      ]
    },
    {
      address: "0x76c0c3d2c504f9fedc98b238ca010916d62f8ed563bbcf9b5dd8bef927fd8aa",
      class_hash: "0x2d7bba9a10d280fc47fef76ad11406f6fcc0bec0a173e3e169c4b05a111bb83",
      abi: [
        {
          type: "impl",
          name: "Slot__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Slot__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "external"
        },
        {
          type: "impl",
          name: "SlotImpl",
          interface_name: "arcade::systems::slot::ISlot"
        },
        {
          type: "interface",
          name: "arcade::systems::slot::ISlot",
          items: [
            {
              type: "function",
              name: "deploy",
              inputs: [
                {
                  name: "service",
                  type: "core::integer::u8"
                },
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "tier",
                  type: "core::integer::u8"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "remove",
              inputs: [
                {
                  name: "service",
                  type: "core::integer::u8"
                },
                {
                  name: "project",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hire",
              inputs: [
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "account_id",
                  type: "core::felt252"
                },
                {
                  name: "role",
                  type: "core::integer::u8"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "fire",
              inputs: [
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "account_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "provider::components::deployable::DeployableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "provider::components::groupable::GroupableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::slot::Slot::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "DeployableEvent",
              type: "provider::components::deployable::DeployableComponent::Event",
              kind: "flat"
            },
            {
              name: "GroupableEvent",
              type: "provider::components::groupable::GroupableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Slot",
      selector: "0x16361cb59732e8b56d69550297b7d8f86c6d1be2fc71b5dde135aeb1d16f3f7",
      systems: [
        "dojo_init",
        "deploy",
        "remove",
        "hire",
        "fire",
        "upgrade"
      ]
    },
    {
      address: "0x4d776373427434a22f7d60d0f7fe0e336fd830edf4294acec33d9f2e1275327",
      class_hash: "0x7c1d38f9d0fd0327e7a693a8280b0ef66e3d5b1ccf3d5ccc19d22ccd3af7bdd",
      abi: [
        {
          type: "impl",
          name: "Social__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Social__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "SocialImpl",
          interface_name: "arcade::systems::social::ISocial"
        },
        {
          type: "enum",
          name: "core::bool",
          variants: [
            {
              name: "False",
              type: "()"
            },
            {
              name: "True",
              type: "()"
            }
          ]
        },
        {
          type: "interface",
          name: "arcade::systems::social::ISocial",
          items: [
            {
              type: "function",
              name: "pin",
              inputs: [
                {
                  name: "achievement_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "unpin",
              inputs: [
                {
                  name: "achievement_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "follow",
              inputs: [
                {
                  name: "target",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "unfollow",
              inputs: [
                {
                  name: "target",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "create_alliance",
              inputs: [
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "open_alliance",
              inputs: [
                {
                  name: "free",
                  type: "core::bool"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "close_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "crown_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hire_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "fire_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "request_alliance",
              inputs: [
                {
                  name: "alliance_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "cancel_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "leave_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "create_guild",
              inputs: [
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "open_guild",
              inputs: [
                {
                  name: "free",
                  type: "core::bool"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "close_guild",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "crown_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "promote_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "demote_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "hire_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "fire_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "request_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "cancel_guild",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            },
            {
              type: "function",
              name: "leave_guild",
              inputs: [],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "view"
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "achievement::components::pinnable::PinnableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::allianceable::AllianceableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::followable::FollowableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::guildable::GuildableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::social::Social::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "PinnableEvent",
              type: "achievement::components::pinnable::PinnableComponent::Event",
              kind: "flat"
            },
            {
              name: "AllianceableEvent",
              type: "social::components::allianceable::AllianceableComponent::Event",
              kind: "flat"
            },
            {
              name: "FollowableEvent",
              type: "social::components::followable::FollowableComponent::Event",
              kind: "flat"
            },
            {
              name: "GuildableEvent",
              type: "social::components::guildable::GuildableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Social",
      selector: "0x28532a65d3bfdb030133a56031e467c489058fee53a3bd903adc719735aa6c5",
      systems: [
        "pin",
        "unpin",
        "follow",
        "unfollow",
        "create_alliance",
        "open_alliance",
        "close_alliance",
        "crown_guild",
        "hire_guild",
        "fire_guild",
        "request_alliance",
        "cancel_alliance",
        "leave_alliance",
        "create_guild",
        "open_guild",
        "close_guild",
        "crown_member",
        "promote_member",
        "demote_member",
        "hire_member",
        "fire_member",
        "request_guild",
        "cancel_guild",
        "leave_guild",
        "upgrade"
      ]
    },
    {
      address: "0x4486181df39da00d44b9cfb743962a473e3e955bb85390c570ffcd6cdeb6c47",
      class_hash: "0x580ba5d9a580a061630f436f0565dc5bb048f5daee84d79741fda5ce765c2f",
      abi: [
        {
          type: "impl",
          name: "Wallet__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Wallet__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "WalletImpl",
          interface_name: "arcade::systems::wallet::IWallet"
        },
        {
          type: "interface",
          name: "arcade::systems::wallet::IWallet",
          items: []
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "view"
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "controller::components::controllable::ControllableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::wallet::Wallet::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "ControllableEvent",
              type: "controller::components::controllable::ControllableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Wallet",
      selector: "0x69ba9525fdd6458dfaea7f06bcfd0cf5fef14d66c5516cf8548c2e2b845c6a5",
      systems: [
        "upgrade"
      ]
    }
  ],
  models: [
    {
      members: [],
      class_hash: "0x4e2a4a65e9597fae6a3db15dbf8360cbb90ac4b00803eb24715b0d3c6b62867",
      tag: "ARCADE-Access",
      selector: "0x4de83c9f22c74953e76afcef63ce27a77e04d2304133da1ec46fa2e46a0c40f"
    },
    {
      members: [],
      class_hash: "0x4e923487edecb8caba2730b7eb7ada85e31c9a3ab2bc6b865cb7a7723d7d4eb",
      tag: "ARCADE-Account",
      selector: "0x7e96bc903044d45737e5ec7e23b596e8e7f110a1b1f80d413b53725c7bbb2f6"
    },
    {
      members: [],
      class_hash: "0x509b4c7c85a5ad6ede5f70f838fe3b039e09fe9e1537e522e562a8c2fa887b4",
      tag: "ARCADE-Achievement",
      selector: "0x4909446396e41e99e20f04d9f5d9e83ab83beea6089c76d0fef29b034de9736"
    },
    {
      members: [],
      class_hash: "0x7df003249b5e6e8245535a62572e64cc5e659bbf0dfd8371a7535f2d5e35fcf",
      tag: "ARCADE-Alliance",
      selector: "0x74a88ab0bed983c65d7e57761329312c125ef0be4ef7889f560153000132866"
    },
    {
      members: [],
      class_hash: "0x8d4d1e78893b9b0e541eb5e20913057e7f70acd6e0302d9a8357c594db1015",
      tag: "ARCADE-Controller",
      selector: "0x7b2fac00792560d241723d9852f29e952bb0ecc88219dd3fb86b61796dc5952"
    },
    {
      members: [],
      class_hash: "0x707deea7afe8c277a3de09d5ccb124bf1f727ea61f0bcb618c5e7f2de4c2d5f",
      tag: "ARCADE-Deployment",
      selector: "0x5354f17394d652912bae10be363d24d155edbdb936fa275f855491253cb63a4"
    },
    {
      members: [],
      class_hash: "0x46ee9af02075375a761b271a5fb5896bf34f7040f35d3f4d2793006f2db5e37",
      tag: "ARCADE-Factory",
      selector: "0x59995d7c14b165cb6738a67e319c6ad553a58d9c05f87f0c35190b13e1c223"
    },
    {
      members: [],
      class_hash: "0x5876a589e9560234a646049af8ad29933dfee9f97ac5f12648b60d572f0fac5",
      tag: "ARCADE-Game",
      selector: "0x6143bc86ed1a08df992c568392c454a92ef7e7b5ba08e9bf75643cf5cfc8b14"
    },
    {
      members: [],
      class_hash: "0x1185b7a812122ae5f379da16f06cd9fcd04c2772f7175d50b13540f4989c1fc",
      tag: "ARCADE-Guild",
      selector: "0x95501f151f575b4fab06c5ceb7237739dd0608982727cbc226273aecf006aa"
    },
    {
      members: [],
      class_hash: "0x4a047a959c45cda7b6e9abced79278c26c08413a829e15165004dc964749678",
      tag: "ARCADE-Member",
      selector: "0x7b9b4b91d2d7823ac5c041c32867f856e6393905bedb2c4b7f58d56bf13ec43"
    },
    {
      members: [],
      class_hash: "0x693b5887e2b62bea0163daae7ecfc98e02aa1c32469ccb4d831de4bc19ab719",
      tag: "ARCADE-Signer",
      selector: "0x79493096b3a4188aade984eaf8272a97748ee48111c1f7e6683a89f64406c1a"
    },
    {
      members: [],
      class_hash: "0x398bdccbc7f8450bb139af04a99a0fddd8367b3bd21202095ec1df96108df98",
      tag: "ARCADE-Team",
      selector: "0x56407a8963e9ebbb56d8c167c40bc0bd8ce7e38ac48c632421d5cf3dc865a01"
    },
    {
      members: [],
      class_hash: "0x6fd8d97850b3e9d127a5b457bfa76d3048a74f25074ce40f929e9e6b4d356fd",
      tag: "ARCADE-Teammate",
      selector: "0x56a4d220830ecdcb5e816e49c743a4e0f784b7bdea24737be188d1f1059308e"
    }
  ],
  events: [
    {
      members: [],
      class_hash: "0x1d83651f32df4a5e3a1c8ef52c8f77fc9b99463c41246839203d11a54c8e631",
      tag: "ARCADE-Follow",
      selector: "0x38866790c8a50b1c2d43786d8d06856b7ab65ce7a59e136bc47fbae18b147f1"
    },
    {
      members: [],
      class_hash: "0x40ce2ebeff98431ff013e5b8deeff73fbb562a38950c8eb391998f022ac18a5",
      tag: "ARCADE-TrophyPinning",
      selector: "0x7b9d51ffd54b6bfa69d849bf8f35fb7bb08820e792d3eeca9dd990f4905aacb"
    }
  ]
};

// src/configs/index.ts
var import_starknet = require("starknet");
var MAINNET_RPC_URL = "https://api.cartridge.gg/x/starknet/mainnet";
var SEPOLIA_RPC_URL = "https://api.cartridge.gg/x/starknet/sepolia";
var TORII_URL = "https://api.cartridge.gg/x/arcade/torii";
var configs = {
  [import_starknet.constants.StarknetChainId.SN_SEPOLIA]: (0, import_core.createDojoConfig)({
    manifest: manifest_sepolia_default,
    toriiUrl: TORII_URL,
    rpcUrl: SEPOLIA_RPC_URL
  }),
  [import_starknet.constants.StarknetChainId.SN_MAIN]: (0, import_core.createDojoConfig)({
    manifest: manifest_mainnet_default,
    toriiUrl: TORII_URL,
    rpcUrl: MAINNET_RPC_URL
  })
};

// src/provider/index.ts
function ApplyEventEmitter(Base) {
  return class extends Base {
    eventEmitter = new import_eventemitter3.default();
    /**
     * Emit an event
     * @param event - The event name
     * @param args - Arguments to pass to event handlers
     */
    emit(event, ...args) {
      this.eventEmitter.emit(event, ...args);
    }
    /**
     * Subscribe to an event
     * @param event - The event name to listen for
     * @param listener - Callback function when event occurs
     */
    on(event, listener) {
      this.eventEmitter.on(event, listener);
    }
    /**
     * Unsubscribe from an event
     * @param event - The event name to stop listening to
     * @param listener - The callback function to remove
     */
    off(event, listener) {
      this.eventEmitter.off(event, listener);
    }
  };
}
var DojoEmitterProvider = ApplyEventEmitter(import_core2.DojoProvider);
var ArcadeProvider = class extends DojoEmitterProvider {
  social;
  registry;
  slot;
  /**
   * Create a new ArcadeProvider instance
   *
   * @param chainId - The chain ID
   */
  constructor(chainId) {
    const config = configs[chainId];
    super(config.manifest, config.rpcUrl);
    this.manifest = config.manifest;
    this.getWorldAddress = function() {
      const worldAddress = this.manifest.world.address;
      return worldAddress;
    };
    this.social = new Social(config.manifest);
    this.registry = new Registry(config.manifest);
    this.slot = new Slot(config.manifest);
  }
  /**
   * Get a Torii client
   * @param toriiUrl - The URL of the Torii client
   * @returns A Torii client
   */
  async getToriiClient(rpcUrl, toriiUrl) {
    const toriiClient = await torii.createClient({
      rpcUrl,
      toriiUrl,
      relayUrl: "",
      worldAddress: this.manifest.world.address
    });
    return toriiClient;
  }
  /**
   * Wait for a transaction to complete and check for errors
   *
   * @param transactionHash - Hash of transaction to wait for
   * @returns Transaction receipt
   * @throws Error if transaction fails or is reverted
   */
  async process(transactionHash) {
    let receipt;
    try {
      receipt = await this.provider.waitForTransaction(transactionHash, {
        retryInterval: 500
      });
    } catch (error) {
      console.error(`Error waiting for transaction ${transactionHash}`);
      throw error;
    }
    if (receipt.isReverted()) {
      this.emit("FAILED", `Transaction failed with reason: ${receipt.revert_reason}`);
      throw new Error(`Transaction failed with reason: ${receipt.revert_reason}`);
    }
    return receipt;
  }
  /**
   * Execute a transaction and emit its result
   *
   * @param signer - Account that will sign the transaction
   * @param transactionDetails - Transaction call data
   * @returns Transaction receipt
   */
  async invoke(signer, calls, entrypoint) {
    const tx = await this.execute(signer, calls, NAMESPACE);
    const receipt = await this.process(tx.transaction_hash);
    this.emit("COMPLETED", {
      details: receipt,
      type: TransactionType[entrypoint.toUpperCase()]
    });
    return receipt;
  }
};

// src/bindings/contracts.gen.ts
function setupWorld(provider) {
  const Registry_registerGame = async (snAccount, worldAddress, namespace, project, preset, color, name, description, image, banner, discord, telegram, twitter, youtube, website) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "register_game",
          calldata: [
            worldAddress,
            namespace,
            project,
            preset,
            color,
            name,
            description,
            image,
            banner,
            discord,
            telegram,
            twitter,
            youtube,
            website
          ]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_updateGame = async (snAccount, worldAddress, namespace, preset, color, name, description, image, banner, discord, telegram, twitter, youtube, website) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "update_game",
          calldata: [
            worldAddress,
            namespace,
            preset,
            color,
            name,
            description,
            image,
            banner,
            discord,
            telegram,
            twitter,
            youtube,
            website
          ]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_publishGame = async (snAccount, worldAddress, namespace) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "publish_game",
          calldata: [worldAddress, namespace]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_hideGame = async (snAccount, worldAddress, namespace) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "hide_game",
          calldata: [worldAddress, namespace]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_whitelistGame = async (snAccount, worldAddress, namespace) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "whitelist_game",
          calldata: [worldAddress, namespace]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_blacklistGame = async (snAccount, worldAddress, namespace) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "blacklist_game",
          calldata: [worldAddress, namespace]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_removeGame = async (snAccount, worldAddress, namespace) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "remove_game",
          calldata: [worldAddress, namespace]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_registerAchievement = async (snAccount, worldAddress, namespace, identifier, karma) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "register_achievement",
          calldata: [worldAddress, namespace, identifier, karma]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_updateAchievement = async (snAccount, worldAddress, namespace, identifier, karma) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "update_achievement",
          calldata: [worldAddress, namespace, identifier, karma]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_publishAchievement = async (snAccount, worldAddress, namespace, identifier) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "publish_achievement",
          calldata: [worldAddress, namespace, identifier]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_hideAchievement = async (snAccount, worldAddress, namespace, identifier) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "hide_achievement",
          calldata: [worldAddress, namespace, identifier]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_whitelistAchievement = async (snAccount, worldAddress, namespace, identifier) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "whitelist_achievement",
          calldata: [worldAddress, namespace, identifier]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_blacklistAchievement = async (snAccount, worldAddress, namespace, identifier) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "blacklist_achievement",
          calldata: [worldAddress, namespace, identifier]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Registry_removeAchievement = async (snAccount, worldAddress, namespace, identifier) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Registry",
          entrypoint: "remove_achievement",
          calldata: [worldAddress, namespace, identifier]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_pin = async (snAccount, achievementId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "pin",
          calldata: [achievementId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_unpin = async (snAccount, achievementId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "unpin",
          calldata: [achievementId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_follow = async (snAccount, target) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "follow",
          calldata: [target]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_unfollow = async (snAccount, target) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "unfollow",
          calldata: [target]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_createAlliance = async (snAccount, color, name, description, image, banner, discord, telegram, twitter, youtube, website) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "create_alliance",
          calldata: [color, name, description, image, banner, discord, telegram, twitter, youtube, website]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_openAlliance = async (snAccount, free) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "open_alliance",
          calldata: [free]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_closeAlliance = async (snAccount) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "close_alliance",
          calldata: []
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_crownGuild = async (snAccount, guildId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "crown_guild",
          calldata: [guildId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_hireGuild = async (snAccount, guildId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "hire_guild",
          calldata: [guildId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_fireGuild = async (snAccount, guildId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "fire_guild",
          calldata: [guildId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_requestAlliance = async (snAccount, allianceId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "request_alliance",
          calldata: [allianceId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_cancelAlliance = async (snAccount) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "cancel_alliance",
          calldata: []
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_leaveAlliance = async (snAccount) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "leave_alliance",
          calldata: []
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_createGuild = async (snAccount, color, name, description, image, banner, discord, telegram, twitter, youtube, website) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "create_guild",
          calldata: [color, name, description, image, banner, discord, telegram, twitter, youtube, website]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_openGuild = async (snAccount, free) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "open_guild",
          calldata: [free]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_closeGuild = async (snAccount) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "close_guild",
          calldata: []
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_crownMember = async (snAccount, memberId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "crown_member",
          calldata: [memberId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_promoteMember = async (snAccount, memberId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "promote_member",
          calldata: [memberId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_demoteMember = async (snAccount, memberId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "demote_member",
          calldata: [memberId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_hireMember = async (snAccount, memberId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "hire_member",
          calldata: [memberId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_fireMember = async (snAccount, memberId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "fire_member",
          calldata: [memberId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_requestGuild = async (snAccount, guildId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "request_guild",
          calldata: [guildId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_cancelGuild = async (snAccount) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "cancel_guild",
          calldata: []
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Social_leaveGuild = async (snAccount) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Social",
          entrypoint: "leave_guild",
          calldata: []
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Slot_deploy = async (snAccount, service, project, tier) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Slot",
          entrypoint: "deploy",
          calldata: [service, project, tier]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Slot_remove = async (snAccount, service, project) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Slot",
          entrypoint: "remove",
          calldata: [service, project]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Slot_hire = async (snAccount, project, accountId, role) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Slot",
          entrypoint: "hire",
          calldata: [project, accountId, role]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  const Slot_fire = async (snAccount, project, accountId) => {
    try {
      return await provider.execute(
        snAccount,
        {
          contractName: "Slot",
          entrypoint: "fire",
          calldata: [project, accountId]
        },
        "ARCADE"
      );
    } catch (error) {
      console.error(error);
    }
  };
  return {
    Registry: {
      registerGame: Registry_registerGame,
      updateGame: Registry_updateGame,
      publishGame: Registry_publishGame,
      hideGame: Registry_hideGame,
      whitelistGame: Registry_whitelistGame,
      blacklistGame: Registry_blacklistGame,
      removeGame: Registry_removeGame,
      registerAchievement: Registry_registerAchievement,
      updateAchievement: Registry_updateAchievement,
      publishAchievement: Registry_publishAchievement,
      hideAchievement: Registry_hideAchievement,
      whitelistAchievement: Registry_whitelistAchievement,
      blacklistAchievement: Registry_blacklistAchievement,
      removeAchievement: Registry_removeAchievement
    },
    Social: {
      pin: Social_pin,
      unpin: Social_unpin,
      follow: Social_follow,
      unfollow: Social_unfollow,
      createAlliance: Social_createAlliance,
      openAlliance: Social_openAlliance,
      closeAlliance: Social_closeAlliance,
      crownGuild: Social_crownGuild,
      hireGuild: Social_hireGuild,
      fireGuild: Social_fireGuild,
      requestAlliance: Social_requestAlliance,
      cancelAlliance: Social_cancelAlliance,
      leaveAlliance: Social_leaveAlliance,
      createGuild: Social_createGuild,
      openGuild: Social_openGuild,
      closeGuild: Social_closeGuild,
      crownMember: Social_crownMember,
      promoteMember: Social_promoteMember,
      demoteMember: Social_demoteMember,
      hireMember: Social_hireMember,
      fireMember: Social_fireMember,
      requestGuild: Social_requestGuild,
      cancelGuild: Social_cancelGuild,
      leaveGuild: Social_leaveGuild
    },
    Slot: {
      deploy: Slot_deploy,
      remove: Slot_remove,
      hire: Slot_hire,
      fire: Slot_fire
    }
  };
}

// src/bindings/models.gen.ts
var schema = {
  controller: {
    Account: {
      fieldOrder: ["id", "controllers", "name", "username", "socials", "credits"],
      id: 0,
      controllers: 0,
      name: 0,
      username: 0,
      socials: "",
      credits: 0
    },
    AccountValue: {
      fieldOrder: ["controllers", "name", "username", "socials", "credits"],
      controllers: 0,
      name: 0,
      username: 0,
      socials: "",
      credits: 0
    },
    Controller: {
      fieldOrder: ["account_id", "id", "signers", "address", "network", "constructor_calldata"],
      account_id: 0,
      id: 0,
      signers: 0,
      address: 0,
      network: 0,
      constructor_calldata: ""
    },
    ControllerValue: {
      fieldOrder: ["signers", "address", "network", "constructor_calldata"],
      signers: 0,
      address: 0,
      network: 0,
      constructor_calldata: ""
    },
    Signer: {
      fieldOrder: ["account_id", "controller_id", "method", "metadata"],
      account_id: 0,
      controller_id: 0,
      method: 0,
      metadata: ""
    },
    SignerValue: {
      fieldOrder: ["method", "metadata"],
      method: 0,
      metadata: ""
    }
  },
  provider: {
    Deployment: {
      fieldOrder: ["service", "project", "status", "tier", "config"],
      service: 0,
      project: 0,
      status: 0,
      tier: 0,
      config: ""
    },
    DeploymentValue: {
      fieldOrder: ["status", "tier", "config"],
      status: 0,
      tier: 0,
      config: ""
    },
    Factory: {
      fieldOrder: ["id", "version", "default_version"],
      id: 0,
      version: 0,
      default_version: 0
    },
    FactoryValue: {
      fieldOrder: ["version", "default_version"],
      version: 0,
      default_version: 0
    },
    Team: {
      fieldOrder: ["id", "deployment_count", "time", "name", "description"],
      id: 0,
      deployment_count: 0,
      time: 0,
      name: 0,
      description: ""
    },
    TeamValue: {
      fieldOrder: ["deployment_count", "time", "name", "description"],
      deployment_count: 0,
      time: 0,
      name: 0,
      description: ""
    },
    Teammate: {
      fieldOrder: ["team_id", "time", "account_id", "role"],
      team_id: 0,
      time: 0,
      account_id: 0,
      role: 0
    },
    TeammateValue: {
      fieldOrder: ["role"],
      role: 0
    }
  },
  registry: {
    Access: {
      fieldOrder: ["address", "role"],
      address: 0,
      role: 0
    },
    AccessValue: {
      fieldOrder: ["role"],
      role: 0
    },
    Achievement: {
      fieldOrder: ["world_address", "namespace", "id", "published", "whitelisted", "karma"],
      world_address: 0,
      namespace: 0,
      id: 0,
      published: false,
      whitelisted: false,
      karma: 0
    },
    AchievementValue: {
      fieldOrder: ["published", "whitelisted", "karma"],
      published: false,
      whitelisted: false,
      karma: 0
    },
    Game: {
      fieldOrder: [
        "world_address",
        "namespace",
        "project",
        "preset",
        "active",
        "published",
        "whitelisted",
        "priority",
        "karma",
        "metadata",
        "socials",
        "owner"
      ],
      world_address: 0,
      namespace: 0,
      project: 0,
      preset: 0,
      active: false,
      published: false,
      whitelisted: false,
      priority: 0,
      karma: 0,
      metadata: "",
      socials: "",
      owner: 0
    },
    GameValue: {
      fieldOrder: [
        "project",
        "preset",
        "active",
        "published",
        "whitelisted",
        "priority",
        "karma",
        "metadata",
        "socials",
        "owner"
      ],
      project: 0,
      preset: 0,
      active: false,
      published: false,
      whitelisted: false,
      priority: 0,
      karma: 0,
      metadata: "",
      socials: "",
      owner: 0
    }
  },
  social: {
    Alliance: {
      fieldOrder: ["id", "open", "free", "guild_count", "metadata", "socials"],
      id: 0,
      open: false,
      free: false,
      guild_count: 0,
      metadata: "",
      socials: ""
    },
    AllianceValue: {
      fieldOrder: ["open", "free", "guild_count", "metadata", "socials"],
      open: false,
      free: false,
      guild_count: 0,
      metadata: "",
      socials: ""
    },
    Guild: {
      fieldOrder: [
        "id",
        "open",
        "free",
        "role",
        "member_count",
        "alliance_id",
        "pending_alliance_id",
        "metadata",
        "socials"
      ],
      id: 0,
      open: false,
      free: false,
      role: 0,
      member_count: 0,
      alliance_id: 0,
      pending_alliance_id: 0,
      metadata: "",
      socials: ""
    },
    GuildValue: {
      fieldOrder: ["open", "free", "role", "member_count", "alliance_id", "pending_alliance_id", "metadata", "socials"],
      open: false,
      free: false,
      role: 0,
      member_count: 0,
      alliance_id: 0,
      pending_alliance_id: 0,
      metadata: "",
      socials: ""
    },
    Member: {
      fieldOrder: ["id", "role", "guild_id", "pending_guild_id"],
      id: 0,
      role: 0,
      guild_id: 0,
      pending_guild_id: 0
    },
    MemberValue: {
      fieldOrder: ["role", "guild_id", "pending_guild_id"],
      role: 0,
      guild_id: 0,
      pending_guild_id: 0
    }
  }
};
var ModelsMapping = /* @__PURE__ */ ((ModelsMapping2) => {
  ModelsMapping2["Account"] = "controller-Account";
  ModelsMapping2["AccountValue"] = "controller-AccountValue";
  ModelsMapping2["Controller"] = "controller-Controller";
  ModelsMapping2["ControllerValue"] = "controller-ControllerValue";
  ModelsMapping2["Signer"] = "controller-Signer";
  ModelsMapping2["SignerValue"] = "controller-SignerValue";
  ModelsMapping2["Deployment"] = "provider-Deployment";
  ModelsMapping2["DeploymentValue"] = "provider-DeploymentValue";
  ModelsMapping2["Factory"] = "provider-Factory";
  ModelsMapping2["FactoryValue"] = "provider-FactoryValue";
  ModelsMapping2["Team"] = "provider-Team";
  ModelsMapping2["TeamValue"] = "provider-TeamValue";
  ModelsMapping2["Teammate"] = "provider-Teammate";
  ModelsMapping2["TeammateValue"] = "provider-TeammateValue";
  ModelsMapping2["Access"] = "registry-Access";
  ModelsMapping2["AccessValue"] = "registry-AccessValue";
  ModelsMapping2["Achievement"] = "registry-Achievement";
  ModelsMapping2["AchievementValue"] = "registry-AchievementValue";
  ModelsMapping2["Game"] = "registry-Game";
  ModelsMapping2["GameValue"] = "registry-GameValue";
  ModelsMapping2["Alliance"] = "social-Alliance";
  ModelsMapping2["AllianceValue"] = "social-AllianceValue";
  ModelsMapping2["Guild"] = "social-Guild";
  ModelsMapping2["GuildValue"] = "social-GuildValue";
  ModelsMapping2["Member"] = "social-Member";
  ModelsMapping2["MemberValue"] = "social-MemberValue";
  return ModelsMapping2;
})(ModelsMapping || {});

// ../../contracts/manifest_slot.json
var manifest_slot_default = {
  world: {
    class_hash: "0x45575a88cc5cef1e444c77ce60b7b4c9e73a01cbbe20926d5a4c72a94011410",
    address: "0x385b375729599785931a46a17cf3101288e97d9c1fbdcca58fb5dbcb45c89ca",
    seed: "arcade",
    name: "Cartridge World",
    entrypoints: [
      "uuid",
      "set_metadata",
      "register_namespace",
      "register_event",
      "register_model",
      "register_contract",
      "init_contract",
      "upgrade_event",
      "upgrade_model",
      "upgrade_contract",
      "emit_event",
      "emit_events",
      "set_entity",
      "set_entities",
      "delete_entity",
      "delete_entities",
      "grant_owner",
      "revoke_owner",
      "grant_writer",
      "revoke_writer",
      "upgrade"
    ],
    abi: [
      {
        type: "impl",
        name: "World",
        interface_name: "dojo::world::iworld::IWorld"
      },
      {
        type: "struct",
        name: "core::byte_array::ByteArray",
        members: [
          {
            name: "data",
            type: "core::array::Array::<core::bytes_31::bytes31>"
          },
          {
            name: "pending_word",
            type: "core::felt252"
          },
          {
            name: "pending_word_len",
            type: "core::integer::u32"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::world::resource::Resource",
        variants: [
          {
            name: "Model",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Event",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Contract",
            type: "(core::starknet::contract_address::ContractAddress, core::felt252)"
          },
          {
            name: "Namespace",
            type: "core::byte_array::ByteArray"
          },
          {
            name: "World",
            type: "()"
          },
          {
            name: "Unregistered",
            type: "()"
          }
        ]
      },
      {
        type: "struct",
        name: "dojo::model::metadata::ResourceMetadata",
        members: [
          {
            name: "resource_id",
            type: "core::felt252"
          },
          {
            name: "metadata_uri",
            type: "core::byte_array::ByteArray"
          },
          {
            name: "metadata_hash",
            type: "core::felt252"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::felt252>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::felt252>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::array::Span::<core::felt252>>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::array::Span::<core::felt252>>"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::model::definition::ModelIndex",
        variants: [
          {
            name: "Keys",
            type: "core::array::Span::<core::felt252>"
          },
          {
            name: "Id",
            type: "core::felt252"
          },
          {
            name: "MemberId",
            type: "(core::felt252, core::felt252)"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<core::integer::u8>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<core::integer::u8>"
          }
        ]
      },
      {
        type: "struct",
        name: "dojo::meta::layout::FieldLayout",
        members: [
          {
            name: "selector",
            type: "core::felt252"
          },
          {
            name: "layout",
            type: "dojo::meta::layout::Layout"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::meta::layout::FieldLayout>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::meta::layout::FieldLayout>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::meta::layout::Layout>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::meta::layout::Layout>"
          }
        ]
      },
      {
        type: "enum",
        name: "dojo::meta::layout::Layout",
        variants: [
          {
            name: "Fixed",
            type: "core::array::Span::<core::integer::u8>"
          },
          {
            name: "Struct",
            type: "core::array::Span::<dojo::meta::layout::FieldLayout>"
          },
          {
            name: "Tuple",
            type: "core::array::Span::<dojo::meta::layout::Layout>"
          },
          {
            name: "Array",
            type: "core::array::Span::<dojo::meta::layout::Layout>"
          },
          {
            name: "ByteArray",
            type: "()"
          },
          {
            name: "Enum",
            type: "core::array::Span::<dojo::meta::layout::FieldLayout>"
          }
        ]
      },
      {
        type: "struct",
        name: "core::array::Span::<dojo::model::definition::ModelIndex>",
        members: [
          {
            name: "snapshot",
            type: "@core::array::Array::<dojo::model::definition::ModelIndex>"
          }
        ]
      },
      {
        type: "enum",
        name: "core::bool",
        variants: [
          {
            name: "False",
            type: "()"
          },
          {
            name: "True",
            type: "()"
          }
        ]
      },
      {
        type: "interface",
        name: "dojo::world::iworld::IWorld",
        items: [
          {
            type: "function",
            name: "resource",
            inputs: [
              {
                name: "selector",
                type: "core::felt252"
              }
            ],
            outputs: [
              {
                type: "dojo::world::resource::Resource"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "uuid",
            inputs: [],
            outputs: [
              {
                type: "core::integer::u32"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "metadata",
            inputs: [
              {
                name: "resource_selector",
                type: "core::felt252"
              }
            ],
            outputs: [
              {
                type: "dojo::model::metadata::ResourceMetadata"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "set_metadata",
            inputs: [
              {
                name: "metadata",
                type: "dojo::model::metadata::ResourceMetadata"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_namespace",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_event",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_model",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "register_contract",
            inputs: [
              {
                name: "salt",
                type: "core::felt252"
              },
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [
              {
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "init_contract",
            inputs: [
              {
                name: "selector",
                type: "core::felt252"
              },
              {
                name: "init_calldata",
                type: "core::array::Span::<core::felt252>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_event",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_model",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "upgrade_contract",
            inputs: [
              {
                name: "namespace",
                type: "core::byte_array::ByteArray"
              },
              {
                name: "class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [
              {
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "emit_event",
            inputs: [
              {
                name: "event_selector",
                type: "core::felt252"
              },
              {
                name: "keys",
                type: "core::array::Span::<core::felt252>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::felt252>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "emit_events",
            inputs: [
              {
                name: "event_selector",
                type: "core::felt252"
              },
              {
                name: "keys",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [
              {
                type: "core::array::Span::<core::felt252>"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [
              {
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "set_entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "values",
                type: "core::array::Span::<core::felt252>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "set_entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "values",
                type: "core::array::Span::<core::array::Span::<core::felt252>>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "delete_entity",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "index",
                type: "dojo::model::definition::ModelIndex"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "delete_entities",
            inputs: [
              {
                name: "model_selector",
                type: "core::felt252"
              },
              {
                name: "indexes",
                type: "core::array::Span::<dojo::model::definition::ModelIndex>"
              },
              {
                name: "layout",
                type: "dojo::meta::layout::Layout"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "is_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [
              {
                type: "core::bool"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "grant_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "revoke_owner",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "address",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "is_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [
              {
                type: "core::bool"
              }
            ],
            state_mutability: "view"
          },
          {
            type: "function",
            name: "grant_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          },
          {
            type: "function",
            name: "revoke_writer",
            inputs: [
              {
                name: "resource",
                type: "core::felt252"
              },
              {
                name: "contract",
                type: "core::starknet::contract_address::ContractAddress"
              }
            ],
            outputs: [],
            state_mutability: "external"
          }
        ]
      },
      {
        type: "impl",
        name: "UpgradeableWorld",
        interface_name: "dojo::world::iworld::IUpgradeableWorld"
      },
      {
        type: "interface",
        name: "dojo::world::iworld::IUpgradeableWorld",
        items: [
          {
            type: "function",
            name: "upgrade",
            inputs: [
              {
                name: "new_class_hash",
                type: "core::starknet::class_hash::ClassHash"
              }
            ],
            outputs: [],
            state_mutability: "external"
          }
        ]
      },
      {
        type: "constructor",
        name: "constructor",
        inputs: [
          {
            name: "world_class_hash",
            type: "core::starknet::class_hash::ClassHash"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WorldSpawned",
        kind: "struct",
        members: [
          {
            name: "creator",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WorldUpgraded",
        kind: "struct",
        members: [
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::NamespaceRegistered",
        kind: "struct",
        members: [
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "hash",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ModelRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractRegistered",
        kind: "struct",
        members: [
          {
            name: "name",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "namespace",
            type: "core::byte_array::ByteArray",
            kind: "key"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "salt",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ModelUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "prev_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          },
          {
            name: "prev_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractUpgraded",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "class_hash",
            type: "core::starknet::class_hash::ClassHash",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::ContractInitialized",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "init_calldata",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::EventEmitted",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "system_address",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "keys",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::MetadataUpdate",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "uri",
            type: "core::byte_array::ByteArray",
            kind: "data"
          },
          {
            name: "hash",
            type: "core::felt252",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreSetRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "keys",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreUpdateRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreUpdateMember",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "member_selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "values",
            type: "core::array::Span::<core::felt252>",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::StoreDelRecord",
        kind: "struct",
        members: [
          {
            name: "selector",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "entity_id",
            type: "core::felt252",
            kind: "key"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::WriterUpdated",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "contract",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "value",
            type: "core::bool",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::OwnerUpdated",
        kind: "struct",
        members: [
          {
            name: "resource",
            type: "core::felt252",
            kind: "key"
          },
          {
            name: "contract",
            type: "core::starknet::contract_address::ContractAddress",
            kind: "key"
          },
          {
            name: "value",
            type: "core::bool",
            kind: "data"
          }
        ]
      },
      {
        type: "event",
        name: "dojo::world::world_contract::world::Event",
        kind: "enum",
        variants: [
          {
            name: "WorldSpawned",
            type: "dojo::world::world_contract::world::WorldSpawned",
            kind: "nested"
          },
          {
            name: "WorldUpgraded",
            type: "dojo::world::world_contract::world::WorldUpgraded",
            kind: "nested"
          },
          {
            name: "NamespaceRegistered",
            type: "dojo::world::world_contract::world::NamespaceRegistered",
            kind: "nested"
          },
          {
            name: "ModelRegistered",
            type: "dojo::world::world_contract::world::ModelRegistered",
            kind: "nested"
          },
          {
            name: "EventRegistered",
            type: "dojo::world::world_contract::world::EventRegistered",
            kind: "nested"
          },
          {
            name: "ContractRegistered",
            type: "dojo::world::world_contract::world::ContractRegistered",
            kind: "nested"
          },
          {
            name: "ModelUpgraded",
            type: "dojo::world::world_contract::world::ModelUpgraded",
            kind: "nested"
          },
          {
            name: "EventUpgraded",
            type: "dojo::world::world_contract::world::EventUpgraded",
            kind: "nested"
          },
          {
            name: "ContractUpgraded",
            type: "dojo::world::world_contract::world::ContractUpgraded",
            kind: "nested"
          },
          {
            name: "ContractInitialized",
            type: "dojo::world::world_contract::world::ContractInitialized",
            kind: "nested"
          },
          {
            name: "EventEmitted",
            type: "dojo::world::world_contract::world::EventEmitted",
            kind: "nested"
          },
          {
            name: "MetadataUpdate",
            type: "dojo::world::world_contract::world::MetadataUpdate",
            kind: "nested"
          },
          {
            name: "StoreSetRecord",
            type: "dojo::world::world_contract::world::StoreSetRecord",
            kind: "nested"
          },
          {
            name: "StoreUpdateRecord",
            type: "dojo::world::world_contract::world::StoreUpdateRecord",
            kind: "nested"
          },
          {
            name: "StoreUpdateMember",
            type: "dojo::world::world_contract::world::StoreUpdateMember",
            kind: "nested"
          },
          {
            name: "StoreDelRecord",
            type: "dojo::world::world_contract::world::StoreDelRecord",
            kind: "nested"
          },
          {
            name: "WriterUpdated",
            type: "dojo::world::world_contract::world::WriterUpdated",
            kind: "nested"
          },
          {
            name: "OwnerUpdated",
            type: "dojo::world::world_contract::world::OwnerUpdated",
            kind: "nested"
          }
        ]
      }
    ]
  },
  contracts: [
    {
      address: "0x1b6ffe59b903e633e87ef0f22aa59902efe6c3cea2b45a9543e4bc6329effda",
      class_hash: "0x14fb684a4dee1fb56a15dc5faa4f2c1df6d22b4ad86576223b21806c1d06c3f",
      abi: [
        {
          type: "impl",
          name: "Registry__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Registry__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [
            {
              name: "owner",
              type: "core::felt252"
            }
          ],
          outputs: [],
          state_mutability: "view"
        },
        {
          type: "impl",
          name: "RegistryImpl",
          interface_name: "arcade::systems::registry::IRegistry"
        },
        {
          type: "interface",
          name: "arcade::systems::registry::IRegistry",
          items: [
            {
              type: "function",
              name: "pin",
              inputs: [
                {
                  name: "achievement_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "unpin",
              inputs: [
                {
                  name: "achievement_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "register_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "update_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "publish_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "hide_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "whitelist_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "blacklist_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "remove_game",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "register_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                },
                {
                  name: "karma",
                  type: "core::integer::u16"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "update_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                },
                {
                  name: "karma",
                  type: "core::integer::u16"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "publish_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "hide_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "whitelist_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "blacklist_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "remove_achievement",
              inputs: [
                {
                  name: "world_address",
                  type: "core::felt252"
                },
                {
                  name: "namespace",
                  type: "core::felt252"
                },
                {
                  name: "identifier",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::initializable::InitializableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::registerable::RegisterableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "registry::components::trackable::TrackableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "achievement::components::pinnable::PinnableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::registry::Registry::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "InitializableEvent",
              type: "registry::components::initializable::InitializableComponent::Event",
              kind: "flat"
            },
            {
              name: "RegisterableEvent",
              type: "registry::components::registerable::RegisterableComponent::Event",
              kind: "flat"
            },
            {
              name: "TrackableEvent",
              type: "registry::components::trackable::TrackableComponent::Event",
              kind: "flat"
            },
            {
              name: "PinnableEvent",
              type: "achievement::components::pinnable::PinnableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [
        "0x6677fe62ee39c7b07401f754138502bab7fac99d2d3c5d37df7d1c6fab10819"
      ],
      tag: "ARCADE-Registry",
      selector: "0x54d3bcd441104e039ceaec4a413e72de393b65f79d1df74dc3346dc7f861173",
      systems: [
        "upgrade"
      ]
    },
    {
      address: "0x13fc6504be0dbe9bfcd127208822e32334887ee4e3c7366bb356e0eaf0e438a",
      class_hash: "0xeff274bcfc8782f81351d52a6c0809135c315159815019ffff5122410cf19f",
      abi: [
        {
          type: "impl",
          name: "Slot__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Slot__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "view"
        },
        {
          type: "impl",
          name: "SlotImpl",
          interface_name: "arcade::systems::slot::ISlot"
        },
        {
          type: "interface",
          name: "arcade::systems::slot::ISlot",
          items: [
            {
              type: "function",
              name: "deploy",
              inputs: [
                {
                  name: "service",
                  type: "core::integer::u8"
                },
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "tier",
                  type: "core::integer::u8"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "remove",
              inputs: [
                {
                  name: "service",
                  type: "core::integer::u8"
                },
                {
                  name: "project",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "hire",
              inputs: [
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "account_id",
                  type: "core::felt252"
                },
                {
                  name: "role",
                  type: "core::integer::u8"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "fire",
              inputs: [
                {
                  name: "project",
                  type: "core::felt252"
                },
                {
                  name: "account_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "provider::components::deployable::DeployableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "provider::components::groupable::GroupableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::slot::Slot::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "DeployableEvent",
              type: "provider::components::deployable::DeployableComponent::Event",
              kind: "flat"
            },
            {
              name: "GroupableEvent",
              type: "provider::components::groupable::GroupableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Slot",
      selector: "0x16361cb59732e8b56d69550297b7d8f86c6d1be2fc71b5dde135aeb1d16f3f7",
      systems: [
        "upgrade"
      ]
    },
    {
      address: "0x73e3dcc0388e307032e1ba2e2db407336495bca5bbc5c03b419df5456f442a8",
      class_hash: "0x6d0e156b1f19f6ec14ce9d80b4fa04c9704a568c81521ae047082327f46a831",
      abi: [
        {
          type: "impl",
          name: "Social__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Social__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "SocialImpl",
          interface_name: "arcade::systems::social::ISocial"
        },
        {
          type: "enum",
          name: "core::bool",
          variants: [
            {
              name: "False",
              type: "()"
            },
            {
              name: "True",
              type: "()"
            }
          ]
        },
        {
          type: "interface",
          name: "arcade::systems::social::ISocial",
          items: [
            {
              type: "function",
              name: "follow",
              inputs: [
                {
                  name: "target",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "unfollow",
              inputs: [
                {
                  name: "target",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "create_alliance",
              inputs: [
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "open_alliance",
              inputs: [
                {
                  name: "free",
                  type: "core::bool"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "close_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "crown_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "hire_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "fire_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "request_alliance",
              inputs: [
                {
                  name: "alliance_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "cancel_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "leave_alliance",
              inputs: [],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "create_guild",
              inputs: [
                {
                  name: "color",
                  type: "core::felt252"
                },
                {
                  name: "name",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "description",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "image",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "banner",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "discord",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "telegram",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "twitter",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "youtube",
                  type: "core::byte_array::ByteArray"
                },
                {
                  name: "website",
                  type: "core::byte_array::ByteArray"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "open_guild",
              inputs: [
                {
                  name: "free",
                  type: "core::bool"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "close_guild",
              inputs: [],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "crown_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "promote_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "demote_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "hire_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "fire_member",
              inputs: [
                {
                  name: "member_id",
                  type: "core::felt252"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "request_guild",
              inputs: [
                {
                  name: "guild_id",
                  type: "core::integer::u32"
                }
              ],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "cancel_guild",
              inputs: [],
              outputs: [],
              state_mutability: "view"
            },
            {
              type: "function",
              name: "leave_guild",
              inputs: [],
              outputs: [],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "view"
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::allianceable::AllianceableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::followable::FollowableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "social::components::guildable::GuildableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::social::Social::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "AllianceableEvent",
              type: "social::components::allianceable::AllianceableComponent::Event",
              kind: "flat"
            },
            {
              name: "FollowableEvent",
              type: "social::components::followable::FollowableComponent::Event",
              kind: "flat"
            },
            {
              name: "GuildableEvent",
              type: "social::components::guildable::GuildableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Social",
      selector: "0x28532a65d3bfdb030133a56031e467c489058fee53a3bd903adc719735aa6c5",
      systems: [
        "upgrade"
      ]
    },
    {
      address: "0x764c8b778e11a48cd6c6f626eaa1b515c272a3ee3c52de2b13bd10969afec38",
      class_hash: "0x580ba5d9a580a061630f436f0565dc5bb048f5daee84d79741fda5ce765c2f",
      abi: [
        {
          type: "impl",
          name: "Wallet__ContractImpl",
          interface_name: "dojo::contract::interface::IContract"
        },
        {
          type: "interface",
          name: "dojo::contract::interface::IContract",
          items: []
        },
        {
          type: "impl",
          name: "Wallet__DeployedContractImpl",
          interface_name: "dojo::meta::interface::IDeployedResource"
        },
        {
          type: "struct",
          name: "core::byte_array::ByteArray",
          members: [
            {
              name: "data",
              type: "core::array::Array::<core::bytes_31::bytes31>"
            },
            {
              name: "pending_word",
              type: "core::felt252"
            },
            {
              name: "pending_word_len",
              type: "core::integer::u32"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::meta::interface::IDeployedResource",
          items: [
            {
              type: "function",
              name: "dojo_name",
              inputs: [],
              outputs: [
                {
                  type: "core::byte_array::ByteArray"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "WalletImpl",
          interface_name: "arcade::systems::wallet::IWallet"
        },
        {
          type: "interface",
          name: "arcade::systems::wallet::IWallet",
          items: []
        },
        {
          type: "function",
          name: "dojo_init",
          inputs: [],
          outputs: [],
          state_mutability: "view"
        },
        {
          type: "impl",
          name: "WorldProviderImpl",
          interface_name: "dojo::contract::components::world_provider::IWorldProvider"
        },
        {
          type: "struct",
          name: "dojo::world::iworld::IWorldDispatcher",
          members: [
            {
              name: "contract_address",
              type: "core::starknet::contract_address::ContractAddress"
            }
          ]
        },
        {
          type: "interface",
          name: "dojo::contract::components::world_provider::IWorldProvider",
          items: [
            {
              type: "function",
              name: "world_dispatcher",
              inputs: [],
              outputs: [
                {
                  type: "dojo::world::iworld::IWorldDispatcher"
                }
              ],
              state_mutability: "view"
            }
          ]
        },
        {
          type: "impl",
          name: "UpgradeableImpl",
          interface_name: "dojo::contract::components::upgradeable::IUpgradeable"
        },
        {
          type: "interface",
          name: "dojo::contract::components::upgradeable::IUpgradeable",
          items: [
            {
              type: "function",
              name: "upgrade",
              inputs: [
                {
                  name: "new_class_hash",
                  type: "core::starknet::class_hash::ClassHash"
                }
              ],
              outputs: [],
              state_mutability: "external"
            }
          ]
        },
        {
          type: "constructor",
          name: "constructor",
          inputs: []
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
          kind: "struct",
          members: [
            {
              name: "class_hash",
              type: "core::starknet::class_hash::ClassHash",
              kind: "data"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
          kind: "enum",
          variants: [
            {
              name: "Upgraded",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Upgraded",
              kind: "nested"
            }
          ]
        },
        {
          type: "event",
          name: "dojo::contract::components::world_provider::world_provider_cpt::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "controller::components::controllable::ControllableComponent::Event",
          kind: "enum",
          variants: []
        },
        {
          type: "event",
          name: "arcade::systems::wallet::Wallet::Event",
          kind: "enum",
          variants: [
            {
              name: "UpgradeableEvent",
              type: "dojo::contract::components::upgradeable::upgradeable_cpt::Event",
              kind: "nested"
            },
            {
              name: "WorldProviderEvent",
              type: "dojo::contract::components::world_provider::world_provider_cpt::Event",
              kind: "nested"
            },
            {
              name: "ControllableEvent",
              type: "controller::components::controllable::ControllableComponent::Event",
              kind: "flat"
            }
          ]
        }
      ],
      init_calldata: [],
      tag: "ARCADE-Wallet",
      selector: "0x69ba9525fdd6458dfaea7f06bcfd0cf5fef14d66c5516cf8548c2e2b845c6a5",
      systems: [
        "upgrade"
      ]
    }
  ],
  models: [
    {
      members: [],
      class_hash: "0x4e2a4a65e9597fae6a3db15dbf8360cbb90ac4b00803eb24715b0d3c6b62867",
      tag: "ARCADE-Access",
      selector: "0x4de83c9f22c74953e76afcef63ce27a77e04d2304133da1ec46fa2e46a0c40f"
    },
    {
      members: [],
      class_hash: "0x4e923487edecb8caba2730b7eb7ada85e31c9a3ab2bc6b865cb7a7723d7d4eb",
      tag: "ARCADE-Account",
      selector: "0x7e96bc903044d45737e5ec7e23b596e8e7f110a1b1f80d413b53725c7bbb2f6"
    },
    {
      members: [],
      class_hash: "0x509b4c7c85a5ad6ede5f70f838fe3b039e09fe9e1537e522e562a8c2fa887b4",
      tag: "ARCADE-Achievement",
      selector: "0x4909446396e41e99e20f04d9f5d9e83ab83beea6089c76d0fef29b034de9736"
    },
    {
      members: [],
      class_hash: "0x7df003249b5e6e8245535a62572e64cc5e659bbf0dfd8371a7535f2d5e35fcf",
      tag: "ARCADE-Alliance",
      selector: "0x74a88ab0bed983c65d7e57761329312c125ef0be4ef7889f560153000132866"
    },
    {
      members: [],
      class_hash: "0x8d4d1e78893b9b0e541eb5e20913057e7f70acd6e0302d9a8357c594db1015",
      tag: "ARCADE-Controller",
      selector: "0x7b2fac00792560d241723d9852f29e952bb0ecc88219dd3fb86b61796dc5952"
    },
    {
      members: [],
      class_hash: "0x707deea7afe8c277a3de09d5ccb124bf1f727ea61f0bcb618c5e7f2de4c2d5f",
      tag: "ARCADE-Deployment",
      selector: "0x5354f17394d652912bae10be363d24d155edbdb936fa275f855491253cb63a4"
    },
    {
      members: [],
      class_hash: "0x46ee9af02075375a761b271a5fb5896bf34f7040f35d3f4d2793006f2db5e37",
      tag: "ARCADE-Factory",
      selector: "0x59995d7c14b165cb6738a67e319c6ad553a58d9c05f87f0c35190b13e1c223"
    },
    {
      members: [],
      class_hash: "0x2fd5d2cccf18fcf8c974292188bd6fef67c7c0ea20029e3c408e78d786b0a2e",
      tag: "ARCADE-Game",
      selector: "0x6143bc86ed1a08df992c568392c454a92ef7e7b5ba08e9bf75643cf5cfc8b14"
    },
    {
      members: [],
      class_hash: "0x1185b7a812122ae5f379da16f06cd9fcd04c2772f7175d50b13540f4989c1fc",
      tag: "ARCADE-Guild",
      selector: "0x95501f151f575b4fab06c5ceb7237739dd0608982727cbc226273aecf006aa"
    },
    {
      members: [],
      class_hash: "0x4a047a959c45cda7b6e9abced79278c26c08413a829e15165004dc964749678",
      tag: "ARCADE-Member",
      selector: "0x7b9b4b91d2d7823ac5c041c32867f856e6393905bedb2c4b7f58d56bf13ec43"
    },
    {
      members: [],
      class_hash: "0x693b5887e2b62bea0163daae7ecfc98e02aa1c32469ccb4d831de4bc19ab719",
      tag: "ARCADE-Signer",
      selector: "0x79493096b3a4188aade984eaf8272a97748ee48111c1f7e6683a89f64406c1a"
    },
    {
      members: [],
      class_hash: "0x398bdccbc7f8450bb139af04a99a0fddd8367b3bd21202095ec1df96108df98",
      tag: "ARCADE-Team",
      selector: "0x56407a8963e9ebbb56d8c167c40bc0bd8ce7e38ac48c632421d5cf3dc865a01"
    },
    {
      members: [],
      class_hash: "0x6fd8d97850b3e9d127a5b457bfa76d3048a74f25074ce40f929e9e6b4d356fd",
      tag: "ARCADE-Teammate",
      selector: "0x56a4d220830ecdcb5e816e49c743a4e0f784b7bdea24737be188d1f1059308e"
    }
  ],
  events: [
    {
      members: [],
      class_hash: "0x1d83651f32df4a5e3a1c8ef52c8f77fc9b99463c41246839203d11a54c8e631",
      tag: "ARCADE-Follow",
      selector: "0x38866790c8a50b1c2d43786d8d06856b7ab65ce7a59e136bc47fbae18b147f1"
    },
    {
      members: [],
      class_hash: "0x40ce2ebeff98431ff013e5b8deeff73fbb562a38950c8eb391998f022ac18a5",
      tag: "ARCADE-TrophyPinning",
      selector: "0x7b9d51ffd54b6bfa69d849bf8f35fb7bb08820e792d3eeca9dd990f4905aacb"
    }
  ]
};

// src/manifests/index.ts
var Network = /* @__PURE__ */ ((Network2) => {
  Network2["Slot"] = "slot";
  Network2["Sepolia"] = "sepolia";
  Network2["Default"] = "default";
  return Network2;
})(Network || {});
var manifests = {
  ["slot" /* Slot */]: manifest_slot_default,
  ["sepolia" /* Sepolia */]: manifest_sepolia_default,
  ["default" /* Default */]: manifest_sepolia_default
};

// src/modules/registry/game.ts
var import_starknet2 = require("starknet");

// src/classes/metadata.ts
var Metadata = class _Metadata {
  constructor(color, name, description, image, banner) {
    this.color = color;
    this.name = name;
    this.description = description;
    this.image = image;
    this.banner = banner;
    this.color = color;
    this.name = name;
    this.description = description;
    this.image = image;
    this.banner = banner;
  }
  static from(value) {
    try {
      const json = JSON.parse(value);
      return new _Metadata(json.color, json.name, json.description, json.image, json.banner);
    } catch (error) {
      console.error("Error parsing metadata:", error);
      return new _Metadata("", "", "", "", "");
    }
  }
};

// src/classes/socials.ts
var Socials = class _Socials {
  constructor(discord, telegram, twitter, youtube, website) {
    this.discord = discord;
    this.telegram = telegram;
    this.twitter = twitter;
    this.youtube = youtube;
    this.website = website;
    this.discord = discord;
    this.telegram = telegram;
    this.twitter = twitter;
    this.youtube = youtube;
    this.website = website;
  }
  static from(value) {
    try {
      const json = JSON.parse(value);
      return new _Socials(json.discord, json.telegram, json.twitter, json.youtube, json.website);
    } catch (error) {
      console.error("Error parsing socials:", error);
      return new _Socials("", "", "", "", "");
    }
  }
};

// src/modules/registry/game.ts
var MODEL_NAME = "Game";
var GameModel = class _GameModel {
  constructor(worldAddress, namespace, project, preset, active, published, whitelisted, priority, karma, metadata, socials, owner) {
    this.worldAddress = worldAddress;
    this.namespace = namespace;
    this.project = project;
    this.preset = preset;
    this.active = active;
    this.published = published;
    this.whitelisted = whitelisted;
    this.priority = priority;
    this.karma = karma;
    this.metadata = metadata;
    this.socials = socials;
    this.owner = owner;
    this.worldAddress = worldAddress;
    this.namespace = namespace;
    this.project = project;
    this.preset = preset;
    this.active = active;
    this.published = published;
    this.whitelisted = whitelisted;
    this.priority = priority;
    this.karma = karma;
    this.metadata = metadata;
    this.socials = socials;
    this.owner = owner;
  }
  type = MODEL_NAME;
  static from(model) {
    const worldAddress = (0, import_starknet2.addAddressPadding)(model.world_address);
    const namespace = import_starknet2.shortString.decodeShortString(`0x${BigInt(model.namespace).toString(16)}`);
    const project = import_starknet2.shortString.decodeShortString(`0x${BigInt(model.project).toString(16)}`);
    const preset = import_starknet2.shortString.decodeShortString(`0x${BigInt(model.preset).toString(16)}`);
    const active = !!model.active;
    const published = !!model.published;
    const whitelisted = !!model.whitelisted;
    const priority = Number(model.priority);
    const karma = Number(model.karma);
    const metadata = Metadata.from(model.metadata);
    const socials = Socials.from(model.socials);
    const owner = (0, import_starknet2.addAddressPadding)(model.owner);
    return new _GameModel(
      worldAddress,
      namespace,
      project,
      preset,
      active,
      published,
      whitelisted,
      priority,
      karma,
      metadata,
      socials,
      owner
    );
  }
  static isType(model) {
    return model.type === MODEL_NAME;
  }
};
var Game = {
  parse: (entity) => {
    return GameModel.from(entity.models[NAMESPACE][MODEL_NAME]);
  },
  getModelName: () => {
    return MODEL_NAME;
  },
  getQueryEntity: () => {
    return (entity) => entity.neq("world_address", "0x0");
  },
  getMethods: () => [
    { name: "register_game", entrypoint: "register_game", description: "Register a game." },
    { name: "update_game", entrypoint: "update_game", description: "Update a game." },
    { name: "publish_game", entrypoint: "publish_game", description: "Publish a game." },
    { name: "hide_game", entrypoint: "hide_game", description: "Hide a game." },
    { name: "whitelist_game", entrypoint: "whitelist_game", description: "Whitelist a game." },
    { name: "blacklist_game", entrypoint: "blacklist_game", description: "Blacklist a game." },
    { name: "remove_game", entrypoint: "remove_game", description: "Remove a game." }
  ]
};

// src/modules/registry/achievement.ts
var import_starknet3 = require("starknet");
var MODEL_NAME2 = "Achievement";
var AchievementModel = class _AchievementModel {
  constructor(worldAddress, namespace, id, published, whitelisted, karma) {
    this.worldAddress = worldAddress;
    this.namespace = namespace;
    this.id = id;
    this.published = published;
    this.whitelisted = whitelisted;
    this.karma = karma;
    this.worldAddress = worldAddress;
    this.namespace = namespace;
    this.id = id;
    this.published = published;
    this.whitelisted = whitelisted;
    this.karma = karma;
  }
  type = MODEL_NAME2;
  static from(model) {
    const worldAddress = (0, import_starknet3.addAddressPadding)(model.world_address);
    const namespace = import_starknet3.shortString.decodeShortString(`0x${BigInt(model.namespace).toString(16)}`);
    const id = import_starknet3.shortString.decodeShortString(`0x${BigInt(model.id).toString(16)}`);
    const published = !!model.published;
    const whitelisted = !!model.whitelisted;
    const karma = Number(model.karma);
    return new _AchievementModel(worldAddress, namespace, id, published, whitelisted, karma);
  }
  static isType(model) {
    return model.type === MODEL_NAME2;
  }
};
var Achievement = {
  parse: (entity) => {
    return AchievementModel.from(entity.models[NAMESPACE][MODEL_NAME2]);
  },
  getModelName: () => {
    return MODEL_NAME2;
  },
  getQueryEntity: () => {
    return (entity) => entity.neq("world_address", "0x0");
  },
  getMethods: () => [
    { name: "register_achievement", entrypoint: "register_achievement", description: "Register an achievement." },
    { name: "update_achievement", entrypoint: "update_achievement", description: "Update an achievement." },
    { name: "publish_achievement", entrypoint: "publish_achievement", description: "Publish an achievement." },
    { name: "hide_achievement", entrypoint: "hide_achievement", description: "Hide an achievement." },
    { name: "whitelist_achievement", entrypoint: "whitelist_achievement", description: "Whitelist an achievement." },
    { name: "blacklist_achievement", entrypoint: "blacklist_achievement", description: "Blacklist an achievement." },
    { name: "remove_achievement", entrypoint: "remove_achievement", description: "Remove an achievement." }
  ]
};

// src/modules/registry/index.ts
var import_sdk = require("@dojoengine/sdk");

// src/modules/registry/options.ts
var DefaultRegistryOptions = {
  game: true,
  achievement: true
};

// src/modules/registry/policies.ts
var CONTRACT_NAME = "Registry";
var CONTRACT_TAG = `${NAMESPACE}-${CONTRACT_NAME}`;
var CONTRACT_DESCRIPTION = "Registry contract for games and achievements";
var getRegistryPolicies = (chainId, options = DefaultRegistryOptions) => {
  const config = configs[chainId];
  const address = getContractByName(config.manifest, CONTRACT_TAG);
  return {
    contracts: {
      [address]: {
        name: CONTRACT_NAME,
        description: CONTRACT_DESCRIPTION,
        methods: [...options.game ? Game.getMethods() : [], ...options.achievement ? Achievement.getMethods() : []]
      }
    }
  };
};

// src/modules/registry/index.ts
var Registry2 = {
  sdk: void 0,
  unsubEntities: void 0,
  init: async (chainId) => {
    Registry2.sdk = await initSDK(chainId);
  },
  isEntityQueryable(options) {
    return options.game || options.achievement;
  },
  getEntityQuery: (options = DefaultRegistryOptions) => {
    return new import_sdk.QueryBuilder().namespace(NAMESPACE, (namespace) => {
      let query = namespace;
      if (options.game) query = query.entity(Game.getModelName(), Game.getQueryEntity());
      if (options.achievement) query = query.entity(Achievement.getModelName(), Achievement.getQueryEntity());
      return query;
    }).build();
  },
  fetchEntities: async (callback, options) => {
    if (!Registry2.sdk) return;
    const wrappedCallback = ({
      data,
      error
    }) => {
      if (error) {
        console.error("Error fetching entities:", error);
        return;
      }
      if (!data) return;
      const models = [];
      data.forEach((entity) => {
        if (entity.models[NAMESPACE][Achievement.getModelName()]) {
          models.push(Achievement.parse(entity));
        }
        if (entity.models[NAMESPACE][Game.getModelName()]) {
          models.push(Game.parse(entity));
        }
      });
      callback(models);
    };
    const query = Registry2.getEntityQuery(options);
    await Registry2.sdk.getEntities({ query, callback: wrappedCallback });
  },
  subEntities: async (callback, options) => {
    if (!Registry2.sdk) return;
    const wrappedCallback = ({
      data,
      error
    }) => {
      if (error) {
        console.error("Error subscribing to entities:", error);
        return;
      }
      if (!data || data.length === 0 || data[0].entityId === "0x0") return;
      const entity = data[0];
      if (entity.models[NAMESPACE][Achievement.getModelName()]) {
        callback([Achievement.parse(entity)]);
      }
      if (entity.models[NAMESPACE][Game.getModelName()]) {
        callback([Game.parse(entity)]);
      }
    };
    const query = Registry2.getEntityQuery(options);
    const subscription = await Registry2.sdk.subscribeEntityQuery({ query, callback: wrappedCallback });
    Registry2.unsubEntities = () => subscription.cancel();
  },
  fetch: async (callback, options = DefaultRegistryOptions) => {
    if (!Registry2.sdk) {
      throw new Error("SDK not initialized");
    }
    if (Registry2.isEntityQueryable(options)) {
      await Registry2.fetchEntities(callback, options);
    }
  },
  sub: async (callback, options = DefaultRegistryOptions) => {
    if (!Registry2.sdk) {
      throw new Error("SDK not initialized");
    }
    if (Registry2.isEntityQueryable(options)) {
      await Registry2.subEntities(callback, options);
    }
  },
  unsub: () => {
    if (Registry2.unsubEntities) {
      Registry2.unsubEntities();
      Registry2.unsubEntities = void 0;
    }
  }
};

// src/modules/social/pin.ts
var import_starknet4 = require("starknet");
var MODEL_NAME3 = "TrophyPinning";
var PinEvent = class _PinEvent {
  constructor(playerId, achievementId, time) {
    this.playerId = playerId;
    this.achievementId = achievementId;
    this.time = time;
    this.playerId = playerId;
    this.achievementId = achievementId;
    this.time = time;
  }
  type = MODEL_NAME3;
  static from(model) {
    const playerId = (0, import_starknet4.addAddressPadding)(model.player_id);
    const achievementId = `0x${BigInt(String(model.achievement_id)).toString(16)}`;
    const time = Number(model.time);
    return new _PinEvent(playerId, achievementId, time);
  }
  static isType(model) {
    return model.type === MODEL_NAME3;
  }
};
var Pin = {
  parse: (entity) => {
    return PinEvent.from(entity.models[NAMESPACE][MODEL_NAME3]);
  },
  getModelName: () => {
    return MODEL_NAME3;
  },
  getQueryEntity: () => {
    return (entity) => entity.neq("player_id", "0x0");
  },
  getMethods: () => [
    { name: "pin", entrypoint: "pin", description: "Pin an achievement." },
    { name: "unpin", entrypoint: "unpin", description: "Unpin an achievement." }
  ]
};

// src/modules/social/follow.ts
var import_starknet5 = require("starknet");
var MODEL_NAME4 = "Follow";
var FollowEvent = class _FollowEvent {
  constructor(follower, followed, time) {
    this.follower = follower;
    this.followed = followed;
    this.time = time;
    this.follower = follower;
    this.followed = followed;
    this.time = time;
  }
  type = MODEL_NAME4;
  static from(model) {
    const follower = (0, import_starknet5.addAddressPadding)(model.follower);
    const followed = (0, import_starknet5.addAddressPadding)(model.followed);
    const time = Number(model.time);
    return new _FollowEvent(follower, followed, time);
  }
  static isType(model) {
    return model.type === MODEL_NAME4;
  }
};
var Follow = {
  parse: (entity) => {
    return FollowEvent.from(entity.models[NAMESPACE][MODEL_NAME4]);
  },
  getModelName: () => {
    return MODEL_NAME4;
  },
  getQueryEntity: () => {
    return (entity) => entity.neq("follower", "0x0");
  },
  getMethods: () => [
    { name: "follow", entrypoint: "follow", description: "Follow another player." },
    { name: "unfollow", entrypoint: "unfollow", description: "Unfollow a player." }
  ]
};

// src/modules/social/guild.ts
var MODEL_NAME5 = "Guild";
var GuildModel = class _GuildModel {
  constructor(id, open, free, guildCount, metadata, socials) {
    this.id = id;
    this.open = open;
    this.free = free;
    this.guildCount = guildCount;
    this.metadata = metadata;
    this.socials = socials;
    this.id = id;
    this.open = open;
    this.free = free;
    this.guildCount = guildCount;
    this.metadata = metadata;
    this.socials = socials;
  }
  type = MODEL_NAME5;
  static from(model) {
    const id = Number(model.id);
    const open = !!model.open;
    const free = !!model.free;
    const guildCount = Number(model.guild_count);
    const metadata = Metadata.from(model.metadata);
    const socials = Socials.from(model.socials);
    return new _GuildModel(id, open, free, guildCount, metadata, socials);
  }
  static isType(model) {
    return model.type === MODEL_NAME5;
  }
};
var Guild = {
  parse: (entity) => {
    return GuildModel.from(entity.models[NAMESPACE][MODEL_NAME5]);
  },
  getModelName: () => {
    return MODEL_NAME5;
  },
  getQueryNamespace: () => {
    return (namespace) => namespace.entity(MODEL_NAME5, Guild.getQueryEntity());
  },
  getQueryEntity: () => {
    return (entity) => entity.neq("id", "0x0");
  },
  getMethods: () => [
    { name: "create_guild", entrypoint: "create_guild", description: "Create a guild." },
    { name: "open_guild", entrypoint: "open_guild", description: "Open a guild." },
    { name: "close_guild", entrypoint: "close_guild", description: "Close a guild." },
    { name: "crown_member", entrypoint: "crown_member", description: "Crown a member to lead the guild." },
    { name: "promote_member", entrypoint: "promote_member", description: "Promote a member to officer." },
    { name: "demote_member", entrypoint: "demote_member", description: "Demote an officer to member." },
    { name: "hire_member", entrypoint: "hire_member", description: "Hire a member to the guild." },
    { name: "fire_member", entrypoint: "fire_member", description: "Fire a member from the guild." }
  ]
};

// src/modules/social/alliance.ts
var MODEL_NAME6 = "Alliance";
var AllianceModel = class _AllianceModel {
  constructor(id, open, free, guildCount, metadata, socials) {
    this.id = id;
    this.open = open;
    this.free = free;
    this.guildCount = guildCount;
    this.metadata = metadata;
    this.socials = socials;
    this.id = id;
    this.open = open;
    this.free = free;
    this.guildCount = guildCount;
    this.metadata = metadata;
    this.socials = socials;
  }
  type = MODEL_NAME6;
  static from(model) {
    const id = Number(model.id);
    const open = !!model.open;
    const free = !!model.free;
    const guildCount = Number(model.guild_count);
    const metadata = Metadata.from(model.metadata);
    const socials = Socials.from(model.socials);
    return new _AllianceModel(id, open, free, guildCount, metadata, socials);
  }
  static isType(model) {
    return model.type === MODEL_NAME6;
  }
};
var Alliance = {
  parse: (entity) => {
    return AllianceModel.from(entity.models[NAMESPACE][MODEL_NAME6]);
  },
  getModelName: () => {
    return MODEL_NAME6;
  },
  getQueryEntity: () => {
    return (entity) => entity.neq("id", "0x0");
  },
  getMethods: () => [
    { name: "create_alliance", entrypoint: "create_alliance", description: "Create an alliance." },
    { name: "open_alliance", entrypoint: "open_alliance", description: "Open an alliance." },
    { name: "close_alliance", entrypoint: "close_alliance", description: "Close an alliance." },
    { name: "crown_guild", entrypoint: "crown_guild", description: "Crown a guild to lead the alliance." },
    { name: "hire_guild", entrypoint: "hire_guild", description: "Hire a guild in the alliance." },
    { name: "fire_guild", entrypoint: "fire_guild", description: "Fire a guild from the alliance." },
    { name: "request_alliance", entrypoint: "request_alliance", description: "Request to join an alliance." },
    { name: "cancel_alliance", entrypoint: "cancel_alliance", description: "Cancel a request to join an alliance." },
    { name: "leave_alliance", entrypoint: "leave_alliance", description: "Leave an alliance." }
  ]
};

// src/modules/social/member.ts
var import_starknet6 = require("starknet");
var MODEL_NAME7 = "Member";
var MemberModel = class _MemberModel {
  constructor(id, role, guildId, pendingGuildId) {
    this.id = id;
    this.role = role;
    this.guildId = guildId;
    this.pendingGuildId = pendingGuildId;
    this.id = id;
    this.role = role;
    this.guildId = guildId;
    this.pendingGuildId = pendingGuildId;
  }
  type = MODEL_NAME7;
  static from(model) {
    const id = (0, import_starknet6.addAddressPadding)(model.id);
    const role = Number(model.role);
    const guildId = Number(model.guild_id);
    const pendingGuildId = Number(model.pending_guild_id);
    return new _MemberModel(id, role, guildId, pendingGuildId);
  }
  static isType(model) {
    return model.type === MODEL_NAME7;
  }
};
var Member = {
  parse: (entity) => {
    return MemberModel.from(entity.models[NAMESPACE][MODEL_NAME7]);
  },
  getModelName: () => {
    return MODEL_NAME7;
  },
  getQueryEntity: () => {
    return (entity) => entity.neq("id", "0x0");
  },
  getMethods: () => []
};

// src/modules/social/index.ts
var import_sdk2 = require("@dojoengine/sdk");

// src/modules/social/options.ts
var DefaultSocialOptions = {
  pin: true,
  follow: true,
  member: true,
  guild: true,
  alliance: true
};

// src/modules/social/policies.ts
var CONTRACT_NAME2 = "Social";
var CONTRACT_TAG2 = `${NAMESPACE}-${CONTRACT_NAME2}`;
var CONTRACT_DESCRIPTION2 = "Social contract to manage your social activities";
var getSocialPolicies = (chainId, options = DefaultSocialOptions) => {
  const config = configs[chainId];
  const address = getContractByName(config.manifest, CONTRACT_TAG2);
  return {
    contracts: {
      [address]: {
        name: CONTRACT_NAME2,
        description: CONTRACT_DESCRIPTION2,
        methods: [
          ...options.pin ? Pin.getMethods() : [],
          ...options.follow ? Follow.getMethods() : [],
          ...options.member ? Member.getMethods() : [],
          ...options.guild ? Guild.getMethods() : [],
          ...options.alliance ? Alliance.getMethods() : []
        ]
      }
    }
  };
};

// src/modules/social/index.ts
var Social2 = {
  sdk: void 0,
  unsubEntities: void 0,
  unsubEvents: void 0,
  init: async (chainId) => {
    Social2.sdk = await initSDK(chainId);
  },
  isEntityQueryable(options) {
    return options.alliance || options.guild || options.member;
  },
  isEventQueryable(options) {
    return options.pin || options.follow;
  },
  getEntityQuery: (options = DefaultSocialOptions) => {
    return new import_sdk2.QueryBuilder().namespace(NAMESPACE, (namespace) => {
      let query = namespace;
      if (options.alliance) query = query.entity(Alliance.getModelName(), Alliance.getQueryEntity());
      if (options.guild) query = query.entity(Guild.getModelName(), Guild.getQueryEntity());
      if (options.member) query = query.entity(Member.getModelName(), Member.getQueryEntity());
      return query;
    }).build();
  },
  getEventQuery: (options = DefaultSocialOptions) => {
    return new import_sdk2.QueryBuilder().namespace(NAMESPACE, (namespace) => {
      let query = namespace;
      if (options.pin) query = query.entity(Pin.getModelName(), Pin.getQueryEntity());
      if (options.follow) query = query.entity(Follow.getModelName(), Follow.getQueryEntity());
      return query;
    }).build();
  },
  fetchEntities: async (callback, options) => {
    if (!Social2.sdk) return;
    const wrappedCallback = ({
      data,
      error
    }) => {
      if (error) {
        console.error("Error fetching entities:", error);
        return;
      }
      if (!data) return;
      const models = [];
      data.forEach((entity) => {
        if (entity.models[NAMESPACE][Alliance.getModelName()]) {
          models.push(Alliance.parse(entity));
        }
        if (entity.models[NAMESPACE][Guild.getModelName()]) {
          models.push(Guild.parse(entity));
        }
        if (entity.models[NAMESPACE][Member.getModelName()]) {
          models.push(Member.parse(entity));
        }
      });
      callback(models);
    };
    const query = Social2.getEntityQuery(options);
    await Social2.sdk.getEntities({ query, callback: wrappedCallback });
  },
  fetchEvents: async (callback, options) => {
    if (!Social2.sdk) return;
    const wrappedCallback = ({
      data,
      error
    }) => {
      if (error) {
        console.error("Error fetching entities:", error);
        return;
      }
      if (!data) return;
      const events = [];
      data.forEach((entity) => {
        if (entity.models[NAMESPACE][Pin.getModelName()]) {
          events.push(Pin.parse(entity));
        }
        if (entity.models[NAMESPACE][Follow.getModelName()]) {
          events.push(Follow.parse(entity));
        }
      });
      callback(events);
    };
    const query = Social2.getEventQuery(options);
    await Social2.sdk.getEventMessages({ query, historical: false, callback: wrappedCallback });
  },
  subEntities: async (callback, options) => {
    if (!Social2.sdk) return;
    const wrappedCallback = ({
      data,
      error
    }) => {
      if (error) {
        console.error("Error subscribing to entities:", error);
        return;
      }
      if (!data || data.length === 0 || data[0].entityId === "0x0") return;
      const entity = data[0];
      if (entity.models[NAMESPACE][Alliance.getModelName()]) {
        callback([Alliance.parse(entity)]);
      }
      if (entity.models[NAMESPACE][Guild.getModelName()]) {
        callback([Guild.parse(entity)]);
      }
      if (entity.models[NAMESPACE][Member.getModelName()]) {
        callback([Member.parse(entity)]);
      }
    };
    const query = Social2.getEntityQuery(options);
    const subscription = await Social2.sdk.subscribeEntityQuery({ query, callback: wrappedCallback });
    Social2.unsubEntities = () => subscription.cancel();
  },
  subEvents: async (callback, options) => {
    if (!Social2.sdk) return;
    const wrappedCallback = ({
      data,
      error
    }) => {
      if (error) {
        console.error("Error subscribing to entities:", error);
        return;
      }
      if (!data || data.length === 0 || data[0].entityId === "0x0") return;
      const entity = data[0];
      if (entity.models[NAMESPACE][Pin.getModelName()]) {
        callback([Pin.parse(entity)]);
      }
      if (entity.models[NAMESPACE][Follow.getModelName()]) {
        callback([Follow.parse(entity)]);
      }
    };
    const query = Social2.getEventQuery(options);
    const subscription = await Social2.sdk.subscribeEventQuery({ query, callback: wrappedCallback });
    Social2.unsubEvents = () => subscription.cancel();
  },
  fetch: async (callback, options = DefaultSocialOptions) => {
    if (!Social2.sdk) {
      throw new Error("SDK not initialized");
    }
    if (Social2.isEntityQueryable(options)) {
      await Social2.fetchEntities(callback, options);
    }
    if (Social2.isEventQueryable(options)) {
      await Social2.fetchEvents(callback, options);
    }
  },
  sub: async (callback, options = DefaultSocialOptions) => {
    if (!Social2.sdk) {
      throw new Error("SDK not initialized");
    }
    if (Social2.isEntityQueryable(options)) {
      await Social2.subEntities(callback, options);
    }
    if (Social2.isEventQueryable(options)) {
      await Social2.subEvents(callback, options);
    }
  },
  unsub: () => {
    if (Social2.unsubEntities) {
      Social2.unsubEntities();
      Social2.unsubEntities = void 0;
    }
    if (Social2.unsubEvents) {
      Social2.unsubEvents();
      Social2.unsubEvents = void 0;
    }
  }
};

// src/modules/index.ts
var import_sdk3 = require("@dojoengine/sdk");
var import_starknet7 = require("starknet");
var initSDK = async (chainId) => {
  const config = configs[chainId];
  return (0, import_sdk3.init)(
    {
      client: {
        rpcUrl: config.rpcUrl,
        toriiUrl: config.toriiUrl,
        relayUrl: config.relayUrl,
        worldAddress: config.manifest.world.address
      },
      domain: {
        name: "Arcade",
        version: "1.0",
        chainId: import_starknet7.shortString.decodeShortString(chainId),
        revision: "1"
      }
    },
    schema
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AchievementModel,
  AllianceModel,
  ArcadeProvider,
  DojoEmitterProvider,
  FollowEvent,
  GameModel,
  GuildModel,
  MemberModel,
  Metadata,
  ModelsMapping,
  NAMESPACE,
  Network,
  PinEvent,
  Registry,
  Social,
  Socials,
  TransactionType,
  getRegistryPolicies,
  getSocialPolicies,
  initSDK,
  manifests,
  schema,
  sepolia,
  setupWorld,
  slot
});
//# sourceMappingURL=index.js.map