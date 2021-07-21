'use strict';

let money = prompt('Ваш бюджет на месяц?', ''),
    date = prompt('Введите дату в формате YYYY-MM-DD', '');

const appData = {
  budget: money,
  timeData: date,
  expenses: {

  },
  optionalExpenses: {
    
  },
  income: [],
  savings: false
}


for (let i = 0; i < 2; i++) {
  let expenseItem = prompt('Введите обязательную статью расходов в этом месяце', ''),
  cost = prompt('Во сколько обойдется?', '');

  appData.expenses[expenseItem] = cost;
}

console.log(appData);

alert(appData.budget / 30);