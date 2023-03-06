'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{

            email: 'anh@gmail.com',
            password: '032002',
            fullName: 'Ngoc Anh',
            code: '253',
            node: 'Bach Khoa, Ha Noi',
            phonenum: '012733637354',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
