"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "packs",
      [
        {
          pack_id: 1000,
          product_id: 18,
          qty: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pack_id: 1010,
          product_id: 24,
          qty: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pack_id: 1010,
          product_id: 26,
          qty: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pack_id: 1020,
          product_id: 19,
          qty: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pack_id: 1020,
          product_id: 21,
          qty: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("packs", null, {});
  },
};
