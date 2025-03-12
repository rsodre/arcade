import { useArcade } from "@/hooks/arcade";
import {
  Button,
  Input,
  PlusIcon,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@cartridge/ui-next";
import { useAccount } from "@starknet-react/core";
import { useCallback, useState } from "react";
import { byteArray } from "starknet";
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
  image: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Image URL",
    }),
  banner: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Banner URL",
    }),
  discord: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Discord URL",
    }),
  telegram: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Telegram URL",
    }),
  twitter: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Twitter URL",
    }),
  youtube: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Youtube URL",
    }),
  website: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Website URL",
    }),
});

// starkli invoke \
//     --rpc https://api.cartridge.gg/x/starknet/mainnet \
//     --account ./account_mainnet.json \
//     --keystore ./keystore_mainnet.json \
//     0xc46f7e578f31c3fa6bb669164f04d696427818ba69f177ddc152f31ed5f119 register_game \
//         0x05f2358c005acf2a63616a32b76a01d632463b84609954ff846998f898a49778 \
//         str:"nums" \
//         str:"nums-appchain" \
//         str:"nums" \
//         str:"#9E84E9" \
//         0 str:"Nums" 0x4 \
//         6 str:"Number Challenge is a fully onc" str:"hain game built using Dojo Engi" str:"ne on Starknet that blends stra" str:"tegy and chance. The goal is to" str:" place 20 randomly generated nu" str:"mbers into slots in ascending o" str:"rder to win significant prizes." 0x1f \
//         2 str:"https://github.com/cartridge-gg" str:"/presets/blob/main/configs/nums" str:"/icon.png?raw=true" 0x12 \
//         2 str:"https://github.com/cartridge-gg" str:"/presets/blob/main/configs/nums" str:"/cover.png?raw=true" 0x13 \
//         0 str:"https://discord.gg/pwB3qD5k" 0x1b \
//         0 0 0 \
//         0 str:"https://x.com/numsgg" 0x14 \
//         0 0 0 \
//         0 str:"https://nums.gg/" 0x10

export function Register() {
  const { account } = useAccount();
  const { provider } = useArcade();
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      worldAddress:
        "0x05f2358c005acf2a63616a32b76a01d632463b84609954ff846998f898a49778",
      namespace: "nums",
      project: "nums-mainnet-appchain",
      preset: "nums",
      color: "#9E84E9",
      name: "Nums",
      description:
        "Number Challenge is a fully onchain game built using Dojo Engine on Starknet that blends strategy and chance. The goal is to place 20 randomly generated numbers into slots in ascending order to win.",
      image:
        "https://github.com/cartridge-gg/presets/blob/main/configs/nums/icon.png?raw=true",
      banner:
        "https://github.com/cartridge-gg/presets/blob/main/configs/nums/cover.png?raw=true",
      discord: "https://discord.gg/pwB3qD5k",
      telegram: "",
      twitter: "https://x.com/numsgg",
      youtube: "",
      website: "https://nums.gg/",
    },
  });
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     worldAddress: "",
  //     namespace: "",
  //     project: "",
  //     preset: "",
  //     color: "",
  //     name: "",
  //     description: "",
  //     image: "",
  //     banner: "",
  //     discord: "",
  //     telegram: "",
  //     twitter: "",
  //     youtube: "",
  //     website: "",
  //   },
  // })

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      const process = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        console.log({
          description: byteArray.byteArrayFromString(values.description),
        });
        try {
          const calls = provider.registry.register_game({
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
          });
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
        <Button className="normal-case font-sans select-none min-h-12 flex justify-center items-center p-2 gap-x-2 rounded-b cursor-pointer text-sm font-medium text-foreground-300 bg-background-200 hover:bg-background-300">
          <PlusIcon size="sm" variant="line" />
          Register Game
        </Button>
      </SheetTrigger>
      <SheetContent className="border-background-300 overflow-clip flex flex-col">
        <SheetHeader>
          <SheetTitle className="select-none">Register a new Game</SheetTitle>
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
              />
              <Field
                name="namespace"
                label="Namespace*"
                placeholder="dojo_starter"
                form={form}
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
            <Button className="mt-4" type="submit" isLoading={loading}>
              Submit
            </Button>
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
}: {
  name: string;
  label: string;
  placeholder: string;
  form: UseFormReturn<z.infer<typeof formSchema>>;
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
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
