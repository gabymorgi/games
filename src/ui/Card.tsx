import { Card as AntCard } from "antd";
import styled from "styled-components";
import colorPalette, { layout } from "../styles/variables";

export default styled(AntCard)`
  border-radius: ${layout.borderRadius};
  background-color: ${colorPalette.cardBG};
  border-color: ${colorPalette.cardBorder};
  color: ${colorPalette.cardText};
`