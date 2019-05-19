import { Component } from 'react-subx'
import Faq from './faq'

export default class Faqs extends Component {
  empty () {
    return (
      <div className='pd2y aligncenter'>
        No faqs yet.
      </div>
    )
  }

  render () {
    let { store } = this.props
    let { faqs } = this.props.store
    if (!faqs.length) {
      return this.empty()
    }
    return (
      <div className='pd1b faq-items'>
        {
          this.props.store.faqs.map(faq => {
            return <Faq key={faq.id} faq={faq} store={store} />
          })
        }
      </div>
    )
  }
}
