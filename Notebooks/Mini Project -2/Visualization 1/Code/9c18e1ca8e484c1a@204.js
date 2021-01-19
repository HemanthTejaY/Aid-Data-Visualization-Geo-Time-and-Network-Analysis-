import define1 from "./a33468b95d0b15b0@699.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["countries-50m.json",new URL("./files/55260abbc777c0a3b8fed19f3929dd822fef9d5118b53b76b2176d20782910e599eac919999ea8ee85a60b783fd37082574f6591fd46c0d70ddf9b00df71ce27",import.meta.url)],["sorted-induvidual-countries.json",new URL("./files/58d4f86fde24993008ba95322ec9d0069670dd93bde9e526bfc47cb35d961b2d65ed413a4964ee710b584e56b2b5ee1750e502f3a5ef71665c0ab6ecbbdaa8ee",import.meta.url)],["miniProject2-mainData.json",new URL("./files/85f1c76199509b6e3acb73acb03325850bcff0b9e6df7c2b80c8fbbfbfbbec35a8b70b2bf61ec02300d85e80006a653048227705fc8fa75cf1a42f5de8c4f102",import.meta.url)]]);
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
  main.variable(observer("m2_v1_induvidualSortedCountries")).define("m2_v1_induvidualSortedCountries", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("sorted-induvidual-countries.json").json()
)});
  main.variable(observer("m2_mainDataJson")).define("m2_mainDataJson", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("miniProject2-mainData.json").json()
)});
  main.variable(observer("m2_v1_initialCountryList")).define("m2_v1_initialCountryList", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("sorted-induvidual-countries.json").json()
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

### Visualization 1: Change in amount donated and recieved over time : Difference in $ Millions

i) How does the amount donated vs. amount received change over time for each country? 

ii) Are there countries that mostly send or mostly receive and countries that have a similar amount of donations they receive and send?

iii) Are there countries that change their role over time? That is, they used to mostly send donations and turn into mostly receiving donations and vice-versa?

iv) Are there countries in which you can find a sudden increase ("peak") or a sudden decrease ("valley")?

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

#### Difference in $ Millions


