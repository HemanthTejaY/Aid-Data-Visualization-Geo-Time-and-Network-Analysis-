import define1 from "./a33468b95d0b15b0@699.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["countries-50m.json",new URL("./files/55260abbc777c0a3b8fed19f3929dd822fef9d5118b53b76b2176d20782910e599eac919999ea8ee85a60b783fd37082574f6591fd46c0d70ddf9b00df71ce27",import.meta.url)],["m2_data.csv",new URL("./files/52fa72d0951dcd278e9d71f4c224555001f5a8464d7817476e59d13fa9259df3060a90a4f3f136a2b9e5cf7ef28f7157861b733636e401731fdaba7acc22f21c",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Mini-Projects

## Data

Here we load a [simplified and reduced version](https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/) of the [AidData dataset](https://www.aiddata.org/data/aiddata-core-research-release-level-1-3-1). If you don't want to preprocess your data on Observable, then you can do the preprocessing using whatever languages or tools you'd like and then [upload](/@observablehq/file-attachments) your preprocessed data to Observable. If you take this approach, then you should delete the \`aiddata\` cell below.`
)});
  main.variable(observer("aiddata")).define("aiddata", ["d3","googleSheetCsvUrl"], async function(d3,googleSheetCsvUrl){return(
await d3.csv(googleSheetCsvUrl, row => ({
  yearDate: d3.timeParse('%Y')(row.year),
  yearInt: +row.year,
  aiddata_id: row.aiddata_id,
  aiddata_2_id: row.aiddata_2_id,
  donor: row.donor,
  recipient: row.recipient,
  commitment_amount: +row.commitment_amount_usd_constant,
  coalesced_purpose_code: row.coalesced_purpose_code,
  coalesced_purpose_name: row.coalesced_purpose_name,
}))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Next we load GeoJSON data for countries. This file is derived from data from [Natural Earth](https://www.naturalearthdata.com).`
)});
  main.variable(observer("geoJSON")).define("geoJSON", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)});
  main.variable(observer("m2V2_purposesData")).define("m2V2_purposesData", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("m2_data.csv").text(), (d, i, columns) => (d3.autoType(d)))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Notes

