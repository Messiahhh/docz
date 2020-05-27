import * as React from 'react'
import { 
    useState, 
    useEffect,
    useRef,
} from 'react'
import './test.scss'
const classNames = require('classnames')

type flexDirection =  "left" | "right" | "top" | "bottom"


interface TabsProps {
    type?: 'line' | 'card',
    defaultActiveKey?: string,
    onChange?: (index: string) => void,
    tabPosition?: flexDirection,
}

export const Tabs: React.FC<TabsProps> = (props) => {
    const {
        type = 'line',
        tabPosition = "top",
        defaultActiveKey,
        onChange,
    } = props

    // useEffect只在更新时执行操作
    // https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update
    const isInitialMount = useRef(true)

    const [activeKey, setActiveKey] = useState(defaultActiveKey || '1')
    useEffect(() => {
        setContentLeft(activeKey === '1' ? '0' : `-${parseInt(activeKey) - 1}00%`)
        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            if (onChange) onChange(activeKey)
        }
    }, [activeKey])
    function handleToggle(index: string) {
        setActiveKey(index)
    }
    
    const [contentLeft, setContentLeft] = useState('0')

    function calcTabDirection(tabPosition: flexDirection) {
        switch(tabPosition) {
            case "top":
                return "column"
            case "bottom":
                return "column-reverse"
            case "left":
                return "row"
            case "right":
                return "row-reverse"
        }
    }

    function calcLabelDirection(tabPosition: flexDirection) {
        if (tabPosition === 'top' || tabPosition === 'bottom') return 'row'
        return 'column' 
    }

    function labelContainerClass() {
        return classNames({
            'tab-label-container': true,
            'tab-label-container-left': tabPosition === 'left' || tabPosition === 'right',
            'tab-label-container-card': type === 'card',
        })
    }

    function contentClass(key: string) {
        return classNames({
            'tab-content': true,
            'tab-content-active': activeKey === key
        })
    }

    return (
        <div className="tabs" style={{ flexDirection: calcTabDirection(tabPosition)}}>
            <div className={labelContainerClass()}>
                {
                    React.Children.map(props.children as React.ReactNode, function (child: any, i) {
                        const {
                            label,
                            index,
                            children,
                        } = child.props

                        return <Label index={index} activeIndex={activeKey} onClick={handleToggle}>{label}</Label>
                    })
                }
            </div>
            <div className="tab-content-container" style={{ marginLeft: contentLeft}}>
                {
                    React.Children.map(props.children as React.ReactNode, function (child: any, i) {
                        const {
                            label,
                            index,
                            children,
                        } = child.props
                        return <div className={contentClass(index)}>{children}</div>
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
}
const Label: React.FC<LabelProps> = ({
    index,
    activeIndex,
    onClick,
    children,
}) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(index === activeIndex)
    }, [activeIndex])
    
    

    const elClass = classNames({
        'tab-label': true,
        'tab-label-active': active
    })

    return (
        <div className={elClass} onClick={() => onClick(index)}>{children}</div>
    )
}
