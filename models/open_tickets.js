'use strict';
module.exports = (sequelize, DataTypes) => {
  const OpenTickets = sequelize.define('open_tickets', {
    user_user_name: DataTypes.STRING, 
    service_request_id: DataTypes.STRING
      
},
    {
      freezeTableName: true,
      underscored: true
    });
    OpenTickets.associate = function(models) {}
    return OpenTickets; 
};