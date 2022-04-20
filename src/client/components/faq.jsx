import { Component } from 'react'
import FaqForm from './faq-form'
import { Col, Row, Popconfirm, Spin } from 'antd'
import { MinusCircleOutlined, EditOutlined } from '@ant-design/icons'

export default class Faqs extends Component {
  state = {
    editting: false,
    updating: false
  }

  handleEdit = () => {
    this.setState({
      editting: true
    })
  }

  handleDel = () => {
    this.props.del(this.props.faq.id)
  }

  handleSubmit = async (update, callback) => {
    this.setState({
      updating: true
    })
    const res = await this.props.updateFaq(
      this.props.faq.id,
      update
    )
    this.setState({
      updating: false,
      editting: !res
    })
    if (res && callback) {
      callback()
    }
  }

  handleCancelEdit = () => {
    this.setState({
      editting: false
    })
  }

  renderEdit () {
    return (
      <Spin spinning={this.state.updating}>
        <div className='faq-item'>
          <FaqForm
            submitting={this.state.updating}
            faq={this.props.faq}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancelEdit}
            submitText='Update'
          />
        </div>
      </Spin>
    )
  }

  renderView () {
    const { keywords, answer, count = 0 } = this.props.faq
    const { index } = this.props
    return (
      <Spin spinning={this.state.updating}>
        <Row className='faq-item'>
          <Col span={1}>
            <div className='pd1x pd1y'>{index + 1}</div>
          </Col>
          <Col span={7}>
            <div className='pd1x pd1y'>{keywords}</div>
          </Col>
          <Col span={9}>
            <div className='pd1x pd1y'>{answer}</div>
          </Col>
          <Col span={1}>
            <div className='pd1x pd1y'>{count}</div>
          </Col>
          <Col span={6} className='faq-op'>
            <div className='pd1x pd1y'>
              <EditOutlined
                className='font16 mg1l pointer'
                onClick={this.handleEdit}
              />
              <Popconfirm
                onConfirm={this.handleDel}
              >
                <MinusCircleOutlined
                  className='font16 color-red mg1l pointer'
                />
              </Popconfirm>
            </div>
          </Col>
        </Row>
      </Spin>
    )
  }

  render () {
    return this.state.editting
      ? this.renderEdit()
      : this.renderView()
  }
}
