// GamesContext.js
import React, { createContext, useContext, useState } from 'react'

const GamesContext = createContext()

const GamesProvider = ({ children }) => {
  // const [currentGameInfo, setCurrentGameInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // const [currentGame, setCurrentGame] = useState('')
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth - 1)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight - 1)

  const [allCFBGames, setAllCFBGames] = useState([])
  const [allNBAGames, setAllNBAGames] = useState([])
  const [allNFLGames, setAllNFLGames] = useState([])
  const [allNHLGames, setAllNHLGames] = useState([])
  const [allNCAABGames, setAllNCAABGames] = useState([])
  // const [gamesObj, setGamesObj] = useState(null)
  const [betLegsTable, setBetLegsTable] = useState([])
  const [rankingsTable, setRankingsTable] = useState([])
  const [searchStrRankings, setSearchStrRankings] = useState('')
  const rankingsTables = ['nba', 'ncaab', 'ncaaf', 'nfl', 'nhl']
  const [selectedRankingsTable, setSelectedRankingsTable] = useState('nfl')

  const [heatmapData, setHeatmapData] = useState([])
  const allHeatmapTypes = ['moneyLine', 'overUnder', 'spread']
  const [selectedSport, setSelectedSport] = useState('')
  const [rankingsDate, setRankingsDate] = useState('')

  const state = {
    // currentGameInfo,
    // setCurrentGameInfo,
    loading,
    setLoading,
    error,
    setError,
    // currentGame,
    // setCurrentGame,
    viewportWidth,
    setViewportWidth,
    allCFBGames,
    setAllCFBGames,
    allNBAGames,
    setAllNBAGames,
    allNFLGames,
    setAllNFLGames,
    allNCAABGames,
    setAllNCAABGames,
    allNHLGames,
    setAllNHLGames,
    // gamesObj,
    // setGamesObj,
    betLegsTable,
    setBetLegsTable,
    rankingsTable,
    setRankingsTable,
    searchStrRankings,
    setSearchStrRankings,
    selectedRankingsTable,
    setSelectedRankingsTable,
    rankingsTables,
    heatmapData,
    setHeatmapData,
    // selectedHeatmapType,
    // setSelectedHeatmapType,
    allHeatmapTypes,
    selectedSport,
    setSelectedSport,
    rankingsDate,
    setRankingsDate,
    viewportHeight,
    setViewportHeight,
  }

  return <GamesContext.Provider value={state}>{children}</GamesContext.Provider>
}

export { GamesProvider, GamesContext }
