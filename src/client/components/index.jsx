import { Component } from 'react'
import {
  Spin, Modal, Button,
  Typography
} from 'antd'
import AddFaq from './add-faq'
import Faqs from './faqs'
import copy from 'json-deep-copy'
import {
  HomeOutlined,
  HighlightOutlined,
  GithubFilled,
  LinkOutlined
} from '@ant-design/icons'
import fetch from './fetch'

const { Text } = Typography
const url = window.rc.server + '/skill/faq/op'

export default class App extends Component {
  state = {
    botInfo: window.rc.botInfo,
    faqs: [],
    fetchingUser: false,
    loading: false,
    user: {}
  }

  componentDidMount () {
    this.init()
  }

  init = async () => {
    const res = await this.getUser()
    if (res && res.result) {
      this.setState({
        user: res.result
      }, this.list)
    }
  }

  list = async () => {
    this.setState({
      fetchingUser: true
    })
    const res = await fetch.post(url, {
      action: 'list',
      faqIds: this.state.user?.data?.faqIds || []
    })
    const up = {
      fetchingUser: false
    }
    this.setState(old => {
      const r = up
      if (res && res.result) {
        r.faqs = res.result
      }
      return r
    })
  }

  add = async (faq) => {
    const res = await fetch.post(url, {
      action: 'add',
      update: faq
    })
    if (res && res.result) {
      this.setState(old => {
        return {
          faqs: [
            ...old.faqs,
            res.result
          ]
        }
      })
      return true
    }
    return false
  }

  del = async (id) => {
    const res = await fetch.post(url, {
      action: 'del',
      id
    })
    if (res && res.result) {
      this.setState(old => {
        return {
          faqs: old.faqs.filter(d => d.id !== id)
        }
      })
      return true
    }
    return false
  }

  update = async (id, update) => {
    const res = await fetch.post(url, {
      action: 'update',
      id,
      update
    })
    if (res && res.result) {
      this.setState(old => {
        const faqs = copy(old.faqs)
        const inst = faqs.find(d => d.id === id)
        Object.assign(inst, update)
        return {
          faqs
        }
      })
      return true
    }
    return false
  }

  getUser = async () => {
    this.setState({
      fetchingUser: true
    })
    const r = await fetch.post(window.rc.server + '/api/action', {
      action: 'get-user'
    }, {
      handleErr: () => {
        console.log('fetch user error')
        const url = window.rc.authUrlDefault.replace(
          window.rc.defaultState,
          'redirect=' + encodeURIComponent(window.location.href)
        )
        Modal.info({
          title: 'Login required',
          content: (
            <div className='pd2y'>
              <a
                href={url}
              >
                <Button type='primary'>Login</Button>
              </a>
            </div>
          ),
          footer: null,
          okButtonProps: {
            style: {
              display: 'none'
            }
          }
        })
      }
    })
    this.setState({
      fetchingUser: true
    })
    return r
  }

  renderFooter () {
    return (
      <div className='mg3t pd1y'>
        <p>
          <a
            href='https://github.com/rc-personal-bot-framework/ringcentral-personal-chatbot-skill-faq/issues'
            target='_blank'
            rel='noopener noreferrer'
          >
            <HighlightOutlined /> Feedback
          </a>
          <a
            className='mg1l'
            href='https://github.com/rc-personal-bot-framework/ringcentral-personal-chatbot-skill-faq'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GithubFilled /> GitHub repo
          </a>
          <a
            className='mg1l'
            href='https://www.ringcentral.com/apps'
            target='_blank'
            rel='noopener noreferrer'
          >
            <LinkOutlined /> RingCentral App gallery
          </a>
        </p>
        <div className='pd1y'>
          <Text type='secondary'>
            <div>
              <img src='//raw.githubusercontent.com/ringcentral/ringcentral-embeddable/master/src/assets/rc/icon.svg' className='iblock mg1r' alt='' />
              <span className='iblock bold pd1y'>RingCentral Labs</span>
            </div>
            <p>RingCentral Labs is a program that lets RingCentral engineers, platform product managers and other employees share RingCentral apps they've created with the customer community. RingCentral Labs apps are free to use, but are not official products, and should be considered community projects - these apps are not officially tested or documented. For help on any RingCentral Labs app please consult each project's GitHub Issues message boards - RingCentral support is not available for these applications.</p>
          </Text>
        </div>
      </div>
    )
  }

  render () {
    const store = this.state
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
          <AddFaq
            add={this.add}
          />
          <Faqs
            updateFaq={this.update}
            del={this.del}
            faqs={this.state.faqs}
            loading={this.state.loading}
            updateState={this.setState}
          />
          {this.renderFooter()}
        </div>
      </Spin>
    )
  }
}
