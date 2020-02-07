'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceRequests = sequelize.define('service_requests', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    problem_type: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    responsibility: {
      type: DataTypes.STRING
    },
    urgency: {
      type: DataTypes.STRING
    },
    priority: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.INTEGER
    },
    insert_time: {
      type: DataTypes.DATE
    },
    close_time: {
      type: DataTypes.DATE
    },
  }, {
      freezeTableName: true,
      timestamps: false,
      underscored: true
    });
    ServiceRequests.associate = function(models) {
      ServiceRequests.belongsTo(models.users, {foreignKey: 'request_user'});
    }
  return ServiceRequests;
};