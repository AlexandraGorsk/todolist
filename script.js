const list = JSON.parse(localStorage.getItem('todo-list') || '[]');

const addbutton = document.querySelector('.add');
const titlefield = document.querySelector('#titlefield');
const todolist = document.querySelector('.list');
const ul = document.querySelector('#ul');
const all = document.querySelector('#all');
const completed = document.querySelector('#completed');
const uncompleted = document.querySelector('#uncompleted');
const searchfield = document.querySelector('.search');
const wrapper = document.querySelector('.wrapper');

addbutton.addEventListener('click', () => {
	if (!titlefield.value) {
		alert('Поле не следует оставлять пустым');
		return;
	}
	list.push({
		title: titlefield.value,
		completed: false,
	});
	localStorage.setItem('todo-list', JSON.stringify(list));

	renderList(list);

	titlefield.value = '';
});
const renderList = (list) => {
	todolist.innerHTML = '';
	if (!list.length) {
		todolist.innerHTML = '<h4>Nothing to do</h4>';
		return;
	}
	list.forEach((item) => {
		todolist.innerHTML += `<li>
    <span class="todotitle">${item.title}</span>
    <div>
        <button class="donebutton"></button>
        <button class="editbutton"></button>
        <button class="deletebutton"></button>
    </div>
</li>`;
	});
	const span = document.querySelectorAll('span');
	span.forEach((item, index) => {
		if (list[index].completed) {
			item.classList.add('completed');
		}
	});
	const deletebuttons = document.querySelectorAll('.deletebutton');
	const editbuttons = document.querySelectorAll('.editbutton');
	const donebuttons = document.querySelectorAll('.donebutton');

	donebuttons.forEach((button, index) => {
		button.onclick = () => {
			if (list[index].completed) {
				list[index].completed = false;
			} else {
				list[index].completed = true;
			}
			localStorage.setItem('todo-list', JSON.stringify(list));
			renderList(list);
		};
	});
	deletebuttons.forEach((button, index) => {
		button.onclick = () => {
			list.splice(index, 1);
			localStorage.setItem('todo-list', JSON.stringify(list));
			renderList(list);
		};
	});
	const liarr = document.getElementsByTagName('li');
	editbuttons.forEach((button, index) => {
		button.onclick = () => {
			liarr[index].classList.add('shadow');
			const modaldiv = document.createElement('div');
		modaldiv.id = 'modal';
		wrapper.append(modaldiv);
		modaldiv.innerHTML = ` <div id="prompt-form-container">
	<form id="prompt-form">
	  <input class="modalvalue" name="text" placeholder = " " type="text">
	  <div class="modalbuttons">
	  <button class="edit">Ok</button>
	  <button class="cancel">Отмена</button>
	  </div>
	</form>
	</div>`;
		const modaledit = document.querySelector('.edit');
		const modalvalue = document.querySelector('.modalvalue');
		modaledit.onclick = () => {
			alert(`${modalvalue.value}`);
		};
		};
	});
	// function showmodal() {
	// 	const modaldiv = document.createElement('div');
	// 	modaldiv.id = 'modal';
	// 	wrapper.append(modaldiv);
	// 	modaldiv.innerHTML = ` <div id="prompt-form-container">
	// <form id="prompt-form">
	//   <input class="modalvalue" name="text" type="text">
	//   <div class="modalbuttons">
	//   <button class="edit">Ok</button>
	//   <button class="cancel">Отмена</button>
	//   </div>
	// </form>
	// </div>`;
	// 	const modaledit = document.querySelector('.edit');
	// 	const modalvalue = document.querySelector('.modalvalue');
	// 	modaledit.onclick = () => {
	// 		alert(`${modalvalue.value}`);
	// 		alert(list);
	// 	};
	// }
};

all.addEventListener('click', function () {
	renderList(list);
});
completed.addEventListener('click', function () {
	let arr = list.filter((item) => item.completed === true);
	renderList(arr);
});
uncompleted.addEventListener('click', function () {
	let uncompleted = list.filter((item) => item.completed === false);
	renderList(uncompleted);
});
searchfield.addEventListener('input', () => {
	let inputvalue = searchfield.value.toLowerCase();
	let arr = list.filter((item) =>
		item.title.toLowerCase().includes(inputvalue)
	);
	renderList(arr);
});

renderList(list);
