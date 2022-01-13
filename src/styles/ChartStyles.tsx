import styled from "styled-components";

export const Filters = styled.div`
  display: flex;
  justify-content: space-between;
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
`

export const PieCharts = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  > * {
    width: 50%;
    min-height: 100px;
    height: 50vh;
    background-color: #111;
  }
`

export const LineChart = styled.div`
  width: 100%;
  min-height: 100px;
  height: 25vh;
  background-color: #111;
`