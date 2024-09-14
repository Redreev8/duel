export type PropsCircle = {
    radius: number
    context: CanvasRenderingContext2D
    centerX?: number
    centerY?: number
    fillStyle?: string
    strokeStyle?: string
}

export default ({ radius, centerX = radius, centerY = radius, fillStyle, strokeStyle, context }: PropsCircle) => {
    context.beginPath()
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
    if (fillStyle) {
        context.fillStyle = fillStyle
        context.fill()
    }
    if (strokeStyle) {
        context.strokeStyle = strokeStyle
        context.stroke()
    }
}