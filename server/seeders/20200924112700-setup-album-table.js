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
    await queryInterface.bulkInsert("Albums", [
      {
        id: 1,
        artist_id: 1,
        title: "Sempiternal",
        media:
          "https://images-na.ssl-images-amazon.com/images/I/91Z82BKqrSL._AC_SL1500_.jpg",
        created_at: "2013-03-31",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 2,
        artist_id: 2,
        title: "Avenged Sevenfold",
        media:
          "https://upload.wikimedia.org/wikipedia/he/7/76/Avenged_Sevenfold_cover_2007.jpg",
        created_at: "2007-08-13",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 3,
        artist_id: 2,
        title: "City of Evil",
        media:
          "https://upload.wikimedia.org/wikipedia/he/7/7b/City_of_Evil_album_cover.jpg",
        created_at: "2008-06-05",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 4,
        artist_id: 2,
        title: "Nightmare",
        media:
          "https://cdn.shopify.com/s/files/1/0042/9119/9076/products/product-image-981338485_650x.jpg?v=1571731781",
        created_at: "2010-08-05",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 5,
        artist_id: 3,
        title: "Of Mice & Men",
        media:
          "https://i.pinimg.com/originals/69/b8/5e/69b85e03f4570ba9bd87b090d775b396.jpg",
        created_at: "2012-03-06",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 6,
        artist_id: 3,
        title: "The Flood",
        media:
          "https://upload.wikimedia.org/wikipedia/en/3/35/Of_Mice_%26_Men_The_Flood_cover.jpg",
        created_at: "2013-04-22",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 7,
        artist_id: 3,
        title: "Restoring Force",
        media:
          "https://upload.wikimedia.org/wikipedia/en/b/b7/Restoring_Force.jpg",
        created_at: "2014-01-15",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 8,
        artist_id: 4,
        title: "Fever",
        media:
          "https://images-na.ssl-images-amazon.com/images/I/51-tHNr5nRL.jpg",
        created_at: "2010-02-09",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 9,
        artist_id: 4,
        title: "Scream Aim Fire",
        media:
          "https://images-na.ssl-images-amazon.com/images/I/81QKcS%2BvqcL._SL1500_.jpg",
        created_at: "2008-02-05",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 10,
        artist_id: 4,
        title: "Temper Temper",
        media:
          "https://images-na.ssl-images-amazon.com/images/I/71rzjxT3xrL._SL1500_.jpg",
        created_at: "2013-08-05",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 11,
        artist_id: 5,
        title: "Blurryface",
        media:
          "https://i.pinimg.com/originals/7c/77/d0/7c77d047d98d3e3699efd08993bc6e1e.png",
        created_at: "2015-04-05",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 12,
        artist_id: 5,
        title: "Trench",
        media:
          "https://upload.wikimedia.org/wikipedia/he/e/ef/TOP_Trench_Album_Cover.jpg",
        created_at: "2018-04-22",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 13,
        artist_id: 5,
        title: "Vessel",
        media:
          "https://upload.wikimedia.org/wikipedia/he/2/20/Vessel_by_Twenty_One_Pilots.jpg",
        created_at: "2013-11-10",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 14,
        artist_id: 6,
        title: "2014 Forest Hills Drive",
        media:
          "https://www.beatnik.co.il/wp-content/uploads/2019/01/J.-COLE-2014-FOREST-HILLS-DRIVE.jpg",
        created_at: "2014-08-17",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 15,
        artist_id: 6,
        title: "KOD",
        media: "https://upload.wikimedia.org/wikipedia/he/d/d3/JColeKOD.jpg",
        created_at: "2018-12-24",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 16,
        artist_id: 6,
        title: "Revenge Of The Dreams III",
        media:
          "https://images-na.ssl-images-amazon.com/images/I/61KvrR9sBhL._SL1200_.jpg",
        created_at: "2019-01-31",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 17,
        artist_id: 7,
        title: "good kid, m.A.A.d city",
        media:
          "https://www.helicon.co.il/wp-content/uploads/2020/02/0602537192267.jpg",
        created_at: "2012-06-07",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 18,
        artist_id: 7,
        title: "To Pimp A Butterfly",
        media:
          "https://www.beatnik.co.il/wp-content/uploads/2018/07/KENDRICK-PIMP.jpg",
        created_at: "2015-02-11",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 19,
        artist_id: 7,
        title: "DAMN.",
        media:
          "https://www.helicon.co.il/wp-content/uploads/2017/04/klDAMN-600x600.jpg",
        created_at: "2010-08-05",
        uploaded_at: "2020-09-13",
        updated_at: new Date(),
      },
      {
        id: 20,
        artist_id: 1,
        title: "That's the Spirit",
        media:
          "https://images-na.ssl-images-amazon.com/images/I/516HOT7Vj3L._AC_SX466_.jpg",
        created_at: "2015-07-23",
        uploaded_at: "2020-09-20",
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
    await queryInterface.bulkDelete("Albums", null, {});
  },
};
