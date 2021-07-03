import React from 'react'
import bg_dark_img from './assets/images/bg-desktop-dark.jpg'
import bg_light_img from './assets/images/bg-desktop-light.jpg'
import sunIcon from './assets/images/icon-sun.svg'
import moonIcon from './assets/images/icon-moon.svg'
import CheckBox from './CheckBox'
import TodoItems from './TodoItems'
import { useState, useEffect } from 'react'
import { todoItem } from './interfaces'
import { nanoid } from 'nanoid'
import useWindowSize from './useWindowSize'

function App() {
    const [darkMode, setDarkMode] = useState<Boolean>(false)
    const [todoList, setTodoList] = useState<Array<todoItem>>([])
    const [currentItem, setCurrentItem] = useState<todoItem>({
        id: '',
        todo: '',
        isCompleted: false,
    })
    const windowWidth = useWindowSize()

    const toggleMode = () => {
        let rootElement = document.querySelector('#root')
        if (!darkMode) {
            rootElement?.classList.remove('dark')
            return
        }
        rootElement?.classList.add('dark')
    }

    useEffect(() => {
        toggleMode()
    }, [darkMode])

    const onCheckBoxClick = () => {
        setCurrentItem((prevState) => ({
            ...prevState,
            isCompleted: !prevState.isCompleted,
        }))
    }

    const onEnter = (e) => {
        if (e.charCode === 13) {
            if (!currentItem.todo) return
            let id = nanoid(5)
            setTodoList((prevState) => [...prevState, { ...currentItem, id }])
            setCurrentItem({
                ...currentItem,
                id: '',
                isCompleted: false,
                todo: '',
            })
        }
    }

    const markAsCompleted = (idx: Number) => {
        setTodoList((prevState) =>
            prevState.map((todoItem, index) => {
                if (index === idx) {
                    return {
                        ...todoItem,
                        isCompleted: !todoItem.isCompleted,
                    }
                }
                return todoItem
            })
        )
    }

    const clearCompletedTodos = () => {
        setTodoList((prevState) =>
            prevState.filter((todoItem) => !todoItem.isCompleted)
        )
    }

    return (
        <div className="bg-white relative w-full min-h-screen dark:bg-darkBlue">
            <img
                src={!darkMode ? bg_light_img : bg_dark_img}
                alt="background"
                className="w-full object-cover h-40vh"
            />
            <div className="absolute lg:w-2/5 md:w-3/5 sm:w-4/5 w-11/12 inset-x-0 top-0 m-auto">
                <div className="flex justify-between items-start mt-20 mb-8">
                    <p className="text-4xl text-white font-semibold spacing-1">
                        TODO
                    </p>
                    <img
                        src={!darkMode ? moonIcon : sunIcon}
                        alt="sun"
                        className="cursor-pointer"
                        onClick={() => setDarkMode((prevState) => !prevState)}
                    />
                </div>
                <div className="relative shadow-lg">
                    <input
                        type="text"
                        id="enterTodo"
                        value={String(currentItem.todo)}
                        className="w-full py-4 pl-14 pr-14 text-18 rounded dark:bg-desaturatedBlue dark:text-grayishBlue"
                        placeholder="Create a new todo..."
                        onKeyPress={onEnter}
                        onChange={(e) =>
                            setCurrentItem({
                                ...currentItem,
                                todo: e.target.value,
                            })
                        }
                    />
                    <div className="absolute top-0 h-full w-14 flex justify-center items-center">
                        <CheckBox
                            isChecked={currentItem.isCompleted}
                            onCheckBoxClick={onCheckBoxClick}
                        />
                    </div>
                    {/* <div className="absolute top-0 right-0 h-full w-14 flex justify-center items-center cursor-pointer"></div> */}
                </div>
                <TodoItems
                    todoList={todoList}
                    markAsCompleted={markAsCompleted}
                    clearCompletedTodos={clearCompletedTodos}
                    windowWidth={windowWidth}
                />
            </div>
        </div>
    )
}

export default App
