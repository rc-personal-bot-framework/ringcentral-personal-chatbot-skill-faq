/**
 * extend app
 */

import { resolve } from 'path'
import Faq from './model'
import { generate } from 'shortid'
import copy from 'json-deep-copy'
import _ from 'lodash'
import express from 'express'
import { Service as User } from 'ringcentral-personal-chatbot/dist/server/models/Service'
import { extraPath, jwtPrefix, defaultState, authUrlDefault } from 'ringcentral-personal-chatbot/dist/server/common/constants'
import { jwtAuth } from 'ringcentral-personal-chatbot'

const pack = require(resolve(__dirname, '../../package.json'))
const viewPath = resolve(__dirname, '../views/index.pug')
const staticPath = resolve(__dirname, '../../dist/static')

const { RINGCENTRAL_CHATBOT_SERVER, SERVER_HOME } = process.env

export default (app) => {
  app.use(
    express.static(staticPath)
  )

  app.get('/skill/faq/setting', async (req, res) => {
    let data = {
      redirect: extraPath + SERVER_HOME,
      title: pack.name,
      jwtPrefix,
      version: pack.version,
      defaultState,
      authUrlDefault,
      server: RINGCENTRAL_CHATBOT_SERVER
    }
    data._global = copy(data)
    res.render(viewPath, data)
  })

  app.post('/skill/faq/op', jwtAuth, async (req, res) => {
    let { user } = req
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
      update,
      faqIds = []
    } = req.body
    if (
      !['add', 'update', 'del', 'list'].includes(action) ||
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
    if (!userId.startsWith(userId)) {
      return res.status(400).send({
        status: 1,
        error: 'params not right'
      })
    }
    let result
    if (action === 'list') {
      if (!faqIds.length) {
        result = []
      } else {
        const q = faqIds
          .filter(f => {
            return f.startsWith(userId)
          })
          .map(id => {
            return {
              id
            }
          })
        result = await Faq.batchGet(q)
      }
    } else if (action === 'del') {
      const user = await User.findByPk(userId)
      if (user) {
        const nd = copy(
          _.get(user, 'data.faqIds') || []
        ).filter(d => d !== id)
        await User.update({
          data: {
            ...(user.data || {}),
            faqIds: nd
          }
        }, {
          where: {
            id: userId
          }
        })
      }
      result = await Faq.destroy({
        where: {
          id
        }
      })
    } else if (action === 'add') {
      const uid = userId + '-' + generate()
      result = await Faq.create({
        ...update,
        id: uid,
        user_id: userId
      })
      const user = await User.findByPk(userId)
      if (user) {
        const nd = _.uniq([
          ...copy(_.get(user, 'data.faqIds') || []),
          uid
        ])
        await User.update({
          data: {
            ...(user.data || {}),
            faqIds: nd
          }
        }, {
          where: {
            id: userId
          }
        })
      }
    } else if (action === 'update') {
      result = await Faq.update(update, {
        where: {
          id
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
