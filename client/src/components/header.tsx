import { ArcadeHeader } from "@cartridge/ui-next";
import { Connection } from "./connection";

interface HeaderProps {
  cover?: string;
}

export const Header = ({ cover }: HeaderProps) => {
  return (
    <ArcadeHeader cover={cover}>
      <Connection />
    </ArcadeHeader>
  );
};
