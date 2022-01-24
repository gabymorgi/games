import styled from 'styled-components'
import { Modal as AntModal } from 'antd'
import { isMobile } from '../styles/Resolutions'

const Modal = styled(AntModal)`
  .ant-modal-content {
    .ant-modal-header {
      border-radius: 8px 8px 0px 0px;
      padding: 20px;
      border-color: #cfc;
      .ant-modal-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 600;
        color: white;
        font-size: 18px;
      }
    }
  }
  .ant-modal-body {
    padding: 20px;
  }
  .ant-modal-footer {
    border-color: #cfc;
    .ant-btn + .ant-btn:not(.ant-dropdown-trigger) {
      margin-left: 16px;
    }
  }

  //full screen modal
  @media (${isMobile}) {
    width: 100% !important;
    max-width: unset;
    height: 100vh;
    top: 0;
    margin: 0;

    .ant-modal-body {
      overflow: auto;
      height: calc(100vh - 130px);
    }
    .ant-modal-content {
      height: 100vh;
      border-radius: 0px;
    }
    .ant-modal-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
`

export default Modal
