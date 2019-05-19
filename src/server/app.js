/**
 * extend app
 */

import { resolve } from 'path'
import Faq from './model'
import { generate } from 'shortid'
import copy from 'json-deep-copy'
import _ from 'lodash'
import express from 'express'

const pack = require(resolve(__dirname, '../../package.json'))
const viewPath = resolve(__dirname, '../views/index.pug')
const staticPath = resolve(__dirname, '../../dist/static')

export default (app) => {
  app.use(
    express.static(staticPath)
  )

  app.get('/skill/faq/setting', async (req, res) => {
    let { user, id: sid } = req.session || {}
    let { id } = user || {}
    if (!id) {
      return res.redirect('/')
    }
    await Faq.sync()
    let faqs = await Faq.findAll({
      where: {
        user_id: id
      }
    }).map(r => r.get({
      plain: true
    }))
    let data = {
      user,
      title: pack.name,
      sessionId: sid,
      faqs,
      version: pack.version
    }
    data._global = copy(data)
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
    if (
      !['add', 'update', 'del'].includes(action) ||
      (id && !_.isString(id)) ||
      (action === 'add' && !_.isPlainObject(update)) ||
      (action === 'update' && (!_.isPlainObject(update) || !id)) ||
      (action === 'del' && !id)
    ) {
      res.status(400)
      return res.send({
        status: 1,
        error: 'params not right'
      })
    }
    let result
    if (action === 'del') {
      result = await Faq.destroy({
        where: {
          id: id,
          user_id: userId
        }
      })
    } else if (action === 'add') {
      result = await Faq.create({
        ...update,
        id: generate(),
        user_id: userId
      })
    } else if (action === 'update') {
      result = await Faq.update(update, {
        where: {
          id,
          user_id: userId
        }
      })
    }
    let data = {
      status: 0,
      result
    }
    res.send(data)
  })
}
