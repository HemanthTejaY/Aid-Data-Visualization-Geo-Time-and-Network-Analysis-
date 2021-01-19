import define1 from "./a33468b95d0b15b0@699.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["countries-50m.json",new URL("./files/55260abbc777c0a3b8fed19f3929dd822fef9d5118b53b76b2176d20782910e599eac919999ea8ee85a60b783fd37082574f6591fd46c0d70ddf9b00df71ce27",import.meta.url)],["jsonData2.json",new URL("./files/596830f2c671aeda6216d9d29b2f23e7d3b3ad703dbc56fb848caf474bfa8967fda9d165dedd26504729a76f3b80203693a28b46b2cc80e3cf1e31eabae22500",import.meta.url)]]);
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
  main.variable(observer("jsonData2_pie")).define("jsonData2_pie", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("jsonData2.json").json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Mini-Project-3 : Networks

### Visualization 2: 

Considering only the top 5 purposes of donation, how does the relationship between countries look like in terms of purposes? What composition (distribution) of  purposes do the donations between each pair of countries have? Are there countries that donate to a given country using multiple purposes? Or do counties always donate using one single purpose when donating to another country? The same as the previous question, we only care about the top 10 recipients and the top 20 donors here.


`
)});
  main.variable(observer()).define(["legend","d3","colorsViz2"], function(legend,d3,colorsViz2){return(
legend({
  color: d3.scaleOrdinal(["Air Transport", "Rail Transport", "Industrial Development", "Rail Transport", "Power generation/non-renewable sources", "Rescheduling and refinancing" ], colorsViz2),
  title: "LEGEND",
  tickSize: 30,
  width : 900
})
)});
  main.variable(observer("m3_Vis2")).define("m3_Vis2", ["d3","DOM","m3v2_Width","m3V2_margin","m3v2_Height","m3v2_defineX","m3v2_defineY","jsonData2_pie","pie","m3v2_defineInOutSplits","m3v2_definePieColors"], function(d3,DOM,m3v2_Width,m3V2_margin,m3v2_Height,m3v2_defineX,m3v2_defineY,jsonData2_pie,pie,m3v2_defineInOutSplits,m3v2_definePieColors)
{  
  
  const svg = d3.select(DOM.svg(m3v2_Width + m3V2_margin.left + m3V2_margin.right,m3v2_Height + m3V2_margin.top + m3V2_margin.bottom));
	
  const g = svg.append('g')
      .attr('transform', `translate(${m3V2_margin.left}, ${m3V2_margin.top})`);

    g.append('g')
        .append('rect')
        .attr('x', -30)
        .attr('y',-35)
        .attr('width', m3v2_Width)
        .attr('height', m3v2_Height)
        .attr('fill','black')
  

    g.append('text')
        .attr('x', (m3v2_Width )/2 )
        .attr('y', m3v2_Height)
        .attr("font-family", "Saira")
        .attr("font-size", "22px")
        .attr("font-weight","bold")
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'hanging')
        .text('Recipient Nation');

    g.append('text')
        .attr('x', -m3V2_margin.left)
        .attr('y', m3v2_Height/2)
        .attr("font-family", "Saira")
        .attr("font-size", "20px")
        .attr("font-weight","bold")
        .attr('text-anchor', 'top')
        .attr('dominant-baseline', 'hanging')
        .text('Donor Nation');

    g.append('text')
            .attr('x', m3v2_Width / 2)
            .attr('y', -m3V2_margin.bottom -10)
            .attr("font-family", "Saira")
            .attr("font-size", "22px")
            .attr("font-weight","bold")
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'hanging')
            .text('Recipient Nation');

    
    g.append('g')
        .attr('transform', `translate(-40,-35)`)
        .call(d3.axisTop(m3v2_defineX))

    g.append('g')
        .attr('transform', `translate(-40,-35)`)
        .call(d3.axisLeft(m3v2_defineY))
    
    g.append('g')
        .attr('transform', `translate(-40,${m3v2_Height-35})`)
        .call(d3.axisBottom(m3v2_defineX))

    const createPieCharts = g.selectAll('.pieGroup')
        .data(jsonData2_pie)
        .join('g')
        .attr('class', 'pieGroup')
        .attr('transform', d => `translate(${m3v2_defineX(d.recipient)},${m3v2_defineY(d.donor)})`);

    createPieCharts.selectAll('path')
        .data(d => pie(d.purposes))
        .join('path')
        .attr('d', d => m3v2_defineInOutSplits(d))
        .attr('fill', d => m3v2_definePieColors(d.data.purpose))
   
 return svg.node();
 }
);
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
## Inference`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
For this particular visualization, I have used a colored pie chart. I have used 5 different vibrant colors that can be viewed easily on the black background. Each of these five colors represent the top 5 purposes. The top 5 purposes are - Air Transport, Rail Transport, Industrial Development, Power generation/non-renewable sources and Rescheduling and refinancing. The pie chart for each country is color coded and divided. These divisions and color codes represent the amount for the particular purpose. The divisions within the pie chart represent the proportion of the particular purpose that is encoded by a color. The radius of the pie charts range from 14 to 28 units. This is because, the size of the pie chart represents total amount donated for the top 5 purposes, by a particular nation. As per the requirement, we are considering the top 20 donors that are represented on the Y axis. Furthermore, we are considering the top 10 recipients - which are represented on the X axes (top and bottom). 

From this form of representation, we can clearlt infer  how the major donors make their donations among the different purposes. We see that United States makes major donations for Industrial Development, Power generation/non-renewable sources and Air Transport. We can also conclude that USA makes most major donations in Air Tranport (except to Kuwait). Likewise Japan donates a major portion to Rail Transport. We see Sweden, Norway and Canada donating in small portions for Industrial Development.

Additionally, we can also make inferences about the reciepient nations. For example, we can conclude that Poland recieves major donations from Germany and Belgium for Rescheduling and refinancing.On the other hand we see South Africa, Chile and Brazil receiving a high portion of donations for Industrial Development. Power generation/non-renewable sources aid goes mainly to  India, Thailand and Colombia. Air Transport Aid (except for Kuwait) and aid for Industrial Development seems to be evenly distributed among the top 10 recipient nations.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
## Appendix- Visualization-2`
)});
  main.variable(observer("m3V2_margin")).define("m3V2_margin", function(){return(
{top: 250, right: 70, bottom: 70, left:170}
)});
  main.variable(observer("m3v2_Width")).define("m3v2_Width", ["m3V2_margin"], function(m3V2_margin){return(
1100 - m3V2_margin.left - m3V2_margin.right
)});
  main.variable(observer("m3v2_Height")).define("m3v2_Height", ["m3V2_margin"], function(m3V2_margin){return(
1400 - m3V2_margin.top - m3V2_margin.bottom
)});
  main.variable(observer("m3v2_DefineRecipientCountries")).define("m3v2_DefineRecipientCountries", function(){return(
['India','Thailand','Brazil','Colombia','Korea','Poland','South Africa','Kuwait','Chile','Saudi Arabia']
)});
  main.variable(observer("m3v2_definePurposes")).define("m3v2_definePurposes", function(){return(
['Air transport','Rail transport','Industrial development','Power generation/non-renewable sources','RESCHEDULING AND REFINANCING']
)});
  main.variable(observer("m3v2_defineDonorCountries")).define("m3v2_defineDonorCountries", function(){return(
['United States','Japan','Germany','United Kingdom','France','Netherlands','Canada','Sweden','Norway','Italy','Denmark','Switzerland','Australia','Belgium','Spain','Saudi Arabia','Kuwait','Korea','Austria','Finland']
)});
  main.variable(observer("m3v2_defineX")).define("m3v2_defineX", ["d3","m3v2_DefineRecipientCountries","m3v2_Width"], function(d3,m3v2_DefineRecipientCountries,m3v2_Width){return(
d3.scaleBand()
.domain(m3v2_DefineRecipientCountries)
.range([0, m3v2_Width])
.padding(0.06)
)});
  main.variable(observer("m3v2_defineY")).define("m3v2_defineY", ["d3","m3v2_defineDonorCountries","m3v2_Height"], function(d3,m3v2_defineDonorCountries,m3v2_Height){return(
d3.scaleBand().domain(m3v2_defineDonorCountries).range([0,m3v2_Height]).padding(0.02)
)});
  main.variable(observer("ext")).define("ext", ["d3","jsonData2_pie"], function(d3,jsonData2_pie){return(
d3.extent(jsonData2_pie.map(d=>d.total))
)});
  main.variable(observer("m3v2_definePieRadius")).define("m3v2_definePieRadius", ["d3","ext"], function(d3,ext){return(
d3.scaleSqrt()
      .domain(ext)
      .range([14,28])
)});
  main.variable(observer("m3v2_definePieColors")).define("m3v2_definePieColors", ["d3","m3v2_definePurposes"], function(d3,m3v2_definePurposes){return(
d3.scaleOrdinal()
    .domain(m3v2_definePurposes)
    .range(['#f70000','#cedbb8','#004bf5','#f5ed00','#df00fc'])
)});
  main.variable(observer("colorsViz2")).define("colorsViz2", function(){return(
['#f70000','#cedbb8','#004bf5','#f5ed00','#df00fc']
)});
  main.variable(observer("m3v2_defineInOutSplits")).define("m3v2_defineInOutSplits", ["d3","m3v2_definePieRadius"], function(d3,m3v2_definePieRadius){return(
d3.arc()
    .innerRadius(0)
    .outerRadius(d=>m3v2_definePieRadius(d.data.total2))
)});
  main.variable(observer("pie")).define("pie", ["d3"], function(d3){return(
d3.pie()
      .value(d => d.amount)
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
md`-----------------
## Appendix`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@6')
)});
  main.variable(observer("googleSheetCsvUrl")).define("googleSheetCsvUrl", function(){return(
'https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/gviz/tq?tqx=out:csv'
)});
  return main;
}
