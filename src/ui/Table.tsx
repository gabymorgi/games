import styled from 'styled-components'
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
import { Form, PaginationProps, Table as AntTable, TableProps } from 'antd'
import TableMobileComponents from './MobileTable'
import { useIsDesktop, useIsMobile } from '../styles/Resolutions'
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'
import React from 'react'

const StyledTable = styled(AntTable)`
  && {
    border-radius: 8px;
    td.ant-table-column-sort {
      background-color: inherit;
    }
    .ant-table {
      color: white;
      background-color: black;
      border-radius: 4px;
      font-size: 14px;
    }
    .ant-table-thead > tr > th {
      background-color: #333;
      color: #fff;
      border: none;
      font-size: 14px;
      font-weight: 600;
      &:before {
        content: unset !important; //idk how to be more specific so ant don't override this
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
        &:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        &:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
    .ant-table-row:hover > td {
      background: #181818 !important;
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

        .ant-table-column-sorter-up.active, .ant-table-column-sorter-down.active {
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
            color: #CFC;
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
      .ant-pagination-prev, .ant-pagination-next, .ant-pagination-jump-next, .ant-pagination-jump-prev {
        margin: 0 4px;
        button, .ant-pagination-item-container {
          background-color: #696;
          border-color: #363;
          color: #CFC;
          font-size: 20px;

          .ant-pagination-item-link-icon, .ant-pagination-item-ellipsis {
            color: #CFC;
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
        .ant-select-selector, .ant-select-arrow {
          background-color: #696;
          color: #CFC;
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
` as typeof AntTable

export const paginationProps: PaginationProps = {
  showTotal: (total) => `Total ${total} items`,
  size: 'small',
  showSizeChanger: true,
}

interface paginationPropsFunctionI {
  (totalItems: number): PaginationProps
}

export const getPaginationProps: paginationPropsFunctionI = (totalItems: number) => {
  return {
    showTotal: (total) => `Total ${total} items`,
    size: 'small',
    total: totalItems,
    defaultPageSize: 50,
    showSizeChanger: true,
  }
}

export const paginationToQuery = (pagination: TablePaginationConfig) => {
  return {
    skip: ((pagination.current || 1) - 1) * (pagination.pageSize || 50),
    first: pagination.pageSize || 50,
  }
}

export const sorterToQuery = (sorter: SorterResult<any> | SorterResult<any>[]) => {
  return sorter instanceof Array || !sorter.field || !sorter.order
    ? undefined
    : `${sorter.field}_${sorter.order === 'descend' ? 'desc' : 'asc'}`
}

export declare type TablePaginationType = TablePaginationConfig
export declare type TableFiltersType = Record<string, FilterValue | null>
export declare type TableSorterType = SorterResult<any> | SorterResult<any>[]

interface CustomTableProps {
  showPagination?: boolean
}

//React.ForwardRefExoticComponent<CustomProps & React.RefAttributes<any>>
type ForwardTableProps = TableProps<any> & CustomTableProps
export type ForwardTableRef = {
  toggleColor: () => void
}
type TableType = React.ForwardRefExoticComponent<ForwardTableProps & React.RefAttributes<ForwardTableRef>> & {
  Column: <RecordType>(_: ColumnProps<RecordType>) => null
}

const Table: TableType = Object.assign(React.forwardRef<ForwardTableRef, ForwardTableProps>(({ showPagination, pagination, ...props }, ref) => {
  const isDesktop = useIsDesktop()
  useImperativeHandle(ref, () => ({
    toggleColor: () => console.log("wuewue")
  }));
  const columns = useMemo(() => {
    const columns: any[] = []
    if (!isDesktop) {
      React.Children.forEach(props.children, (child, i) => {
        if (typeof(child) === "object") {
          if ((child as any)?.type?.name === "Column") {
            columns.push((child as any).props);
          }
        }
        console.log(child)
      })
    }
  }, [isDesktop])
  return isDesktop ? <StyledTable
    pagination={showPagination ? paginationProps : pagination}
    {...props}
  /> : <div>tablita mobile</div>
}), {
  Column: AntTable.Column
})

export default Table
