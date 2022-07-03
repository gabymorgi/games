import { Col, Row } from 'antd'
import { Store } from 'antd/lib/form/interface'
import styled from 'styled-components'
import { FiltersI } from '../back/dataQuery'
import Button from '../ui/Button'
import Collapse from '../ui/Collapse'
import Form from '../ui/Form'
import Input from '../ui/Input'

const FiltersContainer = styled.div`
    
`

interface FiltersProps {
    onFiltersChance: (filters?: FiltersI, sorter?: string) => void
    style: React.CSSProperties
}

export const Filters = (props: FiltersProps) => {
    const [form] = Form.useForm()
    const handleReset = () => {
        form.resetFields()
        props.onFiltersChance()
    }
    const handleSubmit = (values: Store) => {
        props.onFiltersChance()
    }
    return <Collapse style={props.style}>
        <Collapse.Panel header="Filter by" key="1">
            <FiltersContainer>
                <Form onFinish={() => { }} layout="vertical">
                    <Form.Item name="name" label="Name">
                        <Input type="text" />
                    </Form.Item>
                    <Row gutter={[24, 24]}>
                        <Col>
                            <Button onClick={handleReset}>Reset Filters</Button>
                        </Col>
                        <Col>
                            <Button htmlType='submit'>Apply Filters</Button>
                        </Col>
                    </Row>

                </Form>
            </FiltersContainer>
        </Collapse.Panel>
        <Collapse.Panel header="Sort by" key="2">
            XD
        </Collapse.Panel>
    </Collapse>
}
