import { MouseEvent, useContext, useRef } from 'react'
import { defaultLeftHerro, defaultRightHerro, herroCbMove, HerroSetting } from './figure/heros'
import move from '../../UI/canvas/helper/move'
import { Position } from '../../UI/canvas/figures/type'
import atace from './figure/atace'
import { CounterContext } from '../../UI/counter/counter'
import { PoleProps } from './pole'
import useAtaceGenerate from './useAtaceGenerate'

const usePole = ({ leftSetting, rightSetting }: PoleProps) => {
    const refCnavas = useRef<HTMLCanvasElement>(null)
    const refCordinationCanvasCursor = useRef<Position>({x: 0, y: 0})
    const refLeftMove = useRef<HerroSetting>({
        move: move({ ...defaultLeftHerro }),
        position: defaultLeftHerro.point.start,
        ataces: [],
        prevPosition: defaultLeftHerro.point.start
    })
    const refRightMove = useRef<HerroSetting>({
        move: move({ ...defaultRightHerro }),
        position: defaultRightHerro.point.start,
        ataces: [],
        prevPosition: defaultRightHerro.point.start
    })
    const { setCounter } = useContext(CounterContext)
    useAtaceGenerate({
        setting: leftSetting,
        ref: refLeftMove,
        refCnavas,
        isRevers: false,
        startX: defaultLeftHerro.point.start.x + defaultLeftHerro.radius
    })
    useAtaceGenerate({
        setting: rightSetting,
        ref: refRightMove,
        refCnavas,
        isRevers: true,
        startX: defaultRightHerro.point.start.x - defaultLeftHerro.radius
    })
    const draw = (context: CanvasRenderingContext2D) => {
        context.clearRect(0, 0, refCnavas.current!.clientWidth, refCnavas.current!.clientHeight)
        refLeftMove.current.move({ 
            speed: leftSetting.speed,
            cb: (props) => herroCbMove({ context, refCordinationCanvasCursor, ref: refLeftMove, ...props })
        })
        refRightMove.current.move({ 
            speed: rightSetting.speed,
            cb: (props) => herroCbMove({ context, refCordinationCanvasCursor, ref: refRightMove, ...props })
        })
        atace({
            ataces: refLeftMove.current.ataces,
            context,
            positionVar: refRightMove.current.position,
            onAtace: () => setCounter(prev => [prev[0] + 1, prev[1]])
        })
        atace({
            ataces: refRightMove.current.ataces,
            context,
            positionVar: refLeftMove.current.position,
            onAtace: () => setCounter(prev => [prev[0], prev[1] + 1])
        })
        requestAnimationFrame(() => draw(context))
    }
    const handelMouseMove = (e: MouseEvent) => {
		if (!refCnavas.current) return
		const cordinations = refCnavas.current.getBoundingClientRect()
		refCordinationCanvasCursor.current.x = e.clientX - cordinations.x
		refCordinationCanvasCursor.current.y = e.clientY - cordinations.y
	}
    return { 
        draw,
        handelMouseMove,
        refCnavas
    }
}

export default usePole