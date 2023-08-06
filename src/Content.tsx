import { Button, Col, Form, Popover, Row, Select, Spin, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AnyObject } from 'antd/es/_util/type'
import { NPCOptions, mapOptions } from './static/options'
import { LoadingOutlined, ToolFilled } from '@ant-design/icons'
import { FontSize } from './types'
import { useContent } from './hooks/useContent'

interface Props {
  fontSize: number
  onFontSizeChange: (level: FontSize) => void
}

export const Content = (props: Props) => {
  //// props
  const { fontSize, onFontSizeChange } = props
  //// states
  const { list, initialValues, error, loading, handleSubmit, handleReset, generateColumns } = useContent()
  //// computed
  const columns: ColumnsType<AnyObject> = generateColumns()

  return (
    <>
      <div className='wrapper'>
        <Typography.Title level={1}>完美世界 - 家園草木任務 NPC 搜尋器</Typography.Title>
        <Form
          initialValues={initialValues.current}
          onFinish={handleSubmit}
          onReset={handleReset}
          validateTrigger={['onChange', 'onBlur']}
        >
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <div className='flex justify-end'>
                <Button
                  htmlType='submit'
                  type='primary'
                >
                  搜尋
                </Button>
                <Button
                  htmlType='reset'
                  type='primary'
                  className='ml-20'
                >
                  重設
                </Button>
              </div>
            </Col>
            <Col
              span={24}
              md={8}
            >
              <Form.Item
                label='任務 NPC 名稱'
                name='missionNPCName'
                rules={[
                  {
                    required: true,
                    message: '請選擇任務 NPC 名稱'
                  }
                ]}
              >
                <Select
                  options={NPCOptions}
                  showSearch
                  optionFilterProp='label'
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              md={8}
            >
              <Form.Item
                label='任務地圖名稱'
                name='missionMapName'
                rules={[
                  {
                    required: true,
                    message: '請選擇任務地圖名稱'
                  }
                ]}
              >
                <Select
                  options={mapOptions}
                  showSearch
                  optionFilterProp='label'
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              md={8}
            >
              <Form.Item
                label='目標 NPC 名稱'
                name='targetNPCName'
              >
                <Select
                  options={NPCOptions}
                  showSearch
                  optionFilterProp='label'
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {error.isError && <div className='color-red'>{error.message}</div>}
        {loading ? (
          <div className='flex justify-center align-center pt-50 '>
            <Spin
              size='large'
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 56
                  }}
                />
              }
              spinning
            />
          </div>
        ) : (
          list.map((table, index) => {
            return (
              <div key={index}>
                <Typography.Title level={3}>區域 {index + 1}</Typography.Title>
                <Table
                  rowKey={() => Math.random()}
                  dataSource={table}
                  columns={columns}
                  pagination={false}
                  scroll={{
                    x: columns.reduce((a, b) => a + (b.width as number), 0)
                  }}
                />
              </div>
            )
          })
        )}
      </div>
      <div className='font-size-tool'>
        <Popover
          trigger='click'
          overlayInnerStyle={{
            padding: 20
          }}
          content={
            <div className='font-size-tool-button'>
              <Button
                type={fontSize === FontSize.small ? 'primary' : 'default'}
                onClick={() => onFontSizeChange(FontSize.small)}
              >
                Small
              </Button>
              <Button
                type={fontSize === FontSize.medium ? 'primary' : 'default'}
                onClick={() => onFontSizeChange(FontSize.medium)}
              >
                Medium
              </Button>
              <Button
                type={fontSize === FontSize.large ? 'primary' : 'default'}
                onClick={() => onFontSizeChange(FontSize.large)}
              >
                Large
              </Button>
            </div>
          }
          title={<div className='mb-20'>設定文字大小</div>}
        >
          <Button type='primary'>
            <ToolFilled />
          </Button>
        </Popover>
      </div>
      <div className='footer'>© 2023 PeaNu. All Rights Reserved.</div>
    </>
  )
}
