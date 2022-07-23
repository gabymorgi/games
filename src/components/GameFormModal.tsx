import { MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { GameState, GameTag, GameWithoutId } from '../back/dataQuery'
import Button from '../ui/Button'
import DatePicker from '../ui/DatePicker'
import Form from '../ui/Form'
import Input from '../ui/Input'
import Modal from '../ui/Modal'
import Select from '../ui/Select'

interface GameFormModalI {
  game?: GameWithoutId
  type?: 'create' | 'update'
  onClose: () => void
  onFinish: (game: GameWithoutId) => Promise<void>
}

interface GameStore {
  name: string
  start: Date
  tags: Array<string>
  state: string
  end: Date
  hours?: React.ReactText
  achievements: [React.ReactText | undefined, React.ReactText | undefined]
  score?: {
    content?: React.ReactText
    lore?: React.ReactText
    mechanics?: React.ReactText
    bosses?: React.ReactText
    controls?: React.ReactText
    music?: React.ReactText
    graphics?: React.ReactText
    extra?: Array<{ bias: React.ReactText; info: string }>
    finalMark: React.ReactText
  }
}

function gameToStore(game: GameWithoutId): GameStore {
  return {
    ...game,
    achievements: game.achievements || [undefined, undefined],
    tags: game.tags.map((t) => t.toString()),
  }
}

function storeToGame(store: GameStore): GameWithoutId {
  return {
    ...store,
    hours: store.hours ? Number(store.hours) : undefined,
    state: store.state as GameState,
    tags: store.tags as GameTag[],
    achievements: store.achievements?.some((v) => v)
      ? [Number(store.achievements[0]), Number(store.achievements[1])]
      : undefined,
    score:
      store.score && Object.values(store.score).some((v) => v)
        ? {
            content: store.score.content
              ? Number(store.score.content)
              : undefined,
            lore: store.score.lore ? Number(store.score.lore) : undefined,
            mechanics: store.score.mechanics
              ? Number(store.score.mechanics)
              : undefined,
            bosses: store.score.bosses ? Number(store.score.bosses) : undefined,
            controls: store.score.controls
              ? Number(store.score.controls)
              : undefined,
            music: store.score.music ? Number(store.score.music) : undefined,
            graphics: store.score.graphics
              ? Number(store.score.graphics)
              : undefined,
            extra: store.score.extra?.map((e) => ({
              ...e,
              bias: Number(e.bias),
            })),
            finalMark: Number(store.score.finalMark),
          }
        : undefined,
  }
}

export const GameFormModal = (props: GameFormModalI) => {
  const [showScore, setShowScore] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    switch (props.type) {
      case 'create':
        form.resetFields()
        break
      case 'update':
        if (props.game) {
          form.setFieldsValue(props.game)
        }
        break
    }
    setShowScore(
      props.game?.score
        ? Object.values(props.game?.score).some((v) => v)
        : false,
    )
  }, [props.game, props.type])
  const [form] = Form.useForm<GameStore>()

  const onFinish = async (values: GameStore) => {
    setLoading(true)
    const parsedValues = storeToGame(values)
    await props.onFinish(parsedValues)
    setLoading(false)
    props.onClose()
  }

  return (
    <Modal
      title={`${props.type}`}
      visible={props.type !== undefined}
      onCancel={props.onClose}
      footer={[
        <Button key="back" onClick={props.onClose} disabled={loading}>
          Cancel
        </Button>,
        <Button
          disabled={loading}
          loading={loading}
          key="submit"
          htmlType="submit"
          form="game-form"
        >
          {props.type}
        </Button>,
      ]}
    >
      <Form
        id="game-form"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={
          props.game
            ? gameToStore(props.game)
            : {
                achievements: [undefined, undefined],
              }
        }
      >
        <Row gutter={16}>
          <Col xs={24} lg={8}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input size="middle" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Form.Item name="start" label="Start" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Form.Item name="end" label="End">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col xs={24} lg={4}>
            <Form.Item name="hours" label="Hours">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={4}>
            <Form.Item label="Achievements">
              <Form.List
                name="achievements"
                rules={[
                  {
                    validator: async (_, values) => {
                      if (Number(values[1]) < Number(values[0])) {
                        return Promise.reject(
                          new Error('No more obtained than total'),
                        )
                      }
                    },
                  },
                ]}
              >
                {(fields, _actions, { errors }) => (
                  <>
                    <Input.Group compact style={{ display: 'flex' }}>
                      {fields.map(({ key, ...restField }) => (
                        <Form.Item
                          {...restField}
                          id={`${key}`}
                          key={key}
                          noStyle
                        >
                          <Input type="number" />
                        </Form.Item>
                      ))}
                    </Input.Group>
                    <Form.ErrorList errors={errors} />
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="state" label="State" rules={[{ required: true }]}>
              <Select allowClear>
                {Object.keys(GameState).map((key) => (
                  <Select.Option key={key} value={key}>
                    {key}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={16}>
            <Form.Item name="tags" label="Tags" rules={[{ required: true }]}>
              <Select mode="tags" allowClear>
                {Object.keys(GameTag).map((key) => (
                  <Select.Option key={key} value={key}>
                    {key}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button type="primary" onClick={() => setShowScore(!showScore)}>
              {showScore ? 'Remove' : 'Add'} Score
            </Button>
            <Form.Item hidden={!showScore}>
              <Row gutter={16}>
                <Col sm={6} lg={3}>
                  <Form.Item name={['score', 'content']} label="content">
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Item name={['score', 'lore']} label="lore">
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Item name={['score', 'mechanics']} label="mechanics">
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Item name={['score', 'bosses']} label="bosses">
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Item name={['score', 'controls']} label="controls">
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Item name={['score', 'music']} label="music">
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Item name={['score', 'graphics']} label="graphics">
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Item
                    name={['score', 'finalMark']}
                    label="finalMark"
                    rules={[{ required: showScore }]}
                  >
                    <Input type="number" min={0} max={10} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.List name={['score', 'extra']}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Row gutter={16} key={key}>
                            <Col flex="100px">
                              <Form.Item
                                {...restField}
                                name={[name, 'bias']}
                                rules={[
                                  { required: true, message: 'Missing bias' },
                                ]}
                              >
                                <Input type="number" />
                              </Form.Item>
                            </Col>
                            <Col flex="auto">
                              <Form.Item
                                {...restField}
                                name={[name, 'info']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing information',
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col flex="none">
                              <Button
                                type="default"
                                onClick={() => remove(name)}
                                icon={<MinusCircleFilled />}
                              />
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="default"
                            onClick={() => add()}
                            icon={<PlusCircleFilled />}
                          >
                            Add extra information
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
