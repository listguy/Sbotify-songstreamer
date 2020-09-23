"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Songs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      albumId: {
        type: Sequelize.INTEGER,
      },
      artistId: {
        type: Sequelize.INTEGER,
      },
      media: {
        type: Sequelize.STRING,
      },
      trackNumber: {
        type: Sequelize.INTEGER,
      },
      lyrics: {
        type: Sequelize.STRING,
      },
      length: {
        type: Sequelize.INTEGER,
      },
      views: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Songs");
  },
};
