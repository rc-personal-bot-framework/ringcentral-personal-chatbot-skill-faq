import Sequelize from 'sequelize'

import sequelize from 'ringcentral-personal-chatbot/dist/server/models/sequelize'

export default sequelize.define('faq', {
  id: { // Glip user ID
    type: Sequelize.STRING,
    primaryKey: true
  },
  user_id: { // glip user name
    type: Sequelize.STRING
  },
  answer: { // Glip user email
    type: Sequelize.STRING
  },
  keywords: { // Glip user email
    type: Sequelize.STRING
  },
  token: { // user token
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
