//const model = require('../models');

const resolvers = {
    Query: {
        async User (root, { user_name }, { models }) {
            console.log(user_name)
              return models.users.findByPk(user_name, {include: [
                        {model: models.phones},
                        {model: models.pdq_computers, include: [
                              {model: models.pdq_displays},
                              {model: models.pdq_applications}
                        ]},
                        {model: models.service_requests},
                  ]})
        },
        async allUsers(root, args, { models }) {
              return models.users.findAll()
        },
      },
}

module.exports = resolvers