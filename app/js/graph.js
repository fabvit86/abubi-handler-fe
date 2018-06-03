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
    // console.log("entrance user",key," = ", entranceK)
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
  // console.log("key = ", key, "input entranceDate =", entranceDate)
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
            "range": "09_10",
            "count": 3
          },
          {
            "range": "10_11",
            "count": 7
          },
          {
            "range": "11_12",
            "count": 5
          } 
        ],
      "F": 
        [
          {
            "range": "09_10",
            "count": 3
          },
          {
            "range": "10_11",
            "count": 7
          },
          {
            "range": "11_12",
            "count": 5
          } 
        ],
    }

console.log("entrancesByHour = ",JSON.stringify(entrancesByHour))
console.log("entrancesByHour = ",entrancesByHour)
console.log("max = ",max)

const margins = {top: 20, right: 20, bottom: 60, left: 120}
const chartHeight = 600 - margins.top - margins.bottom
const chartWidth = 1000 - margins.left - margins.right
const xRange = ["08-09", "09-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19"]
const numberOfXElements = xRange.length 
const barWidth = chartWidth / numberOfXElements

// x scale:
const x = d3.scaleLinear().domain([0, xRange.length-1]).range([0, chartWidth])
// y scale:
const y = d3.scaleLinear().domain([0, max]).range([chartHeight, 0]) 

// svg chart:
const svgchart = d3.select('#svgchart') // select the svg element
  .attr("width", chartWidth + margins.left + margins.right) // set the width of the chart
  .attr("height", chartHeight + margins.top + margins.bottom) // set the height of the chart
  .append("g") // add this g to set left and top margins
  .attr("transform", "translate(" + margins.left + "," + margins.top + ")")

console.log("entrancesByHour.K =",entrancesByHour.K) //test
console.log("half rect width = ", barWidth/2)
const bar = svgchart.selectAll("g") // each bar is a g element
  .data(entrancesByHour.K)
  .enter().append("g")
  .attr("transform", (d, i) => { 
    // translate the g element horizontally and center it around the tick
    const xcoord = x(xRange.findIndex((element) => element==d.range)) - barWidth/2
    return "translate(" + xcoord + ", 0)" 
  }) 

bar.append("rect") // insert a rect in the g element
  .attr("class", "bar")
  .attr("y", (d) => y(d.count)) // y coordinate of the rect (ex: if y height is 10px, y must be set to chartHeight-10)
  .attr("width", barWidth - 1) // width of the rect, leave 1px for spacing between bars
  .attr("height", (d) => chartHeight - y(d.count)) // height of the rect

const dot = svgchart.selectAll(".dot")
  .data(entrancesByHour.K)
  .enter().append("circle")
  .attr("r", 4) // circle radius
  .attr("cx", (d) => x(xRange.findIndex((element) => element==d.range))) // circle x coord
  .attr("cy", (d) => y(d.count)) // circle y coord
console.log("dot =",dot)

//x axis line:
const xAxis = svgchart.append('g')
  .classed("x-axis", true)
  .attr("transform", "translate(0," + chartHeight + ")") // put the g on the bottom
  .call(d3.axisBottom(x).tickFormat((i)=>xRange[i])) // call d3.axisBottom(x) on the g, to generate the axis within the g

//y axis line:
const yAxis = svgchart.append('g')
  .classed("y-axis", true)
  .call(d3.axisLeft(y).ticks(max)) // show "max" number of y ticks

xAxis.selectAll("text").style("text-anchor", "middle") // center x axis ticks' text
