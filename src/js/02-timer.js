import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const buutonSrartEl = document.querySelector('button[data-start]');
const dayEl = document.querySelector('span[data-days]');
const hourEl = document.querySelector('span[data-hours]');
const minuteEl = document.querySelector('span[data-minutes]');
const secondEl = document.querySelector('span[data-seconds]');

buutonSrartEl.disabled = true;
let activeTimer = false;
let selecteDate = null;
let intervalId = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      return console.log('Wrong DATE');
    }
    selecteDate = selectedDates[0];
    buutonSrartEl.disabled = false;
    console.log('Good Time');
  },
});

buutonSrartEl.addEventListener('click', timerSart);

function timerSart(event) {
  if (activeTimer) {
    return;
  }
  activeTimer = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    let timer = selecteDate - currentTime;
    if (timer <= 0) {
      activeTimer = false;
      clearInterval(intervalId);
      return console.log('STOP');
    }
    let timeLast = convertMs(timer);

    timerFace(timeLast);
  }, 1000);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timerFace({ days, hours, minutes, seconds }) {
  dayEl.textContent = addLeadingZero(days);
  hourEl.textContent = addLeadingZero(hours);
  minuteEl.textContent = addLeadingZero(minutes);
  secondEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
