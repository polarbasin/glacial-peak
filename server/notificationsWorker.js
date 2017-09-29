const Appointment = require('../server/models/Appointment');

const notificationWorkerFactory = function () {
  return {
    run: function () {
      Appointment.sendNotifications();
    },
  };
};

module.exports = notificationWorkerFactory();