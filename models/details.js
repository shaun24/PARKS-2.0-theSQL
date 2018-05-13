module.exports = function(sequelize, DataTypes) {
  var Detail = sequelize.define("Detail", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true
      }
    }
  });

  Detail.associate = function(models){
    Detail.belongsTo(models.Feature, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  return Detail;
};