export interface todoItem {
    id: String
    todo: String
    isCompleted: Boolean
}

export interface todoList {
    todoList: Array<todoItem>
    markAsCompleted: (idx: Number) => void
    clearCompletedTodos: () => void
    windowWidth: Number
    removeTodo: (idx: Number) => void
}

export interface CheckBoxProps {
    isChecked: Boolean
    onCheckBoxClick?: () => any
}
