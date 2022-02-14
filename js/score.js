import { arr } from './index.js';

console.log(arr[0]);

const scoreButton = document.querySelector('.score-button');
const score = document.querySelector('.score');
const scoreCells = document.querySelectorAll('td')

scoreButton.addEventListener('click', (event) => score.classList.toggle('active'))

for(let i=12; i<scoreCells.length; i++) {
	for(let j=0; j<arr.length; j++) {
		scoreCells[i].innerHTML = arr[j]
	}
}





