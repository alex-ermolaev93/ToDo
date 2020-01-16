import React, { Component } from "react";
import { connect } from "react-redux";

// добовление задач в список
import { addTask, removeTask, completeTask, changeFilter } from "../../actions/actionCreator";

import ToDoInput from "../../components/todo-input/todo-input";
import ToDoList from "../../components/todo-list/todo-list";
import Footer from "../../components/footer/footer";

import "./todo.css";

class ToDo extends Component {
  // создаем handler  для изменения stata , текст задачи
  state = {
    taskText: ""
  };
  // handlerInputChenge будет обновлять этот текст, значением из todo-input
  handlerInputChenge = ({ target: { value } }) => {
    this.setState({
      taskText: value
    });
  };

  addTask = ({ key }) => {
    const { taskText } = this.state;
    // длинна задачи должна быть не мение 3 смиволов, добовмтся по Enter
    if (taskText.length > 3 && key === "Enter") {
      const { addTask } = this.props;
      // передается три аргумента
      addTask(new Date().getTime(), taskText, false);

      this.setState({
        taskText: ""
      });
    }
  };

  filterTasks = (tasks, activeFilter) => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
        break;
      case 'active':
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  }
  // логика для Tasks left 
  getActiveTasksCounter = tasks => tasks.filter(task => !task.isCompleted).length;

  render() {
    // в сторе компонента, теперь хранится текст задач
    const { taskText } = this.state;

    const { tasks, removeTask, completeTask, filters, changeFilter } = this.props;
    // const tasksList = []; // убераем зависимости из компонента TASKS

    const isTasksExist = tasks && tasks.length > 0;
    const filteredTasks = this.filterTasks(tasks, filters);
    const taskCounetr = this.getActiveTasksCounter(tasks);
    return (
      <div className="todo-wrapper">
        {/* метод срабаывает на onKeyPress нажатие клавиши */}
        <ToDoInput onKeyPress={this.addTask} onChange={this.handlerInputChenge} value={taskText} />
        {isTasksExist && <ToDoList tasksList={filteredTasks} completeTask={completeTask} removeTask={removeTask} />}
        {isTasksExist && <Footer changeFilter={changeFilter} amount={taskCounetr} activeFilter={filters} />}
      </div>
    );
  }
}
// оборачиваем компонент ToDo в функцию connect
// сама функция принемает другую функцию  map.state to props (мапит стейт в пропсы)(обычно в отдельном файле)
export default connect(({ tasks, filters }) => ({
  tasks,
  filters,
}), { addTask, removeTask, completeTask, changeFilter })(ToDo);
