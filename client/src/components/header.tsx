import { useNavigate } from "react-router-dom";
import { Connection } from "./connection";
import ArcadeHeader from "./modules/arcade-header";

interface HeaderProps {
  cover?: string;
}

export const Header = ({ cover }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <ArcadeHeader cover={cover} onClick={() => navigate("/")}>
      <Connection />
    </ArcadeHeader>
  );
};
