const items = localStorage.getItem('tasks') === null
  ? []
  : JSON.parse(localStorage.getItem('tasks'));
export default items;
