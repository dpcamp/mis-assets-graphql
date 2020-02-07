const { gql } = require('apollo-server-express');
const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
  } = require('graphql-iso-date');

const typeDefs = gql`
    scalar DateTime
    type Users {
        user_name: String!
        first_name: String
        last_name: String
        display_name: String
        email: String
        title: String
        department: String
        createdAt: DateTime
        updatedAt: DateTime
        phones: [Phones!]
        pdq_computers: [Computers!]
        service_requests: [ServiceRequests!]
    }
    type OpenTickets {
        id: ID!
        user_user_name: String 
        service_request_id: String
    }
        type ServiceRequests {
        id: ID!
        problem_type: String
        title: String
        responsibility: String
        urgency: String
        priority: String
        status: Int
        insert_time: DateTime
        close_time: DateTime
    }
    type UserForms {
        id: ID!
        first_name: String
        last_name: String
        display_name: String
        user_name: String
        employee_id: String 
        job_title: String
        building: String  
        description: String
        copy_user: String
        create_mbx: Boolean
        sup_man_execs: Boolean
        home_drive: Boolean
        submitted_by: String
        created_by: String
        status: String
        needs_computer: Boolean
        needs_ax: Boolean
        needs_ice: Boolean
        needs_stellar: Boolean
        needs_onbase: Boolean
        needs_dl: Boolean
        needs_scan: Boolean
        needs_pdf: Boolean
        needs_autocad: Boolean
        needs_publisher: Boolean
        needs_visio: Boolean
        needs_shoretel: Boolean
        needs_sec: Boolean
        needs_deskphone: Boolean
        needs_cell: Boolean
        pc_number: String
        start_date: String
    }
    type Phones {
        full_number: String
          telephone: String
          division_id: Float
          department: String
          position: String
          location: String
          function_info: String
          notes: String
          account_number: String
          date_installed: String
          monthly_cost: String
          investigate: Boolean
          model: String
          line_type: String
          long_distance: String
          need_voicemail: Boolean
          disconnect_now: Boolean
          disconnect_later: Boolean
          phone_number: String
          ld_changed: String
          new_phone: String
          switch_comments: String
          new_location: String
          drop_num: String
          port_num: Float
          extension: Int
          vm_id: Int
          binding_post: Float
          provider: String
          pin: String
          date_created: String
    }
    type Computers {
        computer_id: ID!
        host_name: String
        ad_last_logon: String
        current_user: String
        memory: Int,
        os_name: String
        chassis: String
        os_service_pack: String
        os_install_date: DateTime
        ip_address: String
        ad_when_created: DateTime
        status: String
        online_user: String
        pdq_applications:[Applications!]
        pdq_displays:[Displays!]
        pdq_nic_ip:[NicIPs!]
    }
    type Applications {
        id: ID!
        application_id: Int
        computer_id: Int
        name: String
        publisher: String
        version: String
        install_date: DateTime
    }
    type Displays {
        id: ID!
        display_id: Int
        computer_id: Int
        manufacturer: String
        model: String
    }
    type NicIPs {
        id: ID!
        nic_id: Int
        computer_id: Int
        device_id: Int
        address: String
        subnet: String
        broadcast_address: String
    }
    type Query {
        User(user_name: String!): Users
        allUsers: [Users!]!

    }
    type Mutation {
        createUser(user_name: String!, first_name: String!, last_name: String!): Users!
    }
`

module.exports = typeDefs