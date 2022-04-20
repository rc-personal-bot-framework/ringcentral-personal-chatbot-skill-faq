import { Component } from 'react'
import { Table, Popconfirm, Spin, Modal } from 'antd'
import FaqForm from './faq-form'
import { MinusCircleOutlined, EditOutlined } from '@ant-design/icons'

export default class Faqs extends Component {
  state = {
    editting: false
  }

  del = (faq) => {
    this.props.del(faq.id)
  }

  edit = faq => {
    this.setState({
      editting: faq
    })
  }

  handleCancelEdit = () => {
    this.setState({
      editting: false
    })
  }

  handleSubmit = async (update, callback) => {
    const faq = this.state.editting
    this.props.updateState(
      {
        loading: true
      }
    )
    const res = await this.props.updateFaq(
      faq.id,
      update
    )
    this.props.updateState(
      {
        loading: false
      }
    )
    this.setState({
      editting: res ? false : faq
    })
    if (res && callback) {
      callback()
    }
  }

  empty () {
    return (
      <div className='pd2y aligncenter'>
        No faqs yet.
      </div>
    )
  }

  render () {
    const { faqs, loading } = this.props
    if (!faqs.length) {
      return this.empty()
    }
    const { editting } = this.state
    const src = faqs.map((f, i) => {
      return {
        ...f,
        index: i + 1
      }
    })
    const columns = [
      {
        title: 'Index',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: 'Trigger count',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count
      },
      {
        title: 'Keywords',
        dataIndex: 'keywords',
        key: 'keywords',
        sorter: (a, b) => a.count > b.count ? 1 : -1
      },
      {
        title: 'Answer',
        dataIndex: 'answer',
        key: 'answer'
      },
      {
        title: 'Ops',
        dataIndex: 'ops',
        key: 'ops',
        render: (text, faq) => {
          return (
            <div>
              <EditOutlined
                className='font16 mg1l pointer'
                onClick={() => this.edit(faq)}
              />
              <Popconfirm
                onConfirm={() => this.del(faq)}
              >
                <MinusCircleOutlined
                  className='font16 color-red mg1l pointer'
                />
              </Popconfirm>
            </div>
          )
        }
      }
    ]
    return (
      <div className='pd1b faq-items'>
        <Modal
          visible={!!editting}
          title='Edit FAQ Item'
          footer={null}
          onCancel={this.handleCancelEdit}
        >
          <FaqForm
            submitting={loading}
            faq={editting}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancelEdit}
            submitText='Update'
          />
        </Modal>
        <Spin spinning={this.props.loading}>
          <Table
            dataSource={src}
            columns={columns}
            rowKey='id'
          />
        </Spin>
      </div>
    )
  }
}
