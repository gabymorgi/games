import styled from "styled-components";
import { MAX_MD_SIZE, MAX_SM_SIZE } from "../styles/Resolutions";

export const MobileTable = styled.div`
  display: grid;
  gap: 20px 20px;
  color: #eee;
  background-color: black;
  @media (max-width: ${MAX_MD_SIZE}px) {
    grid-template-columns: repeat(2, 50%);
  }
  @media (max-width: ${MAX_SM_SIZE}px) {
    grid-template-columns: 100%;
  }
`

export const MobileTableRow = styled.div`
  border: 1px solid #333;
  border-radius: 8px;
  align-self: baseline;
`

export const MobileTableCell = styled.div`
  padding: 8px;
  background: #222;
  display: flex;
  justify-content: space-between;
  column-gap: 32px;
  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &:nth-child(2n + 1) {
    background: #111;
  }
  .label {
    font-weight: bold;
  }
  .value {
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    > * {
      justify-content: flex-end;
    }
  }
`
