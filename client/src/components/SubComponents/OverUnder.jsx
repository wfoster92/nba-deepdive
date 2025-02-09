import { useState, useEffect, useRef, useContext } from 'react'
import { GamesContext } from '../../contexts/GamesContext'
import * as d3 from 'd3'
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

const OverUnder = (props) => {
  const {
    viewportWidth,
    // OU,
    // setOU,
    // ouIsInt,
    // setOuIsInt,
    // fractionalOU,
    // setFractionalOU,
    // currentOverUnder,
  } = useContext(GamesContext)
  const { overUnderObj, setOverUnderObj } = props

  let { currentOverUnder, OU, ouIsInt, fractionalOU } = overUnderObj

  const [dataArr, setDataArr] = useState([])

  const ref = useRef()
  useEffect(() => {
    d3.select(ref.current).selectAll('*').remove()
    if (!currentOverUnder) {
      return
    }
    const keys = Object.keys(currentOverUnder)
      .map((elem) => Number(elem))
      .sort((a, b) => a - b)
    const minScore = keys[0]
    const maxScore = [...keys].pop()
    const maxProb = Math.max(...keys.map((k) => currentOverUnder[k]))
    // console.log(minScore, maxScore)

    setDataArr(
      keys.map((k) => {
        return {
          score: Number(k),
          probability: currentOverUnder[k],
        }
      })
    )
    // set the dimensions and margins of the graph
    const margin = {
      top: viewportWidth * 0.05,
      right: viewportWidth * 0.04,
      bottom: viewportWidth * 0.05,
      left: viewportWidth * 0.08,
    }
    const w =
      viewportWidth <= 750
        ? viewportWidth * 0.88 - margin.left - margin.right
        : viewportWidth * 0.44 - margin.left - margin.right
    const h =
      viewportWidth <= 750
        ? viewportWidth * 0.88 - margin.top - margin.bottom
        : viewportWidth * 0.44 - margin.top - margin.bottom

    // append the svg object to the body of the page
    const svg = d3
      .select('#overUnderBarChart')
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
        d.score === OU && !fractionalOU
          ? '#000'
          : d.score > (ouIsInt && !fractionalOU ? OU : OU + 0.5)
          ? '#080'
          : '#0e0'
      )

    // Add subtitle to graph
    svg
      .append('text')
      .attr('x', 10)
      .attr('y', 0)
      .attr('text-anchor', 'left')
      .style('font-size', '2vh')
      .style('font-weight', 600)
      .style('fill', 'black')
      .style('max-width', 400)
      .text('Over Under')
  }, [overUnderObj, viewportWidth])

  const overProb =
    dataArr
      .filter((elem) => elem.score > (ouIsInt && !fractionalOU ? OU : OU + 0.5))
      .map((elem) => elem.probability)
      .reduce((acc, currentValue) => {
        return acc + currentValue
      }, 0) * 100

  const underProb =
    dataArr
      .filter((elem) => elem.score < (ouIsInt && !fractionalOU ? OU : OU + 0.5))
      .map((elem) => elem.probability)
      .reduce((acc, currentValue) => {
        return acc + currentValue
      }, 0) * 100

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <span>
          Over {ouIsInt && !fractionalOU ? OU : OU + 0.5}: {overProb.toFixed(1)}
          %{'  |  '}
        </span>
        <span>
          Under {ouIsInt && !fractionalOU ? OU : OU + 0.5}:{' '}
          {underProb.toFixed(1)}%
        </span>
      </div>
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
            value={Math.floor(OU)}
            onChange={(event, val) => {
              setOverUnderObj((prevState) => {
                return {
                  ...prevState,
                  OU: val,
                  ouIsInt: true,
                }
              })
              // setOU(val)
              // setOuIsInt(true)
            }}
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
                    checked={fractionalOU}
                    onChange={() => {
                      setOverUnderObj((prevState) => {
                        return {
                          ...prevState,
                          fractionalOU: !prevState.fractionalOU,
                          ouIsInt: true,
                        }
                      })
                      // setFractionalOU(!fractionalOU)
                      // setOuIsInt(true)
                    }}
                  />
                }
                label='Fractional Over Under'
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg
          width={
            viewportWidth <= 750 ? viewportWidth * 0.7 : viewportWidth * 0.45
          }
          height={viewportWidth <= 750 ? viewportWidth : viewportWidth * 0.45}
          id='overUnderBarChart'
          ref={ref}
        />
      </div>
    </>
  )
}

export default OverUnder
