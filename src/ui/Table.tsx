import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import {
  Pagination,
  PaginationProps,
  Table as AntTable,
  TableProps,
} from "antd";
import { MobileTable, MobileTableCell, MobileTableRow } from "./MobileTable";
import { useIsDesktop } from "../styles/Resolutions";
import { useImperativeHandle, useMemo, useState } from "react";
import React from "react";
import { TableContainer } from "../styles/TableStyles";

export const paginationProps: PaginationProps = {
  showTotal: (total) => `Total ${total} items`,
  size: "small",
  showSizeChanger: true,
};

interface paginationPropsFunctionI {
  (totalItems: number): PaginationProps;
}

export const getPaginationProps: paginationPropsFunctionI = (
  totalItems: number
) => {
  return {
    showTotal: (total) => `Total ${total} items`,
    size: "small",
    total: totalItems,
    defaultPageSize: 50,
    showSizeChanger: true,
  };
};

export const paginationToQuery = (pagination: TablePaginationConfig) => {
  return {
    skip: ((pagination.current || 1) - 1) * (pagination.pageSize || 50),
    first: pagination.pageSize || 50,
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

interface FilterStringType {
  type: "string";
  initialValue?: string;
}

interface FilterBoolType {
  type: "boolean";
  initialValue?: boolean;
}

type FilterType = FilterStringType | FilterBoolType;

interface CustomTableProps {
  showPagination?: boolean;
}

interface CustomColumnProps<RecordType> extends ColumnProps<RecordType> {
  filter?: FilterType;
}

const Column = <RecordType extends unknown>({
  filter,
  ...props
}: CustomColumnProps<RecordType>) => <AntTable.Column {...props} />;

//React.ForwardRefExoticComponent<CustomProps & React.RefAttributes<any>>
type ForwardTableProps = TableProps<any> & CustomTableProps;
export type ForwardTableRef = {
  toggleColor: () => void;
};
type TableType = React.ForwardRefExoticComponent<
  ForwardTableProps & React.RefAttributes<ForwardTableRef>
> & {
  Column: <RecordType extends unknown>({
    filter,
    ...props
  }: CustomColumnProps<RecordType>) => JSX.Element; //<RecordType>(_: ColumnProps<RecordType>) => null
};

const Table: TableType = Object.assign(
  React.forwardRef<ForwardTableRef, ForwardTableProps>(
    ({ showPagination, pagination, ...props }, ref) => {
      const isDesktop = useIsDesktop();
      const [pagi, setPagi] = useState<TablePaginationType>({
        current: 1,
        defaultPageSize: 50,
        pageSize: 50,
        showSizeChanger: true,
        size: "small",
        total: 20,
      })
      useImperativeHandle(ref, () => ({
        toggleColor: () => console.log("wuewue"),
      }));

      const columns = useMemo(() => {
        const columns: any[] = [];
        if (!isDesktop) {
          React.Children.forEach(props.children, (child, i) => {
            if (typeof child === "object") {
              if ((child as any)?.type?.name === "Column") {
                columns.push((child as any).props);
              }
            }
            console.log(child);
          });
        }
        return columns;
      }, [isDesktop, props.children]);

      console.log({ paginationProps, pagination })
      return (
        <TableContainer>
          {isDesktop ? (
            <AntTable
              pagination={showPagination ? paginationProps : pagination}
              {...props}
            />
          ) : (
            <>
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
                    {columns.map((column) => (
                      <MobileTableCell key={column.dataIndex || column.title}>
                        <div className="label">{column.title}</div>
                        <div className="value">{row[column.dataIndex]}</div>
                      </MobileTableCell>
                    ))}
                  </MobileTableRow>
                ))}
              </MobileTable>
              {showPagination || pagination ? (
                <Pagination className="ant-table-pagination ant-table-pagination-right" {...(pagination || paginationProps)} />
              ) : undefined}
            </>
          )}
        </TableContainer>
      );
    }
  ),
  {
    Column: Column,
  }
);

export default Table;
