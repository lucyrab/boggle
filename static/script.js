const totalElement = document.getElementById("total")
const submit = document.getElementById("submit")
let buttons = []
let total = ''
let letter = ''
let selection = []
let word = ''

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
        buttonId.style.backgroundColor = 'white'
        selection[selection.length - 1].isSelected = false
        selection = selection.slice(0, -1)
    }  else if (selection.length != 0 && ((Math.abs(buttonObject.x - selection[selection.length - 1].x) > 1 || Math.abs(buttonObject.y - selection[selection.length - 1].y) > 1)) && (!buttonObject.isSelected)){
        for (object of selection) {
            object.isSelected = false
            object.id.style.backgroundColor = 'white'
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
                        selection[i].id.style.backgroundColor = 'white'
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
        object.id.style.backgroundColor = 'red'
    }
    totalElement.innerHTML = word
    
}

async function handleSubmit() {
    const response = await fetch(`/submit/${word}`)
    
    window.location.reload()

    for (object of selection) {
            object.isSelected = false
            object.id.style.backgroundColor = 'white'
    }
    selection = []
}

for (const row of buttons) {
    for (const button of row) {
        button.id.addEventListener('click', function click() {
            handleLetterClick(button, button.id)
        })
    }
}

submit.addEventListener('click', handleSubmit)