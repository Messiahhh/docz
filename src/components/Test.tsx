import React from 'react'

interface PropsType {

}

export const Test: React.FC<PropsType> = (props) => {
    return (
        <div className='contain'>
            <div className="test">
                
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="test"></filter>
                </defs>
            </svg>
        </div>
    )
}