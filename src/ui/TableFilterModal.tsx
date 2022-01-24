import { Form } from "antd"
import { useState } from "react"
import Modal from "./Modal"

interface IProps {
  initialValues?: any
  filters?: any
  onFilter?: () => void
}

const TableFilterModal: React.FC<IProps> = (props) => {
  const [visible, setVisible] = useState(false)
  return (
    <Modal
      closable
      title="Connect external profile to expert"
      visible={visible}
      onCancel={() => setVisible(false)}
      okButtonProps={{
        htmlType: "submit",
        form: "filter-form",
      }}
      okText="Connect"
      destroyOnClose
    >
      <Form id="filter-form" onFinish={props.onFilter}>

      </Form>
    </Modal>
  )
}

export default TableFilterModal
