import { Suspense, useState } from 'react'
import styles from './module/app.module.css'
import ErrorBoundary from './ErrorBoundary'
import TodoForm from './components/TodoForm'
import NavTerminal from './components/navTerminal'

export default function App() {
  const [toggleTerminal, setToggleTerminal] = useState(false)

  function handleToggleTerminal() {
    setToggleTerminal(prevState => !prevState);
  }

  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <Suspense fallback={<div className={styles.loading}><img src='src/assets/Infinity-1.5s-200px.svg'/></div>}>
        <div className={styles.todoContainer}>
          <TodoForm toggleTerminal={toggleTerminal}/>
          <NavTerminal toggleTerminal={toggleTerminal} handleToggleTerminal={handleToggleTerminal}/>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}