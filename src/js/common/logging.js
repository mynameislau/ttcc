import chalk from 'chalk';

export const logAction = (action) => {
  console.log(chalk.grey('///////////////////'));
  console.log(chalk.grey(action.type), action);
};

export const logStateChange = (state) => {
  console.log(chalk.white.bgGreen.bold('server state changed !'));
  console.log(state.toString());
};