import { Game, TourneyInfo } from "./types"

const useGameFilter = (tourneyInfoArray: TourneyInfo[]) => {
    const PLACE_HOLDER_GAMES: Game[] = [Game.ApexLegends, Game.Valorant]

    return tourneyInfoArray.filter((tourneyInfo) => PLACE_HOLDER_GAMES.includes(tourneyInfo.game))
}

export default useGameFilter
