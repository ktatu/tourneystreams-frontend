const getStreamDimensions = (
    streamCount: number,
    streamIndex: number,
    baseWidth: number,
    baseHeight: number
) => {
    switch (streamCount) {
        case 1:
            return { width: baseWidth, height: baseHeight }
        case 2:
            return { width: baseWidth, height: baseHeight / 2 }
        case 3:
            if (streamIndex === 0) {
                return { width: baseWidth, height: baseHeight / 2 }
            } else {
                return { width: baseWidth / 2, height: baseHeight / 2 }
            }
        case 4:
            return { width: baseWidth / 2, height: baseHeight / 2 }
        case 5:
            if (streamIndex <= 1) {
                return { width: baseWidth / 2, height: baseHeight / 2 }
            } else {
                return { width: baseWidth / 3, height: baseHeight / 2 }
            }
        case 6:
            return { width: baseWidth / 3, height: baseHeight / 2 }
        case 7:
            if (streamIndex <= 3) {
                return { width: baseWidth / 2, height: baseHeight / 3 }
            } else {
                return { width: baseWidth / 3, height: baseHeight / 3 }
            }
        case 8:
            if (streamIndex <= 1) {
                return { width: baseWidth / 2, height: baseHeight / 3 }
            } else {
                return { width: baseWidth / 3, height: baseHeight / 3 }
            }
        default:
            return { width: baseWidth / 3, height: baseHeight / 3 }
    }
}

export default getStreamDimensions
