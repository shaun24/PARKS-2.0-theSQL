module.exports = function(sequelize, DataTypes) {
  var Feature = sequelize.define("Feature", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lighted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
      validate: {
        notEmpty: true
      }
    },
    indoor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
      validate: {
        notEmpty: true
      }
    },
    covered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Feature.associate = function(models){
    Feature.hasMany(models.Detail, {
      onDelete: "cascade"
    });
    Feature.belongsTo(models.Park, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Feature;
};