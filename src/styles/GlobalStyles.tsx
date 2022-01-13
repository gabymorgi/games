import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    background-color: #000;
    color: #FFF;
    padding: 20px;
  }

  .even-row {
    background-color: white;
  }

  .odd-row {
    background-color: #00000010;
  }

  .ant-table-filter-column {
    justify-content: flex-start !important;
  }

  .ant-table-filter-column .ant-table-column-title {
    flex: unset !important;
  }
`