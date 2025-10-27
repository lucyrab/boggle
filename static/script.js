const totalElement = document.getElementById("total")
const submit = document.getElementById("submit")
const timerElement = document.getElementById("timer")
const wordListElement = document.getElementById("wordlist")
const scoreElement = document.getElementById("score")

let buttons = []
let total = ''
let letter = ''
let selection = []
let word = ''
let score = 0
const buttonColour = '#fae7cb'
const selectedButtonColour = '#B89563'

let minutes_left = 3
let seconds_left = 0
let isGameFinished = false

timerElement.innerHTML = `${minutes_left}:0${seconds_left}`

function startTimer() {
    setTimeout(removeSecond, 1000)
}

function removeSecond() {
    if (seconds_left > 0) {
        seconds_left -= 1
    } else if (seconds_left === 0 && minutes_left > 0) {
        minutes_left -= 1
        seconds_left = 59
    } else if ((seconds_left === 0 && minutes_left === 0) && isGameFinished === false) {
        isGameFinished = true
        alert(`Time up! You got a score of ${score} points`)
        restartGame()
    }
    if (String(seconds_left).length === 2) {
        timerElement.innerHTML = `${minutes_left}:${seconds_left}`
    } else {
        timerElement.innerHTML = `${minutes_left}:0${seconds_left}`
    }
    setTimeout(removeSecond, 1000)
}

startTimer()
totalElement.readOnly = true

class Button {
    constructor(id, isSelected, x, y) {
        this.id = id
        this.isSelected = isSelected
        this.x = x
        this.y = y
    }
    letterValue
}

for (let i = 0; i < 4; i++) {
    buttons.push([])
    for (let j = 0; j < 4; j++) {
        buttons[i].push(new Button(document.getElementById('button' + i.toString() + j.toString()), false, j, i))
    }
}

function handleLetterClick(buttonObject, buttonId) {
    if (selection.length != 0 && selection[selection.length - 1].id === buttonId) {
        buttonId.style.backgroundColor = buttonColour
        selection[selection.length - 1].isSelected = false
        selection = selection.slice(0, -1)
    }  else if (selection.length != 0 && ((Math.abs(buttonObject.x - selection[selection.length - 1].x) > 1 || Math.abs(buttonObject.y - selection[selection.length - 1].y) > 1)) && (!buttonObject.isSelected)){
        for (object of selection) {
            object.isSelected = false
            object.id.style.backgroundColor = buttonColour
    }
        buttonObject.isSelected = true
        selection = [buttonObject]
    } else if (buttonObject.isSelected === true) {
            found = false
            count = 0
            while (!found) {
                if (selection[count] == buttonObject) {
                    found = true
                    for (let i = (count + 1); i < (selection.length); i++) {
                        selection[i].isSelected = false
                        selection[i].id.style.backgroundColor = buttonColour
                    }
                    selection = selection.slice(0, (count + 1))
                } else {
                    count += 1
                }
            }
    } else {
        buttonObject.isSelected = true
        selection.push(buttonObject)
    }
    
    word = ''
    for (object of selection) {
        word += object.id.innerHTML
        object.id.style.backgroundColor = selectedButtonColour
    }
    totalElement.value = word
}

async function handleSubmit() {
    const response = await fetch(`/submit/${word}`).then(response => response.json()).then(data => {
        wordListElement.innerHTML = data[0].join('<br>')
        score = data[1]
        scoreElement.innerHTML = `Total: ${score}`
    })
    totalElement.value = ''
    for (object of selection) {
            object.isSelected = false
            object.id.style.backgroundColor = buttonColour
    }
    selection = []
}

async function restartGame() {
    minutes_left = 3
    seconds_left = 0
    isGameFinished = false
    score = 0
    selection = []
    total = ''
    for (const row of buttons) {
    for (const button of row) {
        button.id.style.backgroundColor = buttonColour
        button.isSelected = false
    }
}
    const response = await fetch(`/restart`).then(response => response.json()).then(data => {
        for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            buttons[i][j].id.innerHTML = data[i][j]
        }
    }
    })
    wordListElement.innerHTML = ''
    scoreElement.innerHTML = 'Total: 0'
    totalElement.value = ''
}

for (const row of buttons) {
    for (const button of row) {
        button.id.addEventListener('click', function click() {
            handleLetterClick(button, button.id)
        })
    }
}

submit.addEventListener('click', handleSubmit)