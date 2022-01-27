INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tom', 'Anderson', 6, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Johnson', 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jack', 'Johnson', 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Adam', 'Taylor', 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michelle', 'Burke', 5, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jordan', 'Berner', 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alyssa', 'Grey', 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Bobby', 4, 2);


INSERT INTO department (department_name)
VALUES ('Management');

INSERT INTO department (department_name)
VALUES ('Estimating');

INSERT INTO department (department_name)
VALUES ('Labor');

INSERT INTO department (department_name)
VALUES ('Accounting');

INSERT INTO department (department_name)
VALUES ('Human Resources');


INSERT INTO role (title, salary, department_id)
VALUES ('GM', 125000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Salesman', 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Book Keeper', 50000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Worker', 75000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Receptionist', 40000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ('Owner', 250000, null);
