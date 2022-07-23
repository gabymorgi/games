import { Input as AntInput } from 'antd'
import styled from 'styled-components'
import colorPalette from '../styles/variables'

export default styled(AntInput)`
  &&,
  &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input {
    background-color: ${colorPalette.inputBG} !important;
    border-color: ${colorPalette.inputBorder};
    color: ${colorPalette.inputText} !important;

    &:hover {
      border-color: ${colorPalette.primaryBorderActive};
    }

    -webkit-box-shadow: 0 0 0px 1000px ${colorPalette.inputBG} inset !important;
    -webkit-text-fill-color: ${colorPalette.inputText} !important;

    &::placeholder {
      color: ${colorPalette.inputBorder} !important;
    }
  }
`
