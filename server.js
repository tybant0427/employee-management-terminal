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

