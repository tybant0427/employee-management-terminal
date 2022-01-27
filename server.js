// const mysql = require('mysql');
mysql = require('mysql2');
const inquirer = require('inquirer');
const ct = require('console.table');
const PORT = process.env.PORT || 3306;
const util = require('util');

const db = mysql.createConnection(
    {
      host: 'localhost',
      
      user: 'root',
    
      password: 'root',
      database: 'employees'
    },
    //console.log(`worked.`)
  );

  db.query = util.promisify(db.query);

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

const addEmp = async () => {
    try {
        console.log('ADD EMPLOYEE');
        const roles = await db.query("SELECT * FROM role");
        const managers = await db.query("SELECT * FROM employee");

        const answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of this Employee?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of this Employee?'
            },
            {
                name: 'empRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }),
                message: "What is this Employee's role?"
            },
            {
                name: 'empManId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "What is the name of Employee's Manager?"
            }
        ])

        const result = await db.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.empRoleId),
            manager_id: (answer.empManId)
        });

        console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
        initialize();

    } catch (err) {
        console.log(err);
        initialize();
    };
}

const addDep = async () => {
    try {
        console.log('ADD DEPARTMENT');

        const answer = await inquirer.prompt([
            {
                name: 'depName',
                type: 'input',
                message: 'What is the name of your new department?'
            }
        ]);

        const result = await db.query("INSERT INTO department SET ?", {
            department_name: answer.depName
        });

        console.log(`${answer.depName} added successfully to departments.\n`)
        initialize();

    } catch (err) {
        console.log(err);
        initialize();
    };
}

const addRole = async () => {
    try {
        console.log('ADD ROLE');
        const depts = await db.query("SELECT * FROM department")

        const answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'How much salary will this role provide?'
            },
            {
                name: 'depId',
                type: 'list',
                choices: depts.map((depId) => {
                    return {
                        name: depId.department_name,
                        value: depId.id
                    }
                }),
                message: 'What department is this role associated with?',
            }
        ]);

        let chosenDep;
        for (i = 0; i < depts.length; i++) {
            if(depts[i].department_id === answer.choice) {
                chosenDep = depts[i];
            };
        }
        const result = await db.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department
        })

        console.log(`${answer.title} role added successfully.\n`)
        initialize();

    } catch (err) {
        console.log(err);
        initialize();
    };
}



