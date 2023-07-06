import { Suspense, useState } from 'react'
import styles from './module/app.module.css'
import ErrorBoundary from './ErrorBoundary'
import TodoForm from './components/TodoForm'

export default function App() {

  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <Suspense fallback={<div className={styles.loading}><img src='src/assets/Infinity-1.5s-200px.svg'/></div>}>
        <div className={styles.todoContainer}>
          <TodoForm />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}