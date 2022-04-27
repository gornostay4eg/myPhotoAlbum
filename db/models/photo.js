const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Album }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
      });
      this.belongsTo(Album, {
        foreignKey: 'album_id',
      });
    }
  }
  Photo.init({
    title: DataTypes.STRING,
    src: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};
