// Replacing li, adding new li
let menu = document.querySelector('.menu');
let li = document.createElement('li');
let menuItem = document.querySelectorAll('.menu-item');

menu.replaceChild(menuItem[2], menuItem[1]);
menu.insertBefore(menuItem[1], menuItem[3]);
menu.appendChild(li);
li.classList.add('menu-item');
li.innerText = 'Пятый пункт';

// Replacing background image
let body = document.querySelector('body');

body.style.background = 'url(img/apple_true.jpg) center no-repeat';

// Editing a headline
let title = document.getElementById('title');

title.innerText = 'Мы продаем только подлинную технику Apple';

// Deleting an Ad
let ad = document.querySelector('.adv');

ad.remove(); // Removing from html
// ad.style.display = 'none'; // Just making 'div.ad' unvisible on the page

// Customer's feedback
let feedback = prompt('Как вы относитесь к технике от Apple?', '');
let feedbackWindow = document.getElementById('prompt');

feedbackWindow.innerText = feedback;