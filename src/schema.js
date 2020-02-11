const { gql } = require('apollo-server-express');
const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
  } = require('graphql-iso-date');

const typeDefs = gql`
    scalar DateTime
    type Result {
        message: String
    }
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
    type DayForceUsers {
        XRefCode: String
        FirstName: String
        LastName: String
        Department: String
        Title: String
        Description: String
        Manager:String
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
        pending_count: Int!
        forms: [uForms!]
    }
    type UserForm {
        pending_count: Int!
        form: uForms!
    }
    type uForms {
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
        submit_user: Users!
        create_user: Users
    }
    input uFormInput {
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
        status: String!
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
        id: ID!
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
          owners: [Users!]
    }
    input uPhoneInput {

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
        allUsers: [Users!]!
        User(user_name: String!): Users
        dfUser(emp_id: String!): DayForceUsers

        allUserForms(status: String, submitted_by: String): UserForms
        UserForm(id: String!): UserForm

        allComputers: [Computers!]!
        Computer(host_name: String!): Computers

        allPhones: [Phones!]!
        Phone(id: ID, ext: Int): Phones

        allServiceRequests: [ServiceRequests!]
        serviceRequest(id: ID): ServiceRequests

        


    }
    type Mutation {
        createUserForm(input: uFormInput): UserForm
        updateUserForm(id: String!, input: uFormInput): UserForm
        createPhone(input: uPhoneInput): Phones
        updatePhone(id: String!, input: uPhoneInput): Phones
        deletePhone(id: String!): Result
        updatePhoneOwners(id: ID, owners: String): Phones

    }
`

module.exports = typeDefs