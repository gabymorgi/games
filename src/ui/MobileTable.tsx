import styled from "styled-components";
import { MAX_MD_SIZE, MAX_SM_SIZE } from "../styles/Resolutions";

export const MobileTable = styled.div`
  display: grid;
  gap: 20px 20px;
  color: #eee;
  background-color: black;
  @media (max-width: ${MAX_MD_SIZE}px) {
    grid-template-columns: repeat(2, calc(50% - 10px));
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
  align-items: center;
  column-gap: 32px;
  &.score {
    flex-direction: column;
    gap: 8px;
    .label {
      width: 100%;
      > * {
        display: flex;
        justify-content: space-between;
      }
    }
    .value {
      width: 100%;
    }
  }
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
