import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK } from '../../constants';
// для получение из локал стореджа 
import { load } from 'redux-localstorage-simple';

let TASKS = load({ namespace: 'todo-list' });

if (!TASKS || !TASKS.tasks || !TASKS.tasks.length) {
  TASKS ={
    tasks: [],
  }
}

const tasks = (state = TASKS.tasks, { id, text, isCompleted, type }) => {
  switch (type) {
    case ADD_TASK:
      return [
        ...state, {
          id,
          text,
          isCompleted,
        }
      ];
    // PEMOVE_TASK обновляем логику на удаление задач 
    case REMOVE_TASK:
      // сравниваем id который получилиб с id  каждой задачи 
      // и возвращяем только не совподения  новый массив без таски id который был передан в  action 
      return [...state].filter(task => task.id !== id);
    case COMPLETE_TASK:
      // передаем экшн id нахдим его свойство, его всойство на противоположногое
      return [...state].map(task => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
        }
        return task;
      })
    default:
      return state;
  }
}
export default tasks;
