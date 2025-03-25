import { useArcade } from "@/hooks/arcade";
import {
  Button,
  GearIcon,
  Input,
  PlusIcon,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  TrashIcon,
} from "@cartridge/ui-next";
import { useAccount } from "@starknet-react/core";
import { useCallback, useState } from "react";
import { AllowArray, byteArray, Call } from "starknet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { GameModel } from "@bal7hazar/arcade-sdk";

const formSchema = z.object({
  worldAddress: z
    .string()
    .startsWith("0x", { message: "Invalid World Address" }),
  namespace: z
    .string()
    .min(2, { message: "Namespace is required" })
    .max(31, { message: "Invalid Namespace" }),
  project: z
    .string()
    .min(2, { message: "Project is required" }),
  rpc: z
    .string()
    .min(2, { message: "RPC is required" }),
  policies: z.string().refine((val) => val.startsWith("{") || !val, {
    message: "Invalid Policies",
  }),
  color: z
    .string()
    .min(2, { message: "Color is required" })
    .max(31, { message: "Invalid Color" }),
  preset: z
    .string()
    .min(2, { message: "Preset is required" }),
  name: z
    .string()
    .min(2, { message: "Name is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  image: z.string().refine((val) => val.startsWith("http") || !val, {
    message: "Invalid Image URL",
  }),
  banner: z.string().refine((val) => val.startsWith("http") || !val, {
    message: "Invalid Banner URL",
  }),
  discord: z.string().refine((val) => val.startsWith("http") || !val, {
    message: "Invalid Discord URL",
  }),
  telegram: z.string().refine((val) => val.startsWith("http") || !val, {
    message: "Invalid Telegram URL",
  }),
  twitter: z.string().refine((val) => val.startsWith("http") || !val, {
    message: "Invalid Twitter URL",
  }),
  youtube: z.string().refine((val) => val.startsWith("http") || !val, {
    message: "Invalid Youtube URL",
  }),
  website: z.string().refine((val) => val.startsWith("http") || !val, {
    message: "Invalid Website URL",
  }),
});

