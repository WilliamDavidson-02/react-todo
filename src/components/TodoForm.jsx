import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from '../module/todoform.module.css'

export default function TodoForm() {
    const [todoItem, setTodoItem] = useState('')

    const todoArray = JSON.parse(localStorage.getItem('todoItems')) || [];

    function handleSubmit(e) {
        e.preventDefault();
        if (todoItem != '') {
            todoArray.push({todoItem: todoItem, isDone: false})
            localStorage.setItem('todoItems', JSON.stringify(todoArray))
        }
        setTodoItem('')
    }

    return (
        <div className={styles.mainContainer}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <input className={styles.todoInput} placeholder='// New Todo' value={todoItem} onChange={(e) => setTodoItem(e.target.value)}/>
                <button className={styles.submitTodoBtn} type="submit"><FontAwesomeIcon icon={faPlus}/></button>
            </form>
            <div className={styles.todoItemsContainer}>
                <div>
                    <span className={styles.todoItemsUiPurple}>const</span>
                    <span className={styles.todoItemsUiYellow}> todoItems</span>
                    <span className={styles.todoItemsUiBlue}> =</span>
                    <span className={styles.todoItemsUiYellow}> [</span>
                </div>
                {todoArray && 
                    todoArray.map((todo, todoIndex) => {
                        return (
                            <div className={styles.todoObjectContainer} key={todoIndex}>
                                <span className={styles.todoItemsUiPurple}>{'{'}</span>
                                <div className={styles.todoObjectContainer}>
                                    <span className={styles.todoItemsUiRed}>todoItem: </span>
                                    <span className={styles.todoItemsUiGreen}>'{todo.todoItem}'<span style={{color: '#abb2ba'}}>,</span></span>
                                </div>
                                <div className={styles.todoObjectContainer}>
                                    <span className={styles.todoItemsUiRed}>isDone: </span>
                                    <span className={styles.todoItemsUiYellow}>{`${todo.isDone}`}</span>
                                </div>
                                <span className={styles.todoItemsUiPurple}>{'}'}{todoIndex < todoArray.length - 1 && <span style={{color: '#abb2ba'}}>,</span>}</span>
                            </div>
                        )
                    })
                }
                <div className={styles.todoItemsUiYellow}>]<span style={{color: '#abb2ba'}}>;</span></div>
            </div>
        </div>
    )
}