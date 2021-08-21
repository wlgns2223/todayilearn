import React from "react";
import styled from "styled-components";
import { useTheme } from "../context/themeProvider";

function Main() {
  const [themeMode, toggleTheme] = useTheme();
  const message = themeMode === "light" ? "Light Mode" : "Dark Mode";
  return (
    <Container>
      <p>{message}</p>
      <Toggle id="checkbox" onClick={toggleTheme} />
      <ToggleLabel htmlFor="checkbox">check</ToggleLabel>
    </Container>
  );
}

export default Main;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  p {
    font-size: 3rem;
  }
`;
const ToggleLabel = styled.label`
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: 42px;
  height: 21px;
  border-radius: 10px;
  background-color: #666;
  vertical-align: top;
  border: 1px solid #fff;
  cursor: pointer;
  color: transparent;

  &::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background-color: #fff;
  }
`;

const Toggle = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  margin: -1px;
  opacity: 0;
  &:checked + ${ToggleLabel} {
    background-color: #62a7ee;
  }

  &:checked + ${ToggleLabel}::after {
    left: auto;
    right: 1px;
  }
`;
