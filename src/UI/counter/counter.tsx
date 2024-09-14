import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'
interface CounterProps {
    children: ReactNode
}
type ValueCounterContext = { 
    conuter: [number, number]
    setCounter: Dispatch<SetStateAction<[number, number]>>
}
export const CounterContext = createContext<ValueCounterContext>({ conuter: [0, 0], setCounter: () => {} })

const Counter: FC<CounterProps> = ({ children }) => {
    const [conuter, setCounter] = useState<[number, number]>([0, 0])
    return (
        <CounterContext.Provider value={{conuter, setCounter}}>
            <div className='couter'>
                <div className='couter__row'>
                    { conuter[0] } : { conuter[1] }
                </div>
                <div className='couter__content'>{ children }</div>
            </div>
        </CounterContext.Provider>
    )
}

export default Counter