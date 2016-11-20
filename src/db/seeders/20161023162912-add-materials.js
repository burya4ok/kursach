'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('materials', [
            {
                file: '++ ЛР- 1--форми.pdf',
                title: 'Розробка програм з  формами різного вигляду',
                unit: 'КЗП.09.02',
                type: 'laboratoryWork'
            }, {
                file: '++ ЛР-2--меню та панели.pdf',
                title: 'Розробка   програм для конвертування даних',
                unit: 'КЗП.10.01',
                type: 'laboratoryWork'
            }, {
                file: '++ ЛР-3--миш та клавиатура.pdf',
                title: 'Розробка  програм для обробки подій миші та клавіатури ',
                unit: 'КЗП.10.02',
                type: 'laboratoryWork'
            }, {
                file: '++ ЛР-4- иностран интерфейс.pdf',
                title: 'Розробка  програм з інтерфейсом на різних мовах',
                unit: 'КЗП.10.03',
                type: 'laboratoryWork'
            }, {
                file: '++ ЛР-5- инифайли.pdf',
                title: 'Розробка програм з параметрами, що налаштовуються за допомогою INI файлів',
                unit: 'КЗП.09.02',
                type: 'laboratoryWork'
            }, {
                file: '++Лекция- 1.pdf',
                title: 'Основные свойства интерфейсов',
                unit: 'КЗП.09.02',
                type: 'lecture'
            }, {
                file: '++Лекция-2.pdf',
                title: 'Основные элементы интерфейсов',
                unit: 'КЗП.10.01',
                type: 'lecture'
            }, {
                file: '++Лекция-3.pdf',
                title: 'Основные элементы интерфейсов',
                unit: 'КЗП.10.02',
                type: 'lecture'
            }, {
                file: '++Лекция-4.pdf',
                title: 'Меню,  панель   инструментов,   строка   статуса',
                unit: 'КЗП.10.02',
                type: 'lecture'
            }, {
                file: '++Лекция-5.pdf',
                title: 'Обработка событий клавиатуры и мыши',
                unit: 'КЗП.10.03',
                type: 'lecture'
            }, {
                file: '++Лекция-6.pdf',
                title: 'Создание программ с интерфейсом на разных языках',
                unit: 'КЗП.10.02',
                type: 'lecture'
            }, {
                file: '++Лекция-7.pdf',
                title: 'Создание настраиваемых форм. Работа по .INI файлами',
                unit: 'КЗП.09.02',
                type: 'selfStudy'
            }, {
                file: '++Лекция-8.pdf',
                title: 'Создание настраиваемых форм. Работа с реестром Windows',
                unit: 'КЗП.10.02',
                type: 'selfStudy'
            }, {
                file: '++Лекция-9.pdf',
                title: 'Многодокументные приложения. Компонент RichEdit',
                unit: 'КЗП.10.01',
                type: 'selfStudy'
            }, {
                file: '++Лекция-10.pdf',
                title: 'Использование внешних компонентов при конструировании интерфейсов',
                unit: 'КЗП.10.03',
                type: 'selfStudy'
            },

        ], {});
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.bulkDelete('materials', null, {});
    }
};
