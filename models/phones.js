  'use strict';
  module.exports = (sequelize, DataTypes) => {  
  const Phones = sequelize.define('phones', {
    full_number: {
      type: DataTypes.STRING
    },
    telephone: {
      type: DataTypes.STRING
    },
    division_id: {
      type: DataTypes.FLOAT
    },
    department: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    function_info: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.STRING
    },
    account_number: {
      type: DataTypes.STRING
    },
    date_installed: {
      type: DataTypes.STRING
    },
    monthly_cost: {
      type: DataTypes.STRING
    },
    investigate: {
      type: DataTypes.BOOLEAN
    },
    model: {
      type: DataTypes.STRING
    },
    line_type: {
      type: DataTypes.STRING
    },
    long_distance: {
      type: DataTypes.STRING
    },
    need_voicemail: {
      type: DataTypes.BOOLEAN
    },
    disconnect_now: {
      type: DataTypes.BOOLEAN
    },
    disconnect_later: {
      type: DataTypes.BOOLEAN
    },
    phone_number: {
      type: DataTypes.STRING
    },
    ld_changed: {
      type: DataTypes.STRING
    },
    new_phone: {
      type: DataTypes.STRING
    },
    switch_comments: {
      type: DataTypes.STRING
    },
    new_location: {
      type: DataTypes.STRING
    },
    drop_num: {
      type: DataTypes.STRING
    },
    port_num: {
      type: DataTypes.FLOAT
    },
    extension: {
      type: DataTypes.INTEGER
    },
    vm_id: {
      type: DataTypes.INTEGER
    },
    binding_post: {
      type: DataTypes.FLOAT
    },
    provider: {
      type: DataTypes.STRING
    },
    pin: {
      type: DataTypes.STRING
    },
    date_created: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
  Phones.associate = function(models) {
    Phones.belongsToMany(models.users, {as: 'owners', through: 'user_phones', foreignKey:'phone_id'});

  }
  return Phones; 
  };