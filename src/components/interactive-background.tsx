import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
      }
    }

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(
          createParticle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        )
      }
    }

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.005

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.1
          particle.vy += (dy / distance) * force * 0.1
        }

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Reset if dead
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.vx = (Math.random() - 0.5) * 2
          particle.vy = (Math.random() - 0.5) * 2
          particle.life = 1
        }
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (120 - distance) / 120 * 0.3
            ctx.strokeStyle = `hsla(210, 100%, 56%, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.fillStyle = `hsla(210, 100%, 56%, ${particle.life * 0.8})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.shadowColor = "hsl(210, 100%, 56%)"
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        mouseRef.current.x = touch.clientX
        mouseRef.current.y = touch.clientY
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        mouseRef.current.x = touch.clientX
        mouseRef.current.y = touch.clientY
      }
    }

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    // Initialize
    resizeCanvas()
    initParticles()
    animate()

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  )
}