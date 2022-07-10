import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import {
  FilterValue,
  SorterResult,
} from "antd/lib/table/interface";
import {
  PaginationProps,
  Table as AntTable,
  TableProps,
} from "antd";
import { MobileTable, MobileTableCell, MobileTableRow } from "./MobileTable";
import { useIsDesktop } from "../styles/Resolutions";
import React from "react";
import { TableContainer } from "../styles/TableStyles";

interface paginationPropsFunctionI {
  (currentPage: number, totalItems: number): PaginationProps;
}

export const getPaginationProps: paginationPropsFunctionI = (
  currentPage: number,
  totalItems: number
) => {
  return {
    showTotal: (total) => `Total ${total} items`,
    size: "small",
    current: currentPage,
    total: totalItems,
    defaultPageSize: 48,
    showSizeChanger: true,
    pageSizeOptions: ["12", "24", "48", "96"],
  };
};

export const paginationToQuery = (pagination: TablePaginationConfig) => {
  return {
    skip: ((pagination.current || 1) - 1) * (pagination.pageSize || 48),
    first: pagination.pageSize || 48,
  };
};

export const sorterToQuery = (
  sorter: SorterResult<any> | SorterResult<any>[]
) => {
  return sorter instanceof Array || !sorter.field || !sorter.order
    ? undefined
    : `${sorter.field}_${sorter.order === "descend" ? "desc" : "asc"}`;
};

export declare type TablePaginationType = TablePaginationConfig;
export declare type TableFiltersType = Record<string, FilterValue | null>;
export declare type TableSorterType = SorterResult<any> | SorterResult<any>[];

interface CustomTableProps {
  tableFilters?: any;
}

type TableType = React.FC<TableProps<any> & CustomTableProps> & {
  Column: <RecordType>(_: ColumnProps<RecordType>) => null;
};

const Table: TableType = (props) => {
  const isDesktop = useIsDesktop();

  return (
    <TableContainer>
      {isDesktop ? (
        <AntTable pagination={false} {...props} />
      ) : (
        <MobileTable>
          {props.dataSource?.map((row) => (
            <MobileTableRow
              key={
                props.rowKey
                  ? typeof props.rowKey === "string"
                    ? row[props.rowKey]
                    : props.rowKey(row)
                  : row.key
              }
            >
              {props.columns?.map((column: any) => (
                <MobileTableCell className={column.dataIndex || column.title} key={column.dataIndex || column.title}>
                  <div className="label">{column.title}</div>
                  <div className="value">{row[column.dataIndex]}</div>
                </MobileTableCell>
              ))}
            </MobileTableRow>
          ))}
        </MobileTable>
      )}
    </TableContainer>
  );
};
Table.Column = AntTable.Column;

export default Table;
