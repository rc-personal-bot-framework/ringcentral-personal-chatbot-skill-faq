import SubX from 'subx'
import fetch from '../components/fetch'
import _ from 'lodash'

const url = '/skill/faq/op'
const store = SubX.create({
  logined: !!window.rc.user,
  user: window.rc.user,
  botInfo: window.rc.botInfo,
  faqs: window.rc.faqs,

  loading: false,
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
  }
})

export default store
