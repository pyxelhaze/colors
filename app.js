'use strict'

const $ = (e) => document.querySelector(e)
const colors = {
    1: 'red',
    2: 'green',
    3: 'blue',
    4: 'purple',
    5: 'pink',
    6: 'white',
    7: 'orange',
    8: 'yellow'
}

//pick random color
const getColor = () =>
    Object.keys(colors)[Math.floor(Math.random()
        * Object.keys(colors).length)]

const randomColor = () => {
    const color = colors[getColor()]
    return color
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//generate random colorname
const changeName = () => {
    const colorName = $('.colornames')

    let colorText = randomColor()
    let textColor = randomColor()

    while (colorText === textColor) {
        textColor = randomColor()
    }

    colorName.innerHTML = colorText
    colorName.style.color = textColor;

    const buttons = [$('#button1'), $('#button2'), $('#button3'), $('#button4')];

    shuffleArray(buttons);

    buttons[0].style.backgroundColor = colorText;
    buttons[1].style.backgroundColor = textColor;

    // randomize rmaining colors for the other two buttons
    const remainingColors = Object.values(colors).filter(color => color !== colorText && color !== textColor)
    for (let i = 2; i < buttons.length; i++) {
        const randomIndex = Math.floor(Math.random() * remainingColors.length)
        const randomColor = remainingColors.splice(randomIndex, 1)[0]
        buttons[i].style.backgroundColor = randomColor
    }
}
changeName();

const setElementClickable = (element, clickable) => {
    element.style.pointerEvents = clickable ? 'auto' : 'none';
}

// different counters
let round = 1;
const roundCounter = () => {
    round++
    $('.round').innerHTML = `Runde: ${round}`
}
let lives = 3
const liveCounter = () => {
    lives--;
    $('.lives').innerHTML = `❤️ ${lives}`

    if (lives === 0) {
        $('.outcome').innerHTML =
            `Game Over! <br> 
            You made it to round ${round}!`


        setTimeout(() => {

            openSecondModal()
        }, 3000)
    }
}




const startButton = $('.startbutton')
const countdown = (seconds) => {
    let count = 1
    const timeDisplay = $('.time')
    const outcomeDisplay = $('.outcome')
    const buttons = [$('#button1'), $('#button2'), $('#button3'), $('#button4')]

    let timerId // Timer-ID als Variable deklarieren
    let countdownStopped = false // Flagge, um den Countdown zu stoppen


    // function to start the countdown
    const startCountdown = () => {

        timerId = setInterval(() => {

            count = Math.max(0, count - 0.01)
            timeDisplay.innerHTML = `Time ${count.toFixed(2)}`

            if (count <= 0) {
                outcomeDisplay.innerHTML = `Too slow!`
                outcomeDisplay.style.color = 'orange';
                disableInteractions()
                clearInterval(timerId)
                liveCounter()
                autoRound()
            }
            if (countdownStopped) {
                clearInterval(timerId) // Timer stoppen, wenn die Flagge gesetzt ist
                return
            }
        }, 10)
    };
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            countdownStopped = true
        })
    })
    startCountdown()
}
//  block interactions
const disableInteractions = () => {
    // Das Overlay wird sichtbar gemacht und blockiert die Interaktion
    document.getElementById('overlay').style.display = 'block';

    setTimeout(function () {
        document.getElementById('overlay').style.display = 'none';
    }, 3995)
}

$('.color').addEventListener('click', disableInteractions);

//startbutton
const startGame = () => {
    const startButton = $('.startbutton');
    let intervalId = null
    const buttons = [$('#button1'), $('#button2'), $('#button3'), $('#button4')];
    buttons.forEach(button => setElementClickable(button, false))

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none'
        setTimeout(() => {

            buttons.forEach(button => setElementClickable(button, true));
        }, 2000)
        intervalId = setInterval(() => {
            changeName();
        }, 100);
        setTimeout(() => {
            countdown(2)
            clearInterval(intervalId)
        }, 2000);


    });
}
startGame()

// play round
const playRound = () => {
    const buttons = [$('#button1'), $('#button2'), $('#button3'), $('#button4')];
    const colorName = $('.colornames');
    const outcome = $('.outcome')
    const timeDisplay = $('.time')
    if (lives <= 0) {
        return
    }
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (lives <= 0) {
                return
            }
            const backgroundColor = button.style.backgroundColor;
            const colorText = colorName.innerHTML;

            if (backgroundColor === colorText) {
                outcome.innerHTML = 'Yes!'
                outcome.style.color = 'green';
                disableInteractions()
                setTimeout(() => {
                    if (lives <= 0) {
                        return
                    }

                    outcome.innerHTML = '';

                    let intervalId = null;
                    intervalId = setInterval(() => {
                        changeName();
                    }, 100);
                    setTimeout(() => {
                        clearInterval(intervalId);
                        changeName();
                    }, 2000);
                    timeDisplay.innerHTML = `Time: 1.00`
                    roundCounter()
                    setTimeout(() => {
                        countdown(2)
                    }, 2000);

                }, 2000);

            } else {

                outcome.innerHTML = 'Nope!';
                outcome.style.color = 'red';
                disableInteractions()
                setTimeout(() => {
                    if (lives <= 0) {
                        return
                    }
                    outcome.innerHTML = '';
                    let intervalId = null;
                    intervalId = setInterval(() => {
                        changeName();
                    }, 100);

                    setTimeout(() => {
                        countdown(2)
                        clearInterval(intervalId);
                        changeName();
                    }, 2000);
                    timeDisplay.innerHTML = `Time: 1.00`
                    roundCounter()

                }, 2000);
                liveCounter()
            }
        });
    });
}
playRound()

//autoround when time goes to 0
const autoRound = () => {
    const outcome = $('.outcome')
    const timeDisplay = $('.time')
    setTimeout(() => {
        if (lives <= 0) {
            return
        }
        let intervalId = null;
        intervalId = setInterval(() => {
            changeName();
        }, 100);

        // 
        setTimeout(() => {
            countdown(2)
            clearInterval(intervalId)
        }, 2000);
        timeDisplay.innerHTML = `Time: 1.00`
        roundCounter()
        outcome.innerHTML = ''

    }, 2000)

}

