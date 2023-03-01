import { TourneyInfo } from "../../types"

interface TourneyFilterFunction {
    (tourneyInfoArray: Array<TourneyInfo>, filterCondition: any): Array<TourneyInfo>
}

const nameFilter = (tourneyInfoArray: Array<TourneyInfo>, tourneyName: string) => {
    return tourneyInfoArray.filter((tourneyInfo) => tourneyInfo.tourneyName.includes(tourneyName))
}

const gameFilter = (tourneyInfoArray: Array<TourneyInfo>, selectedGames: Set<string>) => {
    return tourneyInfoArray.filter((tourneyInfo) => selectedGames.has(tourneyInfo.game))
}

const mainFilterFunction = (tourneyInfoArray: Array<TourneyInfo>, ...filterFunctions: any) => {}

class Filter {
    filterFunctions: Array<TourneyFilterFunction>

    constructor(...filters: Array<TourneyFilterFunction>) {
        this.filterFunctions = filters
    }
}
