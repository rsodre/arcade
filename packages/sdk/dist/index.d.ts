import * as starknet from 'starknet';
import { BigNumberish, ByteArray, AllowArray, Call, constants, Account as Account$1, AccountInterface } from 'starknet';
import { DojoProvider } from '@dojoengine/core';
import * as torii from '@dojoengine/torii-client';
import EventEmitter from 'eventemitter3';
import * as _dojoengine_sdk from '@dojoengine/sdk';
import { SchemaType as SchemaType$1, SDK, ToriiQueryBuilder } from '@dojoengine/sdk';

declare const NAMESPACE = "ARCADE";

declare enum TransactionType {
    FOLLOW = "follow",
    UNFOLLOW = "unfollow",
    CREATE_ALLIANCE = "create_alliance",
    OPEN_ALLIANCE = "open_alliance",
    CLOSE_ALLIANCE = "close_alliance",
    CROWN_GUILD = "crown_guild",
    HIRE_GUILD = "hire_guild",
    FIRE_GUILD = "fire_guild",
    REQUEST_ALLIANCE = "request_alliance",
    CANCEL_ALLIANCE = "cancel_alliance",
    LEAVE_ALLIANCE = "leave_alliance",
    CREATE_GUILD = "create_guild",
    OPEN_GUILD = "open_guild",
    CLOSE_GUILD = "close_guild",
    CROWN_MEMBER = "crown_member",
    PROMOTE_MEMBER = "promote_member",
    DEMOTE_MEMBER = "demote_member",
    HIRE_MEMBER = "hire_member",
    FIRE_MEMBER = "fire_member",
    REQUEST_GUILD = "request_guild",
    CANCEL_GUILD = "cancel_guild",
    LEAVE_GUILD = "leave_guild",
    PIN = "pin",
    UNPIN = "unpin",
    REGISTER_GAME = "register_game",
    UPDATE_GAME = "update_game",
    PUBLISH_GAME = "publish_game",
    HIDE_GAME = "hide_game",
    WHITELIST_GAME = "whitelist_game",
    BLACKLIST_GAME = "blacklist_game",
    REMOVE_GAME = "remove_game",
    REGISTER_ACHIEVEMENT = "register_achievement",
    UPDATE_ACHIEVEMENT = "update_achievement",
    PUBLISH_ACHIEVEMENT = "publish_achievement",
    HIDE_ACHIEVEMENT = "hide_achievement",
    WHITELIST_ACHIEVEMENT = "whitelist_achievement",
    BLACKLIST_ACHIEVEMENT = "blacklist_achievement",
    REMOVE_ACHIEVEMENT = "remove_achievement",
    DEPLOY = "deploy",
    REMOVE = "remove",
    HIRE = "hire",
    FIRE = "fire"
}
interface SocialFollowProps {
    target: BigNumberish;
}
interface SocialUnfollowProps {
    target: BigNumberish;
}
interface SocialCreateAllianceProps {
    color: BigNumberish;
    name: ByteArray;
    description: ByteArray;
    image: ByteArray;
    banner: ByteArray;
    discord: ByteArray;
    telegram: ByteArray;
    twitter: ByteArray;
    youtube: ByteArray;
    website: ByteArray;
}
interface SocialOpenAllianceProps {
    free: boolean;
}
interface SocialCrownGuildProps {
    guildId: BigNumberish;
}
interface SocialHireGuildProps {
    guildId: BigNumberish;
}
interface SocialFireGuildProps {
    guildId: BigNumberish;
}
interface SocialRequestAllianceProps {
    allianceId: BigNumberish;
}
interface SocialCreateGuildProps {
    color: BigNumberish;
    name: ByteArray;
    description: ByteArray;
    image: ByteArray;
    banner: ByteArray;
    discord: ByteArray;
    telegram: ByteArray;
    twitter: ByteArray;
    youtube: ByteArray;
    website: ByteArray;
}
interface SocialOpenGuildProps {
    free: boolean;
}
interface SocialCrownMemberProps {
    memberId: BigNumberish;
}
interface SocialPromoteMemberProps {
    memberId: BigNumberish;
}
interface SocialDemoteMemberProps {
    memberId: BigNumberish;
}
interface SocialHireMemberProps {
    memberId: BigNumberish;
}
interface SocialFireMemberProps {
    memberId: BigNumberish;
}
interface SocialRequestGuildProps {
    guildId: BigNumberish;
}
interface RegistryPinProps {
    achievementId: BigNumberish;
}
interface RegistryUnpinProps {
    achievementId: BigNumberish;
}
interface RegistryRegisterGameProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
    project: BigNumberish;
    preset: BigNumberish;
    color: BigNumberish;
    name: ByteArray;
    description: ByteArray;
    image: ByteArray;
    banner: ByteArray;
    discord: ByteArray;
    telegram: ByteArray;
    twitter: ByteArray;
    youtube: ByteArray;
    website: ByteArray;
}
interface RegistryUpdateGameProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
    project: BigNumberish;
    preset: BigNumberish;
    color: BigNumberish;
    name: ByteArray;
    description: ByteArray;
    image: ByteArray;
    banner: ByteArray;
    discord: ByteArray;
    telegram: ByteArray;
    twitter: ByteArray;
    youtube: ByteArray;
    website: ByteArray;
}
interface RegistryPublishGameProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
}
interface RegistryHideGameProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
}
interface RegistryWhitelistGameProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
}
interface RegistryBlacklistGameProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
}
interface RegistryRemoveGameProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
}
interface RegistryRegisterAchievementProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
    identifier: BigNumberish;
    karma: BigNumberish;
}
interface RegistryUpdateAchievementProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
    identifier: BigNumberish;
    karma: BigNumberish;
}
interface RegistryRemoveAchievementProps {
    worldAddress: BigNumberish;
    namespace: BigNumberish;
    identifier: BigNumberish;
}
interface SlotDeployProps {
    service: BigNumberish;
    project: BigNumberish;
    tier: BigNumberish;
}
interface SlotRemoveProps {
    service: BigNumberish;
    project: BigNumberish;
}
interface SlotHireProps {
    project: BigNumberish;
    accountId: BigNumberish;
    role: BigNumberish;
}
interface SlotFireProps {
    project: BigNumberish;
    accountId: BigNumberish;
}

