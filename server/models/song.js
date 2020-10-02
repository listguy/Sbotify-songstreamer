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
        through: models.SongsInPlaylists,
      });
    }
  }
  Song.init(
    {
      title: DataTypes.STRING,
      albumId: { field: "album_id", type: DataTypes.INTEGER },
      artistId: { field: "artist_id", type: DataTypes.INTEGER },
      media: DataTypes.STRING,
      length: DataTypes.INTEGER,
      trackNumber: { field: "track_number", type: DataTypes.INTEGER },
      lyrics: DataTypes.STRING,
      views: { type: DataTypes.INTEGER, defaultValue: 0 },
      uploadedAt: {
        field: "uploaded_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.now,
      },
    },
    {
      sequelize,
      modelName: "Song",
      paranoid: true,
    }
  );
  return Song;
};
