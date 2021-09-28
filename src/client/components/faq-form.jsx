import { useState } from 'react'
import { Button, Form, Col, Row, Input, Spin } from 'antd'

const FormItem = Form.Item

function AddFaq (props) {
  const [form] = Form.useForm()
  const [faq] = useState(props.faq || {})

  function submit (res) {
    props.onSubmit(res)
  }
  return (
    <Spin spinning={props.submitting}>
      <Form
        layout='vertical'
        onFinish={submit}
        form={form}
        initialValues={faq}
      >
        <Row>
          <Col span={9}>
            <div className='pd1x pd1y'>
              <FormItem
                label='Keywords, separate by ","(English comma)'
                name='keywords'
                rules={[
                  {
                    required: true,
                    message: 'Please input your keywords, separate by ","(English comma)'
                  }
                ]}
              >
                <Input.TextArea />
              </FormItem>
            </div>
          </Col>
          <Col span={10}>
            <div className='pd1x pd1y'>
              <FormItem
                label='Answer'
                name='answer'
                rules={[
                  {
                    required: true,
                    message: 'Please input your Answer'
                  }
                ]}
              >
                <Input.TextArea />
              </FormItem>
            </div>
          </Col>
          <Col span={5}>
            <div className='pd1x pd1y'>
              <Button
                htmlType='submit'
                type='primary'
                className='faq-sub mg1r'
              >
                {props.submitText}
              </Button>
              {
                props.onCancel
                  ? (
                    <Button
                      type='ghost'
                      className='faq-sub'
                      onClick={props.onCancel}
                    >
                      Cancel
                    </Button>
                  )
                  : null
              }
            </div>
          </Col>
        </Row>
      </Form>
    </Spin>
  )
}

export default AddFaq
