const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Photo }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.hasMany(Photo, {
        foreignKey: 'album_id',
      });
    }
  }
  Album.init({
    title: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
