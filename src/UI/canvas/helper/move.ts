import { PropsCircle } from '../figures/circle'
import { Position } from '../figures/type'

export interface MoveProps extends Omit<PropsCircle, 'centerX' | 'centerY' | 'context'> {
    point: {
        start: Position
        end: Position
    }
}
export interface CbProps extends MoveProps {
    position: Position
    step: Position
}
export interface MoveCbProps {
    speed: number
    cb: (props: CbProps) => void
}
export type MoveCb = (obj: MoveCbProps) => void
const normalize = (v: Position) => {
    const length = Math.sqrt(v.x * v.x + v.y * v.y)
    
    return {x: (v.x / length), y: v.y / length}
}
export default ({ radius, fillStyle, strokeStyle, point }: MoveProps) => {
    let position: Position = { x: point.start.x, y: point.start.y, }
    const isHorizont = point.end.x !== point.start.x
    const isVerticle = point.end.y !== point.start.y
    const isHorizontMoveLeft = point.end.x >= point.start.x
    const isVerticleMoveTop = point.end.y >= point.start.y
    let step = normalize({ 
        x: isHorizont ? point.end.x - position.x : 0, 
        y: isVerticle ? point.end.y - position.y : 0 
    })
    return ({ speed = 1, cb } : MoveCbProps) => {
        
        cb({ radius, fillStyle, strokeStyle, point, position, step }) 
        position.x += step.x * speed
        position.y += step.y * speed

        if (isHorizont && isHorizontMoveLeft && (position.x <= point.start.x || position.x >= point.end.x) ) step.x *=-1
        if (isHorizont && !isHorizontMoveLeft && (position.x >= point.start.x || position.x <= point.end.x) ) step.x *=-1
        if (isVerticle && isVerticleMoveTop && (position.y <= point.start.y || position.y >= point.end.y) ) step.y *=-1
        if (isVerticle && !isVerticleMoveTop && (position.y >= point.start.y || position.y <= point.end.y) ) step.y *=-1
    }
}