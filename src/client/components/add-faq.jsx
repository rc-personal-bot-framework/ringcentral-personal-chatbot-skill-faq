import { Component } from 'react'
import FaqForm from './faq-form'

export default class AddFaq extends Component {
  state = {
    visible: false,
    loading: false
  }

  handleSubmit = async (update, callback) => {
    this.setState({
      loading: true
    })
    const res = await this.props.add(update)
    this.setState({
      loading: false
    })
    if (res && callback) {
      callback()
    }
  }

  render () {
    return (
      <div className='pd1b'>
        <FaqForm
          onSubmit={this.handleSubmit}
          submitting={this.state.loading}
          submitText='Add new FAQ'
        />
      </div>
    )
  }
}
