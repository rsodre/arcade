import { NAMESPACE } from "../../constants";
import { shortString, addAddressPadding } from "starknet";
import { SchemaType } from "../../bindings";
import { MemberClause, ParsedEntity } from "@dojoengine/sdk";

const MODEL_NAME = "Achievement";

export class AchievementModel {
  type = MODEL_NAME;

  constructor(
    public identifier: string,
    public worldAddress: string,
    public namespace: string,
    public id: string,
    public published: boolean,
    public whitelisted: boolean,
    public points: number,
  ) {
    this.worldAddress = worldAddress;
    this.namespace = namespace;
    this.id = id;
    this.published = published;
    this.whitelisted = whitelisted;
    this.points = points;
  }

  static from(identifier: string, model: any) {
    if (!model) return AchievementModel.default(identifier);
    const worldAddress = addAddressPadding(model.world_address);
    const namespace = shortString.decodeShortString(`0x${BigInt(model.namespace).toString(16)}`);
    const id = shortString.decodeShortString(`0x${BigInt(model.id).toString(16)}`);
    const published = !!model.published;
    const whitelisted = !!model.whitelisted;
    const points = Number(model.points);
    return new AchievementModel(identifier, worldAddress, namespace, id, published, whitelisted, points);
  }

  static default(identifier: string) {
    return new AchievementModel(identifier, "0x0", "", "", false, false, 0);
  }

  static isType(model: AchievementModel) {
    return model.type === MODEL_NAME;
  }

  exists() {
    return this.worldAddress !== "0x0";
  }
}

export const Achievement = {
  parse: (entity: ParsedEntity<SchemaType>) => {
    return AchievementModel.from(entity.entityId, entity.models[NAMESPACE]?.[MODEL_NAME]);
  },

  getModelName: () => {
    return MODEL_NAME;
  },

  getClause: () => {
    return MemberClause(`${NAMESPACE}-${Achievement.getModelName()}`, "world_address", "Neq", "0x0");
  },

  getMethods: () => [
    { name: "register_achievement", entrypoint: "register_achievement", description: "Register an achievement." },
    { name: "update_achievement", entrypoint: "update_achievement", description: "Update an achievement." },
    { name: "publish_achievement", entrypoint: "publish_achievement", description: "Publish an achievement." },
    { name: "hide_achievement", entrypoint: "hide_achievement", description: "Hide an achievement." },
    { name: "whitelist_achievement", entrypoint: "whitelist_achievement", description: "Whitelist an achievement." },
    { name: "blacklist_achievement", entrypoint: "blacklist_achievement", description: "Blacklist an achievement." },
    { name: "remove_achievement", entrypoint: "remove_achievement", description: "Remove an achievement." },
  ],
};
