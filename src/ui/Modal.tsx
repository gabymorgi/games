import { Modal as AntModal, ModalProps } from 'antd'
import styled from 'styled-components'
import colorPalette, { layout } from '../styles/variables'

const StyledModal = styled(AntModal)`
  && {
    width: unset !important;
    .ant-modal-content {
      background-color: ${colorPalette.cardBG};
      border-radius: ${layout.borderRadius};
      border: 1px solid ${colorPalette.cardBorder};

      .ant-modal-header {
        background-color: ${colorPalette.cardBG};
        border-color: ${colorPalette.cardBorder};
        border-radius: ${layout.borderRadius} ${layout.borderRadius} 0 0;
        .ant-modal-title {
          color: ${colorPalette.cardText};
        }
      }

      .ant-modal-footer {
        border-color: ${colorPalette.cardBorder};
      }

      .ant-modal-close {
        color: ${colorPalette.cardText};
      }
    }
  }
`

const Modal: React.FC<ModalProps> = (props) => {
  return <StyledModal maskStyle={{ backgroundColor: '#000a' }} {...props} />
}

export default Modal