- You can either create all of your visualizations for a mini-project in one notebook or you can create each visualization in its own notebook. If you create each in its own notebook, then please [import](/@observablehq/introduction-to-imports) the visualizations into a single notebook for submission.
- You can use Mike Bostock's [Color Legend](/@d3/color-legend) notebook to create your legends.`
)});
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.import("swatches", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`# Mini-Project-2 : Graph Design - TIME

### Visualization 2: Change in amount donated and recieved over time : Difference in $ Millions

What are the top 10 purposes of disbursements (in terms of total amount of disbursement) and how does their relative amount compare over time? E.g., are there purposes that tend to be prominent for a period of time and others that become more prominent during other periods?

`
)});
  main.variable(observer()).define(["d3","DOM","m2V2_Height","m2V2_margin","m2V2_allPurposesSet","d3Legend","m2V2_setOfEachYear","m2V2_Width","ex","width","m2V2_purposesDataSet","m2V2_color","m2V2_allAmountsSet"], function(d3,DOM,m2V2_Height,m2V2_margin,m2V2_allPurposesSet,d3Legend,m2V2_setOfEachYear,m2V2_Width,ex,width,m2V2_purposesDataSet,m2V2_color,m2V2_allAmountsSet)
{
  const svg = d3.select(DOM.svg(1000,m2V2_Height+m2V2_Height/4));
  const g = svg.append('g')
        .attr('transform', `translate(${m2V2_margin.left}, ${m2V2_margin.top})`);
    
  const ordinal = d3.scaleOrdinal()
    .domain(m2V2_allPurposesSet)
    .range(d3.schemePaired);
    
    svg.append("g")
      .attr("class", "legendOrdinal")
      .style("opacity", 1.2)
      .attr("transform", "translate(600,10)");
    
    const m2V2_Legend = d3Legend.legendColor()
      .shape("path", d3.symbol().type(d3.symbolCircle).size(90)())
      .shapePadding(20)
      .cellFilter(function(d){ return d.label !== "e" })
      .scale(ordinal);
    
    svg.select(".legendOrdinal")
      .call(m2V2_Legend)
      .selectAll('text')
      .attr("font-size", "15px");
    
    const x = d3.scaleLinear()
        .domain(d3.extent(m2V2_setOfEachYear, d => d.year))
        .range([0, m2V2_Width]);
    
    const y = d3.scaleLinear()
        .domain([0, ex]).nice()
        .range([m2V2_Height, 0]);
    
    g.append('g')
        .attr('transform', `translate(0,${m2V2_Height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .append('text')
        .attr('text-anchor', 'start')
        .attr("fill", "black")
       .attr("font-weight","bold")
       .attr("font-size","15")
       .attr("font-family", "Saira")
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'black')
        .attr("x", width/ 3)
        .attr('y', 40)
        .text('Years');
    
    g.append('g')
        .call(d3.axisLeft(y))
        .call(g => g.selectAll('.domain'))
      .append('text')
        .attr('text-anchor', 'start')
        .attr("fill", "black")
       .attr("font-weight","bold")
       .attr("font-size","15")
       .attr("font-family", "Saira")
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'black')
        .attr('x', 5)
        .text('Amounts');
    
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.purpose_net_amount));
    
    const linesSelection = g.selectAll('.line')
        .data(m2V2_purposesDataSet);
    
    const lineGroups = linesSelection
        .join('g')
          .attr('stroke', d=>m2V2_color(d.purpose))
          .attr('stroke-opacity', 0.8)
          .attr('stroke-width', 1.5);
    
    lineGroups
      .append('path')
        .datum(d => d.years)
        .attr('d', line)
        .attr('fill', 'none');
    lineGroups.selectAll('.circle')
      .data(lg => lg.years)
      .enter().append('circle')
        .attr('r', d => m2V2_allAmountsSet.includes(d.purpose_net_amount)?5:0)
        .attr('cx', d => x(new Date(d.year)))
        .attr('cy', d => y(new Date(d.purpose_net_amount)))
        .attr('fill', d => m2V2_allAmountsSet.includes(d.purpose_net_amount)?m2V2_color(d.purposes):'none')
        .attr('opacity', 1.2);
    
    return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
### Note: 

"Appendix: Visualization 2" contains the margin, variables, axes,.. and other definitions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# INFERENCE

### Visualization 2: 

 Here I have used a line chart to show how the top 10 purposes of disburements vary over time. Each line is color coded and represents a purpose of disburement.This graph provides easy way to see the variations in each of the purposes as well as compare them amongst each other. By using this form of representation, we can compare the top 10 purposes of disburements with their variations in amounts over time. This graph provides easy way to see the variations in each of the purposes as well as compare them amongst each other. We see that RESCHEDULING AND REFINANCING has higher amount than other purposes. We can see an increasing trend in Mineral/Metal prospection and exploration purpose and the Telecommunications purpose. These purposes have have more amount in the 2000s. We see that  RESCHEDULING AND REFINANCING has an increasing trend during the 90s but starts decreasing during 2000s. Similarly, Power generation/renewable sources has an increasing trend during the early 2000s but starts decreasing post 2005.We also see sudden peaks and valleys. RESCHEDULING AND REFINANCING had peaks in early 1990s and Power generation/renewable sources had peaks post 1990s. We also see sudden peaks and valleys in the graphs of Mineral/Metal prospection and exploration. 

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
## Appendix: Visualization 2`
)});
  main.variable(observer("m2V2_yearlyPurposesData")).define("m2V2_yearlyPurposesData", ["d3","m2V2_purposesData"], function(d3,m2V2_purposesData){return(
d3.rollup(m2V2_purposesData, years => years, d => d.purposes)
)});
  main.variable(observer("m2V2_yearlyAmountsData")).define("m2V2_yearlyAmountsData", ["d3","m2V2_purposesData"], function(d3,m2V2_purposesData){return(
d3.rollup(m2V2_purposesData, years => d3.max(years, d=>d.purpose_net_amount), d => d.year)
)});
  main.variable(observer("m2V2_purposesDataSet")).define("m2V2_purposesDataSet", ["m2V2_yearlyPurposesData"], function(m2V2_yearlyPurposesData){return(
Array.from(m2V2_yearlyPurposesData, ([purpose, years]) => ({purpose, years}))
)});
  main.variable(observer("m2V2_yearlyAmountsDataSet")).define("m2V2_yearlyAmountsDataSet", ["m2V2_yearlyAmountsData"], function(m2V2_yearlyAmountsData){return(
Array.from(m2V2_yearlyAmountsData, ([years, net_amounts]) => ({years, net_amounts}))
)});
  main.variable(observer("m2V2_allAmountsSet")).define("m2V2_allAmountsSet", ["m2V2_yearlyAmountsDataSet"], function(m2V2_yearlyAmountsDataSet){return(
m2V2_yearlyAmountsDataSet.map(d => d.net_amounts)
)});
  main.variable(observer("m2V2_allPurposesSet")).define("m2V2_allPurposesSet", ["d3","m2V2_purposesData"], function(d3,m2V2_purposesData){return(
Array.from(d3.rollup(m2V2_purposesData,total => d3.sum(total, c => c.purpose_net_amount),
                                d => d.purposes),([purposes, purpose_net_amount]) => ({purposes, purpose_net_amount}))
                                .sort((a, b) => d3.descending(a.purpose_net_amount, b.purpose_net_amount)).map(d => d.purposes)
)});
  main.variable(observer("m2V2_purposesDataCount")).define("m2V2_purposesDataCount", ["d3","m2V2_purposesData"], function(d3,m2V2_purposesData){return(
d3.rollup(m2V2_purposesData,
         total => d3.sum(total, c => c.purpose_net_amount),d => d.year,d => d.purposes)
)});
  main.variable(observer("m2V2_setOfEachYear")).define("m2V2_setOfEachYear", ["m2V2_purposesDataCount","d3"], function(m2V2_purposesDataCount,d3){return(
Array.from(m2V2_purposesDataCount, (([year, map]) => {
  map.set('year', year);
  map.set('total', d3.sum(map.values()));
  return Object.fromEntries(map)
}))
)});
  main.variable(observer("ex")).define("ex", ["d3","m2V2_purposesDataSet"], function(d3,m2V2_purposesDataSet){return(
d3.max(m2V2_purposesDataSet, d => d3.max(d.years, p => p.purpose_net_amount))
)});
  main.variable(observer("m2V2_margin")).define("m2V2_margin", function(){return(
{top: 20, right: 0, bottom: 30, left: 80}
)});
  main.variable(observer("m2V2_Width")).define("m2V2_Width", ["m2V2_margin"], function(m2V2_margin){return(
1000 - m2V2_margin.left - m2V2_margin.right
)});
  main.variable(observer("m2V2_Height")).define("m2V2_Height", ["m2V2_margin"], function(m2V2_margin){return(
700 - m2V2_margin.top - m2V2_margin.bottom
)});
  main.variable(observer("m2V2_color")).define("m2V2_color", ["d3","m2V2_allPurposesSet"], function(d3,m2V2_allPurposesSet){return(
d3.scaleOrdinal()
                .domain(m2V2_allPurposesSet)
                .range(d3.schemePaired)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
## Appendix`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  main.variable(observer("googleSheetCsvUrl")).define("googleSheetCsvUrl", function(){return(
'https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/gviz/tq?tqx=out:csv'
)});
  main.variable(observer("d3Legend")).define("d3Legend", ["require"], function(require){return(
require('d3-svg-legend')
)});
  return main;
}
