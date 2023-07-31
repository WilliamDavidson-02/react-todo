import React, { useEffect, useState, useRef } from "react";
import styles from '../module/navterminal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function NavTerminal(props) {
    const { toggleTerminal, handleToggleTerminal } = props
    const toggleTerminalContainer = {
        height: toggleTerminal ? '500px' : '30px'
    }
    
    const textareaRef = useRef(null)
    const [textareaValue, setTextareaValue] = useState('');

    useEffect(() => {
        if (toggleTerminal) {
            setTextareaValue('PS D:\\react-todo> ')
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(textareaValue.length, textareaValue.length)
        }
    })

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
                <textarea ref={textareaRef} className={styles.terminalTextarea} cols="30" autoFocus value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)}></textarea>
            }
        </div>
    )
}