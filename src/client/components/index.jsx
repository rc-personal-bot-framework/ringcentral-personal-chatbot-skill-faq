import { Component } from 'react-subx'
import { Spin } from 'antd'
import AddFaq from './add-faq'
import Faqs from './faqs'
import { HomeOutlined } from '@ant-design/icons'

export default class App extends Component {
  componentDidMount () {
    this.init()
  }

  init = async () => {
    let res = await this.props.store.getUser()
    if (res) {
      this.props.store.user = res.result
      await this.props.store.list()
    }
  }

  render () {
    let { store } = this.props
    return (
      <Spin spinning={store.fetchingUser}>
        <div className='wrap'>
          <div className='pd1y'>
            <a href={window.rc.redirect}>
              <HomeOutlined /> Back to App home
            </a>
          </div>
          <h1>FAQ skill setting</h1>
          <p>Any one send you message that includes <b>keywords</b>, bot will send corresponding <b>answer</b>.</p>
          <p>Any one send you message <b className='color-red'>faq-help</b>, bot will send keywords list.</p>
          <p>keywords wrapped with <b className='color-red'>"</b>, like <b className='color-red'>"some keywords"</b> will require exact match, no <b className='color-red'>"</b>, like <b className='color-red'>some keywords</b> is wildcard match.</p>
          <AddFaq store={store} />
          <Faqs store={store} />
        </div>
      </Spin>
    )
  }
}
