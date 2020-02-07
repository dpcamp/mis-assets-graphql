'use strict';
module.exports = (sequelize, DataTypes) => {
  const pdq_nic_ip = sequelize.define('pdq_nic_ip', {
    nic_id: DataTypes.INTEGER,
    computer_id: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    subnet: DataTypes.STRING,
    broadcast_address: DataTypes.STRING
  }, {
    underscored: true,
  });
  pdq_nic_ip.associate = function(models) {
    // associations can be defined here
  };
  return pdq_nic_ip;
};