declare class Social$1 {
    private manifest;
    private name;
    constructor(manifest: any);
    pin(props: RegistryPinProps): AllowArray<Call>;
    unpin(props: RegistryUnpinProps): AllowArray<Call>;
    follow(props: SocialFollowProps): AllowArray<Call>;
    unfollow(props: SocialUnfollowProps): AllowArray<Call>;
    create_alliance(props: SocialCreateAllianceProps): AllowArray<Call>;
    open_alliance(props: SocialOpenAllianceProps): AllowArray<Call>;
    close_alliance(): AllowArray<Call>;
    crown_guild(props: SocialCrownGuildProps): AllowArray<Call>;
    hire_guild(props: SocialHireGuildProps): AllowArray<Call>;
    fire_guild(props: SocialFireGuildProps): AllowArray<Call>;
    request_alliance(props: SocialRequestAllianceProps): AllowArray<Call>;
    cancel_alliance(): AllowArray<Call>;
    leave_alliance(): AllowArray<Call>;
    create_guild(props: SocialCreateGuildProps): AllowArray<Call>;
    open_guild(props: SocialOpenGuildProps): AllowArray<Call>;
    close_guild(): AllowArray<Call>;
    crown_member(props: SocialCrownMemberProps): AllowArray<Call>;
    promote_member(props: SocialPromoteMemberProps): AllowArray<Call>;
    demote_member(props: SocialDemoteMemberProps): AllowArray<Call>;
    hire_member(props: SocialHireMemberProps): AllowArray<Call>;
    fire_member(props: SocialFireMemberProps): AllowArray<Call>;
    request_guild(props: SocialRequestGuildProps): AllowArray<Call>;
    cancel_guild(): AllowArray<Call>;
    leave_guild(): AllowArray<Call>;
}

declare class Registry$1 {
    private manifest;
    private name;
    constructor(manifest: any);
    register_game(props: RegistryRegisterGameProps): AllowArray<Call>;
    update_game(props: RegistryUpdateGameProps): AllowArray<Call>;
    publish_game(props: RegistryPublishGameProps): AllowArray<Call>;
    hide_game(props: RegistryHideGameProps): AllowArray<Call>;
    whitelist_game(props: RegistryWhitelistGameProps): AllowArray<Call>;
    blacklist_game(props: RegistryBlacklistGameProps): AllowArray<Call>;
    remove_game(props: RegistryRemoveGameProps): AllowArray<Call>;
    register_achievement(props: RegistryRegisterAchievementProps): AllowArray<Call>;
    update_achievement(props: RegistryUpdateAchievementProps): AllowArray<Call>;
    remove_achievement(props: RegistryRemoveAchievementProps): AllowArray<Call>;
}

declare class Slot {
    private manifest;
    private name;
    constructor(manifest: any);
    deploy(props: SlotDeployProps): AllowArray<Call>;
    remove(props: SlotRemoveProps): AllowArray<Call>;
    hire(props: SlotHireProps): AllowArray<Call>;
    fire(props: SlotFireProps): AllowArray<Call>;
}

