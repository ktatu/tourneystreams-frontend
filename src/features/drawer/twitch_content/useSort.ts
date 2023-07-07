const useSort = <T extends object>(
    sortKey: keyof T,
    sortableArray: Array<T>,
    descendingOrder = false,
    secondarySortKey?: keyof T
) => {
    try {
        sortableArray.sort((objA, objB) => {
            if (objA[sortKey] === objB[sortKey] && secondarySortKey) {
                return objA[secondarySortKey] < objB[secondarySortKey] ? -1 : 1
            }
            return objA[sortKey] < objB[sortKey] ? -1 : 1
        })

        if (descendingOrder) {
            return sortableArray.reverse()
        }

        return sortableArray
    } catch (error: unknown) {
        return sortableArray
    }
}

export default useSort
