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
			showmodal(list[index], list, liarr[index]);
		};
	});
	function showmodal(element, list, liarr) {
		const modaldiv = document.createElement('div');
		modaldiv.id = 'modal';
		wrapper.append(modaldiv);
		modaldiv.innerHTML = ` <div id="prompt-form-container">
	<form id="prompt-form">
	  <input class="modalvalue" name="text" type="text">
	  <div class="modalbuttons">
	  <button class="edit">Ok</button>
	  <button class="cancel">Отмена</button>
	  </div>
	</form>
	</div>`;
		const modaledit = document.querySelector('.edit');
		const cancelbutton = document.querySelector('.cancel');
		const modalvalue = document.querySelector('.modalvalue');
		modalvalue.value = element.title;
		modaledit.onclick = (e) => {
			e.preventDefault();
			element.title = modalvalue.value;
			localStorage.setItem('todo-list', JSON.stringify(list));
			renderList(list);
			modaldiv.remove();
		};
		cancelbutton.onclick = (e) => {
			e.preventDefault();
			modaldiv.remove();
			liarr.classList.remove('shadow');
		};
	}
};

all.addEventListener('click', function () {
	all.classList.add('active');
	completed.classList.remove('active');
	uncompleted.classList.remove('active');
	renderList(list);
});
completed.addEventListener('click', function () {
	completed.classList.add('active');
	all.classList.remove('active');
	uncompleted.classList.remove('active');
	let arr = list.filter((item) => item.completed === true);
	renderList(arr);
});
uncompleted.addEventListener('click', function () {
	uncompleted.classList.add('active');
	all.classList.remove('active');
	completed.classList.remove('active');
	let uncompletedfilter = list.filter((item) => item.completed === false);
	renderList(uncompletedfilter);
});
searchfield.addEventListener('input', () => {
	let inputvalue = searchfield.value.toLowerCase();
	let arr = list.filter((item) =>
		item.title.toLowerCase().includes(inputvalue)
	);
	renderList(arr);
});

renderList(list);
