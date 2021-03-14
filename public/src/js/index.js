import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

//? testing to see what is best for query
const sun = document.querySelector('#sun')
const moon = document.querySelector('#moon')
const cloudTimer = document.querySelector('[data-cloud]')
const lights = document.querySelector('[data-lights]')
const triggers = document.querySelectorAll('.trigger section')

const setTimeBtn = document.getElementById('setTimeBtn')
const inputTime = document.getElementById('inputTime')
const clock = document.getElementById('clock')
const scene = document.querySelector('#scene')
const body = document.querySelector('body')

let sunRise = '06:00'
let sunSet = '19:30'
let date = new Date()
let hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
let timeNow = hours + ':' + minutes

/* const findAngle = time => {
  let timeSplit = time.split(':')
  return (timeSplit[0] * 360) / 24 + (timeSplit[1] * 360) / (24 * 60)
} */

//< animate all the things
function rotateClock(time) {
  gsap.to(window, {
    duration: 1,
    scrollTo: () => time.replace(':', ''),
  })
}

const scrollClockTl = gsap
  .timeline({
    defaults: {
      duration: 1,
      ease: 'none',
    },
  })

  .to(
    clock,
    {
      rotation: '365deg',
      transformOrigin: 'center center',
    },
    0,
  )

  // .to('#cloud', { duration: 0.4, x: 100 }, 0)
  .to(lights, { duration: 0.075, fill: '#e4e4e4' }, '<+0.23')
  .to(body, { duration: 0.5, backgroundColor: '#80c2ff' }, 0)
  .to(body, { duration: 0.5, backgroundColor: '#031758' }, '>')
  .to(lights, { duration: 0.075, fill: '#FFDD64' }, '<+0.23')

ScrollTrigger.create({
  trigger: 'main',
  animation: scrollClockTl,
  pin: true,
  end: '2500 top',
  scrub: 1,
  // markers: true,
})

function dayTime(time) {
  body.classList.replace('night', 'day')
  console.log(`do other day stuff its ${time}`)
}

function nightTime(time) {
  body.classList.replace('day', 'night')
  console.log(`do other night stuffs its ${time}`)
}

function setTime(time = timeNow) {
  inputTime.value = time
  time <= sunSet && time >= sunRise ? dayTime(time) : nightTime(time)
  rotateClock(time)
}

function updateTime() {
  const userSetTime = inputTime.value
  userSetTime ? setTime(userSetTime) : console.log(`User Set Incomplete time`)
}

function resize(e) {
  const mobile = window.matchMedia('(max-width: 420px)')
  mobile.matches
    ? gsap.set(scene, { attr: { viewBox: '250 0 1220 603' } })
    : gsap.set(scene, { attr: { viewBox: '125 0 800 603' } })
}

//< listen up DOM
setTimeBtn.addEventListener('click', updateTime)

window.addEventListener('resize', e => {
  resize()
})

window.addEventListener('load', e => {
  gsap.to(scene, { duration: 0.5, autoAlpha: 1 })
  setTime()
})

resize()
