"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Song, {
        through: "SongsInPlaylists",
        foreignKey: "playlistId",
      });
    }
  }
  Playlist.init(
    {
      title: DataTypes.STRING,
      media: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Playlist",
    }
  );
  return Playlist;
};
