module.exports = function(sequelize, DataTypes) {
  var AvailDetail = sequelize.define("AvailDetail", {
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

  AvailDetail.associate = function(models){
    // AvailDetail.belongsToMany(models.AvailFeature, {
    //   through: "feat_det"
    // });
    AvailDetail.belongsTo(models.AvailFeature, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };
  
  return AvailDetail;
};