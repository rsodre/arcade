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
  Textarea,
  TrashIcon,
} from "@cartridge/ui-next";
import { useAccount } from "@starknet-react/core";
import { useCallback, useMemo, useState } from "react";
import { AllowArray, byteArray, Call, constants } from "starknet";
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
import {
  Attributes,
  GameModel,
  Properties,
  Socials,
} from "@bal7hazar/arcade-sdk";
import ControllerConnector from "@cartridge/connector/controller";
import { MetadataHelper } from "@/helpers/metadata";

const formSchema = z.object({
  color: z.string().startsWith("#", { message: "Invalid Color" }),
  preset: z.string().min(2, { message: "Preset is required" }),
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  // Assets
  // Fetch to ensure the image is valid
  image: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Image URL",
    })
    .refine(
      async (val) => {
        const response = await fetch(val);
        return !!response && response.status !== 404;
      },
      {
        message: "Asset not found",
      },
    ),
  banner: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Banner URL",
    })
    .refine(
      async (val) => {
        const response = await fetch(val);
        return !!response && response.status !== 404;
      },
      {
        message: "Asset not found",
      },
    ),
  cover: z
    .string()
    .refine((val) => val.startsWith("http") || !val, {
      message: "Invalid Cover URL",
    })
    .refine(
      async (val) => {
        const response = await fetch(val);
        return !!response && response.status !== 404;
      },
      {
        message: "Asset not found",
      },
    ),
  // Socials
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
  github: z.string().refine((val) => val.startsWith("http") || !val, {
    message: "Invalid Github URL",
  }),
  videos: z
    .string()
    .refine((val) => val.split("\n").every((v) => v.startsWith("http") || !v), {
      message: "Invalid Video URL",
    }),
  images: z
    .string()
    .refine((val) => val.split("\n").every((v) => v.startsWith("http") || !v), {
      message: "Invalid Image URL",
    }),
});

export function Update({ game }: { game: GameModel }) {
  const { account, connector } = useAccount();
  const { provider } = useArcade();
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(false);

  const defaultValues = useMemo(() => {
    return {
      color: game.color || "",
      preset: game.properties?.preset || "",
      name: game.name || "",
      description: game.description || "",
      image: game.properties.icon || "",
      banner: game.properties.banner || "",
      cover: game.properties.cover || "",
      discord: game.socials?.discord || "",
      telegram: game.socials?.telegram || "",
      twitter: game.socials?.twitter || "",
      youtube: game.socials?.youtube || "",
      website: game.socials?.website || "",
      github: game.socials?.github || "",
      videos: game.socials?.videos?.join("\n") || "",
      images: game.socials?.images?.join("\n") || "",
    };
  }, [game]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onDelete = useCallback(() => {
    if (!account) return;
    const controller = (connector as ControllerConnector)?.controller;
    if (!controller) return;
    const process = async () => {
      setLoading(true);
      try {
        const args = {
          gameId: game.id,
        };
        const calls = provider.registry.remove_game(args);
        controller.switchStarknetChain(constants.StarknetChainId.SN_MAIN);
        await account.execute(calls);
        setClose(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    process();
  }, [provider, account, connector, game, setClose]);

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      if (!account) return;
      const controller = (connector as ControllerConnector)?.controller;
      if (!controller) return;
      const process = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        // Fetch images and encode them in base64
        const image = await MetadataHelper.gameImage(
          values.color,
          values.cover,
          values.image,
        );
        try {
          let calls: AllowArray<Call> = [];
          const attributes = new Attributes({
            color: values.color,
            preset: values.preset,
          });
          const properties = new Properties({
            preset: values.preset,
            icon: values.image,
            banner: values.banner,
            cover: values.cover,
          });
          const socials = new Socials({
            discord: values.discord,
            telegram: values.telegram,
            twitter: values.twitter,
            youtube: values.youtube,
            website: values.website,
            github: values.github,
            videos: values.videos.split("\n"),
            images: values.images.split("\n"),
          });
          const args = {
            gameId: BigInt(game.id),
            color: byteArray.byteArrayFromString(values.color),
            image: byteArray.byteArrayFromString(image),
            image_data: byteArray.byteArrayFromString(""),
            external_url: byteArray.byteArrayFromString(values.website),
            description: byteArray.byteArrayFromString(values.description),
            name: byteArray.byteArrayFromString(values.name),
            attributes: attributes.compile(),
            animation_url: byteArray.byteArrayFromString(""),
            youtube_url: byteArray.byteArrayFromString(values.youtube),
            properties: properties.compile(),
            socials: socials.compile(),
          };
          calls = provider.registry.update_game(args);
          controller.switchStarknetChain(constants.StarknetChainId.SN_MAIN);
          await account.execute(calls);
          setClose(true);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      process(values);
    },
    [provider, account, connector, setClose],
  );

  return (
    <Sheet open={close} onOpenChange={setClose}>
      <SheetTrigger asChild>
        {!game ? (
          <Button
            className="normal-case text-sm font-medium text-foreground-300 tracking-normal font-sans grow"
            variant="secondary"
            disabled={!account}
          >
            <PlusIcon size="xs" variant="solid" />
            Register Game
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8 bg-background-150 hover:bg-background-200 text-foreground-300 hover:text-foreground-100 border border-background-200"
            disabled={!account}
          >
            <GearIcon size="sm" />
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
              <Topic label="Metadata" />
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
              <Field
                name="cover"
                label="Cover"
                placeholder="https://dojo.com/cover.png"
                form={form}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Topic label="Attributes" />
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
              <Field
                name="github"
                label="Github"
                placeholder="https://github.com/dojoengine/dojo"
                form={form}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Topic label="Gallery" />
              <Field
                name="videos"
                label="Videos"
                placeholder="https://youtu.be/bkNF9VdY2-o https://youtu.be/-ptcWqcGiuo"
                form={form}
              />
              <Field
                name="images"
                label="Images"
                placeholder="https://dojo.com/1.png https://dojo.com/2.png"
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
                Update
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
          | "color"
          | "website"
          | "preset"
          | "description"
          | "image"
          | "banner"
          | "discord"
          | "telegram"
          | "twitter"
          | "youtube"
          | "videos"
          | "images"
      }
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-right w-20 select-none normal-case text-xs">
            {label}
          </FormLabel>
          <FormControl>
            {name === "videos" || name === "images" ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                disabled={disabled}
              />
            ) : (
              <Input placeholder={placeholder} {...field} disabled={disabled} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
