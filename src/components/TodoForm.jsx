import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from '../module/todoform.module.css'

export default function TodoForm() {
    const [todoItem, setTodoItem] = useState('')

    const isTodoItems = localStorage.getItem('todoItems');

    function handleSubmit(e) {
        let todoData = JSON.parse(localStorage.getItem('todoItems')) || [];
        e.preventDefault();
        todoData.push({todoItem: todoItem, isDone: false})
        localStorage.setItem('todoItems', JSON.stringify(todoData))
        console.log(todoData);
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
                    <span className={styles.todoItemsUiPurple}>let</span>
                    <span className={styles.todoItemsUiRed}> todoItems</span>
                    <span className={styles.todoItemsUiBlue}> =</span>
                    <span className={styles.todoItemsUiYellow}> [</span>
                </div>
                <div>
                    {isTodoItems && 
                        <div>
                        
                        </div>
                    }
                </div>
                <div className={styles.todoItemsUiYellow}>]<span style={{color: '#abb2ba'}}>;</span></div>
            </div>
        </div>
    )
}

