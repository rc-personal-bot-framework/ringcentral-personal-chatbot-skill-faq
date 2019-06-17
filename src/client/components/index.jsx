import { Component } from 'react-subx'
import AddFaq from './add-faq'
import Faqs from './faqs'

export default class App extends Component {
  render () {
    let { store } = this.props
    return (
      <div className='wrap'>
        <h1>FAQ skill setting</h1>
        <p>Any one send you message that includes <b>keywords</b>, bot will send corresponding <b>answer</b>.</p>
        <p>Any one send you message <b className='color-red'>faq-help</b>, bot will send keywords list.</p>
        <AddFaq store={store} />
        <Faqs store={store} />
      </div>
    )
  }
}
