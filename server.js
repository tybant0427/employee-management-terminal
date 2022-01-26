const mysql = require('mysql');
const inquirer = require('inquirer');
const ct = require('console.table');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3200,
    user: 'root',
    password: 'root',
    database: 'employee'
});