`
)});
  main.variable(observer("m2V1_Legend")).define("m2V1_Legend", ["d3","DOM","m2V1_margin","m2V1_setColor"], function(d3,DOM,m2V1_margin,m2V1_setColor)
{
  const svg = d3.select(DOM.svg(750, 30));

  const g3 = svg.append('g')
      .attr("transform", `translate(${m2V1_margin.left},-5)`)
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
    .selectAll("g")
    .data(m2V1_setColor.range())
    .join("g")
      .attr("transform", (d, i) => `translate(${i * 120},0)`);
	  

  g3.append("rect")
      .attr("x", 15)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", d=>d);

  g3.append("text")
	.data(['low (-91400M)','','','','high(113900M)'])
      .attr("x", 10)
      .attr("y", 9.5)
      .attr("dy", "0.5em")
      .text(d=>d);
  
  return svg.node();
}
);
  main.variable(observer("m2V1_output")).define("m2V1_output", ["d3","DOM","m2_v1_width","m2V1_margin","m2_v1_height","lightgray","m2V1_x","m2V1_y","m2_mainDataJson","m2V1_setColor"], function(d3,DOM,m2_v1_width,m2V1_margin,m2_v1_height,lightgray,m2V1_x,m2V1_y,m2_mainDataJson,m2V1_setColor)
{
    
  const svg = d3.select(DOM.svg(m2_v1_width+m2V1_margin.left + m2V1_margin.right, m2_v1_height+m2V1_margin.top + m2V1_margin.bottom));
              
  const g = svg.attr('width', m2_v1_width + m2V1_margin.left)
  .attr('height', m2_v1_height + m2V1_margin.top + m2V1_margin.bottom)
   .append('g')
   .attr("transform", `translate(${m2V1_margin.left}, ${m2V1_margin.top})`);
  
 g.append('g')
  .append('rect')
   .attr('x', 0)
    .attr('y',0)
  .attr('width', m2_v1_width)
    .attr('height',m2_v1_height-(6*m2V1_margin.bottom)-m2V1_margin.top)
   .attr('fill',lightgray) 
  
 g.append('g')
    .attr('transform', `translate(0, 0 )`)
    .call(d3.axisTop(m2V1_x))
	.append('text')
      .attr('x', m2_v1_width / 2)
      .attr('y', -20)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text('Year');
  
 g.append('g')
  .attr('transform', `translate(0, -${m2V1_margin.top} )`)
  .call(d3.axisLeft(m2V1_y))

g.append('g')
      .attr('transform', `translate(0, ${m2_v1_height-(6*m2V1_margin.bottom)-m2V1_margin.top})`)
      .call(d3.axisBottom(m2V1_x))
	    .append('text')
      .attr('x', m2_v1_width / 2)
      .attr('y', 30)
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text('Year');
	

  svg.selectAll()
    .data(m2_mainDataJson)
    .enter()
    .append('rect')
    .attr('x', (d) => m2V1_x(d.year) + m2V1_margin.left)
    .attr('y', (d) => m2V1_y(d.country))
    .attr('width', m2V1_x.bandwidth())
    .attr('height', m2V1_y.bandwidth())
    .attr('fill', (d=> m2V1_setColor(d.net_amount)))
 
	   return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
### Note: 

"Appendix: Visualization 1" contains the margin, variables, axes,.. and other definitions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# INFERENCE

### Visualization 1: 
In order to answer this question, I have used a heat map with a diverging scale. Note that, the scale uses multiple colors across the spectrum. This helps us get a vivid idea by mapping the respective color. Therefore, by using a diverging color scale with multiple colors, we are able to depict how the donated and received amount varies with time across the different countries.



We are creating a scale ranging from low to high differences in millions of dollars and use this value to determine the color of the cell in the heatmap. Through this heatmap, we are analyzing data from the years 1973 to 2009.  A heatmap will help us view the data of multiple countries at the same time. This form of representation will help us compare countries easily and also understand the pattern changes of each country over time. A color scale with multiple colors helps us in understanding these patterns better.

Furthermore, using a heatmap with a common color scale, helps us study the patterns for different countries at the same time. Using a heatmap would be more helpful to compare countries, rather than generating a seperate graph for each country. Furthermore, from the graph we can observe that countries that have provided more donations are in the bottom of the heatmap,while countries which recieve more donations are placed on the top. Ordering the countries in this way, will help us group and demarcate the countries in a better way. 

From the heatmap, one can easily infer that countries like India, Thailand and Brazil mostly recieve while on the other hand, countries like Germany and United States mostly donate. We can also conclude that countries like Spain, Korea, Norway, etc which used to receive donations in the earlier years (before 2000s) but have now started giving more donations in 2000s. 

This form of represenatation can also help us determine, the lows and highs. In other words, we can determine - which year what country donated the maximum amount (in the given time frame) or which country recieved the maximum amount in a given year. A lot of examples can be seen of the peaks and valleys in the graph. For example, we see that Spain's donations peak around 2006 - 2010. We see a valley for Kuwait in 1992. We see a valley for Australia in 2001. We can also see a valley for Ireland in 2002. So many such examples can be provided of peaks and valleys.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
## Appendix- Visualization-1`
)});
  main.variable(observer("lightgray")).define("lightgray", function(){return(
'#f0f0f0'
)});
  main.variable(observer("m2_v1_height")).define("m2_v1_height", function(){return(
900
)});
  main.variable(observer("m2_v1_width")).define("m2_v1_width", function(){return(
1200
)});
  main.variable(observer("m2V1_finalSum_amt")).define("m2V1_finalSum_amt", ["m2_mainDataJson"], function(m2_mainDataJson){return(
m2_mainDataJson.map(d=>d.net_amount)
)});
  main.variable(observer("secondaryCountryList")).define("secondaryCountryList", ["m2_v1_induvidualSortedCountries"], function(m2_v1_induvidualSortedCountries){return(
m2_v1_induvidualSortedCountries.map(d=>d.country)
)});
  main.variable(observer("m2V1_setColor")).define("m2V1_setColor", ["d3","m2V1_finalSum_amt"], function(d3,m2V1_finalSum_amt){return(
d3.scaleQuantile()
  .domain(m2V1_finalSum_amt) 
  .range(['#170101','#693502','#8f8f1a','#40b9e3','#2c7bb6'])
)});
  main.variable(observer("m2V1_margin")).define("m2V1_margin", function(){return(
{ top: 50, left: 110, right: 30, bottom: 10 }
)});
  main.variable(observer("generateYears_m2V1")).define("generateYears_m2V1", ["d3","m2_mainDataJson"], function(d3,m2_mainDataJson){return(
d3.set(m2_mainDataJson.map(d=> d.year)).values()
)});
  main.variable(observer("generateCountries_m2V1")).define("generateCountries_m2V1", ["d3","m2_mainDataJson"], function(d3,m2_mainDataJson){return(
d3.set(m2_mainDataJson.map(d=> d.country)).values()
)});
  main.variable(observer("m2V1_x")).define("m2V1_x", ["d3","generateYears_m2V1","m2_v1_width"], function(d3,generateYears_m2V1,m2_v1_width){return(
d3.scaleBand()
  .domain(generateYears_m2V1)
  .range([0, m2_v1_width])
  .padding(0.05)
)});
  main.variable(observer("m2V1_y")).define("m2V1_y", ["d3","m2_v1_initialCountryList","m2_v1_height","m2V1_margin"], function(d3,m2_v1_initialCountryList,m2_v1_height,m2V1_margin){return(
d3.scaleBand().domain(m2_v1_initialCountryList).range([m2_v1_height-(6*m2V1_margin.bottom), m2V1_margin.top]).padding(0.025)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
## Appendix`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer("googleSheetCsvUrl")).define("googleSheetCsvUrl", function(){return(
'https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/gviz/tq?tqx=out:csv'
)});
  return main;
}
