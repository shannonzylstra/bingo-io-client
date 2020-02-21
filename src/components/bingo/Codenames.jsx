import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './style.css';

const Codenames = (props) => {
    // let score, team, boardObj, clickedCards, gameover, mode
    let [ score, setScore ] = useState([]);
    let [ team, setTeam ] = useState('');
    let [ boardObj, setBoardObj ] = useState({});
    let [ clickedCards, setClickedCards ] = useState([]);
    let [ gameover, setGameover ] = useState(false);
    let [ mode, setMode ] = useState('');

    let [ cards, setCards ] = useState([]);

    useEffect(() => {
        console.log('Welcome to Codenames!');
        wordsListsObject['words'] = props.words;
        setCards(props.cards);
        console.log('cards:', props);
        startGame();
    })

    const startGame = () => {
        console.log('Starting game!');
        
        // let boardArray = create2dWordArray(props.cards);
        // let colorArray = create2dColorArray();
        // let coloredBoardArray = getColoredBoardArray(boardArray, colorArray); // add colors to boardArray
        // console.log(coloredBoardArray)
        // boardObj = getBoard(coloredBoardArray)
        // console.log(boardObj)

        let wordsListName = 'words';
        let wordsList = wordsListsObject[wordsListName];
        let shuffledWordsList = shuffle(wordsList);
        // let cards = populateCards(shuffledWordsList);
        
        let boardArray = create2dWordArray(cards) // create 2D board array
        let colorArray = create2dColorArray() // create 2D color array
        console.log('boardArray:', boardArray);
        console.log('colorArray:', colorArray);
        let coloredBoardArray = getColoredBoardArray(boardArray, colorArray) // add colors to boardArray
        console.log(coloredBoardArray)
        boardObj = getBoard(coloredBoardArray)
        console.log(boardObj)
        colorCodeCards(coloredBoardArray)
    
        let unclickedCards = document.getElementsByClassName('card')
        for (let i=0; i < unclickedCards.length; i++) {
            unclickedCards[i].classList.add('unclicked')
        }
        clickedCards = {
            '0': [],
            '1': [],
            '2': [],
            '3': []
        }
        addClickListeners()
    
        gameover = false
        team = 1 // not needed unless I add PVP functionality
        let teams = {
            1: 'red',
            2: 'blue',
            red: 1,
            blue: 2
        }
    
        score = [0,0,0]
        initializeScore()
    
        mode = 'player'
        // addButtonThings()

    }
    function create2dWordArray(arr) {
        let boardArray = new Array(5)

        console.log(arr);
        boardArray.forEach((elem, i) => {
            let j = 5*i;
            boardArray[i] = arr.slice(j, j+5);
        });
        return boardArray
    }    
    const shuffle = function (array) {

        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    const populateCards = (arr) => {
        let board = document.getElementById("board")

        let cardWords = document.querySelectorAll(".cardWord")
        console.log(cardWords)

        let cards = getCards(arr, 0, 25)
        
        for (let i=0; i < cards.length; i++) {
            cardWords[i].innerHTML = `${cards[i]}`
            cardWords[i].id = cards[i]
        }
        return cards
    }
    function create2dWordArrayOld(arr) {
        var boardArray = new Array(5)
        for (var i = 0; i < boardArray.length; i++) {
            let j = 5*i
            boardArray[i] = arr.slice(j,j+5)
        }
        return boardArray
    }
    function create2dColorArray() {
        const colors = []
        for (let i = 0; i < 9; i++) { // add 9 reds
            colors.push('red')
        }
        for (let i = 0; i < 8; i++) { // add 8 blues
            colors.push('blue')
        }
        for (let i = 0; i < 7; i++ ) { // add 7 whites
            colors.push('neutral')
        }
        colors.push('assassin') // add 1 black
        shuffleWordArray(colors) // shuffle colors array
        var colorArray = new Array(5) // initialize new array
        for (var i = 0; i < colorArray.length; i++) { // loop over array
            let j = 5*i
            colorArray[i] = colors.slice(j,j+5) // add row to array
        }
        return colorArray
    }
    function getColoredBoardArray(words, colors) {
        let coloredBoardArray = new Array(5)
        for (let i = 0; i < 5; i++) {
            coloredBoardArray[i] = new Array(5);
            for (let j = 0; j < 5; j++) {
                console.log(words);
                coloredBoardArray[i][j] = [words[i][j], colors[i][j]]
            }
        }
        return coloredBoardArray
    }
    function getBoard(arr) {
        // arr should be the coloredBoardArray in the form [ [ words[i][j], colors[i][j] ] ]
        let boardObj = {}
        for (let row=0; row<5; row++) {
            for (let col=0; col<5; col++) {
                boardObj[arr[row][col][0]] = arr[row][col][1]
            }
        }
        return boardObj
    }
    const colorCodeCards = (colorArr) => {
        console.log('Color Coding Cards with colors array:', colorArr)
        let cards = document.getElementsByClassName('card')
        console.log('Cards to add color classes to:', cards)
        for (let i=0; i < 5; i++) {
            // row = i
            for (let j=0; j < 5; j++) {
                // column j
                let color = colorArr[i][j][1]
                console.log('Add color:', color)
                cards[(i*5)+j].classList.add(`${color}`)
            }
        }
        return cards
    }
    const addClickListeners = () => {
        console.log('Adding click listeners!')

        var cardsToListen = document.querySelectorAll(".card")
        console.log('cardsToListen:', cardsToListen)
        for (let i=0; i < cardsToListen.length; i++) {
            let clickCard = cardsToListen[i]
            clickCard.addEventListener('click', revealCard);
        }
        console.log('Added card click listeners')

        let buttonsToListen = document.querySelectorAll('.mode button')
        console.log('Buttons to listen:', buttonsToListen)
        for (let i = 0; i < buttonsToListen.length; i++) {
            buttonsToListen[i].addEventListener('click', setMode)
        }
        console.log('Added mode button click listeners')

        console.log('Added all event listeners')
    }
    const initializeScore = () => {
        // not super DRY but there's only two teams
        document.getElementById('team1Score').textContent = score[1]
        document.getElementById('team2Score').textContent = score[2]
    }
    function addButtonThings() {
        let playerButton = document.getElementById('player')
        let spyButton = document.getElementById('spymaster')
        playerButton.addEventListener('click', setMode('player'))
        playerButton.addEventListener('click', setMode('spymaster'))
    }
    function getCards(arr, start, stop) {
        return arr.slice(start, stop)
    }
    function shuffleWordArray(arr) {
        return shuffle(arr)
    }
    const wordsListsObject = {
        "words": []
    }
    function handleRevealedCard(revealTeam) {
        if (revealTeam == "assassin") {
            clickedCards[0] = 1
            alert("Oh no! You've revealed the assassin. Your team loses!")
        } 
        else {
            if (revealTeam == "neutral") {
                score[0] += 1
            }
            else if (revealTeam == "red") {
                score[1] += 1
                document.getElementById("team1Score").textContent = `${parseInt(score[1])}`
            } else if (revealTeam == "blue") {
                score[2] += 1
                document.getElementById("team2Score").textContent = `${parseInt(score[2])}`
            }
            checkWin()
        }
    }
    function checkWin() {
        if (!gameover) {
            if (score[1] == 9 || score[2] == 8) {
                let msg
                if (score[1] == 9) { 
                    msg = "Red team wins! You found all the agents on your team. 🥰"
                    gameover = true
                } else {
                    msg = "Blue team wins! They found all their agents first. 😨"
                    gameover = true
                }
                alert(msg)
            }
        }
    }
    function revealCard(e) {
        console.log("Clicked a card!")

        // Add 'reveal' to classlist of e.target element
        e.target.classList.add('reveal')

        // Get classlist of e.target element (using '.reveal' query)
        let revealedClasses = document.querySelector('.reveal').classList

        // Remove the 'reveal' class from e.target
        e.target.classList.remove('reveal')
        console.log('Target element classlist:', revealedClasses)

        // Determine which element was clicked (div.card or div.cardWord)
        let target = revealedClasses.contains('cardWord') ? e.target.parentNode.parentNode : e.target
        console.log('Target .card element:', target)

        // find div.cardWord element
        let cardWord = target.querySelector('.cardWord')
        console.log(`Target .cardWord element:`, cardWord)
        
        // find word text and reveal team
        let word = cardWord.id
        let revealTeam = boardObj[word]
        console.log(`${word} = ${revealTeam}`)

        // do not display word
        cardWord.textContent = ""

        // add revealed team to .card classes
        target.classList.add(revealTeam)
        // switch a .card class from 'unclicked' to 'clicked'
        target.classList.remove("unclicked")
        target.classList.add('clicked')
        // remove the 'reveal' class from e.target
        e.target.classList.remove('reveal')
        // add the 'revealed' class to .card
        target.classList.add('revealed')

        // remove event listener from target
        target.removeEventListener('click', revealCard)

        // handle the gameplay for revealed team
        handleRevealedCard(revealTeam)
    }
    function setTheMode(e) {
        // setting mode
        let mode = e.target.id
        console.log(`setting mode to ${mode}`)
        let cards = document.getElementsByClassName('card')
        for (let i=0; i < cards.length; i++) {
            if (mode == 'spymaster') {
                cards[i].classList.remove('player')
                cards[i].classList.add('spymaster')
            } else if (mode == 'player') {
                cards[i].classList.remove('spymaster')
                cards[i].classList.add('player')
            }
        }
    }
    function playerMode() {
        let cards = document.getElementsByClassName('card)')
    }

    return (
        <div className="board">
            <h1>{props.list} hi</h1>
            <div className="wrapper" id="board">
                <div className="one">
                    {props.cards.map(card => {
                        return (
                            <div key={card.id} className="card">
                                <div className="cardWordWrapper">
                                    <div className="cardWord">
                                        {card}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Codenames;