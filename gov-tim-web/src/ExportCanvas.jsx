import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ExportCanvas() {
    const location = useLocation()
    const [image, setImage] = useState(null)
    
    useEffect(() => {
        const imageData = localStorage.getItem('canvasData')

        console.log("data = ", imageData)
        if (imageData) {
            setImage(imageData)
        }
    }, [location])

    return (
        <div>
            {image && <img src={image} />}
        </div>
    )
}

export default ExportCanvas
