let whiteSquare = document.getElementsByClassName('white-1e1d7');
let blackSquare = document.getElementsByClassName('black-3c85d');
let buttons = document.getElementsByTagName('button');

let global_step = 0;
let blackColorArray = ['#b58863', '#9332a8', '#99291f', '#26abad'];
let whiteColorArray =['#f0d9b5', '#d38ae3', '#d67c74', '#96dfe0' ];
let colorArrayLength = whiteColorArray.length;

function changeTheme(){
    global_step++;

    for(let i = 0; i < 32; i++){
        whiteSquare[i].style.backgroundColor = whiteColorArray[global_step%colorArrayLength];
        blackSquare[i].style.backgroundColor = blackColorArray[global_step%colorArrayLength];
    }
    for(let i = 0; i < buttons.length; i++){
        buttons[i].style.backgroundColor = blackColorArray[global_step%colorArrayLength];
    }
}