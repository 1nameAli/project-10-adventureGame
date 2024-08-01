#!usr/bin/env node
import inquirer from 'inquirer';

interface Scenario {
  description: string;
  choices: { [key: string]: number | string };
}

const scenarios: { [key: number]: Scenario } = {
  1: {
    description: "You wake up in a dark forest. There are paths to the left and right.",
    choices: {
      "Take the left path": 2,
      "Take the right path": 3
    }
  },
  2: {
    description: "You encounter a wild bear! What do you do?",
    choices: {
      "Fight the bear": "end-fight",
      "Run away": 4
    }
  },
  3: {
    description: "You find a treasure chest! What do you do?",
    choices: {
      "Open the chest": "end-treasure",
      "Leave it alone": 4
    }
  },
  4: {
    description: "You find a safe place to rest. What do you do?",
    choices: {
      "Rest for a while": "end-rest",
      "Keep moving": 1
    }
  }
};

const endings: { [key: string]: string } = {
  "end-fight": "The bear overpowers you. You have met a terrible fate.",
  "end-treasure": "You open the chest and find a trove of gold and jewels! You win!",
  "end-rest": "You rest peacefully and wake up feeling refreshed. You win!"
};

const playScenario = async (scenarioId: number | string): Promise<void> => {
  if (typeof scenarioId === 'string') {
    console.log(endings[scenarioId]);
    return;
  }

  const scenario = scenarios[scenarioId];
  console.log(scenario.description);

  const response = await inquirer.prompt(
    {
      type: 'list',
      name: 'choice',
      message: 'What do you do?',
      choices: Object.keys(scenario.choices)
    }
  );

  const choice = response.choice;
  playScenario(scenario.choices[choice]);
};

console.log("Welcome to the CLI Adventure Game!");
playScenario(1);
