import { useState, useRef, useEffect } from 'react'
import { Button } from "@codegouvfr/react-dsfr/Button"
import { useNavigate } from 'react-router-dom'

function Notes() {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const inputRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        const input = inputRef.current
        const ctx = canvas.getContext('2d')
        const containerWidth = container.offsetWidth
        canvas.width = containerWidth / 2
        input.width = containerWidth / 2
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const canvasData = localStorage.getItem('canvasData')
        if (canvasData) {
            const image = new Image()
            image.src = canvasData
            image.onload = function() {
                const canvas = canvasRef.current
                const ctx = canvas.getContext('2d')
                ctx.fillStyle = 'white'
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(image, 0, 0)
            }
        }
        const inputData = localStorage.getItem('inputData')
        if (inputData) {
            input.value = inputData
        } else {
            input.value = "notes"
        }
        
        return () => {
            const canvasData = canvas.toDataURL()
            localStorage.setItem('canvasData', canvasData)
            const inputData = input.value
            localStorage.setItem('inputData', inputData)
        }
    }, [])

    const startDrawing = (e) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        setIsDrawing(true)
    }
    const stopDrawing = () => {
        setIsDrawing(false)
    }
    const draw = (e) => {
        if (isDrawing == false) {
            return
        }
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        ctx.stroke()
    }
    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    const downloadCanvas = () => {
        const canvas = canvasRef.current
        navigate("/export_image")
    }
    
    return <div style={{width: "100%"}}>
               <Button onClick={() => {clearCanvas()}}>Clear</Button>
               <Button onClick={() => {downloadCanvas()}}>Download</Button>
               <div ref={containerRef}
                    style={{
                        display: "flex",
                        width: "100%"
                    }}>
                   <canvas
                       ref={canvasRef}
                       height={800}
                       onMouseDown={startDrawing}
                       onMouseMove={draw}
                       onMouseUp={stopDrawing}
                       onMouseLeave={stopDrawing}
                       style={{ border: '1px solid black' }} />
                   <textarea
                       ref={inputRef}
                       type={"text"}
                       height={800}
                       style={{ border: '1px solid black',
                                width: "100%",
                                textAlign: "left",
                                verticalAlign: "top"
                              }}/>
               </div>
           </div>
}

export default Notes
