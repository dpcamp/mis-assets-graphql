'use strict';
module.exports = (sequelize, DataTypes) => {
  const PDQApplications = sequelize.define('pdq_applications', {
    application_id: DataTypes.INTEGER,
    computer_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    publisher: DataTypes.STRING,
    version: DataTypes.STRING,
    install_date: DataTypes.DATE
  }, {
    underscored: true,
  });
  PDQApplications.associate = function(models) {
    // associations can be defined here
  };
  return PDQApplications;
};