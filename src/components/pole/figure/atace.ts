import circle from '../../../UI/canvas/figures/circle'
import { Position } from '../../../UI/canvas/figures/type'
import move, { MoveProps, MoveCb } from '../../../UI/canvas/helper/move'

export interface GenerationAtaceProps extends Omit<MoveProps, 'radius'> {
    ataces: MoveCb[]
}

export const generationAtace = ({ ataces, point, fillStyle = 'red' }: GenerationAtaceProps) => {
    ataces.push(move({ radius: 15, fillStyle, point: point}))
}

interface AtaceProps {
    context: CanvasRenderingContext2D
    ataces: MoveCb[]
    positionVar: Position
    onAtace: () => void
}

export default ({ ataces, context, positionVar, onAtace }: AtaceProps) => {
    for (let i = 0; i < ataces.length; i++) {
        ataces[i]({
            speed: 10, 
            cb: ({ position, point, ...props }) => {
                circle({ context, centerX: position.x, centerY: position.y, ...props })
                if (position.x >= 1180 - 15 || position.x <= 15) {
                    ataces.splice(i, 1);
                }
                if (
                    ((point.start.x < positionVar.x && position.x >= positionVar.x - 30)
                    || (point.start.x > positionVar.x && position.x <= positionVar.x + 30))
                    && position.y + 30 > positionVar.y 
                    && position.y - 30 < positionVar.y
                ) {
                    onAtace()
                    
                    ataces.splice(i, 1);
                }
            }
        })		
    }
}