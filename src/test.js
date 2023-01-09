

const propArr = ["test", "test", "test", "test", "test", "test", "test", "test", "test", "test"]

const redArray = propArr.reduce((prevValue, currValue, currIndex) => {
    if (currIndex % 3 === 0) {
        return prevValue.concat([currIndex])
    }
}, [])