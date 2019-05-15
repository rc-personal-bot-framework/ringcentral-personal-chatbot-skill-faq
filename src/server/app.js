/**
 * extend app
 */

import { resolve } from 'path'
import Faq from './model'
import { generate } from 'shortid'

const pack = require(resolve(__dirname, '../../package.json'))
const viewPath = resolve(__dirname, '../views/index.pug')

export default (app) => {
  app.get('/skill/faq/setting', async (req, res) => {
    let { user, id: sid } = req.session || {}
    let { id } = user || {}
    if (!id) {
      return res.redirect('/')
    }
    let faqs = await Faq.findAll({
      where: {
        user_id: id
      }
    })
    let data = {
      user,
      title: pack.name,
      sessionId: sid,
      faqs
    }
    res.render(viewPath, data)
  })
  app.post('/skill/faq/op', async (req, res) => {
    let { user } = req.session || {}
    let { id: userId } = user || {}
    if (!userId) {
      res.status(401)
      return res.send({
        status: 1,
        msg: 'please login first'
      })
    }
    let {
      id,
      action,
      update
    } = req.body
    let result
    if (action === 'del') {
      result = await Faq.remove({
        where: {
          id: id,
          user_id: userId
        }
      })
    } else if (action === 'add') {
      result = await Faq.add({
        ...update,
        id: generate(),
        user_id: userId
      })
    } else if (action === 'update') {
      result = await Faq.update({
        where: {
          id,
          user_id: userId
        }
      }, update)
    }
    let data = {
      status: 0,
      result
    }
    res.send(data)
  })
}
