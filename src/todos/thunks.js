import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure, createTodo, removeTodo, markCompleted } from "./actions";

export const loadTodos = () => async (dispatch, getState) => {
    try{
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();
        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        console.log("failed");
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const addTodoRequest = text => async dispatch => {
    try{
        const body = JSON.stringify({text});
        const response = await fetch("http://localhost:8080/todos", {
            headers:{
                "Content-Type" : "application/json",
            },
            method: "post",
            body,
        });

        const todo = await response.json();
        console.log(todo);
        dispatch(createTodo(todo));
    } catch (e){
        dispatch(displayAlert(e));
    }
}

export const removeTodoRequest = id => async dispatch => {
    try{    
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: "delete"
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    }catch (e){
        dispatch(displayAlert(e));
    }
}

export const markCompleteRequest = id => async dispatch => {
    try{
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: "post"
        });
        const completedTodo = await response.json();
        dispatch(markCompleted(completedTodo));
    }catch (e){
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
}