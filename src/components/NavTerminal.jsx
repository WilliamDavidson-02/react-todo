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
    const [terminalCommandLineIndex, setTerminalCommandLineIndex] = useState(terminalCommandLine)
    const todoArray = JSON.parse(localStorage.getItem('todoItems')) || [];
    const pattern = new RegExp('^run (isDone|isNotDone|edit|delete|clear)\\s+(.*)$')

    useEffect(() => {
        if (toggleTerminal) {
            setTextareaValue(terminalCommandLine)
            textareaRef.current.setSelectionRange(textareaValue.length, textareaValue.length);
        }
    }, [toggleTerminal])

    /* switch statment fo parent pattern check include checking isDone edit item name deleting, clear and defualt invalid command */
    // run isDone drink more water

    useEffect(() => {
        if (toggleTerminal && runCommand) {
            const command = textareaValue.slice(terminalCommandLineIndex.length);
            const commandRegex = pattern.exec(command)
            console.log('command', command, 'commandRegex', commandRegex, '1');
            if (pattern.test(command)) {
                const itemDoneValue = commandRegex[1];
                const itemValue = commandRegex[2].trim();
                console.log(itemDoneValue, itemValue, '2');
                switch (itemDoneValue) {
                    case 'isDone':
                    case 'isNotDone':
                        const indexToUpdate = todoArray.findIndex((element) => itemValue.toLowerCase() === element.todoItem.toLowerCase());
                          
                        if (indexToUpdate !== -1) {
                            const elementToUpdate = todoArray[indexToUpdate];
                            elementToUpdate.isDone = itemDoneValue === 'isDone' ? true : false;
                            localStorage.setItem('todoItems', JSON.stringify(todoArray));
                        } else {
                            setTextareaValue(prevValue => `${prevValue}\n${itemValue} does not exist on the todo list`);
                        }
                        break;
                    case 'edit':
                        console.log(`edit, ${itemValue}`);
                        break;
                    case 'delete':
                        console.log(`delete, ${itemValue}`);
                        break;
                    case 'clear':
                        setTextareaValue('');
                        break;
                    default:
                        console.log(`${itemDoneValue} is a invalid command please enter --help for a list of commands`);
                }
            } else if (command === '--help') {
                setTextareaValue(prevValue => `${prevValue}\n//Todo list commands//\nTemplate -- run {command} {item}\nrun -- always enter this first to run a command\n//Commands//\nisDone -- set item isDone to true\nisNotDone -- set item isDone to false\nedit -- edits the todoItem string\n`)
            } else {
                setTextareaValue(prevValue => `${prevValue}\nInvalid command please enter --help for a list of commands`)
            }
            setTextareaValue(prevValue => `${prevValue}\n${terminalCommandLine}`) // if treminal has bin cleard do not update area here if couses it to go one row down
            console.log('textareaValue:', textareaValue);
            setTerminalCommandLineIndex(`${textareaValue}\n${terminalCommandLine}`) // set new index for new command line including previus textarea value
            console.log('terminalCommandLineIndex:', terminalCommandLineIndex);
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
        e.preventDefault()
        const { value } = e.target
        if (value.indexOf(terminalCommandLineIndex) !== -1) {
            setTextareaValue(value);
          } else {
            setTerminalCommandLineIndex(textareaValue)
            setTextareaValue(textareaValue);
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