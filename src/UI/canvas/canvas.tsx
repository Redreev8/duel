import { createContext, forwardRef, HTMLAttributes, useEffect, useRef } from 'react'
export interface CanvasProps extends HTMLAttributes<HTMLCanvasElement>  {
    height: number
    width: number
    className?: string
    draw: (context: CanvasRenderingContext2D) => void
}

export interface CanvasContextValue {

}

export const CanvasContext = createContext<CanvasContextValue>({})

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({className, draw, height, width, ...props}, ref) => {
    const refCanvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!refCanvas.current) return
        const context = refCanvas.current.getContext('2d')
        draw(context!)
        console.log(props);
        
    }, [])
  
    return (
        <canvas className={ className } ref={node => {
            if (!ref && !node) return
            refCanvas.current = node
            if (typeof ref === 'function') {
                ref(node)
                return
            }
            if (typeof ref !== 'object') return
            ref!.current = node
        }} height={height} width={width} { ...props }/>
    )
})

export default Canvas