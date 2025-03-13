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
    .min(2, { message: "Project is required" })
    .max(31, { message: "Invalid Project" }),
  preset: z
    .string()
    .min(2, { message: "Preset is required" })
    .max(31, { message: "Invalid Preset" }),
  color: z
    .string()
    .min(2, { message: "Color is required" })
    .max(31, { message: "Invalid Color" }),
  name: z
    .string()
    .min(2, { message: "Name is required" })
    .max(31, { message: "Invalid Name" }),
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
    defaultValues: {
      worldAddress: game?.worldAddress || "",
      namespace: game?.namespace || "",
      project: game?.project || "",
      preset: game?.preset || "",
      color: game?.metadata.color || "",
      name: game?.metadata.name || "",
      description: game?.metadata.description || "",
      image: game?.metadata.image || "",
      banner: game?.metadata.banner || "",
      discord: game?.socials.discord || "",
      telegram: game?.socials.telegram || "",
      twitter: game?.socials.twitter || "",
      youtube: game?.socials.youtube || "",
      website: game?.socials.website || "",
    },
  });

  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       worldAddress:
  //         "0x05f2358c005acf2a63616a32b76a01d632463b84609954ff846998f898a49778",
  //       namespace: "nums",
  //       project: "nums-mainnet-appchain",
  //       preset: "nums",
  //       color: "#9E84E9",
  //       name: "Nums",
  //       description:
  //         "Number Challenge is a fully onchain game built using Dojo Engine on Starknet that blends strategy and chance. The goal is to place 20 randomly generated numbers into slots in ascending order to win.",
  //       image:
  //         "https://github.com/cartridge-gg/presets/blob/main/configs/nums/icon.png?raw=true",
  //       banner:
  //         "https://github.com/cartridge-gg/presets/blob/main/configs/nums/cover.png?raw=true",
  //       discord: "https://discord.gg/pwB3qD5k",
  //       telegram: "",
  //       twitter: "https://x.com/numsgg",
  //       youtube: "",
  //       website: "https://nums.gg/",
  //     },
  // });

  const onDelete = useCallback(() => {
    if (!game) return;
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
      const process = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
          let calls: AllowArray<Call> = [];
          const args = {
            worldAddress: values.worldAddress,
            namespace: values.namespace,
            project: values.project,
            preset: values.preset,
            color: values.color,
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
          <Button className="normal-case font-sans select-none min-h-12 flex justify-center items-center p-2 gap-x-2 rounded-b cursor-pointer text-sm font-medium text-foreground-300 bg-background-200 hover:bg-background-300">
            <PlusIcon size="sm" variant="line" />
            Register Game
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="icon"
            className="w-7 h-full rounded-none"
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
                label="Namespace*"
                placeholder="dojo_starter"
                form={form}
                disabled={!!game}
              />
              <Field
                name="project"
                label="Project*"
                placeholder="dojogame"
                form={form}
              />
              <Field
                name="preset"
                label="Preset*"
                placeholder="cartridge"
                form={form}
              />
              <Field
                name="color"
                label="Color*"
                placeholder="#123456"
                form={form}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Topic label="Metadata" />
              <Field
                name="name"
                label="Name*"
                placeholder="Dojo Starter"
                form={form}
              />
              <Field
                name="description"
                label="Description*"
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
