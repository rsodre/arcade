import { initSDK } from "..";
import { constants } from "starknet";
import { Game, GameModel } from "./game";
import { Achievement, AchievementModel } from "./achievement";
import { ParsedEntity, QueryBuilder, SDK, StandardizedQueryResult } from "@dojoengine/sdk";
import { SchemaType } from "../../bindings";
import { NAMESPACE } from "../../constants";
import { RegistryOptions, DefaultRegistryOptions } from "./options";

export * from "./policies";
export { GameModel, AchievementModel, RegistryOptions };
export type RegistryModel = GameModel | AchievementModel;

export const Registry = {
  sdk: undefined as SDK<SchemaType> | undefined,
  unsubEntities: undefined as (() => void) | undefined,

  init: async (chainId: constants.StarknetChainId) => {
    Registry.sdk = await initSDK(chainId);
  },

  isEntityQueryable(options: RegistryOptions) {
    return options.game || options.achievement;
  },

  getEntityQuery: (options: RegistryOptions = DefaultRegistryOptions) => {
    return new QueryBuilder<SchemaType>()
      .namespace(NAMESPACE, (namespace) => {
        let query: ReturnType<typeof namespace.entity> | ReturnType<typeof namespace.namespace> = namespace;
        if (options.game) query = query.entity(Game.getModelName(), Game.getQueryEntity());
        if (options.achievement) query = query.entity(Achievement.getModelName(), Achievement.getQueryEntity());
        return query;
      })
      .build();
  },

  fetchEntities: async (callback: (models: RegistryModel[]) => void, options: RegistryOptions) => {
    if (!Registry.sdk) return;

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
      const models: RegistryModel[] = [];
      (data as ParsedEntity<SchemaType>[]).forEach((entity: ParsedEntity<SchemaType>) => {
        if (entity.models[NAMESPACE][Achievement.getModelName()]) {
          models.push(Achievement.parse(entity));
        }
        if (entity.models[NAMESPACE][Game.getModelName()]) {
          models.push(Game.parse(entity));
        }
      });
      callback(models);
    };
    const query = Registry.getEntityQuery(options);
    await Registry.sdk.getEntities({ query, callback: wrappedCallback });
  },

  subEntities: async (callback: (models: RegistryModel[]) => void, options: RegistryOptions) => {
    if (!Registry.sdk) return;

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
      if (!data || (data[0] as ParsedEntity<SchemaType>).entityId === "0x0") return;
      const entity = (data as ParsedEntity<SchemaType>[])[0];
      if (entity.models[NAMESPACE][Achievement.getModelName()]) {
        callback([Achievement.parse(entity)]);
      }
      if (entity.models[NAMESPACE][Game.getModelName()]) {
        callback([Game.parse(entity)]);
      }
    };

    const query = Registry.getEntityQuery(options);

    const subscription = await Registry.sdk.subscribeEntityQuery({ query, callback: wrappedCallback });
    Registry.unsubEntities = () => subscription.cancel();
  },

  fetch: async (callback: (models: RegistryModel[]) => void, options: RegistryOptions = DefaultRegistryOptions) => {
    if (!Registry.sdk) {
      throw new Error("SDK not initialized");
    }
    if (Registry.isEntityQueryable(options)) {
      await Registry.fetchEntities(callback, options);
    }
  },

  sub: async (callback: (models: RegistryModel[]) => void, options: RegistryOptions = DefaultRegistryOptions) => {
    if (!Registry.sdk) {
      throw new Error("SDK not initialized");
    }
    if (Registry.isEntityQueryable(options)) {
      await Registry.subEntities(callback, options);
    }
  },

  unsub: () => {
    if (Registry.unsubEntities) {
      Registry.unsubEntities();
      Registry.unsubEntities = undefined;
    }
  },
};
