import React, { useEffect, useState, useRef } from "react";
import styles from '../module/navterminal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function NavTerminal(props) {
    const terminalCommandLine = 'PS D:\\react-todo> ';
    const { toggleTerminal, setToggleTerminal, handleToggleTerminal } = props
    const toggleTerminalContainer = {
        height: toggleTerminal ? '500px' : '30px'
    }
    
    const textareaRef = useRef(null)
    const [textareaValue, setTextareaValue] = useState('');
    const [newCommand, setNewCommand] = useState(false);
    const [terminalCommandLineIndex, setTerminalCommandLineIndex] = useState(terminalCommandLine)

    useEffect(() => {
        if (toggleTerminal) {
            setTextareaValue(terminalCommandLine)
            textareaRef.current.setSelectionRange(textareaValue.length, textareaValue.length);
        }
    }, [toggleTerminal])

    useEffect(() => {
        if (toggleTerminal && newCommand) {
            setTextareaValue(prevValue => `${prevValue}\n${terminalCommandLine}`)
            setTerminalCommandLineIndex(prevValue => `${prevValue}\n${terminalCommandLine}`)
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
            setNewCommand(false);
        }
    }, [newCommand])

    function handleTerminalSubmit(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            setNewCommand(true);
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