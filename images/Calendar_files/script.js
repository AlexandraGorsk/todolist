const year = document.getElementById('year');
const month = document.getElementById('month');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const monthDays = document.querySelector('.days');
year.style.cssText = `
    font-weight: 800;
    font-size:30px;
    text-align:center;
    padding: 7px;
  `;
month.style.cssText = `
    font-weight: 800;
    font-size:30px;
    text-align:center;
    padding: 7px;
  `;

const date = new Date();
const renderCalendar = () => {
	date.setDate(1);

	const lastDay = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate();//31
	const prevLastDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		0
	).getDate();
	console.log(lastDay);
	const firstDayIndex = date.getDay();
	const lastDayIndex = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDay();
	const nextDays = 7 - lastDayIndex - 1;
	let months = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь ',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	];
	year.innerHTML = date.getFullYear();
	function writeMonth() {
		month.innerHTML = months[date.getMonth()];
	}
	writeMonth();
	let days = '';
	for (let x = firstDayIndex; x > 0; x--) {
		days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
	}
	for (let i = 1; i <= lastDay; i++) {
		days += `<div>${i}</div>`;
		monthDays.innerHTML = days;
	}
	for (let j = 1; j <= nextDays; j++) {
		days += `<div class="next-date">${j}</div>`;
		monthDays.innerHTML = days;
	}
};

right.addEventListener('click', () => {
	date.setMonth(date.getMonth() + 1);
    renderCalendar()
});
left.addEventListener('click', () => {
	date.setMonth(date.getMonth() - 1);
    renderCalendar()
});
renderCalendar()