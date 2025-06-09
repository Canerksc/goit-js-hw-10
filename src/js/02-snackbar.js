import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.currentTarget;
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  console.log("Delay:", delay);
  console.log("State:", state);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then((result) => {
  iziToast.success({
    title: 'OK',
    message: result,
    position: 'topRight',

  });
})
.catch((error) => {
  iziToast.error({
    title: 'Error',
    message: error,
    position: 'topRight',
  });
});
    form.reset();
    }   
);
