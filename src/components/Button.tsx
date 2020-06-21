import React from 'react'
import classNames from 'classnames'
import './index.scss'

interface ButtonPropsType {
    type?: string,
}

export const Button: React.FC<ButtonPropsType> = (props) => {
    const {
        type,
        children,
    } = props
    
    const BtnClassName = (id: string = '1') => {
        const cl = `aka-btn-${id}`
        return classNames({
            'aka-btn': true,
            [cl]: true,
        })
    }
    return (
        <button type="button" className={BtnClassName(type)}>
            <span>{children}</span>
        </button>
    )
}

