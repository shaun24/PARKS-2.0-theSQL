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
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        notEmpty: true,
        isDecimal: true
      }
    },
    handiAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
      validate: {
        notEmpty: true
      }
    },
    restrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
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
  };
  
  return Park;
};