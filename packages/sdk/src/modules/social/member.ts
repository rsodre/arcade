import { NAMESPACE } from "../../constants";
import { SchemaType } from "../../bindings";
import { MemberClause, ParsedEntity } from "@dojoengine/sdk";
import { addAddressPadding } from "starknet";

const MODEL_NAME = "Member";

export class MemberModel {
  type = MODEL_NAME;

  constructor(
    public id: string,
    public role: number,
    public guildId: number,
    public pendingGuildId: number,
  ) {
    this.id = id;
    this.role = role;
    this.guildId = guildId;
    this.pendingGuildId = pendingGuildId;
  }

  static from(model: any) {
    const id = addAddressPadding(model.id);
    const role = Number(model.role);
    const guildId = Number(model.guild_id);
    const pendingGuildId = Number(model.pending_guild_id);
    return new MemberModel(id, role, guildId, pendingGuildId);
  }

  static isType(model: MemberModel) {
    return model.type === MODEL_NAME;
  }
}

export const Member = {
  parse: (entity: ParsedEntity<SchemaType>) => {
    return MemberModel.from(entity.models[NAMESPACE][MODEL_NAME]);
  },

  getModelName: () => {
    return MODEL_NAME;
  },

  getClause: () => {
    return MemberClause(`${NAMESPACE}-${Member.getModelName()}`, "id", "Neq", "0x0");
  },

  getMethods: () => [],
};
