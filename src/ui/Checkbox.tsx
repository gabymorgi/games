import { Checkbox as AntCheckbox } from "antd";
import styled from "styled-components";

export const CheckboxGroup = styled(AntCheckbox.Group)`
  display: grid;
  grid-template-columns: repeat(4, 25%);

  .ant-checkbox-wrapper {
    margin: 2px;
  }
`

export default styled(AntCheckbox)`
  .ant-checkbox-inner {
    border-color: #696;
  }

  &:hover {
    color: #363;
    .ant-checkbox-inner {
      border-color: #9c9 !important;
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: #696 !important;
      &:after {
        border-color: #cfc;
      }
    }
    &:after {
      border-color: #363;
    }
  }
`
