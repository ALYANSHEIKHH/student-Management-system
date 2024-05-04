#!/usr/bin/env node
import inquirer from 'inquirer';
class Student {
    id;
    name;
    courses;
    balance;
    constructor(name, courses) {
        this.id = Math.floor(Math.random() * 90000) + 10000; // Generate random 5-digit ID
        this.name = name;
        this.courses = courses;
        this.balance = 100000; // Initialize balance to 0;
    }
    enroll(course) {
        this.courses.push(course);
        console.log(`${this.name} enrolled in${course}`);
    }
    viewBalance() {
        console.log(`${this.name}'s balance: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`${this.name} paid $${amount}. Remaining balance: $${this.balance}`);
    }
    showStatus() {
        console.log(`Name: ${this.name}, ID: ${this.id}, Courses Enrolled: ${this.courses.join(', ')}, Balance: $${this.balance}`);
    }
}
function main() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        },
        {
            type: 'input',
            name: 'courses',
            message: 'Enter courses (comma-separated):',
            filter: (value) => value.split(',').map((course) => course.trim())
        }
    ]).then((answers) => {
        const { name, courses } = answers;
        const student = new Student(name, courses);
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose action:',
                choices: ['Enroll in course', 'View balance', 'Pay tuition', 'Show status', 'Exit']
            }
        ]).then((answer) => {
            switch (answer.action) {
                case 'Enroll in course':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'course',
                            message: 'Enter course to enroll:'
                        }
                    ]).then((enrollAnswer) => {
                        student.enroll(enrollAnswer.course);
                        main(); // Restart main function
                    });
                    break;
                case 'View balance':
                    student.viewBalance();
                    main(); // Restart main function
                    break;
                case 'Pay tuition':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'amount',
                            message: 'Enter amount to pay:'
                        }
                    ]).then((payAnswer) => {
                        const amount = parseFloat(payAnswer.amount);
                        student.payTuition(amount);
                        main(); // Restart main function
                    });
                    break;
                case 'Show status':
                    student.showStatus();
                    main(); // Restart main function
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    break;
                default:
                    console.log('Invalid choice');
                    main(); // Restart main function
            }
        });
    });
}
main();
