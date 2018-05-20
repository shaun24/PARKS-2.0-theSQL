module.exports = function(sequelize, DataTypes) {
  var Park = sequelize.define("Park", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true
      }
    },
    size: {
      type: DataTypes.DECIMAL(10, 2)
    },
    handiAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true
      }
    },
    restrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Park.associate = function(models){
    Park.hasMany(models.Image, {
      onDelete: "cascade"
    });
    Park.hasMany(models.Feature, {
      onDelete: "cascade"
    });
  };
  
  return Park;
};