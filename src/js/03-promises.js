const formEl = document.querySelector('form');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

formEl.addEventListener('submit', submitForm);

function submitForm(ev) {
  ev.preventDefault();
  const [deley, step, amount] = ev.target.elements;

  let firstDelay = Number(deley.value);
  let plusToDelay = Number(step.value);
  const amounts = amount.value;
  let state = 0;

  for (let i = 0; i < amounts; i += 1) {
    state += 1;

    createPromise(state, firstDelay)
      .then(({ position, delay }) => {
        Notify.warning(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    firstDelay += plusToDelay;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function creatProm(Hello, goodBy) {
  return new Promise((resolve, reject) => {
    const shouldResolv = Math.random() > 0.3;
    if (shouldResolv) {
      return resolve(Hello);
    } else {
      reject(goodBy);
    }
  });
}
let delay = 1000;

function createSomething(stat, delay) {
  for (let i = 0; i < stat; i += 1) {
    delay += 1000;
    console.log(delay);
    setTimeout(() => {
      creatProm('Karyna', 'Vova')
        .then(resolve => {
          Notify.info(resolve);
          return resolve;
        })
        .then(resolve => {
          Notify.info(resolve + 'twice');
        })
        .catch(reject => {
          Notify.info(reject);
        })
        .finally(() => {
          Notify.info('done');
        });
    }, delay);
  }
}
createSomething(5, delay);
