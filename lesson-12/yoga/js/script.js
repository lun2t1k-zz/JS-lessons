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
  }


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

  let deadline = '2022-01-01';

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
    };
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
    document.body.style.overflow = 'auto';
  });


  // Form

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так',
  };
  let form = document.querySelector('.main-form');
  let contactForm = document.querySelector('#form');
  let input = document.getElementsByName('input');
  let statusMessage = document.createElement('div');

  statusMessage.classList.add('status');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    form.appendChild(statusMessage);

    // let promise = new Promise(function(resolve, reject) {});

    let request = new XMLHttpRequest();

    request.open('POST', 'server.php');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let formData = new FormData(form);
    let obj = {};

    formData.forEach(function(value, key) {
      obj[key] = value;
    });

    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function() {
      if (request.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (request.readyState === 4 && request.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }
  });

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    contactForm.appendChild(statusMessage);

    let contactRequest = new XMLHttpRequest();

    contactRequest.open('POST', 'server.php');
    contactRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let contactFormData = new FormData(contactForm);
    let contactObj = {};

    contactFormData.forEach(function(value, key) {
      contactObj[key] = value;
    });

    let contactJson = JSON.stringify(contactObj);

    contactRequest.send(contactJson);

    contactRequest.addEventListener('readystatechange', function() {
      if (contactRequest.readyState < 4) {
        statusMessage.innerHTML = message.loading;
      } else if (contactRequest.readyState === 4 && contactRequest.status == 200) {
        statusMessage.innerHTML = message.success;
      } else {
        statusMessage.innerHTML = message.failure;
      }
    });

    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }
  });


  // Phone mask

  let eventCallback = function (e) {
    let el = e.target;
    let clearVal = el.dataset.phoneClear;
    let pattern = el.dataset.phonePattern;
    let matrix_def = "+7(___) ___-__-__";
    let matrix = pattern ? pattern : matrix_def;
    let i = 0;
    let def = matrix.replace(/\D/g, "");
    let val = e.target.value.replace(/\D/g, "");
    
    if (clearVal !== 'false' && e.type === 'blur') {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        e.target.value = '';
        return;
      }
    }

    if (def.length >= val.length) val = def;

    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
  }

  let phone_inputs = document.querySelectorAll('input[type="tel"]');

  for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
      elem.addEventListener(ev, eventCallback);
    }
  }
});