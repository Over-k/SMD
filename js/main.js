anime({
  targets: '.form__container .form div',
  translateX: [100, 0],
  duration: 1200,
  opacity: [0, 1],
  delay: (el, i) => {
    return 300 + 100 * i;
  },
})
function log() {
anime({
  targets: '.form__container #createAccount div',
  translateX: [100, 0],
  duration: 1200,
  opacity: [0, 1],
  delay: (el, i) => {
    return 300 + 100 * i;
  },
})
}

function body() {
document.querySelector(".loading").remove();
document.querySelector(".form__container").setAttribute('class',"hidden");
document.querySelector("main").setAttribute('class',"body");
anime({
  targets: '.nav .icon i',
  translateX: [100, 0],
  duration: 1200,
  opacity: [0, 1],
  delay: (el, i) => {
    return 300 + 100 * i;
  },
})

anime({
  targets: '.nav .icon p',
  duration: 1200,
  opacity: [0, 1],
  delay: 700
})

anime({
  targets: '.live .person',
  translateY: [100, 0],
  duration: 1200,
  delay: (el, i) => {
    return 1000 + 100 * i;
  },
})

anime({
  targets: '.like i',
  easing: 'easeOutExpo',
  scale: [2, 1],
  opacity: [0, 1],
  delay: 1200
})

anime({
  targets: '.comment i',
  easing: 'easeOutExpo',
  scale: [2, 1],
  opacity: [0, 1],
  delay: 1300
})

anime({
  targets: '.share i',
  easing: 'easeOutExpo',
  scale: [2, 1],
  opacity: [0, 1],
  delay: 1400
})

anime({
  targets: '.newsfeed',
  translateY: [300, 0],
  easing: 'easeOutExpo',
  opacity: [0, 1],
  delay: (el, i) => 700 + 300 * i
})
}
