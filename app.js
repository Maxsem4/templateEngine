const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const managerQ = [
  {
    type: "input",
    name: "name",
    message: "Enter Manager's name:",
    validate(data) {
      if (data == false || !isNaN(data)) {
        input = "";
        return "Please enter a value!";
      }
      return true;
    }
  },
  {
    type: "input",
    name: "id",
    message: "Enter Manager's Id:",
    validate(data) {
      if (data == false || !isNaN(data)) {
        return "Please enter a value!";
      }
      return true;
    }
  },
  {
    type: "input",
    name: "email",
    message: "Enter Manager's Email:",
    validate(data) {
      if (data == false || !isNaN(data)) {
        input = "";
        return "Please enter a value!";
      }
      return true;
    }
  },
  {
    type: "input",
    name: "office",
    message: "Enter Manager's Office #:",
    validate(data) {
      if (data == false || !isNaN(data)) {
        return "Please enter a value!";
      }
      return true;
    }
  }
];

const addEmployeeQ = {
  type: "list",
  choices: ["Yes", "No"],
  message: "Would you like to add another employee?",
  name: "addEmployee"
};

const employeeQ = [
  {
    type: "list",
    choices: ["Engineer", "Intern"],
    message: "Employee Role:",
    name: "role"
  },
  {
    type: "input",
    name: "name",
    message: "Enter Name:",
    validate(data) {
      if (data == false || !isNaN(data)) {
        input = "";
        return "Please enter a value!";
      }
      return true;
    }
  },
  {
    type: "input",
    name: "name",
    message: "Enter Employee Id #:",
    validate(data) {
      if (data == false || !isNaN(data)) {
        return "Please enter a value!";
      }
      return true;
    }
  },
  {
    type: "input",
    name: "email",
    message: "Enter Employee's Email:",
    validate(data) {
      if (data == false || !isNaN(data)) {
        input = "";
        return "Please enter a value!";
      }
      return true;
    }
  },
  {
    type: "input",
    name: "office",
    message: "Enter Employee's Office #:",
    validate(data) {
      if (data == false || !isNaN(data)) {
        return "Please enter a value!";
      }
      return true;
    }
  }
];

const engineerQ = {
  type: "input",
  name: "github",
  message: "Enter Github Username:",
  validate(data) {
    if (data === false) {
      return "Please enter a value!";
    }
    return true;
  }
};

const internQ = {
  type: "input",
  name: "school",
  message: "Enter School currently attended:",
  validate(data) {
    if (data == false) {
      return "Please enter a value!";
    }
    return true;
  }
};

const staff = [];

questions()
  .then(renderFile)
  .then(writeFile);

async function questions() {
  try {
    const managerData = await inquirer.prompt(managerQ);
    const { name, id, email, office } = managerData;
    const manager1 = new Manager(name, id, email, office);
    staff.push(manager1);

    const addEmployeeData = await inquirer.prompt(addEmployeeQ);
    let addMoreEmployee = addEmployeeData.addEmployee;

    while (addMoreEmployee === "Yes") {
      const employeeData = await inquirer.prompt(employeeQ);

      if (employeeData.role === "Engineer") {
        const engineerData = await inquirer.prompt(engineerQ);
        const engineer1 = new Engineer(
          employeeData.name,
          employeeData.id,
          employeeData.email,
          engineerData.github
        );
        staff.push(engineer1);
      }

      if (employeeData.role === "Intern") {
        const internData = await inquirer.prompt(internQ);
        const intern1 = new Intern(
          employeeData.name,
          employeeData.id,
          employeeData.email,
          internData.school
        );
        staff.push(intern1);
      }
      const addEmployeeData = await inquirer.prompt(addEmployeeQ);
      let addMoreEmployee = addEmployeeData.addEmployee;
    }
  } catch (err) {
    console.error(err);
  }
}

function renderFile() {
  const templatedHTML = render(staff);
  return templatedHTML;
}

function writeFile(templatedHTML) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFile(outputPath, templatedHTML, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}