export function Register({ game }: { game?: GameModel }) {
  const { account } = useAccount();
  const { provider } = useArcade();
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   worldAddress: game?.worldAddress || "0x6a9e4c6f0799160ea8ddc43ff982a5f83d7f633e9732ce42701de1288ff705f",
    //   namespace: game?.namespace || "ds_v1_1_4",
    //   project: game?.config.project || "darkshuffle-mainnet",
    //   rpc: game?.config.rpc || "https://api.cartridge.gg/x/starknet/mainnet",
    //   policies: JSON.stringify(game?.config.policies) || `{"chains":{"SN_MAIN":{"policies":{"contracts":{"0x0320f977f47f0885e376b781d9e244d9f59f10154ce844ae1815c919f0374726":{"name":"game_systems","methods":[{"entrypoint":"mint"},{"entrypoint":"start_game"}]},"0x0062cfee20a5be4b305f610a23291aa27f3fca7a5fd14bd8e2d0389556003e12":{"name":"battle_systems","methods":[{"entrypoint":"battle_actions"}]},"0x00ae7393b60ad9fd5c26851341b9a4afe61c6ae34326dee79cf5d096e9f55a36":{"name":"draft_systems","methods":[{"entrypoint":"pick_card"}]},"0x07c9a684813410b39c776c49544d8ecb2d39f0b91bd83ffec31ebc938e053e25":{"name":"map_systems","methods":[{"entrypoint":"generate_tree"},{"entrypoint":"select_node"}]}}}}}}`,
    //   color: game?.metadata.color || "#F59100",
    //   preset: game?.metadata.preset || "dark-shuffle",
    //   name: game?.metadata.name || "Dark Shuffle",
    //   description: game?.metadata.description || "A Provable Roguelike Deck-building Game on Starknet, powered by LORDS.",
    //   image: game?.metadata.image || "https://github.com/cartridge-gg/presets/blob/main/configs/dark-shuffle/icon.svg?raw=true",
    //   banner: game?.metadata.banner || "https://github.com/cartridge-gg/presets/blob/main/configs/dark-shuffle/cover.png?raw=true",
    //   discord: game?.socials.discord || "https://discord.gg/CEXUEJF3",
    //   telegram: game?.socials.telegram || "",
    //   twitter: game?.socials.twitter || "https://x.com/await_0x",
    //   youtube: game?.socials.youtube || "",
    //   website: game?.socials.website || "https://darkshuffle.dev/",
    // },
    // defaultValues: {
    //   worldAddress: game?.worldAddress || "0x4f3dccb47477c087ad9c76b8067b8aadded57f8df7f2d7543e6066bcb25332c",
    //   namespace: game?.namespace || "dopewars",
    //   project: game?.config.project || "ryomainnet",
    //   rpc: game?.config.rpc || "https://api.cartridge.gg/x/starknet/mainnet",
    //   policies: JSON.stringify(game?.config.policies) || `{"origin":"dopewars.game","chains":{"SN_MAIN":{"policies":{"contracts":{"0x051Fea4450Da9D6aeE758BDEbA88B2f665bCbf549D2C61421AA724E9AC0Ced8F":{"name":"VRF Provider","description":"Provides verifiable random functions","methods":[{"name":"Request Random","description":"Request a random number","entrypoint":"request_random"}]},"0x0410466536b5ae074f7fea81e5533b8134a9fa08b3dd077dd9db08f64997d113":{"name":"Paper Token","description":"Manages paper approvals","methods":[{"name":"Approve","description":"Approve paper usage","entrypoint":"approve"}]},"0x044a23BbfE03FFe90D3C23Fb6e5A8AD0341036C039363DfA6F3513278Aa51fCA":{"name":"Game Contract","description":"Core game mechanics","methods":[{"name":"Create Game","description":"Start a new game","entrypoint":"create_game"},{"name":"Travel","description":"Travel to a new location","entrypoint":"travel"},{"name":"Decide","description":"Make a game decision","entrypoint":"decide"},{"name":"End Game","description":"End the current game","entrypoint":"end_game"}]},"0x0412445e644070C69fEa16b964cC81Cd6dEBF6A4DBf683E2E9686a45ad088de8":{"name":"Laundromat Contract","description":"Manages game scoring and laundering","methods":[{"name":"Register Score","description":"Register a game score","entrypoint":"register_score"},{"name":"Claim","description":"Claim rewards","entrypoint":"claim"},{"name":"Launder","description":"Launder resources","entrypoint":"launder"}]}}}}},"theme":{"colors":{"primary":"#11ED83"},"cover":"cover.png","icon":"icon.png","name":"Dope Wars"}}`,
    //   color: game?.metadata.color || "#11ED83",
    //   preset: game?.metadata.preset || "dope-wars",
    //   name: game?.metadata.name || "Dope Wars",
    //   description: game?.metadata.description || "Dope Wars is an onchain adaptation of the classic arbitrage game Drug Wars, built by Cartridge in partnership with Dope DAO.",
    //   image: game?.metadata.image || "https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/icon.png?raw=true",
    //   banner: game?.metadata.banner || "https://github.com/cartridge-gg/presets/blob/main/configs/dope-wars/cover.png?raw=true",
    //   discord: game?.socials.discord || "https://discord.gg/CEXUEJF3",
    //   telegram: game?.socials.telegram || "",
    //   twitter: game?.socials.twitter || "https://x.com/TheDopeWars",
    //   youtube: game?.socials.youtube || "",
    //   website: game?.socials.website || "https://dopewars.game/",
    // },
    // defaultValues: {
    //   worldAddress: game?.worldAddress || "0x6a9e4c6f0799160ea8ddc43ff982a5f83d7f633e9732ce42701de1288ff705f",
    //   namespace: game?.namespace || "s0_eternum",
    //   project: game?.config.project || "eternum-prod",
    //   rpc: game?.config.rpc || "https://api.cartridge.gg/x/starknet/mainnet",
    //   policies: JSON.stringify(game?.config.policies) || ``,
    //   color: game?.metadata.color || "#dc8b07",
    //   preset: game?.metadata.preset || "eternum",
    //   name: game?.metadata.name || "Eternum",
    //   description: game?.metadata.description || "Rule the Hex.",
    //   image: game?.metadata.image || "https://github.com/cartridge-gg/presets/blob/main/configs/eternum/icon.svg?raw=true",
    //   banner: game?.metadata.banner || "https://github.com/cartridge-gg/presets/blob/main/configs/eternum/cover.png?raw=true",
    //   discord: game?.socials.discord || "https://discord.gg/CEXUEJF3",
    //   telegram: game?.socials.telegram || "",
    //   twitter: game?.socials.twitter || "https://x.com/RealmsEternum",
    //   youtube: game?.socials.youtube || "",
    //   website: game?.socials.website || "https://eternum.realms.world/",
    // },
    // defaultValues: {
    //   worldAddress: game?.worldAddress || "0x022055481479edc9542aa28bc7da760c45fbf320bce571c31c161baddc13acd9",
    //   namespace: game?.namespace || "dragark",
    //   project: game?.config.project || "dragark-mainnet-v9-5",
    //   rpc: game?.config.rpc || "https://api.cartridge.gg/x/starknet/mainnet",
    //   policies: JSON.stringify(game?.config.policies) || ``,
    //   color: game?.metadata.color || "#71EB34",
    //   preset: game?.metadata.preset || "dragark",
    //   name: game?.metadata.name || "Dragark",
    //   description: game?.metadata.description || "Dragark Mainnet is live now! Let's dive into the Action: Battle, Upgrade, and Mine for Dragark Stones!",
    //   image: game?.metadata.image || "https://github.com/cartridge-gg/presets/blob/main/configs/dragark/icon.png?raw=true",
    //   banner: game?.metadata.banner || "https://github.com/cartridge-gg/presets/blob/main/configs/dragark/cover.png?raw=true",
    //   discord: game?.socials.discord || "https://discord.gg/KEChMrdk7z",
    //   telegram: game?.socials.telegram || "",
    //   twitter: game?.socials.twitter || "https://x.com/playDRAGARK",
    //   youtube: game?.socials.youtube || "",
    //   website: game?.socials.website || "https://dragark.net/",
    // },
    defaultValues: {
      worldAddress: game?.worldAddress || "0x02ea88c9a6314a10e7d8b6e557d01d68cf72d962707086aa242bc4805071f34d",
      namespace: game?.namespace || "pistols",
      project: game?.config.project || "pistols-staging",
      rpc: game?.config.rpc || "https://api.cartridge.gg/x/pistols-academy/katana",
      policies: game?.config.policies ? JSON.stringify(game?.config.policies) : ``,
      color: game?.metadata.color || "#EF9758",
      preset: game?.metadata.preset || "pistols",
      name: game?.metadata.name || "Pistols",
      description: game?.metadata.description || "Fully on-chain game made with Dojo by Underware.gg",
      image: game?.metadata.image || "https://github.com/cartridge-gg/presets/blob/main/configs/pistols/icon.png?raw=true",
      banner: game?.metadata.banner || "https://github.com/cartridge-gg/presets/blob/main/configs/pistols/cover.png?raw=true",
      discord: game?.socials.discord || "https://discord.gg/Zbap29dD",
      telegram: game?.socials.telegram || "",
      twitter: game?.socials.twitter || "https://x.com/underware_gg",
      youtube: game?.socials.youtube || "",
      website: game?.socials.website || "https://pistols.underware.gg/",
    },
    // defaultValues: {
    //   worldAddress: game?.worldAddress || "",
    //   namespace: game?.namespace || "",
    //   project: game?.config.project || "",
    //   rpc: game?.config.rpc || "",
    //   policies: JSON.stringify(game?.config.policies) || ``,
    //   color: game?.metadata.color || "",
    //   preset: game?.metadata.preset || "",
    //   name: game?.metadata.name || "",
    //   description: game?.metadata.description || "",
    //   image: game?.metadata.image || "",
    //   banner: game?.metadata.banner || "",
    //   discord: game?.socials.discord || "",
    //   telegram: game?.socials.telegram || "",
    //   twitter: game?.socials.twitter || "",
    //   youtube: game?.socials.youtube || "",
    //   website: game?.socials.website || "",
    // },
  });

  const onDelete = useCallback(() => {
    if (!game || !account) return;
    const process = async () => {
      setLoading(true);
      try {
        const args = {
          worldAddress: game.worldAddress,
          namespace: game.namespace,
        };
        const calls = provider.registry.remove_game(args);
        await account?.execute(calls);
        setClose(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    process();
  }, [provider, account, game, setClose]);

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      if (!account) return;
      const process = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
          let calls: AllowArray<Call> = [];
          const args = {
            worldAddress: values.worldAddress,
            namespace: values.namespace,
            project: byteArray.byteArrayFromString(values.project),
            rpc: byteArray.byteArrayFromString(values.rpc),
            policies: byteArray.byteArrayFromString(values.policies),
            color: values.color,
            preset: byteArray.byteArrayFromString(values.preset),
            name: byteArray.byteArrayFromString(values.name),
            description: byteArray.byteArrayFromString(values.description),
            image: byteArray.byteArrayFromString(values.image),
            banner: byteArray.byteArrayFromString(values.banner),
            discord: byteArray.byteArrayFromString(values.discord),
            telegram: byteArray.byteArrayFromString(values.telegram),
            twitter: byteArray.byteArrayFromString(values.twitter),
            youtube: byteArray.byteArrayFromString(values.youtube),
            website: byteArray.byteArrayFromString(values.website),
          };
          if (!game) {
            calls = provider.registry.register_game(args);
          } else {
            calls = provider.registry.update_game(args);
          }
          await account?.execute(calls);
          setClose(true);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      process(values);
    },
    [provider, account, setClose],
  );

  return (
    <Sheet open={close} onOpenChange={setClose}>
      <SheetTrigger asChild>
        {!game ? (
          <Button
            className="normal-case font-sans select-none min-h-12 flex justify-center items-center p-2 gap-x-2 rounded-b cursor-pointer text-sm font-medium text-foreground-300 bg-background-200 hover:bg-background-300 hover:text-foreground-200"
            disabled={!account}
          >
            <PlusIcon size="sm" variant="line" />
            Register Game
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="icon"
            className="w-7 h-full rounded-none"
            disabled={!account}
          >
            <GearIcon size="xs" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="border-background-300 overflow-clip flex flex-col">
        <SheetHeader>
          <SheetTitle className="select-none">
            {game ? "Update a Game" : "Register a new Game"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 overflow-y-scroll"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex flex-col gap-2">
              <Topic label="General" />
              <Field
                name="worldAddress"
                label="World Address *"
                placeholder="0x..."
                form={form}
                disabled={!!game}
              />
              <Field
                name="namespace"
                label="Namespace *"
                placeholder="dojo_starter"
                form={form}
                disabled={!!game}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Topic label="Config" />
              <Field
                name="project"
                label="Project *"
                placeholder="dojogame"
                form={form}
              />
              <Field
                name="rpc"
                label="RPC *"
                placeholder="https://rpc.dojo.com"
                form={form}
              />
              <Field
                name="policies"
                label="Policies"
                placeholder="https://policies.dojo.com"
                form={form}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Topic label="Metadata" />
              <Field
                name="color"
                label="Color *"
                placeholder="#123456"
                form={form}
              />
              <Field
                name="preset"
                label="Preset *"
                placeholder="cartridge"
                form={form}
              />
              <Field
                name="name"
                label="Name *"
                placeholder="Dojo Starter"
                form={form}
              />
              <Field
                name="description"
                label="Description *"
                placeholder="A dojo starter game"
                form={form}
              />
              <Field
                name="image"
                label="Image"
                placeholder="https://dojo.com/icon.png"
                form={form}
              />
              <Field
                name="banner"
                label="Banner"
                placeholder="https://dojo.com/banner.png"
                form={form}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Topic label="Socials" />
              <Field
                name="discord"
                label="Discord"
                placeholder="https://discord.com/dojo"
                form={form}
              />
              <Field
                name="telegram"
                label="Telegram"
                placeholder="https://t.me/dojoengine"
                form={form}
              />
              <Field
                name="twitter"
                label="Twitter"
                placeholder="https://x.com/ohayo_dojo"
                form={form}
              />
              <Field
                name="youtube"
                label="Youtube"
                placeholder="https://www.youtube.com/watch?v=lclg7FmIkLQ"
                form={form}
              />
              <Field
                name="website"
                label="Website"
                placeholder="https://book.dojoengine.org/"
                form={form}
              />
            </div>
            <div className="flex gap-2 mt-4">
              {game && (
                <Button variant="secondary" size="icon" onClick={onDelete}>
                  <TrashIcon size="xs" />
                </Button>
              )}
              <Button className="grow" type="submit" isLoading={loading}>
                {game ? "Update" : "Register"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export const Topic = ({ label }: { label: string }) => {
  return (
    <div className="w-full select-none uppercase font-semibold text-xs text-background-500 flex gap-2 justify-between items-center">
      <div className="grow">
        <Separator
          orientation="horizontal"
          className="h-px bg-background-200"
        />
      </div>
      <p className="grow-0">{label}</p>
      <div className="grow">
        <Separator
          orientation="horizontal"
          className="h-px bg-background-200"
        />
      </div>
    </div>
  );
};

export const Field = ({
  name,
  label,
  placeholder,
  form,
  disabled,
}: {
  name: string;
  label: string;
  placeholder: string;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  disabled?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name={
        name as
          | "name"
          | "color"
          | "website"
          | "worldAddress"
          | "namespace"
          | "project"
          | "preset"
          | "description"
          | "image"
          | "banner"
          | "discord"
          | "telegram"
          | "twitter"
          | "youtube"
      }
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-right w-20 select-none normal-case text-xs">
            {label}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
