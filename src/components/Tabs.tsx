import * as React from 'react'
import { 
    useState, 
    useEffect,
} from 'react'

import './index.scss'

const classNames = require('classnames')

type position =  "left" | "right" | "top" | "bottom"
type size = 'small' | 'default' | 'large'

interface TabsProps {
    defaultActiveIndex?: string,
    type?: 'line' | 'card',
    size?: size,
    tabPosition?: position,
    onChange?: (before: string, after: string) => void,
}

export const Tabs: React.FC<TabsProps> = (props) => {
    const {
        defaultActiveIndex = '1',
        size = 'default',
        type = 'line',
        tabPosition = "top",
        onChange,
    } = props

    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
    useEffect(() => {
        setContentLeft(activeIndex === '1' ? '0' : `-${parseInt(activeIndex) - 1}00%`)
    }, [activeIndex])
    function handleToggle(index: string) {
        setActiveIndex(index)
        if (onChange) onChange(activeIndex, index)
    }
    
    const [contentLeft, setContentLeft] = useState('0')


    const posToDirec = {
        'top': 'column',
        'bottom': 'column-reverse',
        'left': 'row',
        'right': 'row-reverse',
    }
    
    function calcTabDirection(tabPosition: position = 'top'): string {
        return posToDirec[tabPosition]
    }

    function labelContainerClass() {
        return classNames({
            'tab-label-container': true,
            'tab-label-container-left': tabPosition === 'left' || tabPosition === 'right',
            'tab-label-container-card': type === 'card',
        })
    }
    
    function contentContainerClass(index: string) {
        return classNames({
            'tab-content': true,
            'tab-content-active': activeIndex === index
        })
    }

    

    const direction = posToDirec[tabPosition]
    return (
        <div className="tabs" style={{flexDirection: calcTabDirection(tabPosition)}}>
            <div className={labelContainerClass()}>
                {
                    React.Children.map(props.children as React.ReactNode, function (child: any, i) {
                        const {
                            label,
                            children,
                            ...rest
                        } = child.props

                        return <Label onClick={handleToggle} size={size} activeIndex={activeIndex} {...rest}>{label}</Label>
                    })
                }
                {
                    type === 'card' && 
                    <div className="tab-label-plus">
                        <div className="tab-label-icon"><svg t="1590675331645" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1131" width="16" height="16"><path d="M185.89696 532.2752l286.72 0 0 286.72c0 11.32544 9.17504 20.48 20.48 20.48s20.48-9.15456 20.48-20.48l0-286.72 286.72 0c11.30496 0 20.48-9.15456 20.48-20.48s-9.17504-20.48-20.48-20.48l-286.72 0 0-286.72c0-11.32544-9.17504-20.48-20.48-20.48s-20.48 9.15456-20.48 20.48l0 286.72-286.72 0c-11.30496 0-20.48 9.15456-20.48 20.48S174.592 532.2752 185.89696 532.2752z" p-id="1132"></path></svg></div>
                    </div>
                }
            </div>
            <div className="tab-content-container" style={{ marginLeft: contentLeft}}>
                {
                    React.Children.map(props.children as React.ReactNode, function (child: any, i) {
                        const {
                            index,
                            children,
                        } = child.props
                        return <div className={contentContainerClass(index)}>{children}</div>
                    })
                }
            </div>
        </div>
    )
}



interface TabPaneProps {
    label?: string,
    index?: string,
    disabled?: boolean
}

export const TabPane: React.FC<TabPaneProps> = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
} 






// 内部组件
interface LabelProps {
    index: string,
    activeIndex: string,
    onClick: (index: string) => void,
    disabled?: boolean,
    size?: size,
}
const Label: React.FC<LabelProps> = (props) => {
    const {
        size,
        index,
        activeIndex,
        onClick,
        disabled,
        children,
    } = props
    console.log(activeIndex);
    

    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(index === activeIndex)
    }, [activeIndex])

    const innerClass = classNames({
        'tab-label': true,
        'tab-label-active': active,
        'tab-label-disabled': disabled
    })

    const className = `${innerClass} tab-label-${size}`


    function handleClick() {
        if (!disabled) onClick(index)
    }

    return (
        <div className={className} onClick={handleClick}>{children}</div>
    )
}
