//dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const ct = require('console.table');
const PORT = process.env.PORT || 3306;
const util = require('util');
//connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees'
    },
  );

  db.query = util.promisify(db.query);

  db.connect(function (err) {
    if (err) throw err;
    initialize();
})
//initialize and start the program 
const initialize = async () => {
    try { 
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?', //initial prompt
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
        initialize(); //return to main menu
    };
}
//view the employee table 
const viewEmp = async () => {
    console.log('EMPLOYEES');
    //pull from database
    try {
        const query = 'SELECT * FROM employee';
        db.query(query, function (err, res) {
            if (err) throw err;
            const empArray = [];
            res.forEach(employee => empArray.push(employee));
            console.table(empArray);//display
            initialize();
        });
    } catch (err) {
        console.log(err);
        initialize();
    };
}
//view the departments table
const viewDep = async () => {
    console.log('DEPARTMENTS');
    //pull from database
    try {
        const query = 'SELECT * FROM department';
        db.query(query, function (err, res) {
            if (err) throw err;
            const depArray = [];
            res.forEach(department => depArray.push(department));
            console.table(depArray);//display
            initialize();
        });
    } catch (err) {
        console.log(err);
        initialize();
    };
}
//view the roles table
const viewRole = async () => {
    console.log('ROLES');
    //pull from database
    try {
        const query = 'SELECT * FROM role';
        db.query(query, function (err, res) {
            if (err) throw err;
            const roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);//display
            initialize();
        });
    } catch (err) {
        console.log(err);
        initialize();
    };
}
//function to add employees to the database
const addEmp = async () => {
    try {
        console.log('ADD EMPLOYEE');
        const roles = await db.query("SELECT * FROM role");
        const managers = await db.query("SELECT * FROM employee");

        const answer = await inquirer.prompt([ //questions for user
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
                name: 'empRoleId', //defining employees role
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
                name: 'empManId', //defining the employee's manager
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
        //push new employee to database
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
//function to add a new department
const addDep = async () => {
    try {
        console.log('ADD DEPARTMENT');

        const answer = await inquirer.prompt([ //questions for user
            {
                name: 'depName',
                type: 'input',
                message: 'What is the name of your new department?'
            }
        ]);
        //pushing new department to database
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
//function to add a new role to a department
const addRole = async () => {
    try {
        console.log('ADD ROLE');
        const depts = await db.query("SELECT * FROM department")

        const answer = await inquirer.prompt([ //questions for user
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
                name: 'depId', // defining which department the role belongs to
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
         //pushing new info to database
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
//function to update employee's info in the system
const updateEmp = async () => {
    try {
        console.log('UPDATE');
        const employees = await db.query("SELECT * FROM employee");
        const empSelect = await inquirer.prompt([ //selections for user
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((empName) => { //employee selection
                    return {
                        name: empName.first_name + " " + empName.last_name,
                        value: empName.id
                    }
                }),
                message: 'Please choose employee to update.'
            }
        ]);

        const roles = await db.query("SELECT * FROM role");
        const roleSelect = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => { //new role for employee selection
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Please select the role to update the employee with.'
            }
        ]);

        const result = await db.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelect.role }, { id: empSelect.employee }]);
        console.log(`Successfully updated.\n`);
        initialize();

    } catch (err) {
        console.log(err);
        initialize();
    };
}



