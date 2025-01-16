import { NAMESPACE } from "../../constants";
import { addAddressPadding } from "starknet";
import { SchemaType } from "../../bindings";
import { ParsedEntity } from "@dojoengine/sdk";

const MODEL_NAME = "Follow";

export class FollowEvent {
  type = MODEL_NAME;

  constructor(
    public follower: string,
    public followed: string,
    public time: number,
  ) {
    this.follower = follower;
    this.followed = followed;
    this.time = time;
  }

  static from(model: any) {
    const follower = addAddressPadding(model.follower);
    const followed = addAddressPadding(model.followed);
    const time = Number(model.time);
    return new FollowEvent(follower, followed, time);
  }

  static isType(model: FollowEvent) {
    return model.type === MODEL_NAME;
  }
}

export const Follow = {
  parse: (entity: ParsedEntity<SchemaType>) => {
    return FollowEvent.from(entity.models[NAMESPACE][MODEL_NAME]);
  },

  getModelName: () => {
    return MODEL_NAME;
  },

  getQueryEntity: () => {
    return (entity: any) => entity.neq("follower", "0x0");
  },

  getMethods: () => [
    { name: "follow", entrypoint: "follow", description: "Follow another player." },
    { name: "unfollow", entrypoint: "unfollow", description: "Unfollow a player." },
  ],
};
