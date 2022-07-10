import { Col, Row } from "antd";
import { Store } from "antd/lib/form/interface";
import styled from "styled-components";
import { FiltersI, SorterI } from "../back/dataQuery";
import { GameState, GameTag } from "../data";
import Button from "../ui/Button";
import Collapse from "../ui/Collapse";
import DatePicker from "../ui/DatePicker";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Select from "../ui/Select";

const FiltersContainer = styled.div``;

interface FiltersProps {
  onFiltersChance: (filters?: FiltersI, sorter?: SorterI) => void;
}

export const Filters = (props: FiltersProps) => {
  const [form] = Form.useForm<Store>();
  const handleReset = () => {
    form.resetFields();
    props.onFiltersChance();
  };
  const handleSubmit = (values: any) => {
    console.log(values);
    props.onFiltersChance(
      {
        name: values.name,
        start: values.start,
        end: values.end,
        state: values.state?.map((s: any) => Number(s)),
        tags: values.tags?.map((t: any) => Number(t)),
      },
      values.sortBy
        ? {
            by: values.sortBy,
            direction: values.sortDirection,
          }
        : undefined
    );
  };
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Collapse.Panel header="Filters" key="1">
        <FiltersContainer>
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{
              sortDirection: "asc",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Form.Item name="name" label="Name">
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="start" label="Start">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item name="end" label="End">
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="state" label="State">
                  <Select mode="tags" allowClear>
                    {Object.keys(GameState)
                      .filter((key) => !isNaN(Number(key)))
                      .map((key) => (
                        <Select.Option key={key} value={key}>
                          {GameState[Number(key)]}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="tags" label="Tags">
                  <Select mode="tags" allowClear>
                    {Object.keys(GameTag)
                      .filter((key) => !isNaN(Number(key)))
                      .map((key) => (
                        <Select.Option key={key} value={key}>
                          {GameTag[Number(key)]}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="sortBy" label="Sort by">
                  <Select>
                    <Select.Option value="name">Name</Select.Option>
                    <Select.Option value="start">Start</Select.Option>
                    <Select.Option value="end">End</Select.Option>
                    <Select.Option value="state">State</Select.Option>
                    <Select.Option value="hours">Hours</Select.Option>
                    <Select.Option value="achievements">Achievements</Select.Option>
                    <Select.Option value="score">Score</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="sortDirection" label="Order">
                  <Select>
                    <Select.Option value="asc">Ascending</Select.Option>
                    <Select.Option value="desc">Descending</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col>
                <Button onClick={handleReset}>Reset</Button>
              </Col>
              <Col>
                <Button htmlType="submit">Apply</Button>
              </Col>
            </Row>
          </Form>
        </FiltersContainer>
      </Collapse.Panel>
    </Collapse>
  );
};
