import { NAMESPACE } from "../../constants";
import { SchemaType } from "../../bindings";
import { ParsedEntity } from "@dojoengine/sdk";
import { Metadata, Socials } from "../../classes";

const MODEL_NAME = "Guild";

export class GuildModel {
  type = MODEL_NAME;

  constructor(
    public id: number,
    public open: boolean,
    public free: boolean,
    public guildCount: number,
    public metadata: Metadata,
    public socials: Socials,
  ) {
    this.id = id;
    this.open = open;
    this.free = free;
    this.guildCount = guildCount;
    this.metadata = metadata;
    this.socials = socials;
  }

  static from(model: any) {
    const id = Number(model.id);
    const open = !!model.open;
    const free = !!model.free;
    const guildCount = Number(model.guild_count);
    const metadata = Metadata.from(model.metadata);
    const socials = Socials.from(model.socials);
    return new GuildModel(id, open, free, guildCount, metadata, socials);
  }

  static isType(model: GuildModel) {
    return model.type === MODEL_NAME;
  }
}

export const Guild = {
  parse: (entity: ParsedEntity<SchemaType>) => {
    return GuildModel.from(entity.models[NAMESPACE][MODEL_NAME]);
  },

  getModelName: () => {
    return MODEL_NAME;
  },

  getQueryNamespace: () => {
    return (namespace: any) => namespace.entity(MODEL_NAME, Guild.getQueryEntity());
  },

  getQueryEntity: () => {
    return (entity: any) => entity.neq("id", "0x0");
  },

  getMethods: () => [
    { name: "create_guild", entrypoint: "create_guild", description: "Create a guild." },
    { name: "open_guild", entrypoint: "open_guild", description: "Open a guild." },
    { name: "close_guild", entrypoint: "close_guild", description: "Close a guild." },
    { name: "crown_member", entrypoint: "crown_member", description: "Crown a member to lead the guild." },
    { name: "promote_member", entrypoint: "promote_member", description: "Promote a member to officer." },
    { name: "demote_member", entrypoint: "demote_member", description: "Demote an officer to member." },
    { name: "hire_member", entrypoint: "hire_member", description: "Hire a member to the guild." },
    { name: "fire_member", entrypoint: "fire_member", description: "Fire a member from the guild." },
  ],
};
