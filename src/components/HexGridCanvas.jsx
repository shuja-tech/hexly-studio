import { useEffect, useRef } from 'react'

const HEX_SIZE = 28
const BASE_OPACITY = 0.07
const INTERACTION_RADIUS = 170
const RIPPLE_SPEED = 0.24
const RIPPLE_THICKNESS = 18

function drawHex(ctx, x, y, size, strokeStyle, lineWidth = 1) {
  ctx.beginPath()
  for (let i = 0; i < 6; i += 1) {
    const angle = ((60 * i - 30) * Math.PI) / 180
    const px = x + size * Math.cos(angle)
    const py = y + size * Math.sin(angle)
    if (i === 0) {
      ctx.moveTo(px, py)
    } else {
      ctx.lineTo(px, py)
    }
  }
  ctx.closePath()
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.stroke()
}

export default function HexGridCanvas() {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const cursorRef = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000, active: false })
  const rippleRef = useRef({ radius: 0 })
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let width = 0
    let height = 0
    let dpr = 1
    let centers = []
    let isVisible = true
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const buildGrid = () => {
      centers = []
      const colStep = Math.sqrt(3) * HEX_SIZE
      const rowStep = 1.5 * HEX_SIZE
      let row = 0
      for (let y = HEX_SIZE; y < height + HEX_SIZE; y += rowStep) {
        const rowOffset = row % 2 === 0 ? 0 : colStep / 2
        for (let x = HEX_SIZE + rowOffset; x < width + HEX_SIZE; x += colStep) {
          centers.push({ x, y })
        }
        row += 1
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildGrid()
    }

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      const insideX = event.clientX >= rect.left && event.clientX <= rect.right
      const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom
      if (!insideX || !insideY) {
        onLeave()
        return
      }

      cursorRef.current.tx = event.clientX - rect.left
      cursorRef.current.ty = event.clientY - rect.top
      cursorRef.current.active = true
    }

    const onLeave = () => {
      cursorRef.current.active = false
      cursorRef.current.tx = -1000
      cursorRef.current.ty = -1000
    }

    const render = (time) => {
      const deltaTime = lastTimeRef.current ? time - lastTimeRef.current : 16.7
      lastTimeRef.current = time

      if (!isVisible || reduceMotion) {
        frameRef.current = requestAnimationFrame(render)
        return
      }

      const cursor = cursorRef.current
      cursor.x += (cursor.tx - cursor.x) * 0.08
      cursor.y += (cursor.ty - cursor.y) * 0.08

      if (cursor.active) {
        rippleRef.current.radius += RIPPLE_SPEED * deltaTime
      } else {
        rippleRef.current.radius = 0
      }

      if (rippleRef.current.radius > INTERACTION_RADIUS * 1.2) {
        rippleRef.current.radius = 0
      }

      const parallaxX = ((cursor.x / Math.max(width, 1)) * 2 - 1) * 12
      const parallaxY = ((cursor.y / Math.max(height, 1)) * 2 - 1) * 12

      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.translate(parallaxX, parallaxY)

      for (const center of centers) {
        const dx = center.x - cursor.x
        const dy = center.y - cursor.y
        const distance = Math.hypot(dx, dy)
        const proximity = Math.max(0, 1 - distance / INTERACTION_RADIUS)
        const rippleDistance = Math.abs(distance - rippleRef.current.radius)
        const ripple =
          cursor.active && rippleDistance < RIPPLE_THICKNESS
            ? 1 - rippleDistance / RIPPLE_THICKNESS
            : 0

        const highlight = Math.min(1, proximity * 0.7 + ripple * 0.8)
        const opacity = BASE_OPACITY + highlight * 0.25
        const blue = `rgba(37,99,235,${(highlight * 0.65).toFixed(3)})`
        const gray = `rgba(166,170,186,${opacity.toFixed(3)})`

        if (highlight > 0.05) {
          drawHex(ctx, center.x, center.y, HEX_SIZE, blue, 1.15)
        }
        drawHex(ctx, center.x, center.y, HEX_SIZE, gray, 0.8)
      }

      ctx.restore()
      frameRef.current = requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting)
      },
      { threshold: 0.08 },
    )

    resize()
    observer.observe(canvas)
    frameRef.current = requestAnimationFrame(render)
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave, { passive: true })

    return () => {
      cancelAnimationFrame(frameRef.current)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  )
}
