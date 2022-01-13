import styled from 'styled-components'
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
import { PaginationProps, Table as AntTable, TableProps } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

const StyledTable = styled(AntTable)`
  border-radius: 8px;
  td.ant-table-column-sort {
    background-color: inherit;
  }
  .ant-table {
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
    }
  }

  .ant-pagination {
    .ant-pagination-total-text {
      color: #eee;
      margin-right: 26px;
    }
    .ant-pagination-item {
      margin: 0 4px;
      border-radius: 50%;
      background: #111;
      border: none;
      font-weight: 500;
      > a {
        padding: 0;
        color: #eee;
      }

      &:hover {
        background: #9c9;
      }

      &:active {
        background: #cfc;
      }
    }
    .ant-pagination-item-active {
      background: #cfc;
      border: none;
      > a {
        color: #111;
      }
    }
    .ant-pagination-prev,
    .ant-pagination-next {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ant-pagination-arrow {
      font-size: 14px;
      color: #9c9;
    }
    .ant-pagination-disabled .ant-pagination-arrow,
    .ant-pagination-disabled:hover .ant-pagination-arrow,
    .ant-pagination-disabled:focus .ant-pagination-arrow {
      color: #bdbdbd;
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
` as typeof AntTable

export const paginationProps: PaginationProps = {
  showTotal: (total) => `Total ${total} items`,
  size: 'small',
  showSizeChanger: true,
  itemRender: (_page, type, originalElement) => {
    if (type === 'prev') {
      return (
        <div className="ant-pagination-arrow">
          <ArrowLeftOutlined />
        </div>
      )
    }
    if (type === 'next') {
      return (
        <div className="ant-pagination-arrow">
          <ArrowRightOutlined />
        </div>
      )
    }
    return originalElement
  },
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
    itemRender: (_page, type, originalElement) => {
      if (type === 'prev') {
        return (
          <div className="ant-pagination-arrow">
            <ArrowLeftOutlined />
          </div>
        )
      }
      if (type === 'next') {
        return (
          <div className="ant-pagination-arrow">
            <ArrowRightOutlined />
          </div>
        )
      }
      return originalElement
    },
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
    : `${sorter.field}_${sorter.order === 'descend' ? 'DESC' : 'ASC'}`
}

export declare type TablePaginationType = TablePaginationConfig
export declare type TableFiltersType = Record<string, FilterValue | null>
export declare type TableSorterType = SorterResult<any> | SorterResult<any>[]

interface CustomTableProps {
  showPagination?: boolean
}

type TableType = React.FC<TableProps<any> & CustomTableProps> & {
  Column: <RecordType>(_: ColumnProps<RecordType>) => null
}

const Table: TableType = ({ showPagination, pagination, ...props }) => {
  return <StyledTable pagination={showPagination ? paginationProps : pagination} {...props} />
}
Table.Column = AntTable.Column

export default Table
