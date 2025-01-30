import { ControllerIcon } from "@cartridge/ui-next";
import { Connection } from "./connection";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const Header = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="h-14 flex justify-between gap-x-px w-full">
      <div
        className="bg-background w-14 flex items-center justify-center cursor-pointer"
        onClick={handleClick}
      >
        <ControllerIcon className="h-6 w-6 text-primary" size={"lg"} />
      </div>
      <div className="bg-background flex justify-end items-center grow px-3 py-2">
        <Connection />
      </div>
    </div>
  );
};