declare const DojoEmitterProvider: {
    new (...args: any[]): {
        eventEmitter: EventEmitter<string | symbol, any>;
        /**
         * Emit an event
         * @param event - The event name
         * @param args - Arguments to pass to event handlers
         */
        emit(event: string, ...args: any[]): void;
        /**
         * Subscribe to an event
         * @param event - The event name to listen for
         * @param listener - Callback function when event occurs
         */
        on(event: string, listener: (...args: any[]) => void): void;
        /**
         * Unsubscribe from an event
         * @param event - The event name to stop listening to
         * @param listener - The callback function to remove
         */
        off(event: string, listener: (...args: any[]) => void): void;
    };
} & typeof DojoProvider;
declare class ArcadeProvider extends DojoEmitterProvider {
    social: Social$1;
    registry: Registry$1;
    slot: Slot;
    /**
     * Create a new ArcadeProvider instance
     *
     * @param chainId - The chain ID
     */
    constructor(chainId: constants.StarknetChainId);
    /**
     * Get a Torii client
     * @param toriiUrl - The URL of the Torii client
     * @returns A Torii client
     */
    getToriiClient(toriiUrl: string): Promise<torii.ToriiClient>;
    /**
     * Wait for a transaction to complete and check for errors
     *
     * @param transactionHash - Hash of transaction to wait for
     * @returns Transaction receipt
     * @throws Error if transaction fails or is reverted
     */
    process(transactionHash: string): Promise<({
        type: "INVOKE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        block_hash: string;
        block_number: number;
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "INVOKE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        block_hash: string;
        block_number: number;
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "INVOKE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "INVOKE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "DECLARE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        block_hash: string;
        block_number: number;
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "DECLARE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        block_hash: string;
        block_number: number;
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "DECLARE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "DECLARE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | (starknet.RejectedTransactionReceiptResponse & starknet.ReceiptTx)>;
    /**
     * Execute a transaction and emit its result
     *
     * @param signer - Account that will sign the transaction
     * @param transactionDetails - Transaction call data
     * @returns Transaction receipt
     */
    invoke(signer: Account$1 | AccountInterface, calls: AllowArray<Call>, entrypoint: string): Promise<({
        type: "INVOKE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        block_hash: string;
        block_number: number;
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "INVOKE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        block_hash: string;
        block_number: number;
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "INVOKE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "INVOKE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "DECLARE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        block_hash: string;
        block_number: number;
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "DECLARE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        block_hash: string;
        block_number: number;
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "DECLARE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | ({
        type: "DECLARE";
        transaction_hash: string;
        actual_fee: {
            amount: string;
            unit: "WEI" | "FRI";
        };
        execution_status: "SUCCEEDED" | "REVERTED";
        finality_status: "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1";
        messages_sent: {
            from_address: string;
            to_address: string;
            payload: string[];
        }[];
        events: {
            data: string[];
            keys: string[];
            from_address: string;
        }[];
        execution_resources: {
            steps: number;
            memory_holes?: number | undefined;
            range_check_builtin_applications?: number | undefined;
            pedersen_builtin_applications?: number | undefined;
            poseidon_builtin_applications?: number | undefined;
            ec_op_builtin_applications?: number | undefined;
            ecdsa_builtin_applications?: number | undefined;
            bitwise_builtin_applications?: number | undefined;
            keccak_builtin_applications?: number | undefined;
            segment_arena_builtin?: number | undefined;
            data_availability?: {
                l1_gas: number;
                l1_data_gas: number;
            } | undefined;
        };
        revert_reason?: string | undefined;
    } & starknet.ReceiptTx) | (starknet.RejectedTransactionReceiptResponse & starknet.ReceiptTx)>;
}

declare function setupWorld(provider: DojoProvider): {
    Registry: {
        registerGame: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, project: BigNumberish, preset: BigNumberish, color: BigNumberish, name: ByteArray, description: ByteArray, image: ByteArray, banner: ByteArray, discord: ByteArray, telegram: ByteArray, twitter: ByteArray, youtube: ByteArray, website: ByteArray) => Promise<{
            transaction_hash: string;
        } | undefined>;
        updateGame: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, project: BigNumberish, preset: BigNumberish, color: BigNumberish, name: ByteArray, description: ByteArray, image: ByteArray, banner: ByteArray, discord: ByteArray, telegram: ByteArray, twitter: ByteArray, youtube: ByteArray, website: ByteArray) => Promise<{
            transaction_hash: string;
        } | undefined>;
        publishGame: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        hideGame: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        whitelistGame: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        blacklistGame: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        removeGame: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        registerAchievement: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, identifier: BigNumberish, karma: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        updateAchievement: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, identifier: BigNumberish, karma: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        publishAchievement: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, identifier: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        hideAchievement: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, identifier: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        whitelistAchievement: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, identifier: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        blacklistAchievement: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, identifier: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        removeAchievement: (snAccount: Account$1 | AccountInterface, worldAddress: BigNumberish, namespace: BigNumberish, identifier: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
    };
    Social: {
        pin: (snAccount: Account$1 | AccountInterface, achievementId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        unpin: (snAccount: Account$1 | AccountInterface, achievementId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        follow: (snAccount: Account$1 | AccountInterface, target: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        unfollow: (snAccount: Account$1 | AccountInterface, target: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        createAlliance: (snAccount: Account$1 | AccountInterface, color: BigNumberish, name: ByteArray, description: ByteArray, image: ByteArray, banner: ByteArray, discord: ByteArray, telegram: ByteArray, twitter: ByteArray, youtube: ByteArray, website: ByteArray) => Promise<{
            transaction_hash: string;
        } | undefined>;
        openAlliance: (snAccount: Account$1 | AccountInterface, free: boolean) => Promise<{
            transaction_hash: string;
        } | undefined>;
        closeAlliance: (snAccount: Account$1 | AccountInterface) => Promise<{
            transaction_hash: string;
        } | undefined>;
        crownGuild: (snAccount: Account$1 | AccountInterface, guildId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        hireGuild: (snAccount: Account$1 | AccountInterface, guildId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        fireGuild: (snAccount: Account$1 | AccountInterface, guildId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        requestAlliance: (snAccount: Account$1 | AccountInterface, allianceId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        cancelAlliance: (snAccount: Account$1 | AccountInterface) => Promise<{
            transaction_hash: string;
        } | undefined>;
        leaveAlliance: (snAccount: Account$1 | AccountInterface) => Promise<{
            transaction_hash: string;
        } | undefined>;
        createGuild: (snAccount: Account$1 | AccountInterface, color: BigNumberish, name: ByteArray, description: ByteArray, image: ByteArray, banner: ByteArray, discord: ByteArray, telegram: ByteArray, twitter: ByteArray, youtube: ByteArray, website: ByteArray) => Promise<{
            transaction_hash: string;
        } | undefined>;
        openGuild: (snAccount: Account$1 | AccountInterface, free: boolean) => Promise<{
            transaction_hash: string;
        } | undefined>;
        closeGuild: (snAccount: Account$1 | AccountInterface) => Promise<{
            transaction_hash: string;
        } | undefined>;
        crownMember: (snAccount: Account$1 | AccountInterface, memberId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        promoteMember: (snAccount: Account$1 | AccountInterface, memberId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        demoteMember: (snAccount: Account$1 | AccountInterface, memberId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        hireMember: (snAccount: Account$1 | AccountInterface, memberId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        fireMember: (snAccount: Account$1 | AccountInterface, memberId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        requestGuild: (snAccount: Account$1 | AccountInterface, guildId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        cancelGuild: (snAccount: Account$1 | AccountInterface) => Promise<{
            transaction_hash: string;
        } | undefined>;
        leaveGuild: (snAccount: Account$1 | AccountInterface) => Promise<{
            transaction_hash: string;
        } | undefined>;
    };
    Slot: {
        deploy: (snAccount: Account$1 | AccountInterface, service: BigNumberish, project: BigNumberish, tier: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        remove: (snAccount: Account$1 | AccountInterface, service: BigNumberish, project: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        hire: (snAccount: Account$1 | AccountInterface, project: BigNumberish, accountId: BigNumberish, role: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
        fire: (snAccount: Account$1 | AccountInterface, project: BigNumberish, accountId: BigNumberish) => Promise<{
            transaction_hash: string;
        } | undefined>;
    };
};

type WithFieldOrder<T> = T & {
    fieldOrder: string[];
};
interface Account {
    id: BigNumberish;
    controllers: BigNumberish;
    name: BigNumberish;
    username: BigNumberish;
    socials: string;
    credits: BigNumberish;
}
interface AccountValue {
    controllers: BigNumberish;
    name: BigNumberish;
    username: BigNumberish;
    socials: string;
    credits: BigNumberish;
}
interface Controller {
    account_id: BigNumberish;
    id: BigNumberish;
    signers: BigNumberish;
    address: BigNumberish;
    network: BigNumberish;
    constructor_calldata: string;
}
interface ControllerValue {
    signers: BigNumberish;
    address: BigNumberish;
    network: BigNumberish;
    constructor_calldata: string;
}
interface Signer {
    account_id: BigNumberish;
    controller_id: BigNumberish;
    method: BigNumberish;
    metadata: string;
}
interface SignerValue {
    method: BigNumberish;
    metadata: string;
}
interface Deployment {
    service: BigNumberish;
    project: BigNumberish;
    status: BigNumberish;
    tier: BigNumberish;
    config: string;
}
interface DeploymentValue {
    status: BigNumberish;
    tier: BigNumberish;
    config: string;
}
interface Factory {
    id: BigNumberish;
    version: BigNumberish;
    default_version: BigNumberish;
}
interface FactoryValue {
    version: BigNumberish;
    default_version: BigNumberish;
}
interface Team {
    id: BigNumberish;
    deployment_count: BigNumberish;
    time: BigNumberish;
    name: BigNumberish;
    description: string;
}
interface TeamValue {
    deployment_count: BigNumberish;
    time: BigNumberish;
    name: BigNumberish;
    description: string;
}
interface Teammate {
    team_id: BigNumberish;
    time: BigNumberish;
    account_id: BigNumberish;
    role: BigNumberish;
}
interface TeammateValue {
    role: BigNumberish;
}
interface Access {
    address: BigNumberish;
    role: BigNumberish;
}
interface AccessValue {
    role: BigNumberish;
}
interface Achievement {
    world_address: BigNumberish;
    namespace: BigNumberish;
    id: BigNumberish;
    published: boolean;
    whitelisted: boolean;
    karma: BigNumberish;
}
interface AchievementValue {
    published: boolean;
    whitelisted: boolean;
    karma: BigNumberish;
}
interface Game {
    world_address: BigNumberish;
    namespace: BigNumberish;
    project: BigNumberish;
    preset: BigNumberish;
    active: boolean;
    published: boolean;
    whitelisted: boolean;
    priority: BigNumberish;
    karma: BigNumberish;
    metadata: string;
    socials: string;
    owner: BigNumberish;
}
interface GameValue {
    project: BigNumberish;
    preset: BigNumberish;
    active: boolean;
    published: boolean;
    whitelisted: boolean;
    priority: BigNumberish;
    karma: BigNumberish;
    metadata: string;
    socials: string;
    owner: BigNumberish;
}
interface Alliance {
    id: BigNumberish;
    open: boolean;
    free: boolean;
    guild_count: BigNumberish;
    metadata: string;
    socials: string;
}
interface AllianceValue {
    open: boolean;
    free: boolean;
    guild_count: BigNumberish;
    metadata: string;
    socials: string;
}
interface Guild {
    id: BigNumberish;
    open: boolean;
    free: boolean;
    role: BigNumberish;
    member_count: BigNumberish;
    alliance_id: BigNumberish;
    pending_alliance_id: BigNumberish;
    metadata: string;
    socials: string;
}
interface GuildValue {
    open: boolean;
    free: boolean;
    role: BigNumberish;
    member_count: BigNumberish;
    alliance_id: BigNumberish;
    pending_alliance_id: BigNumberish;
    metadata: string;
    socials: string;
}
interface Member {
    id: BigNumberish;
    role: BigNumberish;
    guild_id: BigNumberish;
    pending_guild_id: BigNumberish;
}
interface MemberValue {
    role: BigNumberish;
    guild_id: BigNumberish;
    pending_guild_id: BigNumberish;
}
interface SchemaType extends SchemaType$1 {
    controller: {
        Account: WithFieldOrder<Account>;
        AccountValue: WithFieldOrder<AccountValue>;
        Controller: WithFieldOrder<Controller>;
        ControllerValue: WithFieldOrder<ControllerValue>;
        Signer: WithFieldOrder<Signer>;
        SignerValue: WithFieldOrder<SignerValue>;
    };
    provider: {
        Deployment: WithFieldOrder<Deployment>;
        DeploymentValue: WithFieldOrder<DeploymentValue>;
        Factory: WithFieldOrder<Factory>;
        FactoryValue: WithFieldOrder<FactoryValue>;
        Team: WithFieldOrder<Team>;
        TeamValue: WithFieldOrder<TeamValue>;
        Teammate: WithFieldOrder<Teammate>;
        TeammateValue: WithFieldOrder<TeammateValue>;
    };
    registry: {
        Access: WithFieldOrder<Access>;
        AccessValue: WithFieldOrder<AccessValue>;
        Achievement: WithFieldOrder<Achievement>;
        AchievementValue: WithFieldOrder<AchievementValue>;
        Game: WithFieldOrder<Game>;
        GameValue: WithFieldOrder<GameValue>;
    };
    social: {
        Alliance: WithFieldOrder<Alliance>;
        AllianceValue: WithFieldOrder<AllianceValue>;
        Guild: WithFieldOrder<Guild>;
        GuildValue: WithFieldOrder<GuildValue>;
        Member: WithFieldOrder<Member>;
        MemberValue: WithFieldOrder<MemberValue>;
    };
}
declare const schema: SchemaType;
declare enum ModelsMapping {
    Account = "controller-Account",
    AccountValue = "controller-AccountValue",
    Controller = "controller-Controller",
    ControllerValue = "controller-ControllerValue",
    Signer = "controller-Signer",
    SignerValue = "controller-SignerValue",
    Deployment = "provider-Deployment",
    DeploymentValue = "provider-DeploymentValue",
    Factory = "provider-Factory",
    FactoryValue = "provider-FactoryValue",
    Team = "provider-Team",
    TeamValue = "provider-TeamValue",
    Teammate = "provider-Teammate",
    TeammateValue = "provider-TeammateValue",
    Access = "registry-Access",
    AccessValue = "registry-AccessValue",
    Achievement = "registry-Achievement",
    AchievementValue = "registry-AchievementValue",
    Game = "registry-Game",
    GameValue = "registry-GameValue",
    Alliance = "social-Alliance",
    AllianceValue = "social-AllianceValue",
    Guild = "social-Guild",
    GuildValue = "social-GuildValue",
    Member = "social-Member",
    MemberValue = "social-MemberValue"
}

var world$1 = {
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
					inputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
};
var contracts$1 = [
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
				items: [
				]
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
						inputs: [
						],
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
				outputs: [
				],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						inputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "constructor",
				name: "constructor",
				inputs: [
				]
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
				variants: [
				]
			},
			{
				type: "event",
				name: "registry::components::initializable::InitializableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "registry::components::registerable::RegisterableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "registry::components::trackable::TrackableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "achievement::components::pinnable::PinnableComponent::Event",
				kind: "enum",
				variants: [
				]
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
				items: [
				]
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
						inputs: [
						],
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
				],
				outputs: [
				],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						inputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "constructor",
				name: "constructor",
				inputs: [
				]
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
				variants: [
				]
			},
			{
				type: "event",
				name: "provider::components::deployable::DeployableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "provider::components::groupable::GroupableComponent::Event",
				kind: "enum",
				variants: [
				]
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
		init_calldata: [
		],
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
				items: [
				]
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
						inputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
						state_mutability: "view"
					},
					{
						type: "function",
						name: "close_alliance",
						inputs: [
						],
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
						state_mutability: "view"
					},
					{
						type: "function",
						name: "cancel_alliance",
						inputs: [
						],
						outputs: [
						],
						state_mutability: "view"
					},
					{
						type: "function",
						name: "leave_alliance",
						inputs: [
						],
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
						state_mutability: "view"
					},
					{
						type: "function",
						name: "close_guild",
						inputs: [
						],
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
						state_mutability: "view"
					},
					{
						type: "function",
						name: "cancel_guild",
						inputs: [
						],
						outputs: [
						],
						state_mutability: "view"
					},
					{
						type: "function",
						name: "leave_guild",
						inputs: [
						],
						outputs: [
						],
						state_mutability: "view"
					}
				]
			},
			{
				type: "function",
				name: "dojo_init",
				inputs: [
				],
				outputs: [
				],
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
						inputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "constructor",
				name: "constructor",
				inputs: [
				]
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
				variants: [
				]
			},
			{
				type: "event",
				name: "social::components::allianceable::AllianceableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "social::components::followable::FollowableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "social::components::guildable::GuildableComponent::Event",
				kind: "enum",
				variants: [
				]
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
		init_calldata: [
		],
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
				items: [
				]
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
						inputs: [
						],
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
				items: [
				]
			},
			{
				type: "function",
				name: "dojo_init",
				inputs: [
				],
				outputs: [
				],
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
						inputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "constructor",
				name: "constructor",
				inputs: [
				]
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
				variants: [
				]
			},
			{
				type: "event",
				name: "controller::components::controllable::ControllableComponent::Event",
				kind: "enum",
				variants: [
				]
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
		init_calldata: [
		],
		tag: "ARCADE-Wallet",
		selector: "0x69ba9525fdd6458dfaea7f06bcfd0cf5fef14d66c5516cf8548c2e2b845c6a5",
		systems: [
			"upgrade"
		]
	}
];
var models$1 = [
	{
		members: [
		],
		class_hash: "0x4e2a4a65e9597fae6a3db15dbf8360cbb90ac4b00803eb24715b0d3c6b62867",
		tag: "ARCADE-Access",
		selector: "0x4de83c9f22c74953e76afcef63ce27a77e04d2304133da1ec46fa2e46a0c40f"
	},
	{
		members: [
		],
		class_hash: "0x4e923487edecb8caba2730b7eb7ada85e31c9a3ab2bc6b865cb7a7723d7d4eb",
		tag: "ARCADE-Account",
		selector: "0x7e96bc903044d45737e5ec7e23b596e8e7f110a1b1f80d413b53725c7bbb2f6"
	},
	{
		members: [
		],
		class_hash: "0x509b4c7c85a5ad6ede5f70f838fe3b039e09fe9e1537e522e562a8c2fa887b4",
		tag: "ARCADE-Achievement",
		selector: "0x4909446396e41e99e20f04d9f5d9e83ab83beea6089c76d0fef29b034de9736"
	},
	{
		members: [
		],
		class_hash: "0x7df003249b5e6e8245535a62572e64cc5e659bbf0dfd8371a7535f2d5e35fcf",
		tag: "ARCADE-Alliance",
		selector: "0x74a88ab0bed983c65d7e57761329312c125ef0be4ef7889f560153000132866"
	},
	{
		members: [
		],
		class_hash: "0x8d4d1e78893b9b0e541eb5e20913057e7f70acd6e0302d9a8357c594db1015",
		tag: "ARCADE-Controller",
		selector: "0x7b2fac00792560d241723d9852f29e952bb0ecc88219dd3fb86b61796dc5952"
	},
	{
		members: [
		],
		class_hash: "0x707deea7afe8c277a3de09d5ccb124bf1f727ea61f0bcb618c5e7f2de4c2d5f",
		tag: "ARCADE-Deployment",
		selector: "0x5354f17394d652912bae10be363d24d155edbdb936fa275f855491253cb63a4"
	},
	{
		members: [
		],
		class_hash: "0x46ee9af02075375a761b271a5fb5896bf34f7040f35d3f4d2793006f2db5e37",
		tag: "ARCADE-Factory",
		selector: "0x59995d7c14b165cb6738a67e319c6ad553a58d9c05f87f0c35190b13e1c223"
	},
	{
		members: [
		],
		class_hash: "0x2fd5d2cccf18fcf8c974292188bd6fef67c7c0ea20029e3c408e78d786b0a2e",
		tag: "ARCADE-Game",
		selector: "0x6143bc86ed1a08df992c568392c454a92ef7e7b5ba08e9bf75643cf5cfc8b14"
	},
	{
		members: [
		],
		class_hash: "0x1185b7a812122ae5f379da16f06cd9fcd04c2772f7175d50b13540f4989c1fc",
		tag: "ARCADE-Guild",
		selector: "0x95501f151f575b4fab06c5ceb7237739dd0608982727cbc226273aecf006aa"
	},
	{
		members: [
		],
		class_hash: "0x4a047a959c45cda7b6e9abced79278c26c08413a829e15165004dc964749678",
		tag: "ARCADE-Member",
		selector: "0x7b9b4b91d2d7823ac5c041c32867f856e6393905bedb2c4b7f58d56bf13ec43"
	},
	{
		members: [
		],
		class_hash: "0x693b5887e2b62bea0163daae7ecfc98e02aa1c32469ccb4d831de4bc19ab719",
		tag: "ARCADE-Signer",
		selector: "0x79493096b3a4188aade984eaf8272a97748ee48111c1f7e6683a89f64406c1a"
	},
	{
		members: [
		],
		class_hash: "0x398bdccbc7f8450bb139af04a99a0fddd8367b3bd21202095ec1df96108df98",
		tag: "ARCADE-Team",
		selector: "0x56407a8963e9ebbb56d8c167c40bc0bd8ce7e38ac48c632421d5cf3dc865a01"
	},
	{
		members: [
		],
		class_hash: "0x6fd8d97850b3e9d127a5b457bfa76d3048a74f25074ce40f929e9e6b4d356fd",
		tag: "ARCADE-Teammate",
		selector: "0x56a4d220830ecdcb5e816e49c743a4e0f784b7bdea24737be188d1f1059308e"
	}
];
var events$1 = [
	{
		members: [
		],
		class_hash: "0x1d83651f32df4a5e3a1c8ef52c8f77fc9b99463c41246839203d11a54c8e631",
		tag: "ARCADE-Follow",
		selector: "0x38866790c8a50b1c2d43786d8d06856b7ab65ce7a59e136bc47fbae18b147f1"
	},
	{
		members: [
		],
		class_hash: "0x40ce2ebeff98431ff013e5b8deeff73fbb562a38950c8eb391998f022ac18a5",
		tag: "ARCADE-TrophyPinning",
		selector: "0x7b9d51ffd54b6bfa69d849bf8f35fb7bb08820e792d3eeca9dd990f4905aacb"
	}
];
var manifest_slot = {
	world: world$1,
	contracts: contracts$1,
	models: models$1,
	events: events$1
};

var world = {
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
					inputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
					outputs: [
					],
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
};
var contracts = [
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
				items: [
				]
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
						inputs: [
						],
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
				outputs: [
				],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						inputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "constructor",
				name: "constructor",
				inputs: [
				]
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
				variants: [
				]
			},
			{
				type: "event",
				name: "registry::components::initializable::InitializableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "registry::components::registerable::RegisterableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "registry::components::trackable::TrackableComponent::Event",
				kind: "enum",
				variants: [
				]
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
				items: [
				]
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
						inputs: [
						],
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
				],
				outputs: [
				],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						inputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "constructor",
				name: "constructor",
				inputs: [
				]
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
				variants: [
				]
			},
			{
				type: "event",
				name: "provider::components::deployable::DeployableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "provider::components::groupable::GroupableComponent::Event",
				kind: "enum",
				variants: [
				]
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
		init_calldata: [
		],
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
				items: [
				]
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
						inputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					},
					{
						type: "function",
						name: "close_alliance",
						inputs: [
						],
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					},
					{
						type: "function",
						name: "cancel_alliance",
						inputs: [
						],
						outputs: [
						],
						state_mutability: "external"
					},
					{
						type: "function",
						name: "leave_alliance",
						inputs: [
						],
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					},
					{
						type: "function",
						name: "close_guild",
						inputs: [
						],
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					},
					{
						type: "function",
						name: "cancel_guild",
						inputs: [
						],
						outputs: [
						],
						state_mutability: "external"
					},
					{
						type: "function",
						name: "leave_guild",
						inputs: [
						],
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "function",
				name: "dojo_init",
				inputs: [
				],
				outputs: [
				],
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
						inputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "constructor",
				name: "constructor",
				inputs: [
				]
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
				variants: [
				]
			},
			{
				type: "event",
				name: "achievement::components::pinnable::PinnableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "social::components::allianceable::AllianceableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "social::components::followable::FollowableComponent::Event",
				kind: "enum",
				variants: [
				]
			},
			{
				type: "event",
				name: "social::components::guildable::GuildableComponent::Event",
				kind: "enum",
				variants: [
				]
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
		init_calldata: [
		],
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
				items: [
				]
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
						inputs: [
						],
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
				items: [
				]
			},
			{
				type: "function",
				name: "dojo_init",
				inputs: [
				],
				outputs: [
				],
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
						inputs: [
						],
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
						outputs: [
						],
						state_mutability: "external"
					}
				]
			},
			{
				type: "constructor",
				name: "constructor",
				inputs: [
				]
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
				variants: [
				]
			},
			{
				type: "event",
				name: "controller::components::controllable::ControllableComponent::Event",
				kind: "enum",
				variants: [
				]
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
		init_calldata: [
		],
		tag: "ARCADE-Wallet",
		selector: "0x69ba9525fdd6458dfaea7f06bcfd0cf5fef14d66c5516cf8548c2e2b845c6a5",
		systems: [
			"upgrade"
		]
	}
];
var models = [
	{
		members: [
		],
		class_hash: "0x4e2a4a65e9597fae6a3db15dbf8360cbb90ac4b00803eb24715b0d3c6b62867",
		tag: "ARCADE-Access",
		selector: "0x4de83c9f22c74953e76afcef63ce27a77e04d2304133da1ec46fa2e46a0c40f"
	},
	{
		members: [
		],
		class_hash: "0x4e923487edecb8caba2730b7eb7ada85e31c9a3ab2bc6b865cb7a7723d7d4eb",
		tag: "ARCADE-Account",
		selector: "0x7e96bc903044d45737e5ec7e23b596e8e7f110a1b1f80d413b53725c7bbb2f6"
	},
	{
		members: [
		],
		class_hash: "0x509b4c7c85a5ad6ede5f70f838fe3b039e09fe9e1537e522e562a8c2fa887b4",
		tag: "ARCADE-Achievement",
		selector: "0x4909446396e41e99e20f04d9f5d9e83ab83beea6089c76d0fef29b034de9736"
	},
	{
		members: [
		],
		class_hash: "0x7df003249b5e6e8245535a62572e64cc5e659bbf0dfd8371a7535f2d5e35fcf",
		tag: "ARCADE-Alliance",
		selector: "0x74a88ab0bed983c65d7e57761329312c125ef0be4ef7889f560153000132866"
	},
	{
		members: [
		],
		class_hash: "0x8d4d1e78893b9b0e541eb5e20913057e7f70acd6e0302d9a8357c594db1015",
		tag: "ARCADE-Controller",
		selector: "0x7b2fac00792560d241723d9852f29e952bb0ecc88219dd3fb86b61796dc5952"
	},
	{
		members: [
		],
		class_hash: "0x707deea7afe8c277a3de09d5ccb124bf1f727ea61f0bcb618c5e7f2de4c2d5f",
		tag: "ARCADE-Deployment",
		selector: "0x5354f17394d652912bae10be363d24d155edbdb936fa275f855491253cb63a4"
	},
	{
		members: [
		],
		class_hash: "0x46ee9af02075375a761b271a5fb5896bf34f7040f35d3f4d2793006f2db5e37",
		tag: "ARCADE-Factory",
		selector: "0x59995d7c14b165cb6738a67e319c6ad553a58d9c05f87f0c35190b13e1c223"
	},
	{
		members: [
		],
		class_hash: "0x5876a589e9560234a646049af8ad29933dfee9f97ac5f12648b60d572f0fac5",
		tag: "ARCADE-Game",
		selector: "0x6143bc86ed1a08df992c568392c454a92ef7e7b5ba08e9bf75643cf5cfc8b14"
	},
	{
		members: [
		],
		class_hash: "0x1185b7a812122ae5f379da16f06cd9fcd04c2772f7175d50b13540f4989c1fc",
		tag: "ARCADE-Guild",
		selector: "0x95501f151f575b4fab06c5ceb7237739dd0608982727cbc226273aecf006aa"
	},
	{
		members: [
		],
		class_hash: "0x4a047a959c45cda7b6e9abced79278c26c08413a829e15165004dc964749678",
		tag: "ARCADE-Member",
		selector: "0x7b9b4b91d2d7823ac5c041c32867f856e6393905bedb2c4b7f58d56bf13ec43"
	},
	{
		members: [
		],
		class_hash: "0x693b5887e2b62bea0163daae7ecfc98e02aa1c32469ccb4d831de4bc19ab719",
		tag: "ARCADE-Signer",
		selector: "0x79493096b3a4188aade984eaf8272a97748ee48111c1f7e6683a89f64406c1a"
	},
	{
		members: [
		],
		class_hash: "0x398bdccbc7f8450bb139af04a99a0fddd8367b3bd21202095ec1df96108df98",
		tag: "ARCADE-Team",
		selector: "0x56407a8963e9ebbb56d8c167c40bc0bd8ce7e38ac48c632421d5cf3dc865a01"
	},
	{
		members: [
		],
		class_hash: "0x6fd8d97850b3e9d127a5b457bfa76d3048a74f25074ce40f929e9e6b4d356fd",
		tag: "ARCADE-Teammate",
		selector: "0x56a4d220830ecdcb5e816e49c743a4e0f784b7bdea24737be188d1f1059308e"
	}
];
var events = [
	{
		members: [
		],
		class_hash: "0x1d83651f32df4a5e3a1c8ef52c8f77fc9b99463c41246839203d11a54c8e631",
		tag: "ARCADE-Follow",
		selector: "0x38866790c8a50b1c2d43786d8d06856b7ab65ce7a59e136bc47fbae18b147f1"
	},
	{
		members: [
		],
		class_hash: "0x40ce2ebeff98431ff013e5b8deeff73fbb562a38950c8eb391998f022ac18a5",
		tag: "ARCADE-TrophyPinning",
		selector: "0x7b9d51ffd54b6bfa69d849bf8f35fb7bb08820e792d3eeca9dd990f4905aacb"
	}
];
var manifest_sepolia = {
	world: world,
	contracts: contracts,
	models: models,
	events: events
};

declare enum Network {
    Slot = "slot",
    Sepolia = "sepolia",
    Default = "default"
}
declare const manifests: {
    slot: {
        world: {
            class_hash: string;
            address: string;
            seed: string;
            name: string;
            entrypoints: string[];
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                variants: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                items?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
            })[];
        };
        contracts: ({
            address: string;
            class_hash: string;
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: never[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                }[];
                outputs: never[];
                state_mutability: string;
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: never[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            })[];
            init_calldata: string[];
            tag: string;
            selector: string;
            systems: string[];
        } | {
            address: string;
            class_hash: string;
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: never[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                variants: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: never[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                outputs: never[];
                state_mutability: string;
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            })[];
            init_calldata: never[];
            tag: string;
            selector: string;
            systems: string[];
        })[];
        models: {
            members: never[];
            class_hash: string;
            tag: string;
            selector: string;
        }[];
        events: {
            members: never[];
            class_hash: string;
            tag: string;
            selector: string;
        }[];
    };
    sepolia: {
        world: {
            class_hash: string;
            address: string;
            seed: string;
            name: string;
            entrypoints: string[];
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                variants: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                items?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
            })[];
        };
        contracts: ({
            address: string;
            class_hash: string;
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: never[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                }[];
                outputs: never[];
                state_mutability: string;
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: never[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            })[];
            init_calldata: string[];
            tag: string;
            selector: string;
            systems: string[];
        } | {
            address: string;
            class_hash: string;
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: never[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                variants: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: never[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                outputs: never[];
                state_mutability: string;
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            })[];
            init_calldata: never[];
            tag: string;
            selector: string;
            systems: string[];
        })[];
        models: {
            members: never[];
            class_hash: string;
            tag: string;
            selector: string;
        }[];
        events: {
            members: never[];
            class_hash: string;
            tag: string;
            selector: string;
        }[];
    };
    default: {
        world: {
            class_hash: string;
            address: string;
            seed: string;
            name: string;
            entrypoints: string[];
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                variants: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                items?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                variants?: undefined;
                items?: undefined;
                inputs?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
            })[];
        };
        contracts: ({
            address: string;
            class_hash: string;
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: never[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                inputs: {
                    name: string;
                    type: string;
                }[];
                outputs: never[];
                state_mutability: string;
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: never[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                variants?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            })[];
            init_calldata: string[];
            tag: string;
            selector: string;
            systems: string[];
        } | {
            address: string;
            class_hash: string;
            abi: ({
                type: string;
                name: string;
                interface_name: string;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                members: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: never[];
                    outputs: {
                        type: string;
                    }[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                variants: {
                    name: string;
                    type: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                items: {
                    type: string;
                    name: string;
                    inputs: {
                        name: string;
                        type: string;
                    }[];
                    outputs: never[];
                    state_mutability: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                outputs: never[];
                state_mutability: string;
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                inputs: never[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                variants?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
                kind?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                members: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                items?: undefined;
                variants?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            } | {
                type: string;
                name: string;
                kind: string;
                variants: {
                    name: string;
                    type: string;
                    kind: string;
                }[];
                interface_name?: undefined;
                members?: undefined;
                items?: undefined;
                inputs?: undefined;
                outputs?: undefined;
                state_mutability?: undefined;
            })[];
            init_calldata: never[];
            tag: string;
            selector: string;
            systems: string[];
        })[];
        models: {
            members: never[];
            class_hash: string;
            tag: string;
            selector: string;
        }[];
        events: {
            members: never[];
            class_hash: string;
            tag: string;
            selector: string;
        }[];
    };
};

declare class Metadata {
    color: string;
    name: string;
    description: string;
    image: string;
    banner: string;
    constructor(color: string, name: string, description: string, image: string, banner: string);
    static from(value: string): Metadata;
}

declare class Socials {
    discord: string;
    telegram: string;
    twitter: string;
    youtube: string;
    website: string;
    constructor(discord: string, telegram: string, twitter: string, youtube: string, website: string);
    static from(value: string): Socials;
}

declare class GameModel {
    worldAddress: string;
    namespace: string;
    project: string;
    preset: string;
    active: boolean;
    published: boolean;
    whitelisted: boolean;
    priority: number;
    karma: number;
    metadata: Metadata;
    socials: Socials;
    owner: string;
    type: string;
    constructor(worldAddress: string, namespace: string, project: string, preset: string, active: boolean, published: boolean, whitelisted: boolean, priority: number, karma: number, metadata: Metadata, socials: Socials, owner: string);
    static from(model: any): GameModel;
    static isType(model: GameModel): boolean;
}

declare class AchievementModel {
    worldAddress: string;
    namespace: string;
    id: string;
    published: boolean;
    whitelisted: boolean;
    karma: number;
    type: string;
    constructor(worldAddress: string, namespace: string, id: string, published: boolean, whitelisted: boolean, karma: number);
    static from(model: any): AchievementModel;
    static isType(model: AchievementModel): boolean;
}

type RegistryOptions = {
    game?: boolean;
    achievement?: boolean;
};

declare const getRegistryPolicies: (chainId: constants.StarknetChainId, options?: RegistryOptions) => {
    contracts: {
        [x: string]: {
            name: string;
            description: string;
            methods: {
                name: string;
                entrypoint: string;
                description: string;
            }[];
        };
    };
};

type RegistryModel = GameModel | AchievementModel;
declare const Registry: {
    sdk: SDK<SchemaType> | undefined;
    unsubEntities: (() => void) | undefined;
    init: (chainId: constants.StarknetChainId) => Promise<void>;
    isEntityQueryable(options: RegistryOptions): boolean | undefined;
    getEntityQuery: (options?: RegistryOptions) => ToriiQueryBuilder<SchemaType>;
    fetchEntities: (callback: (models: RegistryModel[]) => void, options: RegistryOptions) => Promise<void>;
    subEntities: (callback: (models: RegistryModel[]) => void, options: RegistryOptions) => Promise<void>;
    fetch: (callback: (models: RegistryModel[]) => void, options?: RegistryOptions) => Promise<void>;
    sub: (callback: (models: RegistryModel[]) => void, options?: RegistryOptions) => Promise<void>;
    unsub: () => void;
};

declare class PinEvent {
    playerId: string;
    achievementId: string;
    time: number;
    type: string;
    constructor(playerId: string, achievementId: string, time: number);
    static from(model: any): PinEvent;
    static isType(model: PinEvent): boolean;
}

declare class FollowEvent {
    follower: string;
    followed: string;
    time: number;
    type: string;
    constructor(follower: string, followed: string, time: number);
    static from(model: any): FollowEvent;
    static isType(model: FollowEvent): boolean;
}

declare class GuildModel {
    id: number;
    open: boolean;
    free: boolean;
    guildCount: number;
    metadata: Metadata;
    socials: Socials;
    type: string;
    constructor(id: number, open: boolean, free: boolean, guildCount: number, metadata: Metadata, socials: Socials);
    static from(model: any): GuildModel;
    static isType(model: GuildModel): boolean;
}

declare class AllianceModel {
    id: number;
    open: boolean;
    free: boolean;
    guildCount: number;
    metadata: Metadata;
    socials: Socials;
    type: string;
    constructor(id: number, open: boolean, free: boolean, guildCount: number, metadata: Metadata, socials: Socials);
    static from(model: any): AllianceModel;
    static isType(model: AllianceModel): boolean;
}

declare class MemberModel {
    id: string;
    role: number;
    guildId: number;
    pendingGuildId: number;
    type: string;
    constructor(id: string, role: number, guildId: number, pendingGuildId: number);
    static from(model: any): MemberModel;
    static isType(model: MemberModel): boolean;
}

type SocialOptions = {
    pin?: boolean;
    follow?: boolean;
    member?: boolean;
    guild?: boolean;
    alliance?: boolean;
};

declare const getSocialPolicies: (chainId: constants.StarknetChainId, options?: SocialOptions) => {
    contracts: {
        [x: string]: {
            name: string;
            description: string;
            methods: {
                name: string;
                entrypoint: string;
                description: string;
            }[];
        };
    };
};

type SocialModel = AllianceModel | GuildModel | MemberModel | PinEvent | FollowEvent;
declare const Social: {
    sdk: SDK<SchemaType> | undefined;
    unsubEntities: (() => void) | undefined;
    unsubEvents: (() => void) | undefined;
    init: (chainId: constants.StarknetChainId) => Promise<void>;
    isEntityQueryable(options: SocialOptions): boolean | undefined;
    isEventQueryable(options: SocialOptions): boolean | undefined;
    getEntityQuery: (options?: SocialOptions) => ToriiQueryBuilder<SchemaType>;
    getEventQuery: (options?: SocialOptions) => ToriiQueryBuilder<SchemaType>;
    fetchEntities: (callback: (models: SocialModel[]) => void, options: SocialOptions) => Promise<void>;
    fetchEvents: (callback: (models: SocialModel[]) => void, options: SocialOptions) => Promise<void>;
    subEntities: (callback: (models: SocialModel[]) => void, options: SocialOptions) => Promise<void>;
    subEvents: (callback: (models: SocialModel[]) => void, options: SocialOptions) => Promise<void>;
    fetch: (callback: (models: SocialModel[]) => void, options?: SocialOptions) => Promise<void>;
    sub: (callback: (models: SocialModel[]) => void, options?: SocialOptions) => Promise<void>;
    unsub: () => void;
};

declare const initSDK: (chainId: constants.StarknetChainId) => Promise<_dojoengine_sdk.SDK<SchemaType>>;

export { type Access, type AccessValue, type Account, type AccountValue, type Achievement, AchievementModel, type AchievementValue, type Alliance, AllianceModel, type AllianceValue, ArcadeProvider, type Controller, type ControllerValue, type Deployment, type DeploymentValue, DojoEmitterProvider, type Factory, type FactoryValue, FollowEvent, type Game, GameModel, type GameValue, type Guild, GuildModel, type GuildValue, type Member, MemberModel, type MemberValue, Metadata, ModelsMapping, NAMESPACE, Network, PinEvent, Registry, type RegistryModel, type RegistryOptions, type SchemaType, type Signer, type SignerValue, Social, type SocialModel, type SocialOptions, Socials, type Team, type TeamValue, type Teammate, type TeammateValue, TransactionType, getRegistryPolicies, getSocialPolicies, initSDK, manifests, schema, manifest_sepolia as sepolia, setupWorld, manifest_slot as slot };
