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

const colors = {
    purple: '#c678dd',
    red: '#e06c75',
    blue: '#56b6c2',
    yellow: '#d19a66',
    green: '#98c379',
    grey: '#abb2ba',
}

export default function TodoForm(props) {
    let yPosistion = 0;
    let todoArray = JSON.parse(localStorage.getItem('todoItems')) || [];
    const { toggleTerminal, runCommand } = props
    const elementRef = useRef(null);
    const currentHeight = getAndUpdateInnerHeight();
    const [todoItem, setTodoItem] = useState('');
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
                <span style={{color: colors.purple}}>const</span>
                <span style={{color: colors.yellow}}> todoItems</span>
                <span style={{color: colors.blue}}> =</span>
                <span style={{color: colors.yellow}}> [</span>
            </div>
            {todoArray && 
                todoArray.map((todo, todoIndex) => {
                    return (
                        <div style={{paddingLeft: '40px'}} key={todoIndex}>
                            <span style={{color: colors.purple}}>{'{'}</span>
                            <div style={{paddingLeft: '40px'}}>
                                <span style={{color: colors.red}}>todoItem<span style={{color: colors.grey}}>:</span> </span>
                                <span style={{color: colors.green}}>'{todo.todoItem}'<span style={{color: colors.grey}}>,</span></span>
                            </div>
                            <div style={{paddingLeft: '40px'}}>
                                <span style={{color: colors.red}}>isDone<span style={{color: colors.grey}}>:</span> </span>
                                <span style={{color: colors.yellow}}>{`${todo.isDone}`}</span>
                            </div>
                            <span style={{color: colors.purple}}>{'}'}{todoIndex < todoArray.length - 1 && <span style={{color: colors.grey}}>,</span>}</span>
                        </div>
                    )
                })
            }
            <div style={{color: colors.yellow}}>]<span style={{color: colors.grey}}>;</span></div>
        </div>
    </div>
    )
}