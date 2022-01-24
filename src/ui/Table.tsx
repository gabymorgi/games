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
    label: React.Key
    value: React.Key
  }>
}

interface FilterCheckboxType {
  type: "checkbox";
  initialValue?: any[];
  options: Array<{
    label: React.Key
    value: React.Key
  }>
}

interface FilterDateRangeType {
  type: "dateRange";
  initialValue?: [string, string];
  allowEmptyEnd?: boolean
  allowEmptyStart?: boolean
  dropdownAlignTop?: boolean
  showTime?: boolean
}

type FilterType = FilterStringType | FilterBoolType | FilterRadioType | FilterCheckboxType | FilterDateRangeType;

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
        columns: columnsProp,
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
      const [tableFilters, setTableFilters] = useState<TableFiltersType>({})
      const [columns, setColumns] = useState<ColumnsType<any>>()

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
            onTableChange?.(newTablePagination, tableFilters, {}, { action: "paginate" } as TableExtraType);
          }
          setTablePagination(newTablePagination);
        }
      }, [onTableChange, paginationTotalItems, tableFilters, tablePagination]);

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
            break
          case "filter":
            setTableFilters(filters)
            break
        }
        onTableChange?.(pagination, filters, sorter, extra);
      };

      useEffect(() => {
        const columns: any[] = [];
        React.Children.forEach(props.children, (child) => {
          if (typeof child === "object") {
            if ((child as any)?.type?.name === "Column") {
              columns.push((child as any).props);
            }
          }
          console.log((child as any)?.type, (child as any)?.type?.name);
        });
        setColumns(columns)
      }, [props.children]);

      useEffect(() => {
        const filters: TableFiltersType = {}
        if (!columns.length) return
        console.log(columns)
        columns.forEach((c) => {
          if (c.filter) {
            switch (c.filter.type) {
              case "string":
              case "radio":
                filters[c.dataIndex || c.title] = c.filter.initialValue ? [c.filter.initialValue] : []
                break
              case "boolean":
                filters[c.dataIndex || c.title] = c.filter.initialValue === true ? ["true"] : c.filter.initialValue === false ? ["false"] : []
                break
              default:
                filters[c.dataIndex || c.title] = c.filter.initialValue
                break
            }
          }
        })
        setTableFilters(filters)
      }, [columns])

      console.log(columns)

      if (isDesktop) {
        return (
          <TableContainer>
            <AntTable
              onChange={handleTableChange}
              pagination={hidePagination ? false : tablePagination}
              columns={columns}
              {...props}
            />
          </TableContainer>
        );
      } else {
        const sliceData = paginationToQuery(tablePagination)
        const onPaginationChange = (page: number, pageSize: number) => {
          const newTablePagination = {
            ...tablePagination,
            pageSize,
            current: page,
          };
          setTablePagination(newTablePagination);
          onTableChange?.(
            newTablePagination,
            tableFilters,
            {},
            { action: "paginate" } as TableExtraType
          );
        };
        return (
          <TableContainer>
            <TableFilterModal onFilter={() => console.log("asdf")} initialValues={tableFilters} filters={true} />
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
