const list = [];

const addbutton = document.querySelector('.add');
const titlefield = document.querySelector('#titlefield');
const todolist = document.querySelector('.list');
const ul = document.querySelector('#ul');

const renderList = (list) => {
	if (!list.length) {
		todolist.innerHTML = '<h4>Nothing to do</h4>';
		return;
	}
	todolist.innerHTML += 
    `<li>
    <span class="todotitle">${titlefield.value}</span>
    <div>
        <button class="donebutton"></button>
        <button class="editbutton"></button>
        <button class="deletebutton"></button>
    </div>
</li>`
};
addbutton.addEventListener('click', () => {
	if (!titlefield.value) {
		alert('Поле не следует оставлять пустым');
		return;
	}
	list.push({
		id: list.length,
		title: titlefield.value,
		completed: false,
	});
	renderList(list);
	titlefield.value = '';
});
