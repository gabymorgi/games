import { Button as AntButton } from "antd";
import styled from "styled-components";

export default styled(AntButton)`
  background-color: #696;
  border-color: #363;
  color: #CFC;

  &:hover {
    background-color: #9c9;
    color: #363;
  }

  &:active {
    background-color: #cfc;
    color: #696;
  }

  &[disabled], &[disabled]:hover {
    background-color: #222;
    color: #666;
    border-color: #111;
  }
`