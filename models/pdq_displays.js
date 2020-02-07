'use strict';
module.exports = (sequelize, DataTypes) => {
  const PDQDisplays = sequelize.define('pdq_displays', {
    display_id: DataTypes.INTEGER,
    computer_id: DataTypes.INTEGER,
    manufacturer: DataTypes.STRING,
    model: DataTypes.STRING
  }, {
    underscored: true,
  });
  PDQDisplays.associate = function(models) {
    // associations can be defined here
  };
  return PDQDisplays;
};