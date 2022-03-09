

// Starting the cron job here! 
// Need to move to socket connection 
// Create your own sockets or use Socket.io 

const cron = require("node-cron")
cron.schedule('5 * * * *', function() {
  console.log('running a task every minute');
});


