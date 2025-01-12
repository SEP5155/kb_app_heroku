'use strict';

exports.config = {
    app_name: ['Heroku App'], // Название приложения в New Relic
    license_key: process.env.NEW_RELIC_LICENSE_KEY, // Лицензионный ключ
    logging: {
        level: 'info', // Уровень логирования
    },
    // distributed_tracing: {
    //     enabled: true, // Включение распределенного трейсинга
    // },
    // transaction_tracer: {
    //     enabled: true,
    //     transaction_threshold: 'apdex_f', // Запись медленных транзакций
    // },
    error_collector: {
        enabled: true,
        ignore_status_codes: [404], // Игнорирование 404-х ошибок
    },
};