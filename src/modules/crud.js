import items from './storage.js';

/* eslint-disable */
export class Actions {
  static showTrash = (i) => {
    document.getElementById(`trash-${i}`).classList.remove('hide');
    document.getElementById(`ellipsis-${i}`).classList.add('hide');
  };

  static hideTrash = (i) => {
    document.getElementById(`trash-${i}`).classList.add('hide');
    document.getElementById(`ellipsis-${i}`).classList.remove('hide');
  };

  static removeTask = (i) => {
    items.splice(i, 1);
    items.forEach((item, index) => {
      item.index = index;
    });
    localStorage.setItem('tasks', JSON.stringify(items));
    return true;
  };

  static addTask = (description, i) => {
    items[i].description = description;
    localStorage.setItem('tasks', JSON.stringify(items));
    return true;
  };
}
