const express = require('express');
const server = express();
 
server.all('/', (req, res) => {
  res.send(`OK Hi wrt or whoever is seeing this`)
})
 
function keepAlive() {
  server.listen(3000, () => { console.log("server ready h" + Date.now()) });
}
 
module.exports = keepAlive;