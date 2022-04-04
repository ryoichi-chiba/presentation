'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// Js用変数定義
let nextCard = Math.ceil(Math.random() * 13);
let currentCard = undefined;
let maxCard = 1;
let minCard = 14;
let consectiveWin = 0;
let gameStatus = false;
let resultFlag;
let resultMessage;

// CSS用変数
let resultColor;
let bodyColor;

/**
 * @returns {} 実行されるたびにランダムに1-13の数字を返す関数。
 * 　　　　　　 前回値と同じ値が出ないように調整している。             　
 **/
function randomNumber () {
  currentCard = nextCard;
  currentCardClass.innerText = numToCard(currentCard);
  while (currentCard === nextCard) {
    nextCard = Math.ceil(Math.random() * 13);
  }
}

/**
 * @param {number} カードの数値
 * @returns {string} カードの数値を文字列(トランプ)に変換した値
 */
function numToCard(card) {
  if (card <= 10) {
    return card.toString();
  } else if (card === 11) {
    return 'J';
  } else if (card === 12) {
    return 'Q';
  } else if (card === 13) {
    return 'K';
  }
} 

/**
 * @returns {} 次のカードの取得および、CSS変更
 */
function setting() {
  if (gameStatus === false) {
    gameStatus = true;
    randomNumber();

    //全体用CSS
    bodyTag.style.backgroundColor = "white";

    //ボタン用CSS
    buttonTag.style.animation = "None";
    buttonTag.innerText = "START";
    upButtonClass.style.animation = "flash 1s linear infinite";
    downButtonClass.style.animation = "flash 1s linear infinite";

    //カード用CSS
    currentCardClass.innerText = numToCard(currentCard);  
    currentCardClass.style.visibility = "visible";
    nextCardClass.style.visibility = "hidden";

    //勝敗用CSS
    winloseClass.style.visibility = 'hidden';
  }
}

/**
 * @returns {} Up予想でJudgeWinLoseを実行
 */
function upPrediction() {
  if (gameStatus === true) {
    judgeWinLose('up');  
  }
}

/**
 * @returns {} Down予想でJudgeWinLoseを実行
 */
function downPrediction() {
  if (gameStatus === true) {
    judgeWinLose('down');  
  }
}

/**
 * @params {up / down} 
 * @returns {} 予想に対応した結果を表示
 */
function judgeWinLose (prediction) {
  if (prediction === 'up') {
    if (nextCard > currentCard) {
      resultFlag = true;

    } else if (nextCard < currentCard) {
      resultFlag = false;
    }

  } else if (prediction === 'down') {
    if (nextCard > currentCard) {
      resultFlag = false;

    } else if (nextCard < currentCard) {
      resultFlag = true;
    }
  }

  if (resultFlag === true) {
    //全体用CSS
    bodyColor = '#DDFFFF'; // right blue color

    //ボタン用CSS
    buttonTag.innerText = 'Continue';

    //勝敗用CSS
    resultMessage = 'WIN!!!';
    resultColor = 'blue';
    consectiveWin++;
  
  } else if (resultFlag === false) {
    //全体用CSS
    bodyColor = "#FFD5EC"; // right red color

    //ボタン用CSS
    buttonTag.innerText = 'Restart';

    //勝敗用CSS
    resultMessage = 'LOSE...';
    resultColor = 'red';
    consectiveWin = 0;
  }

  //全体用CSS
  bodyTag.style.backgroundColor = bodyColor;

  //ボタン用CSS
  buttonTag.style.animation = "flash 1s linear infinite";
  upButtonClass.style.animation = "None";
  downButtonClass.style.animation = "None";
  currentCardClass.innerText = numToCard(currentCard);
  nextCardClass.style.visibility = "visible";
  nextCardClass.innerText = numToCard(nextCard);

  //カード用CSS
  winloseClass.style.visibility = 'visible';
  winloseClass.innerText = resultMessage;
  winloseClass.style.color = resultColor;
  consectiveWinClass.innerText = consectiveWin;
  gameStatus = false;
}

// HTML要素の変数化
const bodyTag = document.querySelector('body');
const buttonTag = document.getElementsByClassName('button-start')[1];
const upButtonClass = document.getElementsByClassName('button-up')[0];
const downButtonClass = document.getElementsByClassName('button-down')[0];
const winloseClass = document.getElementsByClassName('winlose')[0]
const consectiveWinClass = document.getElementsByClassName('consective')[0]
const currentCardClass = document.getElementsByClassName('current')[0];
const nextCardClass = document.getElementsByClassName('next')[0];

// addEventListenerの宣言
buttonTag.addEventListener('click', setting);
upButtonClass.addEventListener("click", upPrediction);
downButtonClass.addEventListener("click", downPrediction);
window.addEventListener('load', randomNumber);

winloseClass.style.visibility = 'hidden';
consectiveWinClass.visibility = 'hidden';
currentCardClass.style.visibility = 'hidden';
nextCardClass.style.visibility = 'hidden';
