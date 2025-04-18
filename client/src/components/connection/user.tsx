import ControllerConnector from "@cartridge/connector/controller";
import { Button, GearIcon, SignOutIcon } from "@cartridge/ui-next";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useCallback, useEffect, useState } from "react";
import { UserAvatar } from "../user/avatar";
import { useNavigate } from "react-router-dom";
import ControllerActions from "../modules/controller-actions";
import ControllerAction from "../modules/controller-action";

export function User() {
  const { account, connector, address } = useAccount();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    async function fetch() {
      try {
        const name = await (connector as ControllerConnector)?.username();
        if (!name) return;
        setName(name);
      } catch (error) {
        console.error(error);
      }
    }
    fetch();
  }, [connector]);

  const navigate = useNavigate();
  const handleClick = useCallback(
    (address: string | undefined) => {
      if (!address) return;
      const url = new URL(window.location.href);
      url.searchParams.set("address", address);
      url.searchParams.set("playerTab", "inventory");
      navigate(url.toString().replace(window.location.origin, ""));
    },
    [navigate],
  );

  const handleSettings = useCallback(async () => {
    const controller = (connector as ControllerConnector)?.controller;
    if (!controller) {
      console.error("Connector not initialized");
      return;
    }
    controller.openSettings();
  }, [connector]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    navigate("/");
  }, [disconnect, navigate]);

  if (!isConnected || !account || !name) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        className="bg-background-200 hover:bg-background-300 lg:bg-background-100 lg:hover:bg-background-200 px-3 py-2.5"
        onClick={() => handleClick(address)}
      >
        <div className="h-5 w-5 flex items-center justify-center">
          <UserAvatar username={name} size="lg" />
        </div>
        <p className="text-sm font-semibold normal-case">{name}</p>
      </Button>
      <ControllerActions>
        <ControllerAction
          label="Settings"
          Icon={<GearIcon size="sm" />}
          onClick={handleSettings}
        />
        <ControllerAction
          label="Disconnect"
          Icon={<SignOutIcon size="sm" />}
          onClick={handleDisconnect}
        />
      </ControllerActions>
    </div>
  );
}
