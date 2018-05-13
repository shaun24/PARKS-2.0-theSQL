module.exports = function(sequelize, DataTypes) {
  var AvailFeature = sequelize.define("AvailFeature", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true
      }
    }
  });

  AvailFeature.associate = function(models){
    AvailFeature.belongsToMany(models.AvailDetail, {
      through: "feat_det"
    });
  };
  
  return AvailFeature;
};