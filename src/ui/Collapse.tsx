import { Collapse as AntCollapse } from "antd";
import styled from "styled-components";
import colorPalette, { layout } from "../styles/variables";

export default styled(AntCollapse)`
  && {
    border-radius: ${layout.borderRadius};
    border-bottom: unset;

    &, .ant-collapse-content {
        background-color: ${colorPalette.cardBG};
        border-color: ${colorPalette.cardBorder};
        color: ${colorPalette.cardText};
        border-bottom-left-radius: ${layout.borderRadius};
        border-bottom-right-radius: ${layout.borderRadius};
    }

    > .ant-collapse-item {
        border-bottom-color: ${colorPalette.cardBorder};

        > .ant-collapse-header {
          border-radius: ${layout.borderRadius};
          background-color: ${colorPalette.cardHeader};
          color: ${colorPalette.cardText};
        }

        &.ant-collapse-item-active {
          > .ant-collapse-header {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
        &:last-child {
          border-bottom-left-radius: ${layout.borderRadius};
          border-bottom-right-radius: ${layout.borderRadius};
        }
    }

  }
`