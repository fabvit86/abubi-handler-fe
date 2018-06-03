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
entrancesByHour.K = {"values": {"h08_09":0, "h09_10": 0, "h10_11": 0, "h11_12": 0, "h12_13": 0, "h13_14": 0, "h14_15": 0, 
          "h15_16": 0, "h16_17": 0, "h17_18": 0, "h18_19": 0}}
entrancesByHour.P = {"values": {"h08_09":0, "h09_10": 0, "h10_11": 0, "h11_12": 0, "h12_13": 0, "h13_14": 0, "h14_15": 0, 
          "h15_16": 0, "h16_17": 0, "h17_18": 0, "h18_19": 0}}
entrancesByHour.F = {"values": {"h08_09":0, "h09_10": 0, "h10_11": 0, "h11_12": 0, "h12_13": 0, "h13_14": 0, "h14_15": 0, 
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
    const entranceDateK = new Date(entranceObj.date + " " + entranceK)
    checkHour(entranceDateK, key, entranceObj.date)
  })
}

// increment counter for the given user on the given hour range:
function checkHour(entranceDate, key, date) {
  const hour09Date = new Date(date + " 09:00:000")
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
  if(entranceDate < hour09Date) {
    entrancesByHour[key].values.h08_09++
    if(max < entrancesByHour[key].values.h08_09) max++
  }else if(entranceDate < hour10Date) {
    entrancesByHour[key].values.h09_10++
    if(max < entrancesByHour[key].values.h09_10) max++
  }else if(entranceDate < hour11Date) {
    entrancesByHour[key].values.h10_11++
    if(max < entrancesByHour[key].values.h10_11) max++
  }else if(entranceDate < hour12Date) {
    entrancesByHour[key].values.h11_12++
    if(max < entrancesByHour[key].values.h11_12) max++
  }else if(entranceDate < hour13Date) {
    entrancesByHour[key].values.h12_13++
    if(max < entrancesByHour[key].values.h12_13) max++
  }else if(entranceDate < hour14Date) {
    entrancesByHour[key].values.h13_14++
    if(max < entrancesByHour[key].values.h13_14) max++
  }else if(entranceDate < hour15Date) {
    entrancesByHour[key].values.h14_15++
    if(max < entrancesByHour[key].values.h14_15) max++
  }else if(entranceDate < hour16Date) {
    entrancesByHour[key].values.h15_16++
    if(max < entrancesByHour[key].values.h15_16) max++
  }else if(entranceDate < hour17Date) {
    entrancesByHour[key].values.h16_17++
    if(max < entrancesByHour[key].values.h16_17) max++
  }else if(entranceDate < hour18Date) {
    entrancesByHour[key].values.h17_18++
    if(max < entrancesByHour[key].values.h17_18) max++
  }else if(entranceDate < hour19Date) {
    entrancesByHour[key].values.h18_19++
    if(max < entrancesByHour[key].values.h18_19) max++
  }
}

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
entrancesByHour =  
    {
      "K": 
        [
          {
            "range": "09-10",
            "count": 2
          },
          {
            "range": "10-11",
            "count": 3
          },
          {
            "range": "11-12",
            "count": 2
          } 
        ],
      "P": 
        [
          {
            "range": "09-10",
            "count": 3
          },
          {
            "range": "10-11",
            "count": 0
          },
          {
            "range": "11-12",
            "count": 1
          } 
        ],
      "F": 
        [
          {
            "range": "09-10",
            "count": 2
          },
          {
            "range": "10-11",
            "count": 3
          },
          {
            "range": "11-12",
            "count": 1
          } 
        ],
    }

console.log("entrancesByHour = ",JSON.stringify(entrancesByHour))
console.log("entrancesByHour = ",entrancesByHour)
console.log("max = ",max)

const margins = {top: 20, right: 20, bottom: 60, left: 120}
const chartHeight = 600 - margins.top - margins.bottom
const chartWidth = 1000 - margins.left - margins.right
const xRange = ["09-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19"]
const numberOfUsers = Object.keys(entrancesByHour).length;
const numberOfXElements = xRange.length + 2
const barWidth = (chartWidth / numberOfXElements) / numberOfUsers

// x scale:
const x = d3.scaleLinear().domain([-1, xRange.length]).range([0, chartWidth])
// y scale:
const y = d3.scaleLinear().domain([0, max]).range([chartHeight, 0]) 

// svg chart:
const svgchart = d3.select('#svgchart') // select the svg element
  .attr("width", chartWidth + margins.left + margins.right) // set the width of the chart
  .attr("height", chartHeight + margins.top + margins.bottom) // set the height of the chart
  .append("g") // add this g to set left and top margins
  .attr("transform", "translate(" + margins.left + "," + margins.top + ")")

