module.exports = function(sequelize, DataTypes) {
  var Detail = sequelize.define("Detail", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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