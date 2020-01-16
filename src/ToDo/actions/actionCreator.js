// экшн создания задачи 

// это функция принемает определенные прараметры и возвращает новый объект созданный из этих аргументов 

// обновляем экшн с константой 
import {ADD_TASK, REMOVE_TASK, COMPLETE_TASK,CHANGE_FILTER} from '../../constants';


export const addTask = (id, text, isCompleted) =>({
    // тип экшина
    type: ADD_TASK,
    id,
    text,
    isCompleted,
});

// action для удаления задач

export const removeTask = (id) => ({
    type: REMOVE_TASK,
    id
});
// отметка выполнено

export const completeTask = (id) => ({
    type: COMPLETE_TASK,
    id
});

// фильтр
export const changeFilter = (activeFilter) =>({
    type: CHANGE_FILTER,
    activeFilter,
})
