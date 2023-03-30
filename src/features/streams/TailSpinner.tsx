import React from "react"
import "./TailSpinner.css"

interface TailSpinnerProps {
    color: string
    spinnerWidth: string
    containerWidth: string
    containerHeight: string
}

const TailSpinner: React.FC<TailSpinnerProps> = ({
    color,
    spinnerWidth,
    containerWidth,
    containerHeight,
}) => {
    const spinnerStyle: React.CSSProperties = {
        borderTopColor: color,
        borderTopWidth: spinnerWidth,
    }

    const containerStyle: React.CSSProperties = {
        width: containerWidth,
        height: containerHeight,
    }

    return (
        <div
            className="tail-spinner-container"
            style={containerStyle}
        >
            <div
                className="tail-spinner"
                style={spinnerStyle}
            ></div>
        </div>
    )
}

export default TailSpinner
