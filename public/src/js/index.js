console.log('working?')
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const setTimeBtn = document.getElementById('setTimeBtn')
const inputTime = document.getElementById('inputTime')
const clock = document.getElementById('clock')
const day = document.getElementById('day')
const night = document.getElementById('night')
const scene = document.querySelector('#scene')
const body = document.querySelector('body')

let sunRise = '06:30'
let sunSet = '19:30'
let date = new Date()
let hours = (date.getHours() < 10 ? '0' : '') + date.getHours()
let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
let timeNow = hours + ':' + minutes

/* const findAngle = time => {
  let timeSplit = time.split(':')
  return (timeSplit[0] * 360) / 24 + (timeSplit[1] * 360) / (24 * 60)
} */

const rotateClock = time => {
  gsap.to(window, {
    duration: 1,
    scrollTo: () => {
      return time.replace(':', '')
    },
  })
}

const scrollClock = gsap.to(clock, {
  rotation: '360deg',
  transformOrigin: 'center center',
  scrollTrigger: {
    trigger: 'main',
    pin: true,
    end: '3800 top',
    scrub: 1,
    // markers: true,
  },
})

const dayTime = time => {
  body.classList.replace('nightTime', 'day')
  console.log(`do other day stuff its ${time}`)
}

const nightTime = time => {
  body.classList.replace('day', 'nightTime')
  console.log(`do other night stuffs its ${time}`)
}

const setTime = (time = timeNow) => {
  inputTime.value = time
  time <= sunSet && time >= sunRise ? dayTime(time) : nightTime(time)
  rotateClock(time)
}

const updateTime = () => {
  const userSetTime = inputTime.value
  userSetTime ? setTime(userSetTime) : console.log(`User Set Incomplete time`)
}

function resize(e) {
  const mobile = window.matchMedia('(max-width: 420px)')
  mobile.matches
    ? gsap.set(scene, { attr: { viewBox: '250 0 1220 603' } })
    : gsap.set(scene, { attr: { viewBox: '100 0 800 603' } })
}

//< listen up DOM
setTimeBtn.addEventListener('click', updateTime)

window.addEventListener('resize', e => {
  resize()
})

window.addEventListener('load', e => {
  // invoke
  setTime()
})

resize()
