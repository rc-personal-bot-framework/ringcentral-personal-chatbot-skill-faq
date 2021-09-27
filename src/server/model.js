import Sequelize from 'sequelize'

import sequelize from 'ringcentral-personal-chatbot/dist/server/models/sequelize'

export default sequelize.define('faq', {
  id: { // ID
    type: Sequelize.STRING,
    primaryKey: true
  },
  user_id: { // glip user id
    type: Sequelize.STRING
  },
  answer: {
    type: Sequelize.TEXT
  },
  keywords: {
    type: Sequelize.TEXT
  },
  token: {
    type: Sequelize.JSON
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  data: {
    type: Sequelize.JSON
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})
