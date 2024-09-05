import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from "./snake.js"
import {update as updateFood, draw as drawFood} from "./food.js"
import { outsideGrid } from "./grid.js"
let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById("game-board")
/* 1.currentTime is acting as an argument to hold a timestamp
value from requestAnimationFrame function. There should be only one argument in the callback function for requestAnimationFrame function.*/
/* 2.This main function is creating an inifinite loop for the function to run forever. First the main function is run, then the inside function which is a: "window.requestAnimationFrame", it again calls the main function and hence loop continues.*/
function main(currentTime){
    if (gameOver) {
        if (confirm("You lost. Press OK to start again.")) {
            window.location = "http://10.0.0.18:5500/snake%20game/index.html"
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    lastRenderTime = currentTime

    update()
    draw()
}
/* This line of code is a starter for the the whole infinite loop of requesting an animation frame. And it is calling a callback function called "main*/
window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
} 

function draw(){
    gameBoard.innerHTML = ""
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}