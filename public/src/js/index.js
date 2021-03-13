console.log('working?')
import { gsap } from 'gsap'

const setTimeBtn = document.getElementById('setTimeBtn')
const inputTime = document.getElementById('inputTime')
const clock = document.getElementById('clock')
const day = document.getElementById('day')
const night = document.getElementById('night')

const scene = document.querySelector('#scene')

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

const dayTime = time => {
  bg.classList.replace('night-time', 'day')
  console.log(`do other day stuff its ${time}`)
  gsap.to(bg, { duration: 1.5, fill: 'rgb(63, 106, 245)' })
  gsap.fromTo(
    day,
    { duration: 1, rotation: 0 },
    { rotation: 360, transformOrigin: 'center center' },
  )
}

const nightTime = time => {
  bg.classList.replace('day', 'night-time')
  console.log(`do other night stuffs its ${time}`)
  gsap.to(bg, { duration: 0.5, fill: '#031758' })
  gsap.fromTo(
    night,
    { duration: 1, rotation: 0 },
    { duration: 1, rotation: 360, transformOrigin: 'center' },
  )
}

const setTime = (e = timeNow) => {
  let time = e
  time <= sunSet && time >= sunRise ? dayTime(time) : nightTime(time)
  let angle = findAngle(time)
  rotateClock(angle)
}

const updateTime = () => {
  let userSetTime = inputTime.value
  userSetTime ? setTime(userSetTime) : console.log(`User Set Incomplete time`)
}

function resize(e) {
  let mobile = window.matchMedia('(max-width: 360px)')
  mobile.matches
    ? gsap.set(scene, { attr: { viewBox: '300 0 1020 600' } })
    : gsap.set(scene, { attr: { viewBox: '0 0 1020 600' } })
}

setTimeBtn.addEventListener('click', updateTime)

window.addEventListener('resize', e => {
  resize()
})

// invoke
inputTime.value = timeNow
setTime()

resize()