console.log("entrancesByHour.K =",entrancesByHour.K) //test

Object.keys(entrancesByHour).forEach(userKey => {
  console.log("entrancesByHour["+userKey+"] =",entrancesByHour[userKey])
  addBar(entrancesByHour[userKey], userKey)
})

function addBar(userEntrances, userKey) {
  const methodName = "addBar"
  console.log(methodName, "userEntrances =", userEntrances, "userKey =", userKey)
  const zeroBarHeight = 3 // height of bar with 0 entrances
  const bar = svgchart.selectAll(".g"+userKey) // each bar is a g element
  .data(userEntrances)
  .enter().append("g")
  .attr("class", "g"+userKey)
  .attr("transform", (d, i) => { 
    // translate the g element horizontally and center it around the tick
    let offset = 0
    switch(userKey){
      case 'K':
       offset = barWidth*1.5
       break;
      case 'P':
        offset = barWidth*0.5
       break;
      case 'F':
       offset = -barWidth*0.5
      break;
    }
    const xcoord = x(xRange.findIndex((element) => element==d.range)) - offset
    return "translate(" + xcoord + ", 0)" 
  })
  bar.append("rect") // insert a rect in the g element
  .attr("class", "bar bar"+userKey)
  .attr("y", (d) => d.count==0 ? y(0)-zeroBarHeight : y(d.count)) // y coordinate of the rect (ex: if y height is 10px, y must be set to chartHeight-10)
  .attr("width", barWidth - 1) // width of the rect, leave 1px for spacing between bars
  .attr("height", (d) => d.count==0 ? zeroBarHeight : chartHeight - y(d.count)) // height of the rect
}

/*
const dot = svgchart.selectAll(".dot")
  .data(entrancesByHour.K)
  .enter().append("circle")
  .attr("r", 4) // circle radius
  .attr("cx", (d) => x(xRange.findIndex((element) => element==d.range))) // circle x coord
  .attr("cy", (d) => y(d.count)) // circle y coord
*/

//x axis line:
const xAxis = svgchart.append('g')
  .classed("x-axis", true)
  .attr("transform", "translate(0," + chartHeight + ")") // put the g on the bottom
  .call(d3.axisBottom(x).tickFormat((i)=>xRange[i])) // call d3.axisBottom(x) on the g, to generate the axis within the g

// x axis label:							    
xAxis.append("text")
  .classed("axisLabel", true)
  .text("Hour Range")
  .attr("dx", "20em") // x offset
  .attr("dy", "2.5em") // y offset

//y axis line:
const yAxis = svgchart.append('g')
  .classed("y-axis", true)
  .call(d3.axisLeft(y).ticks(max)) // show "max" number of y ticks

// y axis label:
yAxis.append("text")
.attr("id", "yAxisLabel")
.classed("axisLabel", true)
.text("Number of entrances")
.attr("dx", "-10em") // x offset
.attr("dy", "-3.25em") // y offset
.attr("transform", "rotate(-90)") // rotate the label vertically

xAxis.selectAll("text").style("text-anchor", "middle") // center x axis ticks' text

// legend:
const rectLegendX = "60em"
const rectLegendY = 1
const rectLegendW = 10
const rectLegendH = 10
const labelLegendDx = "60.8em"
const rectLegendYOffset = 1 
d3.select('#svgchart')
.append("rect")
  .attr("width", rectLegendW)
  .attr("height",rectLegendH)
  .attr("x", rectLegendX)
  .attr("y", rectLegendY+"em")
  .classed("barK legend-rect", true)
d3.select('#svgchart')
.append('text')
.text("K")
.attr("dx", labelLegendDx)
.attr("dy", "1.48em")
d3.select('#svgchart')
.append("rect")
  .attr("width", rectLegendW)
  .attr("height",rectLegendH)
  .attr("x", rectLegendX)
  .attr("y", rectLegendY+rectLegendYOffset+"em")
  .classed("barP legend-rect", true)
d3.select('#svgchart')
.append('text')
.text("P")
.attr("dx", labelLegendDx)
.attr("dy", "2.55em")
d3.select('#svgchart')
.append("rect")
  .attr("width", rectLegendW)
  .attr("height",rectLegendH)
  .attr("x", rectLegendX)
  .attr("y", rectLegendY+rectLegendYOffset*2+"em")
  .classed("barF legend-rect", true)
d3.select('#svgchart')
.append('text')
.text("F")
.attr("dx", labelLegendDx)
.attr("dy", "3.65em")
