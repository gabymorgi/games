import 'antd/lib/date-picker/style/index'

import React from 'react'
import styled from 'styled-components'
import generatePicker, { PickerProps } from 'antd/lib/date-picker/generatePicker'

import dateFnsGenerateConfig from './DatePicker.config'

const AntDatePicker = generatePicker<Date>(dateFnsGenerateConfig)

const DatePicker = styled(AntDatePicker)`
  .ant-picker-input > input::placeholder {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    color: #9ea1a6;
  }

  .ant-picker-input > input {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 14px;
    color: #212121 !important;
  }
`

export default DatePicker

const StyledMonthPicker = styled(AntDatePicker)`
  && {
    border-radius: 3px;
    min-width: 150px;
    .ant-input::-webkit-input-placeholder {
      color: #9ea1a6 !important;
      font-size: 14px !important;
      font-weight: 300 !important;
    }
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #9ea1a6 !important;
      font-size: 14px !important;
      font-weight: 300 !important;
    }
  }
`

export const MonthPicker: React.FC<PickerProps<Date>> = (props) => {
  return <StyledMonthPicker picker="month" {...props} />
}
