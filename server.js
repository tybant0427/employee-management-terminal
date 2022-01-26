// const mysql = require('mysql');
mysql = require('mysql2');
const inquirer = require('inquirer');
const ct = require('console.table');
const PORT = process.env.PORT || 3005;

const db = mysql.createConnection(
    {
      host: 'localhost',
      
      user: 'root',
    
      password: 'root',
      database: 'employees'
    },
    //console.log(`worked.`)
  );

  db.connect(function (err) {
    if (err) throw err;
    initialize();
})

const initialize = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                viewEmp();
                break;

            case 'View Departments':
                viewDep();
                break;

            case 'View Roles':
                viewRole();
                break;

            case 'Add Employees':
                addEmp();
                break

            case 'Add Departments':
                addDep();
                break

            case 'Add Roles':
                addRole();
                break

            case 'Update Employee Role':
                updateEmp();
                break

            case 'Exit':
                db.end();
                break;
        };
    } catch (err) {
        console.log(err);
        initialize();
    };
}

const viewEmp = async () => {
    console.log('EMPLOYEES');
    try {
        const query = 'SELECT * FROM employee';
        db.query(query, function (err, res) {
            if (err) throw err;
            const empArray = [];
            res.forEach(employee => empArray.push(employee));
            console.table(empArray);
            initialize();
        });
    } catch (err) {
        console.log(err);
        initialize();
    };
}

const viewDep = async () => {
    console.log('DEPARTMENTS');
    try {
        const query = 'SELECT * FROM department';
        db.query(query, function (err, res) {
            if (err) throw err;
            const depArray = [];
            res.forEach(department => depArray.push(department));
            console.table(depArray);
            initialize();
        });
    } catch (err) {
        console.log(err);
        initialize();
    };
}

const viewRole = async () => {
    console.log('ROLES');
    try {
        const query = 'SELECT * FROM role';
        db.query(query, function (err, res) {
            if (err) throw err;
            const roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            initialize();
        });
    } catch (err) {
        console.log(err);
        initialize();
    };
}

