import SubX from 'subx'
import fetch from '../components/fetch'
import _ from 'lodash'
import { Modal, Button } from 'antd'

const url = window.rc.server + '/skill/faq/op'
const store = SubX.create({
  botInfo: window.rc.botInfo,
  faqs: [],
  fetchingUser: false,
  loading: false,
  async list () {
    store.fetchingUser = true
    let res = await fetch.post(url, {
      action: 'list'
    })
    store.fetchingUser = false
    if (res && res.result) {
      store.faqs = res.result
      return true
    }
    return false
  },
  async add (faq) {
    let res = await fetch.post(url, {
      action: 'add',
      update: faq
    })
    if (res && res.result) {
      store.faqs.unshift(res.result)
      return true
    }
    return false
  },
  async del (id) {
    let res = await fetch.post(url, {
      action: 'del',
      id
    })
    if (res && res.result) {
      store.faqs = store.faqs.filter(d => d.id !== id)
      return true
    }
    return false
  },
  async update (id, update) {
    let res = await fetch.post(url, {
      action: 'update',
      id,
      update
    })
    if (res && res.result) {
      let inst = _.find(store.faqs, d => d.id === id)
      Object.assign(inst, update)
      return true
    }
    return false
  },
  async getUser () {
    store.fetchingUser = true
    let r = await fetch.post(window.rc.server + '/api/action', {
      action: 'get-user'
    }, {
      handleErr: () => {
        console.log('fetch user error')
        let url = window.rc.authUrlDefault.replace(
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
    store.fetchingUser = false
    return r
  }
})

export default store
