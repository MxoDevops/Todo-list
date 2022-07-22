import './style.css';

const toDoData = [
  {
    description: 'Read a book',
    completed: false,
    index: 1,
  },
  {
    description: 'Clean',
    completed: true,
    index: 2,
  },
  {
    description: 'Study',
    completed: false,
    index: 3,
  },
  {
    description: 'Code',
    completed: false,
    index: 4,
  },
  {
    description: 'Take a walk',
    completed: false,
    index: 5,
  },
];

const data = () => {
  const content = document.querySelector('.list');
  for (let i = 0; i < toDoData.length; i += 1) {
    const todo = document.createElement('li');
    todo.classList.add('list-info');
    todo.innerHTML = `
         <div class="check">
    <input type="checkbox">
    <h2>${toDoData[i].description}</h2>
    </div>
    <div class="icon">
    <i class="fa-solid fa-ellipsis-vertical"></i>
    </div>
      `;
    content.appendChild(todo);
  }
};

data();
