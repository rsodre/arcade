import { NAMESPACE } from "../../constants";
import { shortString, addAddressPadding } from "starknet";
import { SchemaType } from "../../bindings";
import { MemberClause, ParsedEntity } from "@dojoengine/sdk";
import { Metadata, Socials } from "../../classes";
import { Config } from "../../classes/config";

const MODEL_NAME = "Game";

export class GameModel {
  type = MODEL_NAME;

  constructor(
    public identifier: string,
    public worldAddress: string,
    public namespace: string,
    public active: boolean,
    public published: boolean,
    public whitelisted: boolean,
    public priority: number,
    public points: number,
    public config: Config,
    public metadata: Metadata,
    public socials: Socials,
    public owner: string,
  ) {
    this.identifier = identifier;
    this.worldAddress = worldAddress;
    this.namespace = namespace;
    this.active = active;
    this.published = published;
    this.whitelisted = whitelisted;
    this.priority = priority;
    this.points = points;
    this.config = config;
    this.metadata = metadata;
    this.socials = socials;
    this.owner = owner;
  }

  static from(identifier: string, model: any) {
    if (!model) return GameModel.default(identifier);
    const worldAddress = addAddressPadding(model.world_address);
    const namespace = shortString.decodeShortString(`0x${BigInt(model.namespace).toString(16)}`);
    const active = !!model.active;
    const published = !!model.published;
    const whitelisted = !!model.whitelisted;
    const priority = Number(model.priority);
    const points = Number(model.points);
    const config = Config.from(model.config.replace(`"{`, `{`).replace(`}"`, `}`));
    const metadata = Metadata.from(model.metadata);
    const socials = Socials.from(model.socials);
    const owner = addAddressPadding(model.owner);
    return new GameModel(
      identifier,
      worldAddress,
      namespace,
      active,
      published,
      whitelisted,
      priority,
      points,
      config,
      metadata,
      socials,
      owner,
    );
  }

  static default(identifier: string) {
    return new GameModel(
      identifier,
      "0x0",
      "",
      false,
      false,
      false,
      0,
      0,
      new Config("", "", ""),
      new Metadata("", "", "", "", "", ""),
      new Socials("", "", "", "", ""),
      "",
    );
  }

  static isType(model: GameModel) {
    return model.type === MODEL_NAME;
  }

  exists() {
    return this.worldAddress !== "0x0";
  }
}

export const Game = {
  parse: (entity: ParsedEntity<SchemaType>) => {
    return GameModel.from(entity.entityId, entity.models[NAMESPACE]?.[MODEL_NAME]);
  },

  getModelName: () => {
    return MODEL_NAME;
  },

  getClause: () => {
    return MemberClause(`${NAMESPACE}-${Game.getModelName()}`, "world_address", "Neq", "0x0");
  },

  getMethods: () => [
    { name: "register_game", entrypoint: "register_game", description: "Register a game." },
    { name: "update_game", entrypoint: "update_game", description: "Update a game." },
    { name: "publish_game", entrypoint: "publish_game", description: "Publish a game." },
    { name: "hide_game", entrypoint: "hide_game", description: "Hide a game." },
    { name: "whitelist_game", entrypoint: "whitelist_game", description: "Whitelist a game." },
    { name: "blacklist_game", entrypoint: "blacklist_game", description: "Blacklist a game." },
    { name: "remove_game", entrypoint: "remove_game", description: "Remove a game." },
  ],
};
