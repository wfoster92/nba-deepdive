// GamesContext.js
import React, { createContext, useContext, useState } from 'react'

const GamesContext = createContext()

const GamesProvider = ({ children }) => {
  const [currentSpread, setCurrentSpread] = useState(null)
  const [currentOverUnder, setCurrentOverUnder] = useState(null)
  const [currentGameInfo, setCurrentGameInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allPastGames, setAllPastGames] = useState([])
  const [allFutureGames, setAllFutureGames] = useState([])
  const [currentGame, setCurrentGame] = useState('')
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const [spread, setSpread] = useState(0)
  const [OU, setOU] = useState(0)
  const [ouIsInt, setOuIsInt] = useState(true)
  const [spreadIsInt, setSpreadIsInt] = useState(true)
  const [fractionalOU, setFractionalOU] = useState(false)
  const [fractionalSpread, setFractionalSpread] = useState(false)

  const [allCFBGames, setAllCFBGames] = useState([])
  const [allNBAGames, setAllNBAGames] = useState([])
  const [allNFLGames, setAllNFLGames] = useState([])
  const [allNCAABGames, setAllNCAABGames] = useState([])
  const [gamesObj, setGamesObj] = useState(null)
  const [bestBetsTable, setBestBetsTable] = useState([])

  const state = {
    currentSpread,
    setCurrentSpread,
    currentOverUnder,
    setCurrentOverUnder,
    currentGameInfo,
    setCurrentGameInfo,
    loading,
    setLoading,
    error,
    setError,
    allPastGames,
    setAllPastGames,
    allFutureGames,
    setAllFutureGames,
    currentGame,
    setCurrentGame,
    viewportWidth,
    setViewportWidth,
    spread,
    setSpread,
    OU,
    setOU,
    ouIsInt,
    setOuIsInt,
    spreadIsInt,
    setSpreadIsInt,
    fractionalOU,
    setFractionalOU,
    fractionalSpread,
    setFractionalSpread,
    allCFBGames,
    setAllCFBGames,
    allNBAGames,
    setAllNBAGames,
    allNFLGames,
    setAllNFLGames,
    allNCAABGames,
    setAllNCAABGames,
    gamesObj,
    setGamesObj,
    bestBetsTable,
    setBestBetsTable,
  }

  return <GamesContext.Provider value={state}>{children}</GamesContext.Provider>
}

export { GamesProvider, GamesContext }
