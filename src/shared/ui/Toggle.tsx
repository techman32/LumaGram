import { useState } from 'react'

export default function Toggle() {
  const [checked, setChecked] = useState(false)

  return (
    <label htmlFor="toggle" className="relative inline-block w-14 h-8 cursor-pointer">
      <input type="checkbox" id="toggle" className="sr-only" checked={checked} onChange={() => setChecked(!checked)} />
      <span
        className={`block w-full h-full rounded-full transition-colors duration-300 ${
          checked ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-white/10'
        }`}
      ></span>
      <span
        className={`absolute left-1 top-1 w-6 h-6 bg-white dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? 'translate-x-6' : ''
        }`}
      ></span>
    </label>
  )
}
