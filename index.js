const inquirer = require('inquirer');
const fs = require('fs');
const {Triangle, Square, Circle} = require('./lib/shapes');

function prompts() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'characters',
            message: 'Enter up to three characters to be displayed on your logo: ',
        },
        {
            type: 'input',
            name: 'letterColor',
            message: 'Choose the color you wish the characters to be (use color keyword or hexadecimal number): ',
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose the shape you wish to use for your logo: ',
            choices: ['Triangle', 'Square', 'Circle'],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Choose the color you wish the shape to be (use color keyword or hexadecimal number): ',
        },

    ])
    .then((answers) => {
        if (answers.characters.length > 3) {
            console.log('Please enter 3 characters or less.');
            prompts();
        } else {
            writeToFile("logo.svg", answers);
        }
    });
}

function writeToFile(fileName, answers) {
    let svgLogo = "";
    svgLogo =  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">';
   
    let shapeChoice;
    if (answers.shape === 'Triangle') {
        shapeChoice = new Triangle();
        svgLogo += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === 'Square') {
        shapeChoice = new Square();
        svgLogo += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
    } else {
        shapeChoice = new Circle();
        svgLogo += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
    }


    svgLogo += `<text x="150" y="130" text-anchor="middle" font-size="60" fill="${answers.letterColor}">${answers.characters}</text>`;
    svgLogo += "</svg>";

    fs.writeFile(fileName, svgLogo, (err) => {
        err ? console.log(err) : console.log('Generated logo.svg!');
    });
}


prompts();
