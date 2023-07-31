import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from '../module/todoform.module.css'

function getAndUpdateInnerHeight() {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    
    useEffect(() => {
      const handleResize = () => {
        setInnerHeight(window.innerHeight);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
    return innerHeight;
  }

export default function TodoForm(props) {
    let yPosistion = 0;
    const { toggleTerminal } = props
    const elementRef = useRef(null);
    const currentHeight = getAndUpdateInnerHeight();
    const [todoItem, setTodoItem] = useState('');
    const todoArray = JSON.parse(localStorage.getItem('todoItems')) || [];
    const todoItemsContainerHeight = {
        height: toggleTerminal ? `${currentHeight - yPosistion - 750}px` : `${currentHeight - yPosistion - 300}px`
    }

    useEffect(() => {
        if (elementRef.current) {
            yPosistion = elementRef.current.getBoundingClientRect().top;
        }
    }, []);

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
            <div className={styles.todoItemsContainer} style={todoItemsContainerHeight} ref={elementRef}>
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
                                    <span className={styles.todoItemsUiRed}>todoItem<span style={{color: '#abb2ba'}}>:</span> </span>
                                    <span className={styles.todoItemsUiGreen}>'{todo.todoItem}'<span style={{color: '#abb2ba'}}>,</span></span>
                                </div>
                                <div className={styles.todoObjectContainer}>
                                    <span className={styles.todoItemsUiRed}>isDone<span style={{color: '#abb2ba'}}>:</span> </span>
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