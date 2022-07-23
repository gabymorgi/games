import { Switch as AntSwitch } from 'antd'
import styled from 'styled-components'

export default styled(AntSwitch)`
  background-color: #030;
  box-shadow: unset !important;

  &.ant-switch-checked {
    background-color: #696;
  }

  .ant-switch-handle::before {
    background-color: #cfc;
  }
` as typeof AntSwitch
