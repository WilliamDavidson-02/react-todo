import React, { useEffect, useState, useRef } from "react";
import styles from '../module/navterminal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function NavTerminal(props) {
    const terminalCommandLine = 'PS D:\\react-todo> ';
    const { toggleTerminal, setToggleTerminal, handleToggleTerminal, runCommand, setRunCommand } = props
    const toggleTerminalContainer = {
        height: toggleTerminal ? '500px' : '30px'
    }
    const textareaRef = useRef(null)
    const [textareaValue, setTextareaValue] = useState('');
    const [terminalCommandLineIndex, setTerminalCommandLineIndex] = useState(terminalCommandLine.length)
    const todoArray = JSON.parse(localStorage.getItem('todoItems')) || [];
    const pattern = new RegExp('^run (isDone|isNotDone|edit|delete)\\s+(.*)$')
    
    useEffect(() => {
        if (toggleTerminal) {
            setTextareaValue(terminalCommandLine)
            textareaRef.current.setSelectionRange(textareaValue.length, textareaValue.length);
        }
    }, [toggleTerminal])
    
    useEffect(() => {
        if (toggleTerminal && runCommand) {
            const command = textareaValue.slice(terminalCommandLineIndex);
            const commandRegex = pattern.exec(command)
            const itemDoneValue = commandRegex ? commandRegex[1] : '';
            const itemValue = commandRegex ? commandRegex[2].trim() : '';
            switch (true) {
                case (command === 'help'):
                    setTextareaValue(prevValue => `${prevValue}\n//Todo list commands//\nrun isDone item --> sets todo item to true\nrun isNotDone item --> set todo item to false\nrun edit item --> edits a existing todo items name\nrun delete item --> deletes the todo item\nclear --> clears terminal\nhelp --> list of commands\n`)
                    break;
                case (command === 'clear'):
                    setTextareaValue('');
                    break;
                case pattern.test(command): {
                    const indexToUpdate = todoArray.findIndex((element) => itemValue.slice(0, element.todoItem.length).toLowerCase().trim() === element.todoItem.toLowerCase().trim());
                    const elementToUpdate = todoArray[indexToUpdate];
                    switch (itemDoneValue) {
                        case 'isDone':
                        case 'isNotDone':
                            if (indexToUpdate !== -1) {
                                setTextareaValue(prevValue => `${prevValue}\n> ${elementToUpdate.todoItem} ${itemDoneValue}\n`)
                                elementToUpdate.isDone = itemDoneValue === 'isDone' ? true : false;
                                localStorage.setItem('todoItems', JSON.stringify(todoArray));
                            } else {
                                setTextareaValue(prevValue => `${prevValue}\n${itemValue} does not exist on the todo list\n`);
                            }
                            break;
                        case 'edit':
                            const sliceNum = indexToUpdate !== -1 ? elementToUpdate.todoItem.length : 0;
                            const value = itemValue.slice(sliceNum).trim()
                            if (indexToUpdate !== -1 && value !== '') {
                                setTextareaValue(prevValue => `${prevValue}\n> ${elementToUpdate.todoItem} is now ${value}\n`)
                                elementToUpdate.todoItem = value;
                                localStorage.setItem('todoItems', JSON.stringify(todoArray));
                            } else {
                                setTextareaValue(prevValue => `${prevValue}\n> no matching value exist or entered\n`);
                            }
                            break;
                        case 'delete':
                            if (indexToUpdate !== -1) {
                                setTextareaValue(prevValue => `${prevValue}\n> ${elementToUpdate.todoItem} is now deleted\n`)
                                todoArray.splice(indexToUpdate, 1);
                                localStorage.setItem('todoItems', JSON.stringify(todoArray))
                            } else {
                                setTextareaValue(prevValue => `${prevValue}\n${itemValue} does not exist on the todo list\n`);
                            }
                            break;
                    }
                    break;
                }
                default:
                    setTextareaValue(prevValue => `${prevValue}\nInvalid command please enter "help" for a list of commands\n`)
            }
            setTextareaValue(prevValue => `${prevValue}${terminalCommandLine}`)
            setTerminalCommandLineIndex((prevValue) => prevValue.length + terminalCommandLine.length);
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
            setRunCommand(false);
        }
    }, [runCommand])

    function handleTerminalSubmit(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            setRunCommand(true);
        }
        if (e.keyCode === 27 && toggleTerminal) {
            setToggleTerminal(false);
        }
    }

    function handleTextareaChange(e) {
        e.preventDefault();
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        const { value } = e.target;
        if (value.lastIndexOf(terminalCommandLine) >= 0) {
            setTextareaValue(value);
            setTerminalCommandLineIndex(value.lastIndexOf(terminalCommandLine) + terminalCommandLine.length);
        }
    }

    return (
        <div className={styles.navTerminalContainer} style={toggleTerminalContainer}>
            <div className={styles.powerShellContainer}>
                <img src="src/assets/powerShellLogo.svg" className={styles.powerShellLogo} />
                <div className={styles.favconIconContainer}>
                    {toggleTerminal ? (
                        <FontAwesomeIcon icon={faChevronDown} className={styles.favIcon} onClick={handleToggleTerminal}/>
                        ) : (
                        <FontAwesomeIcon icon={faChevronUp} className={styles.favIcon} onClick={handleToggleTerminal}/>
                    )}
                </div>
            </div>
            {toggleTerminal && 
                <textarea ref={textareaRef} className={styles.terminalTextarea} cols="30" autoFocus value={textareaValue} onChange={handleTextareaChange} onKeyDown={handleTerminalSubmit} spellCheck='false'></textarea>
            }
        </div>
    )
}