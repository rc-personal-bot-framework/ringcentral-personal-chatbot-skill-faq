import { Component } from 'react-subx'
import AddFaq from './add-faq'
import Faqs from './faqs'

export default class App extends Component {
  render () {
    let { store } = this.props
    return (
      <div className='wrap'>
        <h1>FAQ skill setting</h1>
        <p>Any one send message that includes keywords, bot will send corresponding answer.</p>
        <AddFaq store={store} />
        <Faqs store={store} />
      </div>
    )
  }
}
