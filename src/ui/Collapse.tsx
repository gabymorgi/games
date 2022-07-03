import { Collapse as AntCollapse } from "antd";
import styled from "styled-components";

export default styled(AntCollapse)`
  && {
    &, .ant-collapse-content {
        background-color: black;
        border-color: #222;
        color: white;
    }

    > .ant-collapse-item {
        border-bottom-color: #333;
    }

    .ant-collapse-header {
        color: white;
    }
  }
`