/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";

export interface NavItemInfo {
  title: string;
  target: string;
}

export default function NavItem(props: NavItemInfo) {
  return (
    <li
      css={{
        backgroundColor: "purple",
        color: "white",
        display: "table",
        fontSize: 20,
        height: "100%",
        float: "left",
        textAlign: "center",
        padding: "20 10",
        minWidth: 100,
        "&:hover": {
          backgroundColor: "green"
        }
      }}
    >
      <Link
        to={props.target}
        css={{
          display: "table-cell",
          color: "white",
          textDecoration: "none",
          verticalAlign: "middle"
        }}
      >
        {props.title}
      </Link>
    </li>
  );
}
