// Описываем алгоритм игры
const body = document.body;
const winModalWindow = document.querySelector('.modal-result-wrapper');
const winnerImg = document.querySelector('.winner-img');
const newGameButton = document.querySelector('.button');
const area = document.getElementById('area');
const boxes = document.querySelectorAll('.box');
const audioPlayer = document.getElementById('audio-player');
const audio = new Audio;
const trackOne = 'assets/sound/ti-chto.mp3';
const trackTwo = 'assets/sound/fanfari.mp3';
const movesCountContainer = document.querySelector('.moves-count');
const soundButtons = document.querySelectorAll('.volume');
const volumeOnButton = document.querySelector('.volume-on-button');
const volumeOffButton = document.querySelector('.volume-off-button');
let move = 0;
let winner = '';


// При загрузке отображаем нужную кнопку управления звуком 

buttonsPrepair()

// Определяем при кликах по игровому полю когда ставить крестик, а когда 0

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
			winner = "assets/svg/cross.svg";
			movesCountContainer.textContent = move
			greeting(winner)
			clearResults();
		}
		if (boxes[winArr[i][0]].innerHTML.includes('circle') && boxes[winArr[i][1]].innerHTML.includes('circle') && boxes[winArr[i][2]].innerHTML.includes('circle')) {
			winner = "assets/svg/circle.svg";
			movesCountContainer.textContent = move
			greeting(winner)
			clearResults();
		}
	}

	if (move === 9 && winner === '') {
		winner = "assets/png/handshake.png";
		movesCountContainer.textContent = move
		greeting(winner)
		clearResults();
	}
}

// Функция сброса результатов - сбрасывает количества ходов и победителя

function clearResults() {
	boxes.forEach(item => item.innerHTML = '');
	move = 0;
	winner = '';
}

// Вызываем модальное окно при окончании игры

function greeting(winner) {
	winnerImg.src = winner;
	winModalWindow.classList.remove('hidden');
	sound(trackTwo)
}

// Скрываем модальное окно при клике по кнопке или оверлею

body.addEventListener('click', (event) => {
	if (event.target.className === 'overlay' || event.target.className === 'button') {
		winModalWindow.classList.add('hidden');
	}
})

// Добавляем озвучку

function sound(track) {
	if (localStorage.volume) {
		audio.volume = localStorage.getItem('volume')
	}
	audio.currentTime = 0;
	audio.src = track;
	audio.play();
}

// Озвучка если пользователь кликает мимо игрового поля

/* if(winModalWindow.classList.contains('hidden')) {
	body.addEventListener('click', event => {
		if (event.target.className != 'box') {
			sound(trackOne)
		}
	})
} */

// Подготовка кноппок при загрузке страницы

function buttonsPrepair() {
	if (!localStorage.volume) {
		localStorage.setItem('volume', '1');
	}
	if (localStorage.getItem('volume') === '0') {
		volumeOnButton.style.display = 'block';
		volumeOffButton.style.display = 'none';
	} else if (localStorage.getItem('volume') === '1') {
		volumeOnButton.style.display = 'none';
		volumeOffButton.style.display = 'block';
	}
}



// Реализуем отключение звука по клику на кнопку, записываем в localStorage ключь volume cо значением 1 (Если такой ключь еще не создан), в зависимости от значения ключа - 0 или 1, отобращаем в футере соответствующую кнопку управления звуком,  вешаем прослушиватель кликов на кнопки.


soundButtons.forEach(button => {

	button.addEventListener('click', (event) => {

		if (event.target.className.includes('volume-on-button')) {
			event.target.style.display = 'none';
			volumeOffButton.style.display = 'block';
			audio.volume = 1;
			localStorage.volume = '1';
		} else if (event.target.className.includes('volume-off-button')) {
			event.target.style.display = 'none';
			volumeOnButton.style.display = 'block';
			audio.volume = 0;			
			localStorage.volume = '0';
		}
	})
})

