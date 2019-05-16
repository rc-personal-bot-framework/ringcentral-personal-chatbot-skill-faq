import SubX from 'subx'
import fetch from '../components/fetch'
import _ from 'lodash'

const url = '/skill/faq/op'
const store = SubX.create({
  logined: !!window.rc.user,
  user: window.rc.user,
  botInfo: window.rc.botInfo,
  faqs: window.rc.faqs,

  adding: false,
  async add (faq) {
    let res = await fetch.post(url, {
      update: faq
    })
    if (res && res.result) {
      store.faqs.unshift(res.result)
    }
  },
  async del (id) {
    let res = await fetch.post(url, {
      id
    })
    if (res && res.result) {
      store.faqs = store.faqs.filter(d => d.id !== id)
    }
  },
  async update (id, update) {
    let res = await fetch.post(url, {
      id,
      update
    })
    if (res && res.result) {
      let inst = _.find(store.faqs, d => d.id === id)
      Object.assign(inst, update)
    }
  }
})

export default store
