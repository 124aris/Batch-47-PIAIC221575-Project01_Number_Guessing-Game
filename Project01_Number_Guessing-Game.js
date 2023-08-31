#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
const minimumNumber = 0;
const maximumNumber = 10;
let maximumAttempts = 5;
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
;
const targetNumber = randomNumber(minimumNumber, maximumNumber);
async function playersGuess() {
    await inquirer.prompt([{
            type: 'input',
            name: 'guess',
            message: chalk.cyanBright(`Guess the number between ${minimumNumber} and ${maximumNumber} (Attempts left: ${maximumAttempts}):`),
            validate: (input) => {
                const Input = parseInt(input);
                if (isNaN(Input) || Input < minimumNumber || Input > maximumNumber) {
                    return chalk.redBright(`Please enter a valid number between ${minimumNumber} and ${maximumNumber}.`);
                }
                ;
                return true;
            },
        }]).then((answers) => {
        const playerGuess = parseInt(answers.guess);
        if (playerGuess === targetNumber) {
            console.log(chalk.green('Congratulations! You guessed the correct number!'));
            playAgain();
        }
        else {
            maximumAttempts--;
            if (maximumAttempts > 0) {
                const hint = playerGuess < targetNumber ? 'higher' : 'lower';
                console.log(chalk.blueBright(`Try again! The target number is ${hint}.`));
                playersGuess();
            }
            else {
                console.log(chalk.redBright(`Sorry, you're out of attempts. The correct number was ${targetNumber}.`));
                playAgain();
            }
            ;
        }
        ;
    });
}
;
async function playAgain() {
    await inquirer.prompt([{
            type: 'confirm',
            name: 'playAgain',
            message: chalk.red('Do you want to play again?'),
        }]).then((answers) => {
        if (answers.playAgain) {
            maximumAttempts = 5;
            NumberGuessingGame();
        }
        else {
            console.log(chalk.green('Thank you for playing! Goodbye.'));
        }
        ;
    });
}
;
async function NumberGuessingGame() {
    console.log(chalk.yellowBright('Welcome to the Guess the Number game!'));
    console.log(chalk.yellowBright(`I'm thinking of a number between ${minimumNumber} and ${maximumNumber}. Try to guess it in ${maximumAttempts} attempts.`));
    playersGuess();
}
;
NumberGuessingGame();
