window.addEventListener('DOMContentLoaded', function () {

  'use strict';


  // Smooth scroll

  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();

        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    });
  };


  // Tabs

  let tab = document.querySelectorAll('.info-header-tab');
  let info = document.querySelector('.info-header');
  let tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function (event) {
    let target = event.target;

    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });


  // Timer

  let deadline = '2021-09-10';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)));

    return {
      'total': t,
      'hours': hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGroupping: false}),
      'minutes': minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGroupping: false}),
      'seconds': seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGroupping: false}),
    }
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id);
    let hours = timer.querySelector('.hours');
    let minutes = timer.querySelector('.minutes');
    let seconds = timer.querySelector('.seconds');
    let timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);

      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }

  setClock('timer', deadline);


  // Modal window

  let more = document.querySelector('.more');
  let overlay = document.querySelector('.overlay');
  let close = document.querySelector('.popup-close');
  let descriptionBtns = document.getElementsByClassName('description-btn');

  for (let i = 0; i < descriptionBtns.length; i++) {
    let descriptionBtn = descriptionBtns[i];
    
    descriptionBtn.addEventListener('click', function () {
      overlay.style.display = 'block';
      more.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
    });
  }

  more.addEventListener('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  });

});