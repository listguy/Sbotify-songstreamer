"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Artists", [
      {
        id: 1,
        title: "Bring me The Horizon",
        media:
          "https://i.pinimg.com/736x/3e/01/16/3e01165a11fd19d65338b088d132b531.jpg",
        uploaded_at: new Date(),
        created_at: "2015-07-08",
        updated_at: new Date(),
      },
      {
        id: 2,
        title: "Avenged Sevenfold",
        media:
          "https://images.jpost.com/image/upload/f_auto,fl_lossy/t_JD_ArticleMainImageFaceDetect/414781",
        uploaded_at: new Date(),
        created_at: "2015-07-08",
        updated_at: new Date(),
      },
      {
        id: 3,
        title: "Of Mice & Men",
        media:
          "https://images.kerrangcdn.com/Austin-Carlile-Of-Mice-And-Men.jpg?auto=compress&fit=crop&w=1200",
        uploaded_at: new Date(),
        created_at: "2015-07-08",
        updated_at: new Date(),
      },
      {
        id: 4,
        title: "Bullet For My Valentine",
        media:
          "https://www.exposedmagazine.co.uk/wp-content/uploads/2016/11/bullet-for-my-valentine.jpg",
        uploaded_at: new Date(),
        created_at: "2015-07-08",
        updated_at: new Date(),
      },
      {
        id: 5,
        title: "21 Pilots",
        media:
          "https://arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/SA3DSTDIINFITMPNFFARARYCGE.jpg",
        uploaded_at: new Date(),
        created_at: "2015-07-08",
        updated_at: new Date(),
      },
      {
        id: 6,
        title: "J cole",
        media:
          "https://static.onecms.io/wp-content/uploads/sites/20/2020/07/21/j-cole.jpg",
        uploaded_at: new Date(),
        created_at: "2015-07-08",
        updated_at: new Date(),
      },
      {
        id: 7,
        title: "Kendrick Lamar",
        media:
          "https://compote.slate.com/images/d9a99820-5841-4b90-bc20-cb3b86af7f65.jpg",
        uploaded_at: new Date(),
        created_at: "2015-07-08",
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Artists", null, {});
  },
};
