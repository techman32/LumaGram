'use client'
import ButtonDropdown from '@/shared/ui/ButtonDropdown'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

type DropdownProps<T> = {
  list: T[]
  selected: T
  displayKey: keyof T
  valueKey: keyof T
  handleChoice: (value: string) => void
}

export default function Dropdown<T>({ list, selected, displayKey, valueKey, handleChoice }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const getOptionProp = (option: T, key: keyof T) => {
    return String(option[key])
  }

  const handleOptionChange = (key: string) => {
    handleChoice(key)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={selectRef}>
      <ButtonDropdown
        block={true}
        onClick={(event) => {
          event.preventDefault()
          setIsOpen(!isOpen)
        }}
      >
        {getOptionProp(selected, displayKey)}
      </ButtonDropdown>
      {isOpen && (
        <ul className="absolute left-0 w-full min-w-[120px] bottom-full mb-1 bg-white dark:bg-black overflow-hidden border border-gray-200 dark:border-white/10 rounded-md shadow-lg z-50">
          {list.map((item) => (
            <li key={getOptionProp(item, valueKey)}>
              <button
                className={cn('cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10', {
                  'bg-gray-100 dark:bg-white/10': getOptionProp(item, valueKey) === getOptionProp(selected, valueKey),
                })}
                disabled={getOptionProp(item, valueKey) === getOptionProp(selected, valueKey)}
                onClick={(event) => {
                  event.preventDefault()
                  handleOptionChange(getOptionProp(item, valueKey))
                }}
              >
                {getOptionProp(item, displayKey)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
