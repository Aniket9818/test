const Sequelize = require('sequelize');

const sequelize = new Sequelize('nov', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    logging: false
  });

// var PromiseVal = new Promise(function(resolve,reject){
// setTimeout(function (){
// resolve(10);
// },3000)
// });

// console.log(PromiseVal)
sequelize.authenticate()
.then(function(result){
    //console.log("database connected successfully")
})
.catch(function(err){
    console.log(err)
})

module.exports = {
    Sequelize, sequelize
}
