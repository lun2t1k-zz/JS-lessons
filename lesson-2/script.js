'use strict';

let money = +prompt('Ваш бюджет на месяц?', ''),
    date = prompt('Введите дату в формате YYYY-MM-DD', '');

const appData = {
  budget: money,
  timeData: date,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
}


// for (let i = 0; i < 2; i++) {
//   let expenseItem = prompt('Введите обязательную статью расходов в этом месяце', ''),
//       cost = prompt('Во сколько обойдется?', '');

//   if ( (typeof(expenseItem)) === 'string' && (typeof(expenseItem)) != null && (typeof(cost)) != null && expenseItem != '' && cost != '' && expenseItem.length < 50 ) {
//     console.log('Done!');
//     appData.expenses[expenseItem] = cost;
//   }
// }

// let i = 0;
// do {
//   let expenseItem = prompt('Введите обязательную статью расходов в этом месяце', ''),
//       cost = prompt('Во сколько обойдется?', '');
      
//   appData.expenses[expenseItem] = cost;
  
//   i++;
// } while (i < 2);

let i = 0;
while (i < 2) {
  let expenseItem = prompt('Введите обязательную статью расходов в этом месяце', ''),
      cost = prompt('Во сколько обойдется?', '');
      
  appData.expenses[expenseItem] = cost;
  
  i++;
}

appData.moneyPerDay = appData.budget / 30;

alert('Ежедневный бюджет:' + appData.moneyPerDay);

if (appData.moneyPerDay < 100) {
  console.log('Минимальный уровень достатка');
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
  console.log('Средний уровень достатка');
} else if (appData.moneyPerDay > 2000) {
  console.log('Высокий уровень достатка');
} else {
  console.log('Ошибка!');
}

console.log(appData);