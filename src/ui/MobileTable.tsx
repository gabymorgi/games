import React from "react";

const Table: React.FC = ({ children, ...props }) => {
  console.log({ tableProps: props })
  const subRows: React.ReactNode[] = [];
  React.Children.forEach(children, (child: any, i) => {
    if (child?.type?.name !== "ColGroup") {
      subRows.push(child)
    } else {
      console.log(child)
    }
  })
  return <div id="table" {...props}>{subRows}</div>
}

const HeaderWrapper: React.FC = (props) => {
  console.log({ HeaderWrapperProps: props })
  return <div id="headerWrapper">{props.children}</div>
}

const HeaderRow: React.FC = (props) => {
  console.log({ HeaderRowProps: props })
  return <div id="headerRow">{props.children}</div>
}

const HeaderCell: React.FC = (props) => {
  console.log({ HeaderCellProps: props })
  return <div id="headerCell">{props.children}</div>
}

const BodyWrapper: React.FC = (props) => {
  console.log({ BodyWrapperProps: props })
  return <div id="bodyWrapper">{props.children}</div>
}

const BodyRow: React.FC = (props) => {
  console.log({ BodyRowProps: props })
  return <div id="bodyRow">{props.children}</div>
}

const BodyCell: React.FC = (props) => {
  console.log({ BodyCellProps: props })
  return <div id="bodyCell">{props.children}</div>
}

const TableMobileComponents = {
  table: Table,
  header: {
    wrapper: HeaderWrapper,
    row: HeaderRow,
    cell: HeaderCell,
  },
  body: {
    wrapper: BodyWrapper,
    row: BodyRow,
    cell: BodyCell,
  }
}

export default TableMobileComponents
