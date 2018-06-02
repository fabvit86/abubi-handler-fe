'use strict'

const data = 
    [
      {
        "date": "2018-05-01",
        "entrances": {
          "K": ["09:44:10", "10:30:10", "11:21:10"],
          "P": ["09:00:10", "09:21:10"],
          "F": ["09:43:10", "10:00:00", "10:00:39"]
        }
      },
      {
        "date": "2018-05-02",
        "entrances": {
          "K": ["09:10:10", "10:01:20", "10:12:10", "11:55:10"],
          "P": ["09:27:10", "11:36:10"],
          "F": ["09:41:10", "10:44:10", "11:44:10"]
        }
      }
    ]

let max = 0
let entrancesByHour = {}
entrancesByHour.K = {"values": {"h9_10": 0, "h10_11": 0, "h11_12": 0, "h12_13": 0, "h13_14": 0, "h14_15": 0, 
          "h15_16": 0, "h16_17": 0, "h17_18": 0, "h18_19": 0}}
entrancesByHour.P = {"values": {"h9_10": 0, "h10_11": 0, "h11_12": 0, "h12_13": 0, "h13_14": 0, "h14_15": 0, 
          "h15_16": 0, "h16_17": 0, "h17_18": 0, "h18_19": 0}}
entrancesByHour.F = {"values": {"h9_10": 0, "h10_11": 0, "h11_12": 0, "h12_13": 0, "h13_14": 0, "h14_15": 0, 
          "h15_16": 0, "h16_17": 0, "h17_18": 0, "h18_19": 0}}

data.forEach(entranceObj => {
  // date, entrances object of given day
  console.log("entranceObj = ", entranceObj)
  scanUserEntrances(entranceObj, "K")
  scanUserEntrances(entranceObj, "P")
  scanUserEntrances(entranceObj, "F")
})

// scan all entrances of a given user:
function scanUserEntrances(entranceObj, key) {
  entranceObj.entrances[key].forEach(entranceK => {
    // console.log("entrance user",key," = ", entranceK)
    const entranceDateK = new Date(entranceObj.date + " " + entranceK)
    checkHour(entranceDateK, key, entranceObj.date)
  })
}

// increment counter for the given user on the given hour range:
function checkHour(entranceDate, key, date) {
  const hour10Date = new Date(date + " 10:00:000")
  const hour11Date = new Date(date + " 11:00:000")
  const hour12Date = new Date(date + " 12:00:000")
  const hour13Date = new Date(date + " 13:00:000")
  const hour14Date = new Date(date + " 14:00:000")
  const hour15Date = new Date(date + " 15:00:000")
  const hour16Date = new Date(date + " 16:00:000")
  const hour17Date = new Date(date + " 17:00:000")
  const hour18Date = new Date(date + " 18:00:000")
  const hour19Date = new Date(date + " 19:00:000")
  // console.log("key = ", key, "input entranceDate =", entranceDate)
  if(entranceDate < hour10Date) {
    entrancesByHour[key].values.h9_10++
    if(max < entrancesByHour[key].values.h9_10) max++
  }else if(entranceDate < hour11Date) {
    entrancesByHour[key].values.h10_11++
    if(max < entrancesByHour[key].values.h10_11) max++
  }else if(entranceDate < hour12Date) {
    entrancesByHour[key].values.h11_12++
    if(max < entrancesByHour[key].values.h11_12) max++
  }
}

console.log("entrancesByHour = ",JSON.stringify(entrancesByHour))
console.log("max = ",max)
/*
const entrancesByHour =
  [
    {
      "K": {
        "values": {
          "9_10": 3,
          "10_11": 7,
          "11_12": 5
        }
      },
      "P": {
        "values": {
          "9_10": 3,
          "10_11": 7,
          "11_12": 5
        }
      },
      "F": {
        "values": {
          "9_10": 3,
          "10_11": 7,
          "11_12": 5
        }
      }
    }
  ]*/

const margins = {top: 20, right: 20, bottom: 60, left: 120}
const chartHeight = 600 - margins.top - margins.bottom
const chartWidth = 1000 - margins.left - margins.right
const xRange = ["09-10", "10-11", "11-12", "12-13", "13-14", 
"14-15", "15-16", "16-17", "17-18", "18-19"]
// x scale (years):
const x = d3.scaleLinear().domain([1, xRange.length]).range([0, chartWidth])

// y scale (gross values):
const y = d3.scaleLinear().domain([0, max]).range([chartHeight, 0]) 

// svg chart:
const svgchart = d3.select('#svgchart') // select the svg element
  .attr("width", chartWidth + margins.left + margins.right) // set the width of the chart
  .attr("height", chartHeight + margins.top + margins.bottom) // set the height of the chart
  .append("g") // add this g to set left and top margins
  .attr("transform", "translate(" + margins.left + "," + margins.top + ")")

const bar = svgchart.selectAll("g") // each bar is a g element
  .data(entrancesByHour)
.enter().append("g")
  .attr("transform", (d, i) => "translate(" + i * barWidth + ", 0)" ) // translate the g element horizontally

//x axis line:
const xAxis = svgchart.append('g')
  .classed("x-axis", true)
  .attr("transform", "translate(0," + chartHeight + ")") // put the g on the bottom
  .call(d3.axisBottom(x).tickFormat((i)=>xRange[i-1])) // call d3.axisBottom(x) on the g, to generate the axis within the g

//y axis line:
const yAxis = svgchart.append('g')
  .classed("y-axis", true)
  .call(d3.axisLeft(y))
xAxis.selectAll("text").style("text-anchor", "middle") // center x axis ticks' text
