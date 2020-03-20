const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function gitHub() {
  return inquirer
      .prompt({
        type: "input",
        name: "username",
        message: "Enter your GitHub Username",  
      })
      .then(function({username}) {
          const queryUrl = `https://api.github.com/users/${username}`;

          return axios.get(queryUrl).then(function(res) {
              userEmail = (res.data.email)
              profileImg = (res.data.avatar_url)
          }
        )
      }
    )
      .then (function promptUser() {
        const promptAnswers = inquirer.prompt([
          {
            type: "input",
            name: "title",
            message: "What is your project title?"
          },
          {
            type: "input",
            name: "description",
            message: "Provide a description of your project."
          },
          {
              type: "input",
              name: "toc",
              message: "Create a table of contents for your project."
            },
          {
            type: "input",
            name: "installation",
            message: "What are the steps required to install your project?"
          },
          {
            type: "input",
            name: "usage",
            message: "Provide instructions and examples for use. Include screenshots as needed."
          },
          {
            type: "input",
            name: "license",
            message: "Enter your License."
          },
          // {
          //     type: "input",
          //     name: "contributing",
          //     message: "Let people know how they can contribute into your project."
          // },
          {
              type: "input",
              name: "tests",
              message: "Write tests for your application. Then provide examples on how to run them."
          },
          // {
          //   type: "input",
          //   name: "questions",
          //   message: "For additional questions please email me."
          // },

        ]
      );
      return promptAnswers;
    }
  )
}

function generateREADME(answers) {
  return `
# Project Title
\n${answers.title}\n

## Description
\n${answers.description}\n

## Table of Contents
\n${answers.toc}\n
  
## Installation 
\nRefer to [Inquirer](https://img.shields.io/npm/l/inquirer)\n${answers.installation}\n

## Usage
\n${answers.usage}\n

## License
\n${answers.license}\n

## Contributing
\nRefer to [Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)\n

## Tests
\n${answers.tests}\n

## Questions
\nFor additional questions please email me at ${userEmail}.\n[Profile Image](${profileImg})\n
  `;
}

  async function readMeGen() {
    try {
        const answers = await gitHub();
        const genREADME = generateREADME(answers);

        await writeFileAsync("genREADME.md", genREADME);
        console.log("Successfully wrote to README.md");
    } catch (err) {
        console.log(err);
    }
  }
readMeGen();

