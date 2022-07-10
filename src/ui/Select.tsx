import { Select as AntSelect, SelectProps } from "antd";
import { OptionProps } from "antd/lib/select";
import styled from "styled-components";
import colorPalette from "../styles/variables";

const StyledSelect = styled(AntSelect)`
  && {
    &:hover {
      .ant-select-selector {
        border-color: ${colorPalette.primaryBGActive};
      }
    }
    &.ant-select-multiple {
      .ant-select-selection-item {
        background-color: #363;
        border-color: #0f0;
        color: #fff;
        border-radius: 20px;
      }
    }
    .ant-select-selector {
      background-color: ${colorPalette.inputBG};
      border-color: ${colorPalette.inputBorder};
      color: ${colorPalette.inputText};

      .ant-select-selection-item-remove {
        color: #fff;
      }
    }
    .ant-select-clear {
      color: #fff;
      opacity: 1;
      background: transparent;
    }
  }
` as typeof AntSelect;

const DropDown = styled.div`
  background-color: ${colorPalette.cardBG};
  .ant-select-item {
    padding: 8px;
    color: #fff;
  }
  //hover
  .ant-select-item-option-active {
    background-color: ${colorPalette.cardHeader};
  }
  .ant-select-item-option-selected {
    color: #fff;
    background-color: ${colorPalette.primaryBG};
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state {
    color: #fff;
  }
`;

type SelectType = React.FC<SelectProps<any>> & {
  Option: React.FC<OptionProps>
}

const Select: SelectType = (props) => {
  return (
    <StyledSelect
      dropdownRender={(menu) => <DropDown>{menu}</DropDown>}
      {...props}
    />
  );
};

Select.Option = AntSelect.Option;

export default Select;
