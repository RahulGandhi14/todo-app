import React, { FC, ReactElement } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CheckBox from './CheckBox'
import { todoList } from './interfaces'
import cross from './assets/images/icon-cross.svg'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const TodoItems: FC<todoList> = ({
    todoList,
    markAsCompleted,
    clearCompletedTodos,
    windowWidth,
    removeTodo,
    handleOnDragEnd,
}): ReactElement => {
    const [remainingTodos, setRemainingTodos] = useState<Number>(0)
    const [activeState, setActiveState] = useState<String>('all')

    useEffect(() => {
        let count = 0
        todoList.map((item) => {
            if (!item.isCompleted) count += 1
        })
        setRemainingTodos(count)
    }, [todoList])

    const filters = () => (
        <div className="flex">
            <div
                className={`font-semibold cursor-pointer hover:text-darkGray dark:hover:text-grayishBlue ${
                    activeState === 'all' && 'active'
                }`}
                onClick={() => setActiveState('all')}
            >
                All
            </div>{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div
                className={`font-semibold cursor-pointer hover:text-darkGray dark:hover:text-grayishBlue ${
                    activeState === 'active' && 'active'
                }`}
                onClick={() => setActiveState('active')}
            >
                Active
            </div>{' '}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div
                className={`font-semibold cursor-pointer hover:text-darkGray dark:hover:text-grayishBlue ${
                    activeState === 'completed' && 'active'
                }`}
                onClick={() => setActiveState('completed')}
            >
                Completed
            </div>
        </div>
    )

    return (
        <>
            {todoList.length ? (
                <>
                    <div className="rounded bg-white mt-8 mb-4 shadow-xl dark:bg-desaturatedBlue">
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="todos">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {todoList.map((todoItem, idx) => (
                                            <Draggable
                                                key={todoItem.id}
                                                draggableId={todoItem.id}
                                                index={idx}
                                            >
                                                {(provided) => (
                                                    <>
                                                        {activeState ===
                                                            'all' ||
                                                        (activeState ===
                                                            'active' &&
                                                            !todoItem.isCompleted) ||
                                                        (activeState ===
                                                            'completed' &&
                                                            todoItem.isCompleted) ? (
                                                            <div
                                                                className="relative todoItem dark:border-lightGray "
                                                                id={String(
                                                                    todoItem.id
                                                                )}
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <p
                                                                    className={`w-full py-4 pl-14 pr-14 text-18 cursor-move whitespace-nowrap overflow-ellipsis overflow-hidden text-darkGrayishBlue dark:text-grayishBlue ${
                                                                        todoItem.isCompleted &&
                                                                        'line-through text-opacity-50 dark:text-opacity-40'
                                                                    }`}
                                                                    title={String(
                                                                        todoItem.todo ||
                                                                            ''
                                                                    )}
                                                                    onClick={() =>
                                                                        markAsCompleted(
                                                                            idx
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        todoItem.todo
                                                                    }
                                                                </p>
                                                                <div className="absolute top-0 h-full w-14 flex justify-center items-center">
                                                                    <CheckBox
                                                                        isChecked={
                                                                            todoItem.isCompleted
                                                                        }
                                                                        onCheckBoxClick={() =>
                                                                            markAsCompleted(
                                                                                idx
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div
                                                                    className={`absolute top-0 right-0 flex lightGray h-full w-14 justify-center items-center ${
                                                                        windowWidth >=
                                                                            500 &&
                                                                        'hide'
                                                                    }`}
                                                                >
                                                                    <img
                                                                        src={
                                                                            cross
                                                                        }
                                                                        alt="cross"
                                                                        className="cursor-pointer opacity-50 hover:opacity-100"
                                                                        onClick={() =>
                                                                            removeTodo(
                                                                                idx
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <div className="w-full flex p-4 justify-between text-13 lightGray">
                            <div className="cursor-pointer">
                                {remainingTodos} items left
                            </div>
                            {windowWidth >= 500 && filters()}
                            <div
                                className="cursor-pointer hover:text-darkGray dark:hover:text-grayishBlue"
                                onClick={clearCompletedTodos}
                            >
                                Clear Completed
                            </div>
                        </div>
                    </div>
                    {windowWidth < 500 && (
                        <div className="rounded bg-white p-4 shadow-xl lightGray dark:bg-desaturatedBlue flex justify-center">
                            {filters()}
                        </div>
                    )}
                    {todoList.length >= 2 && (
                        <div className="my-11 text-13 text-center lightGray opacity-75">
                            Drag and drop to reorder list
                        </div>
                    )}
                </>
            ) : null}
        </>
    )
}

export default TodoItems
