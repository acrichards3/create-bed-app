#!/usr/bin/env bun

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let projectName: string;
let runGitInit: boolean;
let installDependencies: boolean;

const sleep = Bun.sleep(500);

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    figlet.textSync('Create-BED-App')
  );

  await sleep;
  rainbowTitle.stop();

  console.log(
    chalk.cyanBright(
      'A lightweight backend framework for creating TypeScript applications with Bun, Elysia, and Drizzle ORM.'
    )
  );
}

async function askProjectName() {
  const answers = await inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: 'What would you like to name this project?',
    default() {
      return import.meta.dir.split('/').pop(); // Default to current directory name
    },
  });

  projectName = answers.projectName;
}

async function askRunGitInit() {
  const answers = await inquirer.prompt({
    type: 'confirm',
    name: 'runGitInit',
    message: 'Would you like to run `git init`?',
    default() {
      return true;
    },
  });

  runGitInit = answers.runGitInit as boolean;
}

async function askInstallDependencies() {
  const answers = await inquirer.prompt({
    type: 'confirm',
    name: 'installDependencies',
    message: 'Would you like to run `bun install`?',
    default() {
      return true;
    },
  });

  installDependencies = answers.installDependencies as boolean;
}

async function createProject() {
  const spinner = createSpinner('Creating project...');
  spinner.start();
  await sleep;

  console.log(projectName, runGitInit, installDependencies);
}

// Execute the CLI
await welcome().then(
  async () =>
    // Set project name
    await askProjectName().then(
      async () =>
        // Ask if user wants to run `git init`
        await askRunGitInit().then(
          async () =>
            // Ask if user wants to run `bun install`
            await askInstallDependencies().then(
              async () => await createProject() // Create project
            )
        )
    )
);
