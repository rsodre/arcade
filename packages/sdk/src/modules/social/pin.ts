import { NAMESPACE } from "../../constants";
import { addAddressPadding } from "starknet";
import { SchemaType } from "../../bindings";
import { ParsedEntity } from "@dojoengine/sdk";

const MODEL_NAME = "TrophyPinning";

export class PinEvent {
  type = MODEL_NAME;

  constructor(
    public playerId: string,
    public achievementId: string,
    public time: number,
  ) {
    this.playerId = playerId;
    this.achievementId = achievementId;
    this.time = time;
  }

  static from(model: any) {
    const playerId = addAddressPadding(model.player_id);
    const achievementId = `0x${BigInt(String(model.achievement_id)).toString(16)}`;
    const time = Number(model.time);
    return new PinEvent(playerId, achievementId, time);
  }

  static isType(model: PinEvent) {
    return model.type === MODEL_NAME;
  }
}

export const Pin = {
  parse: (entity: ParsedEntity<SchemaType>) => {
    return PinEvent.from(entity.models[NAMESPACE][MODEL_NAME]);
  },

  getModelName: () => {
    return MODEL_NAME;
  },

  getQueryEntity: () => {
    return (entity: any) => entity.neq("player_id", "0x0");
  },

  getMethods: () => [
    { name: "pin", entrypoint: "pin", description: "Pin an achievement." },
    { name: "unpin", entrypoint: "unpin", description: "Unpin an achievement." },
  ],
};
