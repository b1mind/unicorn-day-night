import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

//? testing to see what is best for query
const sun = document.querySelector('#sun')
const moon = document.querySelector('#moon')
const lights = document.querySelector('#lights')
const stars = document.querySelector('#stars').children

const setTimeBtn = document.getElementById('setTimeBtn')
const inputTime = document.getElementById('inputTime')
const clock = document.getElementById('clock')
const scene = document.querySelector('#scene')
const body = document.querySelector('body')
const glasses = document.getElementById('sunGlasses')
const fire = document.getElementById('fire')

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
function init() {
  function rotateClock(time) {
    gsap.to(window, {
      duration: 1,
      scrollTo: () => time.replace(':', ''),
    })
  }

  const masterTl = gsap.timeline()

  const scrollClockTl = gsap
    .timeline({
      defaults: {
        duration: 1,
        ease: 'none',
      },
    })

    .to(body, { duration: 0.5, backgroundColor: '#80c2ff' }, 0)
    .to(clock, { rotation: '360deg', transformOrigin: 'center center' }, 0)

    .to(moon, { rotate: '-360deg', transformOrigin: 'center center' }, 0)
    .to(sun, { rotate: '-360deg', transformOrigin: 'center center' }, 0)
    .set(glasses, { duration: 0.075, autoAlpha: 0 }, 0)

    // .to('#cloud', { duration: 0.4, x: 100 }, 0)
    .to(lights, { duration: 0.075, fill: '#e4e4e4' }, '<+0.23')
    .to(
      stars,
      { duration: 0.075, autoAlpha: 0, stagger: { amount: 0.03 } },
      '<',
    )
    .to(body, { duration: 0.5, backgroundColor: '#031758' }, '>')

    .to(
      fire,
      {
        duration: 0.075,
        scaleY: 0,
        transformOrigin: 'bottom center',
        ease: 'back.in',
      },
      '<',
    )

    .to(glasses, { duration: 0.075, autoAlpha: 1 }, '<')
    .to(lights, { duration: 0.075, fill: '#FFDD64' }, '<+0.23')
    .to(
      fire,
      {
        duration: 0.075,
        scaleY: 1,
        transformOrigin: 'bottom center',
        ease: 'back',
      },
      '<',
    )
    .to(glasses, { duration: 0.075, autoAlpha: 0 }, '<')
    .to(
      stars,
      { duration: 0.075, autoAlpha: 1, stagger: { amount: 0.03 } },
      '<',
    )

  //todo make a masterTl ?
  masterTl.add(scrollClockTl)
  console.dir(masterTl)

  ScrollTrigger.create({
    trigger: 'main',
    animation: scrollClockTl,
    pin: true,
    end: '+=2400 top',
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

  //< listen up DOM
  setTimeBtn.addEventListener('click', updateTime)

  function resize(e) {
    const mobile = window.matchMedia('(max-width: 420px)')
    mobile.matches
      ? gsap.set(scene, { attr: { viewBox: '250 0 1220 603' } })
      : gsap.set(scene, { attr: { viewBox: '125 0 800 603' } })
  }

  window.addEventListener('resize', e => {
    resize()
  })

  setTime()
  resize()
}

window.addEventListener('load', e => {
  gsap.to(scene, { duration: 0.5, autoAlpha: 1 })
  init()
})
