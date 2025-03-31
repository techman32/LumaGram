'use client'

import {memo, useCallback, useState} from 'react'

const MemButton = memo(Button)

export default function App() {
  const [counter, setCounter] = useState(0)

  const handleInc = useCallback(() => {
    setCounter((prev) => prev + 1)
  }, [setCounter])

  const handleDec = useCallback(() => {
    setCounter((prev) => prev - 1)
  }, [setCounter])

  return (
    <div className="App">
      <h1>{counter}</h1>
      <h2>Start editing to see some magic happen!</h2>
      <MemButton onClick={handleInc} name="increment">
        Inc
      </MemButton>
      <MemButton onClick={handleDec} name="decrement">
        Dec
      </MemButton>
    </div>
  )
}

function Button(props: any) {
  console.count(props.name)
  return <button {...props} />
}
