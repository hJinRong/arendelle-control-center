/** @jsx jsx */
import { jsx } from "@emotion/core";
import NavItem, { NavItemInfo } from "./NavItem";
import arendelleLogo from "../static/img/arendelle.png";

export interface NavItemInfoList {
  navItemList: Array<NavItemInfo>;
}

function NavigationBar(props: NavItemInfoList) {
  return (
    <nav
      css={{
        height: 47,
        position: "relative",
      }}
    >
      <img
        src={arendelleLogo}
        alt="arendelle's logo"
        css={{
          height: "100%",
          width: "auto",
          float: "left",
          position: "relative"
        }}
      />
      <ul
        css={{
          height: "100%",
          position: "relative"
        }}
      >
        {props.navItemList.map(obj => (
          <NavItem title={obj.title} target={obj.target} key={obj.title}/>
        ))}
      </ul>
    </nav>
  );
}

export default NavigationBar;
