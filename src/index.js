import './style.css';
import items from './modules/storage.js';
import { Actions } from './modules/crud.js';

const listItems = document.getElementById('list-items');
const displayList = () => {
  let listHtml = '';
  items.forEach((item) => {
    let boxes = '';
    if (item.completed === true) {
      boxes = 'checked';
    }
    listHtml += `
               <li id="list-${item.index}">
            <div class="list-wrap">
              <div><input id="checkbox" type="checkbox" ${boxes}/></div>
              <div  id= "text-input" class="text-input">
                <input
                  type="text"
                  class="list-item"
                  value="${item.description}"
                />
              </div>
              <div class="icons">
                <i id="trash-${item.index}" class="fa-solid fa-trash hide"></i>
                <i id="ellipsis-${item.index}" class="fa-solid fa-ellipsis-vertical "></i>
              </div>
            </div>
          </li>`;
  });
  listItems.innerHTML = listHtml;

  const allTasks = document.getElementsByClassName('list-item');

  for (let i = 0; i < allTasks.length; i += 1) {
    const lis = document.getElementsByTagName('li');
    lis[i].addEventListener('mouseover', () => {
      lis[i].classList.add('list-item-hover');
      Actions.showTrash(i);
    });

    lis[i].addEventListener('mouseout', () => {
      Actions.hideTrash(i);
      lis[i].classList.remove('list-item-hover');
    });

    allTasks[i].addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const { value } = event.target;

        if (Actions.addTask(value, i)) {
          displayList();
        }
      }
    });

    document.getElementById(`trash-${i}`).addEventListener('click', () => {
      if (Actions.removeTask(i)) {
        displayList();
      }
    });
  }
};

displayList();

const addList = document.getElementById('addlist');

addList.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const { value } = addList;
    items.push({
      description: value,
      completed: false,
      index: items.length,
    });
    addList.value = '';

    localStorage.setItem('tasks', JSON.stringify(items));

    displayList();
  }
});
