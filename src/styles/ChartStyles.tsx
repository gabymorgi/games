import styled from "styled-components";
import { isMobile } from "./Resolutions";

export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 20px;
  > * {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .filters {
    .range-container {
      .value {
        padding: 0px 10px;
      }
      margin-bottom: 8px;
    }
    .history {
      background-color: #444;
      padding: 2px 16px 8px;
      border-radius: 20px;
    }
  }
  .totals {
    .value {
      color: #CFC;
      font-weight: bold;
    }
  }

  @media(${isMobile}) {
    flex-direction: column;
    row-gap: 20px;
    > * {
      width: 100%;
    }
  }
`

export const PieCharts = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  > * {
    width: 50%;
    min-height: 100px;
    height: 50vh;
    .ant-card-body, .ant-card-body > * {
      height: 100%;
    }
  }

  @media(${isMobile}) {
    flex-direction: column;
    row-gap: 20px;
    > * {
      width: 100%;
    }
  }
`

export const LineChart = styled.div`
  width: 100%;
  min-height: 100px;
  height: 30vh;
  > *, .ant-card-body, .ant-card-body > * {
    height: 100%;
  }
`