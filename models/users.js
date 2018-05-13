module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [7],
        notEmpty: true,
        isEmail: true
      }
    },
    displayName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3],
        notEmpty: true,
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      default: "user",
      validate: {
        notEmpty: true,
        isIn: [["user", "admin"]]
      }
    }
  });
  
  return User;
};