import { ColumnProps, TablePaginationConfig } from "antd/lib/table";
import {
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
  hidePagination?: boolean;
  paginationTotalItems?: number;
}

interface CustomColumnProps<RecordType> extends ColumnProps<RecordType> {
  filter?: FilterType;
}

const Column = <RecordType extends unknown>({
  filter,
  ...props
}: CustomColumnProps<RecordType>) => <AntTable.Column {...props} />;

//React.ForwardRefExoticComponent<CustomProps & React.RefAttributes<any>>
type ForwardTableProps = Omit<TableProps<any>, "pagination"> & CustomTableProps;
export type ForwardTableRef = {
  getPagination: TablePaginationConfig;
  setPagination: React.Dispatch<React.SetStateAction<TablePaginationConfig>>;
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
    (
      {
        paginationTotalItems,
        hidePagination,
        onChange: onTableChange,
        ...props
      },
      ref
    ) => {
      const isDesktop = useIsDesktop();
      const [tablePagination, setTablePagination] =
        useState<TablePaginationType>(
          getPaginationProps(
            1,
            paginationTotalItems || props.dataSource?.length || 0
          )
        );

      useImperativeHandle(ref, () => ({
        getPagination: tablePagination,
        setPagination: setTablePagination,
      }));

      useEffect(() => {
        if (
          paginationTotalItems &&
          paginationTotalItems !== tablePagination.total
        ) {
          const newTablePagination = {
            ...tablePagination,
            total: paginationTotalItems,
          };
          if (
            tablePagination.current &&
            tablePagination.pageSize &&
            paginationTotalItems &&
            tablePagination.current * tablePagination.pageSize >
              paginationTotalItems
          ) {
            newTablePagination.current = 1;
            onTableChange?.(newTablePagination, {}, {}, {} as any);
          }
          setTablePagination(newTablePagination);
        }
      }, [onTableChange, paginationTotalItems, tablePagination]);

      const onPaginationChange = (page: number, pageSize: number) => {
        console.log(page, pageSize);
        const newTablePagination = {
          ...tablePagination,
          pageSize,
          current: page,
        };
        setTablePagination(newTablePagination);
        onTableChange?.(
          newTablePagination,
          {},
          {},
          { action: "paginate", currentDataSource: [] }
        );
      };

      const handleTableChange = (
        pagination: TablePaginationType,
        filters: TableFiltersType,
        sorter: TableSorterType,
        extra: TableCurrentDataSource<any>
      ) => {
        console.log(pagination, filters, sorter, extra);
        switch (extra.action) {
          case "paginate":
            setTablePagination(pagination);
        }
        onTableChange?.(pagination, filters, sorter, extra);
      };

      const columns = useMemo(() => {
        const columns: any[] = [];
        if (!isDesktop) {
          React.Children.forEach(props.children, (child) => {
            if (typeof child === "object") {
              if ((child as any)?.type?.name === "Column") {
                columns.push((child as any).props);
              }
            }
            console.log((child as any)?.type, (child as any)?.type?.name);
          });
        }
        return columns;
      }, [isDesktop, props.children]);

      console.log(columns)

      if (isDesktop) {
        return (
          <TableContainer>
            <AntTable
              onChange={handleTableChange}
              pagination={hidePagination ? false : tablePagination}
              {...props}
            />
          </TableContainer>
        );
      } else {
        const sliceData = paginationToQuery(tablePagination)
        return (
          <TableContainer>
            <MobileTable>
              {(hidePagination ? props.dataSource : props.dataSource?.slice(sliceData.skip, sliceData.skip + sliceData.first))?.map((row) => (
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
            {hidePagination ? undefined : (
              <Pagination
                className="ant-table-pagination ant-table-pagination-right"
                onChange={onPaginationChange}
                {...tablePagination}
              />
            )}
          </TableContainer>
        );
      }
    }
  ),
  {
    Column: Column,
  }
);

export default Table;
