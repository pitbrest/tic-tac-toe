const area = document.getElementById('area')
let move = 0
let winner = ''


area.addEventListener('click', event => {

	if (event.target.className === 'box') {
		move % 2 === 0 && event.target.innerHTML === '' ? event.target.innerHTML = '<img src="svg/cross.svg" src="img" width="40" height="40">' :
			event.target.innerHTML = '<img src="svg/circle.svg" src="img" width="40" height="40">';
		move += 1;
		setTimeout(() => {
			findWinner()
		}, 100);
	}
	
})



function findWinner() {

	const boxes = document.querySelectorAll('.box');

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
			winner = 'крестики'
			alert('Победили крестики !!!')
			boxes.forEach(item => item.innerHTML = '')
		}
		if (boxes[winArr[i][0]].innerHTML.includes('circle') && boxes[winArr[i][1]].innerHTML.includes('circle') && boxes[winArr[i][2]].innerHTML.includes('circle')) {
			winner = 'нолики'
			alert('Победили нолики !!!')
			boxes.forEach(item => item.innerHTML = '')
		}
	}
	
}



