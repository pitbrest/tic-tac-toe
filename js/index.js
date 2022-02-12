// Описываем алгоритм игры
const body = document.body
let area = document.getElementById('area')
let boxes = document.querySelectorAll('.box');
let move = 0
let winner = ''


area.addEventListener('click', event => {

	if (event.target.className === 'box') {
		move % 2 === 0 && event.target.innerHTML === '' ? event.target.innerHTML = '<img src="assets/svg/cross.svg" alt="img" width="40" height="40">' : event.target.innerHTML = '<img src="assets/svg/circle.svg" alt="img" width="40" height="40">';
		move += 1;
		setTimeout(() => {
			findWinner()
		}, 100);
	}

})

// Находим победителя

function findWinner() {

	const winArr = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < winArr.length; i++) {
		if (boxes[winArr[i][0]].innerHTML.includes('cross') && boxes[winArr[i][1]].innerHTML.includes('cross') && boxes[winArr[i][2]].innerHTML.includes('cross')) {
			sound(trackTwo)
			winner = 'крестики';
			alert('Победили крестики !!!');
			clearResults();
		}
		if (boxes[winArr[i][0]].innerHTML.includes('circle') && boxes[winArr[i][1]].innerHTML.includes('circle') && boxes[winArr[i][2]].innerHTML.includes('circle')) {
			sound(trackTwo)
			winner = 'крестики';
			alert('Победили нолики !!!');
			clearResults();
		}
	}

	if (move === 9 && winner === '') {
		alert('Победила дружба !!!');
		clearResults();
	}
}

function clearResults() {
	boxes.forEach(item => item.innerHTML = '')
	move = 0
	winner = ''
}

// Добавляем озвучку

let trackOne = 'assets/sound/ti-chto.mp3'
let trackTwo = 'assets/sound/fanfari.mp3'

function sound(track) {

	const audioPlayer = document.getElementById('audio-player')
	const audio = new Audio

	audio.currentTime = 0
	audio.src = track
	audio.play()
}

// Озвучка если пользователь кликает мимо игрового поля

body.addEventListener('click', event => {
	if (event.target.className != 'box') {
		sound(trackOne)
	}
})