import './style.css';
import items from './modules/storage.js';
import { Actions } from './modules/crud.js';

const listItems = document.getElementById('todo-items');
const displayList = () => {
  let listHtml = '';
  items.forEach((item) => {
    let boxes = '';
    let checkMark = '';
    if (item.completed === true) {
      boxes = 'checked';
      checkMark = 'check-mark';
    }
    listHtml += `
               <li id="list-${item.index}">
            <div class="list-wrap">
              <div><input id="checkbox-${item.index}" name="ch-${item.index}" type="checkbox" ${boxes}/></div>
              <div  id= "text-input" class="text-input">
                <input
                  id="task-desc-${item.index}"
                  type="text"
                  class="list-item ${checkMark}"
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

    const checkbox = document.getElementById(`checkbox-${i}`);
    checkbox.addEventListener('click', () => {
      document.querySelector(`#task-desc-${i}`).classList.add('checked-mark');

      if (checkbox.checked) {
        items[i].completed = true;
      } else {
        items[i].completed = false;
      }
      localStorage.setItem('tasks', JSON.stringify(items));
      displayList();
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

// clear all

const clearAll = document.getElementById('clear-all');
clearAll.addEventListener('click', () => {
  const clear = items.filter((item) => item.completed === true);

  clear.forEach((item) => {
    items.splice(item.index, 1);
    items.forEach((item, index) => {
      item.index = index;
    });
  });
  localStorage.setItem('tasks', JSON.stringify(items));
  displayList();
});
