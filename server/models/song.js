"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist, {
        foreignKey: "artistId",
      });
      this.belongsTo(models.Album, {
        foreignKey: "albumId",
      });
      this.belongsToMany(models.Playlist, {
        through: "SongsInPlaylists",
        foreignKey: "songId",
      });
    }
  }
  Song.init(
    {
      title: DataTypes.STRING,
      albumId: { type: DataTypes.INTEGER, as: "album_id" },
      artistId: DataTypes.INTEGER,
      media: DataTypes.STRING,
      length: DataTypes.INTEGER,
      trackNumber: DataTypes.INTEGER,
      lyrics: DataTypes.STRING,
      views: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
