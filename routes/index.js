

// Starting the cron job here! 
// Need to move to socket connection 
// Create your own sockets or use Socket.io 

const cron = require("node-cron")
const start_process = require("../controllers/start_process")
start_process.strategy_one()
// const task = cron.schedule('* * * * * *', function() {
  
// });



