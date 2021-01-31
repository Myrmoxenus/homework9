const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

//An array to store every employee that will be passed to render()
employeeArray = []

//Inquirer in a function so it can call itself again if it's necessary to add more employees
function userPrompts(){
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Employee Name:',
    },
    {
      type: 'input',
      message: 'Employee ID:',
      name: 'id',
    },
    {
      type: 'input',
      message: 'Employee E-mail Address:',
      name: 'email',
    },
    {
     type: 'list',
     message: 'Employee Role:',
     name: 'role',
     choices: ["Manager", "Engineer", "Intern"],
    },
    {
     type: 'input',
     message: 'Manager Office Number:',
     name: 'specific',
     when: (answers) => answers.role == "Manager",
    },
    {
     type: 'input',
     message: 'Employee GitHub Account:',
     name: 'specific',
     when: (answers) => answers.role == "Engineer",
    },
    {
     type: 'input',
     message: 'Employee Current School:',
     name: 'specific',
     when: (answers) => answers.role == "Intern",
    },
    {
     type:  'confirm',
     message: 'Add another employee?',
     name: 'moreEmployees',
    }
  ])
  .then(answers => {
      //Calls the by appropriate class using the answer at answers.role directly by evaluating a string constructed from that answer and pushes the constructed object into an array.
      employeeArray.push(eval("new " + answers.role + "(answers.name, answers.id, answers.email, answers.specific)"))
      //If the user specified that they were going to add more employees, it runs userPrompts() again, otherwise it writes the file.
        if (answers.moreEmployees){
         userPrompts()
      }
        else {
         fs.writeFile(outputPath, render(employeeArray), function(err){
            if (err) throw err
            console.log('Saved!')
        })}
        })
  
}
//Runs userPrompts() on use
userPrompts()
