import { Component } from 'react'
import FaqForm from './faq-form'
import { Col, Row, Icon, Popconfirm, Spin } from 'antd'

export default class Faqs extends Component {
  state = {
    editting: false,
    updating: false
  }

  edit = () => {
    this.setState({
      editting: true
    })
  }

  del = () => {
    this.props.store.del(this.props.faq.id)
  }

  submit = async (update, callback) => {
    this.state({
      updating: true
    })
    let res = await this.props.store.update(
      this.props.faq.id,
      update
    )
    this.state({
      updating: false,
      editting: res
    })
    if (res && callback) {
      callback()
    }
  }

  cancelEdit = () => {
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
            onSubmit={this.submit}
            onCancel={this.cancelEdit}
          />
        </div>
      </Spin>
    )
  }

  renderView () {
    let { keywords, answer } = this.props.faq
    return (
      <Spin spinning={this.state.updating}>
        <Row className='faq-item'>
          <Col span={8}>{keywords}</Col>
          <Col span={10}>{answer}</Col>
          <Col span={6} className='faq-op'>
            <Icon
              type='edit'
              className='font16 mg1l pointer'
              onClick={this.edit}
            />
            <Popconfirm
              onConfirm={this.del}
            >
              <Icon
                type='minus'
                className='font16 color-red mg1l pointer'
              />
            </Popconfirm>
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
