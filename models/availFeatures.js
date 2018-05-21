module.exports = function(sequelize, DataTypes) {
  var AvailFeature = sequelize.define("AvailFeature", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  AvailFeature.associate = function(models){
    // AvailFeature.belongsToMany(models.AvailDetail, {
    //   through: "feat_det"
    // });
    AvailFeature.hasMany(models.AvailDetail, {
      onDelete: "cascade"
    });
  };
  
  return AvailFeature;
};