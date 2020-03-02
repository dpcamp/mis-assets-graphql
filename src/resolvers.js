const sql = require('../models/index.js')

const resolvers = {
      Query: {
            /* -------- User Queries */
            async user(root, args, { models }) {
                  try {
                        if(args.ext){
                        const userName = await models.users.findOne({
                              include: [
                                    {model: models.phones,
                                      where: {extension: args.ext},
                                      attributes:['id','full_number', 'extension', 'location'],
                                      through: {attributes: []}
                                    },
                                      {model: models.pdq_computers
                                      },
                                      {
                                        model: models.service_requests,
                                        through: {attributes: []}
                                      }
                                  ]
                        })
                              return(userName)
                        
                        }
                        else {
                        const userName = await models.users.findByPk(args.user_name, {
                              include: [
                                    { model: models.phones },
                                    {
                                          model: models.pdq_computers
                                    //       , include: [
                                    //             { model: models.pdq_displays },
                                    //             { model: models.pdq_applications }
                                    //       ]
                                     },
                                    { model: models.service_requests },
                              ]
                        })
                        
                        if(!userName){
                              throw new Error(`${user_name} does not exist`)
                        } else {
                              return(userName)
                        }
                  }
                  } catch (err) {
                        return (err)
                  }

            },
            async allUsers(root, args, { models }) {
                  try {
                        return models.users.findAll(
                              {
                                    include: [
                                          { model: models.phones },
                                          {
                                                model: models.pdq_computers
                                                // , include: [
                                                //       { model: models.pdq_displays },
                                                //       { model: models.pdq_applications }
                                                // ]
                                          },
                                          { model: models.service_requests },
                                    ]
                              }
                        )
                  } catch (err) {
                        return (err)
                  }
            },
            async dfUser(root, { emp_id }, { models }) {
                  try {
                        const query =
                              await models.sequelize.query(
                                    `DayForceEmployees @EmpID=${emp_id}`,
                                    {
                                          raw: true,
                                          type: models.sequelize.QueryTypes.SELECT
                                    }
                              )
                        if(!query[0]){
                              throw new Error(`No employee found with the folloing ID: ${emp_id}`)
                        }
                        else {
                        return (query[0])
                        }
                  } catch (err) {
                        return (err)
                  }

            },
            /* -------- User Form Queries */
            async allUserForms(root, args, { models }) {
                  try {
                        let queryParams = {};
                        if (args.status) {
                              queryParams = { status: args.status }
                        }
                        if (args.submitted_by) {
                              queryParams = { submitted_by: args.submitted_by }
                        }
                        if (args.submitted_by && args.status) {
                              queryParams = { status: args.status, submitted_by: args.submitted_by }
                        }
                        const pending_count = await models.user_form.count({
                              where: { status: 'pending' }

                        })
                        const forms = await models.user_form.findAll({
                              where: queryParams,
                              include: [
                                    {
                                          model: models.users,
                                          as: 'submit_user'
                                    },
                                    {
                                          model: models.users,
                                          as: 'create_user'
                                    }
                              ]
                        })
                        return { pending_count, forms }
                  } catch (err) {
                        return (err)
                  }
            },
            async userForm(root, { id }, { models }) {
                  try {
                        const pending_count = await models.user_form.count({
                              where: { status: 'pending' }
                        })
                        const form = await models.user_form.findByPk(id, 
                              {include: [
                                    {
                                          model: models.users,
                                          as: 'submit_user'
                                    },
                                    {
                                          model: models.users,
                                          as: 'create_user'
                                    }
                              ]
                        })
                        return { pending_count, form }
                  } catch (err) {
                        return (err)
                  }
            },
            /* -------- Computer Queries */
            async allComputers(root, args, { models }) {
                  try {
                        return models.pdq_computers.findAll({
                              include: [
                                    
                                    { model: models.pdq_displays },
                                    
                                    { model: models.users }
                              ]
                        })
                  } catch (err) {
                        return (err)
                  }
            },
            async computer(root, { computer_id }, { models }) {
                  try {
                        return models.pdq_computers.findOne({
                              where: { computer_id: computer_id },
                              include: [
                                    { model: models.pdq_nic_ip },
                                    { model: models.pdq_displays },
                                    { model: models.pdq_applications },
                                    { model: models.users }
                              ]
                        })
                  } catch (err) {
                        return (err)
                  }
            },
            /* -------- Phones Queries */
            async allPhones(root, args, { models }) {
                  try {
                        return models.phones.findAll({
                              include: [{
                                    model: models.users,
                                    as: 'owners',
                                    through: { attributes: [] }
                              }]
                        })
                  } catch (err) {
                        return (err)
                  }
            },
            async phone(root, args, { models }) {
                  try {
                        if (args.id) {
                              queryParams = { id: args.id }
                        }
                        if (args.ext) {
                              queryParams = { extension: args.ext }
                        }
                        await console.log(queryParams)
                        const phone = await models.phones.findOne({
                              where: queryParams,
                              include: [{
                                    model: models.users,
                                    as: 'owners',
                                    through: { attributes: [] }
                              }]
                        })
                        if (!phone && args.ext) {
                              throw new Error(`Phone record does not exist for extension: ${args.ext}`)
                        }
                        if (!phone && args.id) {
                              throw new Error(`Phone record does not exist for id: ${args.id}`)
                        }
                        
                        else {
                              return (phone)
                        }
                  }
                  catch (err) {
                        return (err)
                  }
            },
            /* -------- Phones Queries */
            async allServiceRequests(root, args, { models }) {
                  try {
                        return models.service_requests.findAll()
                  } catch (err) {
                        return (err)
                  }
            },
            async serviceRequest(root, { id }, { models }) {
                  try {
                        const sr = await models.service_requests.findByPk(id)
                        if (!sr)
                        {
                              throw new Error(`Service Request record does not exist for id: ${id}`)
                        } else {
                              console.log(sr)
                              return(sr)
                        }
                  } catch (err) {
                        return (err)
                  }
            },
      },
      Mutation: {
            async createUserForm(root, { input }, { models }) {

                  try {
                        const res = await models.user_form.create(input)
                        console.log(res)
                        const form = await models.user_form.findByPk(res.id, {
                              include:
                              {
                                    model: models.users,
                                    as: 'submit_user'
                              }
                        })
                        const pending_count = await models.user_form.count({ where: { status: 'pending' } })
                        return { pending_count, form }
                  } catch (err) {
                        return (err)
                  }
            },
            async updateUserForm(root, { id, input }, { models }) {
                  try {
                        await models.user_form.update(input, {
                              where: { id: id }

                        })
                        const form = await models.user_form.findByPk(id, {
                              include:
                              {
                                    model: models.users,
                                    as: 'submit_user'
                              }
                        })
                        const pending_count = await models.user_form.count({ where: { status: 'pending' } })
                        return { pending_count, form }
                  } catch (err) {
                        return (err)
                  }
            },
            async createPhone(root, { input }, { models }) {
                  console.log(input)
                  try {
                        const phone = await models.phones.create(input)
                        if(input.UserSAMAccount)
                        {
                              await phone.setOwners(UserSAMAccount)
                        }
                        const newPhone = await models.phones.findOne({
                              where: { id: phone.id },
                              include: [{
                                    model: models.users,
                                    as: 'owners',
                                    through: { attributes: [] }
                              }]
                        })
                        return (newPhone)
                  }
                  catch (err) {
                        return (err)
                  }
            },
            async updatePhone(root, { id, input }, { models }) {
                  console.log(id)
                  try {
                        console.log(id)
                        console.log(id, input)

                        await models.phones.update(input, {
                              where: { id: id }
                        })
                        if (input.owners[0])
                        {
                              const phone = await models.phones.findOne({
                                    where: { id: id }            
                              })
                              for( let i of input.owners)
                              {
                                    await phone.setOwners(i.user_name)
                              }
                              
                        }
                        const uPhone = await models.phones.findOne({
                              where: { id: id },
                              include: [{
                                    model: models.users,
                                    as: 'owners',
                                    through: { attributes: [] }
                              }]
                        })
                        console.log(uPhone)
                        return(uPhone)
                        
                        
                        
                  }
                  catch (err) {
                        return (err)
                  }
            },
            async deletePhone(root, { id }, { models }) {
                  try {
                        const phone = await models.phones.destroy({where: {id: id}})
                        return ({message: `Phone ID: ${id} deleted.`})
                  }
                  catch (err) {
                        return (err)
                  }
            },
            async updatePhoneOwners(root, { id, ext, owners }, { models }) {
                  try {
                        
                        if (id){
                              queryParams = {id: id}
                        }
                        if (ext){
                              queryParams = {extension: ext }
                        }

                        const getPhone = await models.phones.findOne({
                              where: queryParams

                        });
                        await getPhone.setOwners([owners])
                        const newPhone = await models.phones.findOne({
                              where: queryParams,
                              include: [{
                                    model: models.users,
                                    as: 'owners',
                                    through: { attributes: [] }
                              }]
                        })
                        return (newPhone)
                  }
                  catch (err) {
                        return (err)
                  }
            },
      },
}


module.exports = resolvers