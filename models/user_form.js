'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_form = sequelize.define('user_form', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    employee_id: DataTypes.STRING, 
    description: DataTypes.STRING,
    building: DataTypes.STRING,  
    additional_items: DataTypes.STRING,
    copy_user: DataTypes.STRING,
    create_mbx: DataTypes.BOOLEAN,
    sup_man_execs: DataTypes.BOOLEAN,
    home_drive: DataTypes.BOOLEAN,
    submitted_by: DataTypes.STRING,
    created_by: DataTypes.STRING,
    status: DataTypes.STRING,
    needs_computer: DataTypes.BOOLEAN,
    needs_ax: DataTypes.BOOLEAN,
    needs_ice: DataTypes.BOOLEAN,
    needs_stellar: DataTypes.BOOLEAN,
    needs_onbase: DataTypes.BOOLEAN,
    needs_dl: DataTypes.BOOLEAN,
    needs_scan: DataTypes.BOOLEAN,
    needs_pdf: DataTypes.BOOLEAN,
    needs_autocad: DataTypes.BOOLEAN,
    needs_publisher: DataTypes.BOOLEAN,
    needs_visio: DataTypes.BOOLEAN,
    needs_shoretel: DataTypes.BOOLEAN,
    needs_sec: DataTypes.BOOLEAN,
    needs_deskphone: DataTypes.BOOLEAN,
    needs_cell: DataTypes.BOOLEAN,
    pc_number: DataTypes.STRING,
    share_mbx: DataTypes.STRING,
    start_date: DataTypes.STRING,
    phone_ext: DataType.Integer

  }, {
    underscored: true,
  });
  user_form.associate = function(models) {
    user_form.belongsTo(models.users, {as: 'submit_user', foreignKey: 'submitted_by'})
    user_form.belongsTo(models.users, {as: 'create_user', foreignKey: 'created_by'})
  };
  return user_form;
};