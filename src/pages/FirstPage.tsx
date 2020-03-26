/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/core";
import styled from "@emotion/styled";
import NavigationBar from "../components/NavigationBar";
import { NavItemInfo } from "../components/NavItem";
import codeImg from "../static/img/code.jpg";
import { Switch, Route } from "react-router-dom";
import OtherPage from "./OtherPage";
import { useRef, useState, useEffect } from "react";

const Tipspan = styled.div`
  position: relative;
  color: #fff;
  font-size: 16px;
  line-height: 16px;
  width: fit-content;
  top: 100px;
  left: 120px;
  margin-top: 15px;
  margin-bottom: 15px;
  user-select: none;
`;

const inputStyle = css`
  position: relative;
  top: 100px;
  left: 120px;
  color: #fff;
  background-color: transparent;
  outline: none;
  user-select: none;
  &::placeholder {
    color: #fff;
  }
`;

const InputableSymbol = () => (
  <span
    css={css`
      color: white;
      padding-right: 10px;
      position: relative;
      top: 100px;
      left: 120px;
      user-select: none;
    `}
  >
    >
  </span>
);

export default function FirstPage() {
  const navItemList: Array<NavItemInfo> = [
    { title: "baidu", target: "/other" },
    { title: "sohu", target: "/other" },
    { title: "taobao", target: "/other" }
  ];

  const intoTheUnknown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      function() {
        if (intoTheUnknown.current !== null) {
          if (this.window.pageYOffset > intoTheUnknown.current.offsetTop - 10) {
            intoTheUnknown.current.classList.add("current");
          } else {
            intoTheUnknown.current.classList.remove("current");
          }
        }
      },
      false
    );
    return function() {
      intoTheUnknown.current?.removeEventListener(
        "scroll",
        function() {},
        false
      );
    };
  });

  const [join, setJoin] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  return (
    <div
      css={{
        width: "100%",
        height: "100%"
      }}
    >
      <header
        css={{
          zIndex: 100,
          position: "fixed",
          top: 0,
          width: "100%"
        }}
      >
        <NavigationBar navItemList={navItemList} />
      </header>

      <Switch>
        <Route sensitive exact strict path='/'>
          <section>
            <div
              css={{
                position: "relative",
                width: "100%",
                height: "auto"
              }}
            >
              <img
                css={{
                  position: "relative",
                  width: "100%",
                  height: "100%"
                }}
                src={codeImg}
                alt='攝影師：Lukas，連結：Pexels'
              />
              <div
                css={{
                  position: "absolute",
                  bottom: "5%",
                  right: 0,
                  backgroundColor: "red",
                  width: "70%",
                  height: "70%",
                  display: "table",
                  padding: 60
                }}
              >
                <div
                  css={{
                    display: "table-cell",
                    backgroundColor: "green",
                    width: "100%",
                    height: "100%",
                    textAlign: "left",
                    verticalAlign: "middle",
                    fontSize: "210%",
                    padding: "5%"
                  }}
                >
                  Arendelle, witness the wisdom with you.
                </div>
              </div>
            </div>
          </section>

          {/**
           * Registry part.
           */}

          <div
            css={css`
              width: 100%;
              height: 718px;
              background-color: #fff;
              transition: background-color 1000ms ease-in-out 50ms;
              position: relative;
              &.current {
                background-color: #282c34;
              }
            `}
            ref={intoTheUnknown}
          >
            <Tipspan>
              Have you had your adventure and need something new?
              <br />
              Are you afraid of what you are risking if you follow me?
              ([Y]es/[N]o):
            </Tipspan>
            <InputableSymbol />
            <input
              css={css`
                ${inputStyle}
              `}
              type='text'
              name='join'
              id='join'
              value={join}
              onChange={e => setJoin(e.target.value)}
            />
            {(join.toLowerCase() === "y" || join.toLowerCase() === "yes") && (
              <div>
                <Tipspan>Wow! What's your name?</Tipspan>
                <InputableSymbol />
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  css={css`
                    ${inputStyle}
                  `}
                />
              </div>
            )}
            {name !== "" && (
              <div>
                <Tipspan>Okay! {name}, you should set a password.</Tipspan>
                <InputableSymbol />
                <input
                  type='password'
                  name='pwd'
                  id='pwd'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  css={css`
                    ${inputStyle}
                  `}
                />
              </div>
            )}
            {password !== "" && (
              <div>
                <Tipspan>
                  Confirm the password again, it must be same as the above what
                  you input.
                </Tipspan>
                <InputableSymbol />
                <input
                  type='password'
                  name='confirmPwd'
                  id='confirmPwd'
                  css={css`
                    ${inputStyle}
                  `}
                  value={confirmPwd}
                  onChange={e => setConfirmPwd(e.target.value)}
                />
              </div>
            )}
            {( name !== "" && password !=="" && confirmPwd === password) && (
              <div
                css={css`
                  width: fit-content;
                  color: white;
                  border: dashed 1px white;
                  background-color: transparent;
                  position: relative;
                  left: 120px;
                  top: 100px;
                  padding: 15px 25px;
                  margin: 15px 0;
                `}
              >
                I am ready!
              </div>
            )}
          </div>
        </Route>
        <OtherPage />
      </Switch>
    </div>
  );
}
