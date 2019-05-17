import { Component } from 'react'
import { Button, Form, Col, Row, Input, Spin } from 'antd'
import copy from 'json-deep-copy'

const FormItem = Form.Item

@Form.create()
class AddFaq extends Component {
  constructor (props) {
    super(props)
    this.state = {
      faq: copy(props.faq || {})
    }
  }

  validateFieldsAndScroll = () => {
    let { validateFieldsAndScroll } = this.props.form
    return new Promise(resolve => {
      validateFieldsAndScroll((errors, values) => {
        if (errors) resolve(false)
        else resolve(values)
      })
    })
  }

  submit = async () => {
    let res = await this.validateFieldsAndScroll()
    if (!res) {
      return
    }
    this.props.onSubmit(res, () => {
      this.setState({
        faq: {}
      })
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    let { keywords, answer } = this.state.faq
    return (
      <Spin spinning={this.props.submitting}>
        <Form layout='vertical'>
          <Row>
            <Col span={9}>
              <FormItem label='Keywords'>
                {
                  getFieldDecorator('keywords', {
                    initialValue: keywords,
                    rules: [
                      {
                        required: true,
                        message: 'Please input your keywords, seprate by space'
                      }
                    ]
                  })(
                    <Input.TextArea />
                  )
                }
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label='Answer'>
                {
                  getFieldDecorator('answer', {
                    initialValue: answer,
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Answer'
                      }
                    ]
                  })(
                    <Input.TextArea />
                  )
                }
              </FormItem>
            </Col>
            <Col span={5}>
              <Button
                htmlType='submit'
                type='primary'
              >
                {this.props.submitText}
              </Button>
              {
                this.props.onCancel
                  ? (
                    <Button
                      type='ghost'
                      onClick={this.props.onCancel}
                    >
                      Cancel
                    </Button>
                  )
                  : null
              }
            </Col>
          </Row>
        </Form>
      </Spin>
    )
  }
}

export default AddFaq
