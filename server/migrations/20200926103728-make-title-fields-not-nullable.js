"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await Promise.all([
      queryInterface.changeColumn("Songs", "title", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Albums", "title", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Artists", "title", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.changeColumn("Playlists", "title", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
