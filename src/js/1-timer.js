import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_red.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate = null;
let timerId = null;

const startBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
const datePickerInput = document.querySelector('#datetime-picker');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
  iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topRight',
    timeout: 3000,
  });
  startBtn.disabled = true;
  return;
}

userSelectedDate = selectedDate;
startBtn.disabled = false;
  },
};

const fp = flatpickr("#datetime-picker", options);



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

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function startTimer() {
  startBtn.disabled = true;
  datePickerInput.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datePickerInput.disabled = false;
      return;
    }

    const time = convertMs(timeLeft);
    updateTimerDisplay(time);
  },1000 );
}

startBtn.addEventListener('click', startTimer);
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
