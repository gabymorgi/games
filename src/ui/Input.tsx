import { Input as AntInput } from "antd";
import styled from "styled-components";
import colorPalette from "../styles/variables";

export default styled(AntInput)`
  background-color: ${colorPalette.inputBG};
  border-color: ${colorPalette.inputBorder};
  color: ${colorPalette.inputText};

  &:hover {
    border-color: ${colorPalette.primaryBorderActive};
  }
`