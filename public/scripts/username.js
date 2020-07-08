const form = document.querySelector('#username_form');
const username = document.querySelector('#username_field')

let room_selection = "javascript"

const buttons = document.querySelectorAll('.roomSelectButton')
buttons.forEach(button => button.addEventListener('click', e => {
    document.querySelector(`.${e.target.innerText}`)
    room_selection = e.target.innerText

}))

form.addEventListener('submit', e => {
    e.preventDefault()
    const username_value = username.value
    console.log(username_value)
    window.location.href = `/${room_selection}?` + `username=${username_value}`;


})