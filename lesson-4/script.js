let money;
let date;

function start() {
  money = +prompt('Ваш бюджет на месяц?', '');
  date = prompt('Введите дату в формате YYYY-MM-DD', '');
  
  while (isNaN(money) || money == "" || money == null) {
    money = +prompt('Ваш бюджет на месяц?', '');
  }

  // appData.budget = money;
  // appData.timeData = date;
}

start();

let appData = {
  budget: money,
  timeData: date,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: '',
  chooseExpenses: function() {
    for (let i = 0; i < 2; i++) {
      let expenseItem = prompt('Введите обязательную статью расходов в этом месяце', '');
      let cost = +prompt('Во сколько обойдется?', '');
      
      if ( (typeof(expenseItem)) === 'string' && (typeof(expenseItem)) != null && (typeof(cost)) != null && expenseItem != '' && cost != '' && expenseItem.length < 50 ) {
        console.log('Done!');
        appData.expenses[expenseItem] = cost;
      } else {
        i = i - 1;
        console.log('Something wrong...'); 
      }
    }
  },
  calcDayBudget: function() {
    appData.moneyPerDay = (appData.budget / 30).toFixed(2);
    alert('Ежедневный бюджет:' + appData.moneyPerDay);
  },
  detectIncomeLevel: function() {
    if (appData.moneyPerDay < 100) {
      console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      console.log('Средний уровень достатка');
    } else if (appData.moneyPerDay > 2000) {
      console.log('Высокий уровень достатка');
    } else {
      console.log('Ошибка!');
    }
  },
  checkSavings: function() {
    let savingsQ = confirm('Есть ли у вас накопления?')
    appData.savings = savingsQ;

    if (appData.savings == true) {
      let save = +prompt('Какая сумма накоплений?', '');
      let percent = +prompt('Под какой процент?', '');

      appData.monthIncome = (save / 100 / 12 * percent).toFixed(2);
      alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
    } else {
      appData.monthIncome = 'Missing';
    }
  },
  chooseOptExpenses: function() {
    for (let i = 1; i < 4; i++) {
      let optExpense = prompt('Статья необязтельных расходов', '');
  
      if ( (typeof(optExpense)) === 'string' && (typeof(optExpense)) != null && optExpense != '' && optExpense.length < 50 ) {
        console.log('Done!');
      }
  
      appData.optionalExpenses[i] = optExpense;
    }
  },
  chooseIncome: function() {
    let items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');

    while ( (typeof(items)) != 'string' || (typeof(items)) == null || items == '' ) {
      items = prompt('Что принесет дополнительный доход? (Перечислите через запятую)', '');
    }

    appData.income = items.split(', ');
    appData.income.push(prompt('Может что-то еще?', ''));
    appData.income.sort();
    appData.income.forEach(function(i) {
      alert('Способы доп. заработка: ' + (i  + ' ' + items));
    });
  },
}

for (let key in appData) {
  console.log('Наша программа включает в себя данные: ' + key);
}

console.log(appData);