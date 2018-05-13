module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define("Image", {
    url: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      }
    }
  });

  Image.associate = function(models){
    Image.belongsTo(models.Park, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Image;
};