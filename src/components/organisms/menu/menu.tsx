import * as React from "react";
import { IconHome } from "src/components/icons/home";
import { IconSearch } from "src/components/icons/search";
import { MenuItem } from "./menuItem";

import "./menu.scss";

const MENU_TITLES = {
  home: {
    title: "Home",
    link: "/chart",
    icon: <IconHome w={24} h={24} />,
  },
  search: {
    title: "Search",
    link: "/search/results",
    icon: <IconSearch w={24} h={24} />,
  },
};

const Menu: React.FC = React.memo(() => {
  const menuKeys = Object.values(MENU_TITLES);
  return (
    <ul className="menu">
      {menuKeys.map((item, index) => {
        return <MenuItem key={index} title={item.title} link={item.link} icon={item.icon} />;
      })}
    </ul>
  );
});

export default Menu;
