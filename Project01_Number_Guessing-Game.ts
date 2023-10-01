#!/usr/bin/env node

import chalk from 'chalk';

import inquirer from 'inquirer';

console.clear();

const minimumNumber: number = 0;

const maximumNumber: number = 10;

let maximumAttempts: number = 5;

function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const targetNumber = randomNumber(minimumNumber, maximumNumber);

async function playersGuess(){
    await inquirer.prompt([{
        type: 'input',
        name: 'guess',
        message: chalk.cyanBright(`Guess The Number Between ${minimumNumber} And ${maximumNumber} (Attempts Left: ${maximumAttempts}):`),
        validate: (input) => {
            const Input = parseInt(input);
            if (isNaN(Input) || Input < minimumNumber || Input > maximumNumber) {
                return chalk.redBright(`Please Enter A Valid Number Between ${minimumNumber} And ${maximumNumber}.`);
            };
            return true
        },
    }]).then((answers) => {
        const playerGuess = parseInt(answers.guess);
        if (playerGuess === targetNumber) {
            console.log(chalk.green('Congratulations! You Guessed The Correct Number!'));
            playAgain();
        } else {
            maximumAttempts--;
            if (maximumAttempts > 0){
                const hint = playerGuess < targetNumber ? 'Higher' : 'Lower';
                console.log(chalk.blueBright(`Try Again! The Target Number Is ${hint}.`));
                playersGuess();
            } else {
                console.log(chalk.redBright(`Sorry, You're Out Of Attempts. The Correct Number Was ${targetNumber}.`));
                playAgain();
            };
        };
    });
};

async function playAgain(){
    await inquirer.prompt([{
        type: 'confirm',
        name: 'playAgain',
        message: chalk.red('Do You Want To Play Again?'),
    }]).then((answers) => {
        if (answers.playAgain) {
            maximumAttempts = 5;
            NumberGuessingGame();
        } else {
            console.log(chalk.green('Thank You For Playing! Goodbye.'));
        };
    });
};

async function NumberGuessingGame(){
    console.log(chalk.yellowBright('Welcome To The Guess The Number Game!'));
    console.log(chalk.yellowBright(`I'm Thinking Of A Number Between ${minimumNumber} And ${maximumNumber}. Try To Guess It In ${maximumAttempts} Attempts.`));
    playersGuess();
};

NumberGuessingGame();