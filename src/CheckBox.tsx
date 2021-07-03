import React, { FC, ReactElement } from 'react'
import { CheckBoxProps } from './interfaces'

const CheckBox: FC<CheckBoxProps> = ({
    isChecked,
    onCheckBoxClick,
}): ReactElement => {
    return (
        <div
            className={`checkbox ${
                isChecked && 'checked'
            } dark:border-lightGray`}
            onClick={onCheckBoxClick}
        ></div>
    )
}

export default CheckBox
