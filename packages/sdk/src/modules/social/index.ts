import { initSDK } from "..";
import { constants } from "starknet";
import { Pin, PinEvent } from "./pin";
import { Follow, FollowEvent } from "./follow";
import { Guild, GuildModel } from "./guild";
import { Alliance, AllianceModel } from "./alliance";
import { Member, MemberModel } from "./member";
import { ParsedEntity, QueryBuilder, SDK, StandardizedQueryResult } from "@dojoengine/sdk";
import { SchemaType } from "../../bindings";
import { NAMESPACE } from "../../constants";
import { SocialOptions, DefaultSocialOptions } from "./options";

export * from "./policies";
export { PinEvent, FollowEvent, GuildModel, AllianceModel, MemberModel, SocialOptions };
export type SocialModel = AllianceModel | GuildModel | MemberModel | PinEvent | FollowEvent;

export const Social = {
  sdk: undefined as SDK<SchemaType> | undefined,
  unsubEntities: undefined as (() => void) | undefined,
  unsubEvents: undefined as (() => void) | undefined,

  init: async (chainId: constants.StarknetChainId) => {
    Social.sdk = await initSDK(chainId);
  },

  isEntityQueryable(options: SocialOptions) {
    return options.alliance || options.guild || options.member;
  },

  isEventQueryable(options: SocialOptions) {
    return options.pin || options.follow;
  },

  getEntityQuery: (options: SocialOptions = DefaultSocialOptions) => {
    return new QueryBuilder<SchemaType>()
      .namespace(NAMESPACE, (namespace) => {
        let query: ReturnType<typeof namespace.entity> | ReturnType<typeof namespace.namespace> = namespace;
        if (options.alliance) query = query.entity(Alliance.getModelName(), Alliance.getQueryEntity());
        if (options.guild) query = query.entity(Guild.getModelName(), Guild.getQueryEntity());
        if (options.member) query = query.entity(Member.getModelName(), Member.getQueryEntity());
        return query;
      })
      .build();
  },

  getEventQuery: (options: SocialOptions = DefaultSocialOptions) => {
    return new QueryBuilder<SchemaType>()
      .namespace(NAMESPACE, (namespace) => {
        let query: ReturnType<typeof namespace.entity> | ReturnType<typeof namespace.namespace> = namespace;
        if (options.pin) query = query.entity(Pin.getModelName(), Pin.getQueryEntity());
        if (options.follow) query = query.entity(Follow.getModelName(), Follow.getQueryEntity());
        return query;
      })
      .build();
  },

  fetchEntities: async (callback: (models: SocialModel[]) => void, options: SocialOptions) => {
    if (!Social.sdk) return;

    const wrappedCallback = ({
      data,
      error,
    }: {
      data?: StandardizedQueryResult<SchemaType> | StandardizedQueryResult<SchemaType>[] | undefined;
      error?: Error | undefined;
    }) => {
      if (error) {
        console.error("Error fetching entities:", error);
        return;
      }
      if (!data) return;
      const models: SocialModel[] = [];
      (data as ParsedEntity<SchemaType>[]).forEach((entity: ParsedEntity<SchemaType>) => {
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
    const query = Social.getEntityQuery(options);
    await Social.sdk.getEntities({ query, callback: wrappedCallback });
  },

  fetchEvents: async (callback: (models: SocialModel[]) => void, options: SocialOptions) => {
    if (!Social.sdk) return;

    const wrappedCallback = ({
      data,
      error,
    }: {
      data?: StandardizedQueryResult<SchemaType> | StandardizedQueryResult<SchemaType>[] | undefined;
      error?: Error | undefined;
    }) => {
      if (error) {
        console.error("Error fetching entities:", error);
        return;
      }
      if (!data) return;
      const events: SocialModel[] = [];
      (data as ParsedEntity<SchemaType>[]).forEach((entity: ParsedEntity<SchemaType>) => {
        if (entity.models[NAMESPACE][Pin.getModelName()]) {
          events.push(Pin.parse(entity));
        }
        if (entity.models[NAMESPACE][Follow.getModelName()]) {
          events.push(Follow.parse(entity));
        }
      });
      callback(events);
    };
    const query = Social.getEventQuery(options);
    await Social.sdk.getEventMessages({ query, historical: false, callback: wrappedCallback });
  },

  subEntities: async (callback: (models: SocialModel[]) => void, options: SocialOptions) => {
    if (!Social.sdk) return;

    const wrappedCallback = ({
      data,
      error,
    }: {
      data?: StandardizedQueryResult<SchemaType> | StandardizedQueryResult<SchemaType>[] | undefined;
      error?: Error | undefined;
    }) => {
      if (error) {
        console.error("Error subscribing to entities:", error);
        return;
      }
      if (!data || data.length === 0 || (data[0] as ParsedEntity<SchemaType>).entityId === "0x0") return;
      const entity = (data as ParsedEntity<SchemaType>[])[0];
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

    const query = Social.getEntityQuery(options);

    const subscription = await Social.sdk.subscribeEntityQuery({ query, callback: wrappedCallback });
    Social.unsubEntities = () => subscription.cancel();
  },

  subEvents: async (callback: (models: SocialModel[]) => void, options: SocialOptions) => {
    if (!Social.sdk) return;

    const wrappedCallback = ({
      data,
      error,
    }: {
      data?: StandardizedQueryResult<SchemaType> | StandardizedQueryResult<SchemaType>[] | undefined;
      error?: Error | undefined;
    }) => {
      if (error) {
        console.error("Error subscribing to entities:", error);
        return;
      }
      if (!data || data.length === 0 || (data[0] as ParsedEntity<SchemaType>).entityId === "0x0") return;
      const entity = (data as ParsedEntity<SchemaType>[])[0];
      if (entity.models[NAMESPACE][Pin.getModelName()]) {
        callback([Pin.parse(entity)]);
      }
      if (entity.models[NAMESPACE][Follow.getModelName()]) {
        callback([Follow.parse(entity)]);
      }
    };

    const query = Social.getEventQuery(options);

    const subscription = await Social.sdk.subscribeEventQuery({ query, callback: wrappedCallback });
    Social.unsubEvents = () => subscription.cancel();
  },

  fetch: async (callback: (models: SocialModel[]) => void, options: SocialOptions = DefaultSocialOptions) => {
    if (!Social.sdk) {
      throw new Error("SDK not initialized");
    }
    if (Social.isEntityQueryable(options)) {
      await Social.fetchEntities(callback, options);
    }
    if (Social.isEventQueryable(options)) {
      await Social.fetchEvents(callback, options);
    }
  },

  sub: async (callback: (models: SocialModel[]) => void, options: SocialOptions = DefaultSocialOptions) => {
    if (!Social.sdk) {
      throw new Error("SDK not initialized");
    }
    if (Social.isEntityQueryable(options)) {
      await Social.subEntities(callback, options);
    }
    if (Social.isEventQueryable(options)) {
      await Social.subEvents(callback, options);
    }
  },

  unsub: () => {
    if (Social.unsubEntities) {
      Social.unsubEntities();
      Social.unsubEntities = undefined;
    }
    if (Social.unsubEvents) {
      Social.unsubEvents();
      Social.unsubEvents = undefined;
    }
  },
};
