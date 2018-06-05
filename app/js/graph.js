'use strict'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Date.prototype.getMonthName = function() {
  return months[this.getMonth()];
}

function getMonthName(month) {
  return months[month]
}

const url = "http://10.186.72.247:9090/abubi/"
// $.getJSON(url, (data, textStatus) => {
 
// TEST DATA:
const data = 
    [
      {
        "date": "2018-05-24",
        "entrances": {
          "K": [],
          "P": [],
          "F": ["09:44:11",	"10:38:01",	"10:46:56",	"10:57:51",	"11:05:21",	"11:21:31",	"11:56:16",	"11:59:01",	"12:11:01",	
          "12:24:51",	"13:03:01",	"13:03:21",	"15:14:14",	"15:28:31",	"15:30:51",	"16:33:16",	"16:53:21",	"16:58:31",	"17:19:41",	
          "18:03:31",	"18:23:31",	"18:29:31",	"18:37:21"]
        }
      },
      {
        "date": "2018-05-25",
        "entrances": {
          "K": [],
          "P": [],
          "F": ["09:05:11",	"09:22:16",	"09:23:16",	"09:34:16",	"10:01:01",	"10:11:01",	"10:35:51",	"11:06:19",	"12:26:10",	
          "12:33:29",	"15:03:29	15:33:11",	"18:10:11"]
        }
      },
      {
        "date": "2018-05-28",
        "entrances": {
          "K": [],
          "P": ["11:08:24"],
          "F": ["09:12:01","10:08:01","11:03:16","11:09:01","15:48:01","16:01:01","16:11:01","17:56:01","18:03:01"]
        }
      },
      {
        "date": "2018-05-29",
        "entrances": {
          "K": [],
          "P": ["09:24:03"],
          "F": ["09:10:56","09:24:01", "09:27:31", "09:51:01", "10:18:01", "10:45:01", "11:32:01", "11:33:01", "12:37:01", 
          "16:12:01", "16:20:01", "16:26:01", "16:34:01"]
        }
      },
      {
        "date": "2018-05-30",
        "entrances": {
          "K": [],
          "P": ["09:40:01", "16:34:51", "17:03:37","17:13:42","17:14:06","17:41:18"],
          "F": ["09:10:01","09:30:01", "10:58:29","11:44:11","12:46:58","16:10:17", "16:45:00","16:50:00", "17:54:30", "18:04:20", "18:09:52"]
        }
      },
      {
        "date": "2018-05-31",
        "entrances": {
          "K": ["10:38:00"],
          "P": [],
          "F": ["09:15:01","09:51:01","09:58:02","12:15:27","12:30:01","12:47:17","14:40:33","15:34:17"]
        }
      },
      {
        "date": "2018-06-01",
        "entrances": {
          "K": ["12:20:29", "17:23:43"],
          "P": ["18:24:20"],
          "F": ["09:31:05","09:35:10","09:50:07","10:25:16","10:48:01","10:54:00","12:31:47","14:37:26","14:53:31","15:52:24",
          "15:53:24","17:17:27", "17:46:12","18:00:05"]
        }
      }
    ]

  console.log(data) //TEST

  // month select:
  let monthYearArray = []
  function getMonths() {
    data.forEach(dataElement => {
      const currDate = new Date(dataElement.date)
      const month = currDate.getMonth()
      const year = currDate.getFullYear()
      const toIns = year+"-"+month
      if(!monthYearArray.includes(toIns)) {
        monthYearArray.push(toIns)
      }
    })
    console.log("not sorted:",monthYearArray)
    monthYearArray.sort(function(a,b){
      return new Date(b) - new Date(a);
    });
    console.log("sorted:",monthYearArray)
  }
  
  getMonths()
  monthYearArray.forEach(monthYear => $("#month-select").append(
    "<option value='"+monthYear+"'>"+monthYear.substring(0,4)+" - "+getMonthName(monthYear.substring(5))+"</option>"))

  // function filterByMonth(month) {
  //   return data.filter(dataElement => new Date(dataElement.date).getMonth() == month)
  // }
  // console.log(filterByMonth(5))

  let max = 0
  let entrancesByHour = {}
  entrancesByHour.K = [{"range":"09-10","count": 0}, {"range":"10-11","count": 0}, {"range":"11-12","count": 0}, 
    {"range":"12-13","count": 0}, {"range":"13-14","count": 0}, {"range":"14-15","count": 0}, {"range":"15-16","count": 0}, 
    {"range":"16-17","count": 0}, {"range":"17-18","count": 0}, {"range":"18-19","count": 0}]
  entrancesByHour.P = [{"range":"09-10","count": 0}, {"range":"10-11","count": 0}, {"range":"11-12","count": 0}, 
    {"range":"12-13","count": 0}, {"range":"13-14","count": 0}, {"range":"14-15","count": 0}, {"range":"15-16","count": 0}, 
    {"range":"16-17","count": 0}, {"range":"17-18","count": 0}, {"range":"18-19","count": 0}]
  entrancesByHour.F = [{"range":"09-10","count": 0}, {"range":"10-11","count": 0}, {"range":"11-12","count": 0}, 
    {"range":"12-13","count": 0}, {"range":"13-14","count": 0}, {"range":"14-15","count": 0}, {"range":"15-16","count": 0}, 
    {"range":"16-17","count": 0}, {"range":"17-18","count": 0}, {"range":"18-19","count": 0}]

  data.forEach(entranceObj => {
    // date, entrances object of given day
    // console.log("entranceObj = ", entranceObj)
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
    if(entranceDate < hour10Date) {
      entrancesByHour[key][0].count++
      if(max < entrancesByHour[key][0].count) max++
    }else if(entranceDate < hour11Date) {
      entrancesByHour[key][1].count++
      if(max < entrancesByHour[key][1].count) max++
    }else if(entranceDate < hour12Date) {
      entrancesByHour[key][2].count++
      if(max < entrancesByHour[key][2].count) max++
    }else if(entranceDate < hour13Date) {
      entrancesByHour[key][3].count++
      if(max < entrancesByHour[key][3].count) max++
    }else if(entranceDate < hour14Date) {
      entrancesByHour[key][4].count++
      if(max < entrancesByHour[key][4].count) max++
    }else if(entranceDate < hour15Date) {
      entrancesByHour[key][5].count++
      if(max < entrancesByHour[key][5].count) max++
    }else if(entranceDate < hour16Date) {
      entrancesByHour[key][6].count++
      if(max < entrancesByHour[key][6].count) max++
    }else if(entranceDate < hour17Date) {
      entrancesByHour[key][7].count++
      if(max < entrancesByHour[key][7].count) max++
    }else if(entranceDate < hour18Date) {
      entrancesByHour[key][8].count++
      if(max < entrancesByHour[key][8].count) max++
    }else if(entranceDate < hour19Date) {
      entrancesByHour[key][9].count++
      if(max < entrancesByHour[key][9].count) max++
    }
  }
  // console.log("entrancesByHour = ",JSON.stringify(entrancesByHour))

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

  // add the X gridlines
  svgchart.append("g")			
  .attr("class", "grid")
  .call(d3.axisLeft(y).ticks(max)
      .tickSize(-chartWidth)
      .tickFormat(""))

  // tooltip div:
  const tooltip = d3.select('#mainContainer').append("div")
    .classed("tooltip", true)
    .style("opacity", 0) // start invisible

  Object.keys(entrancesByHour).forEach(userKey => {
    // console.log("entrancesByHour["+userKey+"] =",entrancesByHour[userKey]) //TEST
    addBar(entrancesByHour[userKey], userKey)
  })

  function addBar(userEntrances, userKey) {
    const methodName = "addBar"
    // console.log(methodName, "userEntrances =", userEntrances, "userKey =", userKey)
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
    .on("mouseover", function(d) {
    	d3.select(this).classed("overed", true) // add "overed" class to the rect
    	tooltip.transition()
    		.duration(300)
        .style("opacity", 1) // show the tooltip
      let tooltipContent = "<table class='table-tooltip'><tbody>" + 
        "<tr><td class='td-tooltip-key'>user:</td><td class='td-tooltip-value'>"+userKey+"</td></tr>" + 
        "<tr><td class='td-tooltip-key'># of entrances:</td><td class='td-tooltip-value'>"+d.count+"</td></tr>" + 
        "<tr><td class='td-tooltip-key'>time-slot (h-h):</td><td class='td-tooltip-value'>"+d.range+"</td></tr>" + 
        "</tbody></table>"
    	tooltip.html(tooltipContent)
       .style("left", (d3.event.pageX - d3.select('.tooltip').node().offsetWidth - 5) + "px")
       .style("top", (d3.event.pageY - d3.select('.tooltip').node().offsetHeight) + "px");
    })
    .on("mouseleave", function(d) {
    	d3.select(this).classed("overed", false)
    	tooltip.transition()
    		.duration(300)
    		.style("opacity", 0)
    	tooltip.html("")
    })
  }

  //x axis line:
  const xAxis = svgchart.append('g')
    .classed("x-axis", true)
    .attr("transform", "translate(0," + chartHeight + ")") // put the g on the bottom
    .call(d3.axisBottom(x).tickFormat((i)=>xRange[i])) // call d3.axisBottom(x) on the g, to generate the axis within the g

  // x axis label:							    
  xAxis.append("text")
    .classed("axisLabel", true)
    .text("Time Slot")
    .attr("dx", "20em") // x offset
    .attr("dy", "2.5em") // y offset

  xAxis.selectAll("text").style("text-anchor", "middle") // center x axis ticks' text

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

  // legend:
  const rectLegendX = "2em"
  const rectLegendY = 1
  const rectLegendW = 10
  const rectLegendH = 10
  const labelLegendDx = "2.8em"
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
// })
