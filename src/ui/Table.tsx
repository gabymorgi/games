import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import {
  Pagination,
  PaginationProps,
  Table as AntTable,
  TableProps,
} from "antd";
import { MobileTable, MobileTableCell, MobileTableRow } from "./MobileTable";
import { useIsDesktop } from "../styles/Resolutions";
import { useEffect, useImperativeHandle, useMemo, useState } from "react";
import React from "react";
import { TableContainer } from "../styles/TableStyles";
import TableFilterModal from "./TableFilterModal";

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
type TableExtraType = TableCurrentDataSource<any>;

interface FilterStringType {
  type: "string";
  initialValue?: string;
}

interface FilterBoolType {
  type: "boolean";
  initialValue?: boolean;
}

interface FilterRadioType {
  type: "radio";
  initialValue?: any;
  options: Array<{
    label: React.Key;
    value: React.Key;
  }>;
}

interface FilterCheckboxType {
  type: "checkbox";
  initialValue?: any[];
  options: Array<{
    label: React.Key;
    value: React.Key;
  }>;
}

interface FilterDateRangeType {
  type: "dateRange";
  initialValue?: [string, string];
  allowEmptyEnd?: boolean;
  allowEmptyStart?: boolean;
  dropdownAlignTop?: boolean;
  showTime?: boolean;
}

type FilterType =
  | FilterStringType
  | FilterBoolType
  | FilterRadioType
  | FilterCheckboxType
  | FilterDateRangeType;

interface CustomTableProps {
  tableFilters?: any;
}

type TableType = React.FC<TableProps<any> & CustomTableProps> & {
  Column: <RecordType>(_: ColumnProps<RecordType>) => null;
};

const Table: TableType = (props) => {
  const isDesktop = useIsDesktop();

  console.log(isDesktop, props.dataSource);
  return (
    <TableContainer>
      <TableFilterModal
        onFilter={() => console.log("asdf")}
        initialValues={props.tableFilters}
        filters={true}
      />
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
                <MobileTableCell key={column.dataIndex || column.title}>
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
