"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    async getTotalViews() {
      const allSongs = await this.getSongs({
        attributes: ["views"],
      });
      console.log(allSongs);
      console.log(Math.sum(...allSongs));
    }
    static associate(models) {
      // define association here
      this.hasMany(models.Song, {
        foreignKey: "albumId",
      });
      this.belongsTo(models.Artist, {
        foreignKey: "artistId",
      });
    }
  }
  Album.init(
    {
      title: DataTypes.STRING,
      artistId: {
        field: "artist_id",
        type: DataTypes.INTEGER,
      },

      media: DataTypes.STRING,
      uploadedAt: {
        field: "uploaded_at",
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    {
      sequelize,
      modelName: "Album",
      paranoid: true,
    }
  );
  return Album;
};
