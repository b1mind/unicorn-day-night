console.log('working?')
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

const findAngle = time => {
  let timeSplit = time.split(':')
  return (timeSplit[0] * 360) / 24 + (timeSplit[1] * 360) / (24 * 60)
}

const rotateClock = angle => {
  gsap.to(clock, {
    duration: 1,
    rotation: angle,
    transformOrigin: 'center center',
  })
}

const scrollClock = gsap.to(clock, {
  rotation: '360deg',
  transformOrigin: 'center center',
  scrollTrigger: {
    trigger: 'main',
    pin: true,
    scrub: 1,
    markers: true,
    end: '+=4200 top',
  },
})

console.dir(rotateClock)

const dayTime = time => {
  body.classList.replace('night-time', 'day')
  console.log(`do other day stuff its ${time}`)
  gsap.to(body, { duration: 1.5, backgroundColor: '#80C2FF' })
  gsap.fromTo(
    day,
    { duration: 1, rotation: 0 },
    { rotation: 360, transformOrigin: 'center' },
  )
}

const nightTime = time => {
  body.classList.replace('day', 'night-time')
  console.log(`do other night stuffs its ${time}`)
  gsap.to(body, { duration: 1.5, backgroundColor: '#031758' })
  gsap.fromTo(
    night,
    { duration: 1, rotation: 0 },
    { duration: 1, rotation: 360, transformOrigin: 'center' },
  )
}

const setTime = (time = timeNow) => {
  inputTime.value = time
  time <= sunSet && time >= sunRise ? dayTime(time) : nightTime(time)
  const angle = findAngle(time)
  rotateClock(angle)
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

setTimeBtn.addEventListener('click', updateTime)

window.addEventListener('resize', e => {
  resize()
})

// invoke
setTime()
resize()
