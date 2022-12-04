import { Menu } from "antd";
import { MENU_ITEMS } from "../../constants";

const MainMenu = () => (
  <Menu style={{ marginBottom: 10 }} items={MENU_ITEMS} mode="horizontal" />
);

export default MainMenu;
