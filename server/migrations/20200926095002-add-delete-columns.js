"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    Promise.all(
      await [
        queryInterface.addColumn("songs", "deleted_at", {
          type: Sequelize.DATE,
        }),
        queryInterface.addColumn("albums", "deleted_at", {
          type: Sequelize.DATE,
        }),
        queryInterface.addColumn("artists", "deleted_at", {
          type: Sequelize.DATE,
        }),
        queryInterface.addColumn("playlists", "deleted_at", {
          type: Sequelize.DATE,
        }),
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    Promise.all(
      await [
        queryInterface.removeColumn("songs", "deleted_at"),
        queryInterface.removeColumn("albums", "deleted_at"),
        queryInterface.removeColumn("artists", "deleted_at"),
        queryInterface.removeColumn("playlists", "deleted_at"),
      ]
    );
  },
};
