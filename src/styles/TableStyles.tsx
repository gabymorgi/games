import styled from 'styled-components'
import colorPalette, { layout } from './variables'

export const FilterContainer = styled.div`
  padding: 8px;
`

export const TableContainer = styled.div`
  //display: grid;
  //grid-template-columns: repeat(8, 1fr);
  && {
    border-radius: 8px;
    td.ant-table-column-sort {
      background-color: inherit;
    }
    .ant-table {
      color: white;
      background-color: black;
      border: 1px solid ${colorPalette.cardBorder};
      border-radius: ${layout.borderRadius};
      font-size: 14px;
    }
    .ant-table-thead > tr > th {
      background-color: #333;
      color: #fff;
      border: none;
      font-size: 14px;
      font-weight: 600;
      position: sticky;
      top: 0;
      z-index: 10;
      &:before {
        content: unset !important; //idk how to be more specific so ant don't override this
      }
      &:first-child {
        border-top-left-radius: 8px;
      }
      &:last-child {
        border-top-right-radius: 8px;
      }
    }
    .ant-table-tbody > tr {
      color: #eee;
      background: #222;
      &:not(.ant-table-placeholder):nth-child(2n + 1) {
        background: #111;
      }
      > td {
        border: none;
        background-color: unset;
      }
      &:last-child {
        > td {
          &:first-child {
            border-bottom-left-radius: 8px;
          }
          &:last-child {
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
    .ant-table-filter-column,
    .ant-table-column-sorters {
      justify-content: flex-start;
      .ant-table-column-title {
        flex: unset;
        margin-right: 7px;
      }
      .ant-table-filter-trigger {
        margin: 0;
        color: #696;
        &.active {
          color: #cfc;
        }
      }
      .ant-table-column-sorter {
        color: #696;

        .ant-table-column-sorter-up.active,
        .ant-table-column-sorter-down.active {
          color: #cfc;
        }
      }
    }

    .ant-pagination {
      align-items: center;
      .ant-pagination-total-text {
        color: #eee;
        margin-right: 26px;
      }
      .ant-pagination-item {
        margin: 0 4px;
        font-weight: 500;
        &:not(.ant-pagination-item-active) {
          background-color: #696;
          border-color: #363;
          > a {
            padding: 0;
            color: #cfc;
          }
          &:hover {
            background: #9c9;
            > a {
              color: #363;
            }
          }

          &:active {
            background: #cfc;
            > a {
              color: #696;
            }
          }
        }
      }
      .ant-pagination-item-active {
        background: #cfc;
        border-color: #363;
        > a {
          padding: 0;
          color: #363;
        }
      }
      .ant-pagination-prev,
      .ant-pagination-next {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-jump-next,
      .ant-pagination-jump-prev {
        margin: 0 4px;
        button,
        .ant-pagination-item-container {
          background-color: #696;
          border-color: #363;
          color: #cfc;
          font-size: 20px;

          .ant-pagination-item-link-icon,
          .ant-pagination-item-ellipsis {
            color: #cfc;
          }
        }
      }
      .ant-pagination-disabled,
      .ant-pagination-disabled:hover,
      .ant-pagination-disabled:focus {
        button {
          background-color: #222;
          color: #666;
          border-color: #444;
        }
      }
      .ant-select-selector {
        transition: 0s;
        border-radius: 4px;
        border: 1px solid #363;
        box-shadow: 0px 2px 2px #030;
        height: unset;
        min-height: 25px;
        padding: 3px 4px;
        .ant-select-selection-item {
          color: #eee;
        }
        input::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }

    .ant-table-summary > tr > th,
    .ant-table-summary > tr > td {
      border-bottom: none;
    }

    .ant-pagination-options {
      .ant-select {
        .ant-select-selector,
        .ant-select-arrow {
          background-color: #696;
          color: #cfc;
        }

        .ant-select-dropdown,
        .ant-select-item {
          background-color: #030;
          color: #cfc;
        }
        .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
          background-color: #141;
          color: #cfc;
        }
        .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
          background-color: #363;
          color: #cfc;
        }
      }
    }
  }
`
