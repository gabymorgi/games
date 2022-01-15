/* eslint-disable react/display-name */
import React, { useLayoutEffect, useRef } from 'react'
import { Input as AntInput, Input, Radio } from 'antd'
import { FilterDropdownProps, FilterValue } from 'antd/lib/table/interface'
import { endOfDay, parseISO, startOfDay } from 'date-fns'

import { FlexSection } from './Layout'
import Button from './Button'
import DatePicker from './DatePicker'
import { FilterContainer } from '../styles/TableStyles'
import Checkbox, { CheckboxGroup } from './Checkbox'

const dropDownAlignTopStyle = {
  points: ['bl', 'tl'],
  offset: [0, -4],
  overflow: {
    adjustX: 0,
    adjustY: 1,
  },
}

interface FilterDropdownFactoryProps {
  loading?: boolean
}

interface FilterDropdownFactoryOptionsProps extends FilterDropdownFactoryProps {
  options: Array<{
    label: React.Key
    value: React.Key
  }>
}

interface FilterDropdownFactoryDateRangeProps extends FilterDropdownFactoryProps {
  allowEmptyEnd?: boolean
  allowEmptyStart?: boolean
  dropdownAlignTop?: boolean
  showTime?: boolean
}

export const filterDropdownFactoryStr = (extraProps?: FilterDropdownFactoryProps) => {
  return (props: FilterDropdownProps) => {
    const inputRef = useRef<AntInput>(null)
    useLayoutEffect(() => {
      if (props.visible && inputRef.current) {
        // this settimeout took a lot of debugging time, and we left it here because
        // it's being used in official antd documentation here
        // https://github.com/ant-design/ant-design/commit/077ea950d482b68f1c7147f6df46758079892bfd
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.select()
          }
        }, 100)
      }
    }, [inputRef, props.visible])
    return (
      <FilterContainer>
        <Input
          disabled={extraProps?.loading}
          ref={inputRef}
          value={props.selectedKeys[0]}
          onChange={(e) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => props.confirm()}
        />
        <FlexSection gutter={8} className="mt-8">
          <Button size="small" disabled={extraProps?.loading} onClick={() => props.confirm()} type="primary">
            Filter
          </Button>
          <Button size="small" disabled={extraProps?.loading} onClick={props.clearFilters}>
            Clear
          </Button>
        </FlexSection>
      </FilterContainer>
    )
  }
}

export const filterDropdownFactoryBool = (extraProps?: FilterDropdownFactoryProps) => {
  return (props: FilterDropdownProps) => (
    <FilterContainer>
      <Checkbox
        disabled={extraProps?.loading}
        value={props.selectedKeys[0] === 'true'}
        checked={props.selectedKeys[0] === 'true'}
        indeterminate={props.selectedKeys[0] === undefined}
        onClick={() =>
          props.setSelectedKeys(
            props.selectedKeys[0] === 'true' ? ['false'] : props.selectedKeys[0] === 'false' ? [] : ['true'],
          )
        }
      >
        Yes
      </Checkbox>
      <div className="mt-8">
        <Button size="small" disabled={extraProps?.loading} onClick={() => props.confirm()} type="primary">
          Filter
        </Button>
      </div>
    </FilterContainer>
  )
}

export const filterDropdownFactoryRadio = (extraProps: FilterDropdownFactoryOptionsProps) => {
  return (props: FilterDropdownProps) => {
    return (
      <FilterContainer>
        <Radio.Group
          value={props.selectedKeys[0]}
          onChange={(e) => props.setSelectedKeys([e.target.value])}
          className="flex flex-col"
        >
          {extraProps.options?.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
        <FlexSection gutter={8} className="mt-16">
          <Button size="small" disabled={extraProps.loading} onClick={() => props.confirm()} type="primary">
            Filter
          </Button>
          <Button size="small" disabled={extraProps.loading} onClick={props.clearFilters}>
            Clear
          </Button>
        </FlexSection>
      </FilterContainer>
    )
  }
}

export const filterDropdownFactoryCheckbox = (extraProps: FilterDropdownFactoryOptionsProps) => {
  return (props: FilterDropdownProps) => {
    return (
      <FilterContainer>
        <CheckboxGroup
          value={props.selectedKeys}
          onChange={(keys) => props.setSelectedKeys(keys.map((k) => k.toString()))}
          className="flex flex-col"
        >
          {extraProps.options?.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
        <FlexSection gutter={8} className="mt-8">
          <Button size="small" disabled={extraProps.loading} onClick={() => props.confirm()} type="primary">
            Filter
          </Button>
          <Button size="small" disabled={extraProps.loading} onClick={props.clearFilters}>
            Clear
          </Button>
        </FlexSection>
      </FilterContainer>
    )
  }
}

export const filterDropdownFactoryDateRange = (extraProps: FilterDropdownFactoryDateRangeProps) => {
  return (props: FilterDropdownProps) => {
    const minValue = props.selectedKeys?.[0] ? parseISO(props.selectedKeys[0].toString()) : new Date()
    const maxValue = props.selectedKeys?.[1] ? parseISO(props.selectedKeys[1].toString()) : new Date()
    return (
      <FilterContainer>
        <DatePicker.RangePicker
          allowEmpty={[!!extraProps.allowEmptyStart, !!extraProps.allowEmptyEnd]}
          value={[minValue, maxValue]}
          showTime={extraProps.showTime}
          dropdownAlign={extraProps.dropdownAlignTop ? dropDownAlignTopStyle : {}}
          onChange={(value) =>
            props.setSelectedKeys([
              value?.[0] ? startOfDay(value[0]).toISOString() : '',
              value?.[1] ? endOfDay(value[1]).toISOString() : '',
            ])
          }
        />
        <FlexSection gutter={8} className="mt-8">
          <Button size="small" disabled={extraProps.loading} onClick={() => props.confirm()} type="primary">
            Filter
          </Button>
          <Button size="small" disabled={extraProps.loading} onClick={props.clearFilters}>
            Clear
          </Button>
        </FlexSection>
      </FilterContainer>
    )
  }
}

export const parseFilterValueStr = (filter?: FilterValue | null) => filter?.[0] as string
export const parseFilterValueBool = (filter?: FilterValue | null) =>
  filter?.[0] === 'true' ? true : filter?.[0] === 'false' ? false : undefined
export const parseFilterValueRadio = (filter?: FilterValue | null) => filter?.[0]
