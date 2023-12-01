import { useState, useEffect, useRef, useContext } from 'react'
import * as d3 from 'd3'
import { GamesContext } from '../contexts/GamesContext'

import styled from '@emotion/styled'
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput'
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Switch,
} from '@mui/material'

// https://d3-graph-gallery.com/graph/barplot_basic.html

const Spread = () => {
  // const { data } = props
  const {
    viewportWidth,
    spread,
    setSpread,
    spreadIsInt,
    setSpreadIsInt,
    fractionalSpread,
    setFractionalSpread,
    currentSpread,
  } = useContext(GamesContext)

  const keys = Object.keys(currentSpread)
    .map((elem) => Number(elem))
    .sort((a, b) => a - b)
  const minScore = keys[0]
  const maxScore = [...keys].pop()
  const maxProb = Math.max(...keys.map((k) => currentSpread[k]))
  console.log(minScore, maxScore)

  let dataArr = keys.map((k) => {
    return {
      score: Number(k),
      probability: currentSpread[k],
    }
  })

  const ref = useRef()
  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove()

    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 30, bottom: 70, left: 60 }
    const w = viewportWidth * 0.45 - margin.left - margin.right
    const h = 600 - margin.top - margin.bottom

    // append the svg object to the body of the page
    const svg = d3
      .select('#spreadBarChart')
      .append('svg')
      .attr('width', w + margin.left + margin.right)
      .attr('height', h + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    // x axis
    const xAxis = d3.scaleLinear().range([0, w]).domain([minScore, maxScore])

    svg
      .append('g')
      .attr('transform', `translate(0, ${h})`)
      .call(d3.axisBottom(xAxis))

    // y axis
    const yAxis = d3.scaleLinear().domain([0, maxProb]).range([h, 0])
    svg.append('g').call(d3.axisLeft(yAxis))

    // Bars
    svg
      .selectAll('mybar')
      .data(dataArr)
      .join('rect')
      .attr('x', (d) => xAxis(d.score))
      .attr('y', (d) => yAxis(d.probability))
      .attr('width', w / (maxScore - minScore + 1)) // Calculate the width of each bar
      .attr('height', (d) => h - yAxis(d.probability))
      .attr('fill', (d) =>
        d.score === spread && !fractionalSpread
          ? '#000'
          : d.score > (spreadIsInt && !fractionalSpread ? spread : spread + 0.5)
          ? '#800'
          : '#e00'
      )
  }, [currentSpread, spread, spreadIsInt, fractionalSpread, viewportWidth])

  const overSpreadProb =
    dataArr
      .filter(
        (elem) =>
          elem.score >
          (spreadIsInt && !fractionalSpread ? spread : spread + 0.5)
      )
      .map((elem) => elem.probability)
      .reduce((acc, currentValue) => {
        return acc + currentValue
      }, 0) * 100

  const underSpreadProb =
    dataArr
      .filter(
        (elem) =>
          elem.score <
          (spreadIsInt && !fractionalSpread ? spread : spread + 0.5)
      )
      .map((elem) => elem.probability)
      .reduce((acc, currentValue) => {
        return acc + currentValue
      }, 0) * 100

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <NumberInput
              aria-label='Demo number input'
              placeholder='Type a number…'
              value={spread}
              onChange={(event, val) => setSpread(val)}
            />
          </div>
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'center',
              marginLeft: '16px',
            }}
          >
            <FormControl component='fieldset' variant='standard'>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={fractionalSpread}
                      onChange={() => {
                        setFractionalSpread(!fractionalSpread)
                        setSpreadIsInt(true)
                      }}
                    />
                  }
                  label='Fractional Spread'
                />
              </FormGroup>
            </FormControl>
          </div>
        </div>
        <div>
          Odds of over{' '}
          {spreadIsInt && !fractionalSpread ? spread : spread + 0.5} are:
          {overSpreadProb.toFixed(1)}%
        </div>
        <div>
          Odds of under{' '}
          {spreadIsInt && !fractionalSpread ? spread : spread + 0.5} are:
          {underSpreadProb.toFixed(1)}%
        </div>
      </div>

      <svg width={1000} height={600} id='spreadBarChart' ref={ref} />
    </>
  )
}

export default Spread
