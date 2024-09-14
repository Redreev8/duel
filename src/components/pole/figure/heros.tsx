import { MutableRefObject } from 'react'
import Circle from '../../../UI/canvas/figures/circle'
import { Position } from '../../../UI/canvas/figures/type'
import move, { CbProps, MoveCb, MoveProps } from '../../../UI/canvas/helper/move'

export const defaultLeftHerro = {
    point: {
        start: {
            x: 56,
            y: 28
        },
        end: {
            x: 56,
            y: 552
        }
    },
    radius: 28,
    fillStyle: 'black',
}
export const defaultRightHerro = {
    point: {
        start: {
            x: 1124,
            y: 552
        },
        end: {
            x: 1124,
            y: 60
        }
    },
    radius: 28,
    fillStyle: 'black',
}

export interface HerroSetting {
    move: MoveCb
    position: Position
    prevPosition: Position
    ataces: MoveCb[]
}

export const Herro = (props: MoveProps) => move(props)

export interface HerroCbMoveProps extends CbProps {
    context: CanvasRenderingContext2D
    refCordinationCanvasCursor: MutableRefObject<Position>
    ref: MutableRefObject<HerroSetting>
}

export const herroCbMove =  ({context, refCordinationCanvasCursor, position, radius, step, ref,  ...props}: HerroCbMoveProps) => {
    Circle({ radius, centerX: position.x, centerY: position.y, ...props, context: context })
    const xCursor = refCordinationCanvasCursor.current.x
    const yCursor = refCordinationCanvasCursor.current.y
    ref.current.prevPosition = { ...ref.current.position }
    ref.current.position = {
        x: position.x,
        y: position.y,
    }
    if (
        xCursor !== 0 && 
        xCursor <= position.x + radius && 
        xCursor >= position.x - radius && 
        position.y - radius >= yCursor + 1 &&
        position.y + radius <= yCursor - 1
    ) {
        step.y *= 0        
    }
    if (
        xCursor !== 0 && 
        xCursor <= position.x + radius && 
        xCursor >= position.x - radius && 
        position.y - radius < yCursor + 1 &&
        position.y + radius > yCursor - 1
    ) {
        step.y *= -1         
    }
}
