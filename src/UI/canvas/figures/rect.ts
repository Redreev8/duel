type PropsCircle = {
    context: CanvasRenderingContext2D
    width: number
    height?: number
    x?: number
    y?: number
    fillStyle?: string
    strokeStyle?: string
}

export default ({ context, x = 0, y = 0, width, height=width, fillStyle, strokeStyle }: PropsCircle) => {
    context.beginPath()
    context.rect(x, y, width, height)
    if (fillStyle) {
        context.fillStyle = fillStyle
        context.fill()
    }
    if (strokeStyle) {
        context.strokeStyle = strokeStyle
        context.stroke()
    }
}