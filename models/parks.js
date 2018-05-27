module.exports = function(sequelize, DataTypes) {
  var Park = sequelize.define("Park", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: {
          args: /^[a-z0-9\s\'\.]+$/i,
          msg: "Park Name must be alphanumeric (spaces, apostrophies, and periods allowed)"
        }
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
        notEmpty: true,
        is: {
          args: /^[a-z0-9\s\,\.]+$/i,
          msg: "Park Address must be alphanumeric (commas, periods, and spaces allowed)"
        }
      }
    },
    lat: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false,
      validate: {
        isDecimal: true
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