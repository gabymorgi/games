import 'antd/lib/date-picker/style/index'

import styled, { createGlobalStyle } from 'styled-components'
import generatePicker, {
  PickerProps,
} from 'antd/lib/date-picker/generatePicker'

import dateFnsGenerateConfig from './DatePicker.config'
import colorPalette from '../styles/variables'

const AntDatePicker = generatePicker<Date>(dateFnsGenerateConfig)

const StyledDatePicker = styled(AntDatePicker)`
  && {
    width: 100%;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: ${colorPalette.inputBG};
    border-color: ${colorPalette.inputBorder};

    &:hover,
    &.ant-picker-focused {
      border-color: ${colorPalette.primaryBorderActive};
    }

    .ant-picker-input > input {
      color: ${colorPalette.inputText};
    }

    .ant-picker-suffix {
      color: ${colorPalette.inputText};
    }

    .ant-picker-clear {
      background-color: ${colorPalette.inputBG};
      color: ${colorPalette.inputText};
    }
  }
`

const DropDownStyles = createGlobalStyle`
  .ant-picker-dropdown {
    .ant-picker-panel-container {
      background-color: ${colorPalette.cardBG};
      border: 1px solid ${colorPalette.cardBorder};

      .ant-picker-panel {
        border: none;

        .ant-picker-header, .ant-picker-footer {
          color: ${colorPalette.cardText};
          background-color: ${colorPalette.cardHeader};
        }
  
        .ant-picker-header {
          border-bottom-color: ${colorPalette.cardBorder};

          button {
            color: ${colorPalette.cardText};
          }
        }
  
        .ant-picker-footer {
          border-top-color: ${colorPalette.cardBorder};

          .ant-picker-today-btn {
            color: ${colorPalette.primaryBGHover};
            &:hover, &:active {
              color: ${colorPalette.primaryBGActive};
            }
          }
        }
  
        .ant-picker-content th, .ant-picker-cell {
          color: ${colorPalette.cardText};
        }

        .ant-picker-cell {
          &:hover {
            .ant-picker-cell-inner {
              background-color: #555;
            }
          }
          .ant-picker-cell-inner {
            &::before {
              border-color: ${colorPalette.primaryBG};
            }
          }
  
          &.ant-picker-cell-selected .ant-picker-cell-inner {
            background-color: ${colorPalette.primaryBG};
          }
        }
      }
    }
  }
`

const DatePicker: React.FC<PickerProps<Date>> = (props) => {
  return (
    <>
      <DropDownStyles />
      <StyledDatePicker {...props} />
    </>
  )
}

export default DatePicker
