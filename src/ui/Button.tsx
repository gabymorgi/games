import { Button as AntButton } from "antd";
import styled from "styled-components";
import colorPalette from "../styles/variables";

export default styled(AntButton)`
  background-color: ${colorPalette.primaryBG};
  border-color: ${colorPalette.primaryBorder};
  color: ${colorPalette.primaryText};

  &:hover, &:focus {
    background-color: ${colorPalette.primaryBGHover};
    color: ${colorPalette.primaryTextHover};
    border-color: ${colorPalette.primaryBorderActive};
  }

  &:active {
    background-color: ${colorPalette.primaryBGActive};
    color: ${colorPalette.primaryTextActive};
    border-color: ${colorPalette.primaryBorderActive};
  }

  &[disabled], &[disabled]:hover {
    background-color: ${colorPalette.primaryBGDisabled};
    color: ${colorPalette.primaryTextDisabled};
    border-color: ${colorPalette.primaryBorderDisabled};
  }
`