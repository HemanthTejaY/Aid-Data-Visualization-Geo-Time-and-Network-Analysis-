import define1 from "./a33468b95d0b15b0@699.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["countries-50m.json",new URL("./files/55260abbc777c0a3b8fed19f3929dd822fef9d5118b53b76b2176d20782910e599eac919999ea8ee85a60b783fd37082574f6591fd46c0d70ddf9b00df71ce27",import.meta.url)],["mainData-m3.json",new URL("./files/11fa6f582c09e348cc563c32c01cb343d5f4f7408b1176a3d9ea52273b247f1495fa9c4ae57ce14fca21f141f9c7433c8bd424893899a52370d3b91d5673093b",import.meta.url)]]);
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
  main.variable(observer("m3v1_mainData")).define("m3v1_mainData", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("mainData-m3.json").json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Mini-Project-3 : Networks

### Visualization 1: Relationship between countries(Aid Donated/Recieved)

Create an overview of the relationships between countries so that it is possible to see who donates to whom and how much. The main question one should be able to answer is: who are the major donors and to which countries do they donate the most and how much? And conversely, who are the major receivers and which countries do they receive from the most and how much? We only care about the top 10 recipients and the top 20 donors (over the whole time) for this question

`
)});
  main.variable(observer()).define(["legend","d3"], function(legend,d3){return(
legend({
  color: d3.scaleDiverging([0, 40], d3.interpolateReds),
  title: "Donated Amount (in billion $)- Ranging from 0 (white color) to 40,000,000,000 $ (Dark Red)",
  tickFormat: "+%",
  tickSize: 30,
  width: 700
})
)});
  main.variable(observer("m3v1_rep1")).define("m3v1_rep1", ["d3","DOM","m3v1_rep1_width","m3v1_rep1_height","m3v1_rep1_margin","m3v1_rep1_X","m3v1_rep1_Y","m3v1_mainData","m3v1_rep1_color"], function(d3,DOM,m3v1_rep1_width,m3v1_rep1_height,m3v1_rep1_margin,m3v1_rep1_X,m3v1_rep1_Y,m3v1_mainData,m3v1_rep1_color)
{
  const svg = d3.select(DOM.svg(m3v1_rep1_width, m3v1_rep1_height));

  const g = svg.attr('width', m3v1_rep1_width - m3v1_rep1_margin.right )
        .attr('height', m3v1_rep1_height + m3v1_rep1_margin.top + m3v1_rep1_margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + m3v1_rep1_margin.left + ','+m3v1_rep1_margin.top+')')
      
  g.append('g')
    .append('rect')
    .attr('x', 0)
    .attr('y',0)
    .attr('width', m3v1_rep1_width)
    .attr('height', m3v1_rep1_height)
    .attr('fill','lightgray')
   
    
  g.append('g')
        .attr('transform', 'translate(0,-1)')
        .call(d3.axisTop(m3v1_rep1_X))
        .append('text')
        .attr('x', (m3v1_rep1_width-m3v1_rep1_margin.left-m3v1_rep1_margin.right) / 2 )
        .attr('y', -30)
        .attr('fill', 'black') 
        .attr('text-anchor', 'middle')
        .attr("font-family", "Saira")
        .attr("font-size", "22px")
        .attr("font-weight","bold")
        .text('Recipient Nation');
        
 g.append('g')
        .attr('transform', 'translate(0,0 )')
        .call(d3.axisLeft(m3v1_rep1_Y))
	    .append('text')
        .attr('x',-50)
        .attr('y', m3v1_rep1_height/2)
        .attr('fill', 'black') 
	      .attr("font-family", "Saira")
        .attr("font-size", "22px")
        .attr("font-weight","bold")
        .attr('text-anchor', 'top')
        .text('Donor Nation');
    
  g.selectAll()
    .data(m3v1_mainData)
    .enter()
    .append('rect')
    .attr('x', (d) => m3v1_rep1_X(d.recipient))
    .attr('y', (d) => m3v1_rep1_Y(d.donor))
    .attr('width', m3v1_rep1_X.bandwidth())
    .attr('height', m3v1_rep1_Y.bandwidth())
    .attr('fill', (d=> m3v1_rep1_color(d.donated_amount)))
	  .style("stroke", 'lightgray')
    .style("stroke-width", 1);
  
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
## Inference Visualization-1`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
I have used a heatmap to represent the amount donated between countries. Note that, we are considering the top 20 donors and top 10 recipients. We are representing the top 20 donor nations on the Y axis and the top 10 recipient nations on the X axis. Note that I am using a red diverging scale to represent the amount donated. A darker shade of red represents a higher amount donated and a lighter shade of red represents a lower amount donated. Also note that the heatmap is sorted in terms of donated amount and recieved amount. This means that the top donors are represented on the topmost part of Y axis and the top recieveing countries are represented on the leftmost part of X axis. 

We can make many inferences: for example, Japan makes the most donations to India. India also recieves donations from USA, Germany and UK. Germany makes significant donations to Poland and India. We can also infer about the recieveing nations. For example, Brazil recieves most of donations from USA and Japan. However, Brazil also recieves donations from Germany and France. Thailand on the other hand recieves most of its donations from Japan.

Therefore, amoung the top 20 donor nations - we can conclude that United States, Japan, Germany and United Kingdom make significant donations. USA and Japan combined donate aid greater than $30,000,000,000. Furthermore, amoung the top 10 donor nations - India and Thailand are 2 nations that recieve a lot of aid. Other nations like Brazil, Columbia and Korea also recieve aid - but not as much as India and Thailand.

Hence, the major recievers are India and Thailand. India recieves a combined aid greater than $40,000,000,000 from USA, Japan, Germany and UK. `
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-----------------
## Appendix- Visualization-1`
)});
  main.variable(observer("lightgray")).define("lightgray", function(){return(
'#dcdcdc'
)});
  main.variable(observer("m3v1_rep1_margin")).define("m3v1_rep1_margin", function(){return(
{ top: 230, right: 60, bottom: 460, left:300 }
)});
  main.variable(observer("m3v1_rep1_height")).define("m3v1_rep1_height", function(){return(
900
)});
  main.variable(observer("m3v1_rep1_width")).define("m3v1_rep1_width", function(){return(
1100
)});
  main.variable(observer("m3v1_rep1_X")).define("m3v1_rep1_X", ["d3","rep1_defineSetRecipients","m3v1_rep1_width","m3v1_rep1_margin"], function(d3,rep1_defineSetRecipients,m3v1_rep1_width,m3v1_rep1_margin){return(
d3.scaleBand()
.domain(rep1_defineSetRecipients)
.range([0, m3v1_rep1_width-m3v1_rep1_margin.left-m3v1_rep1_margin.right])
.padding(0.006)
)});
  main.variable(observer("m3v1_rep1_Y")).define("m3v1_rep1_Y", ["d3","rep1_defineSetDonors","m3v1_rep1_height"], function(d3,rep1_defineSetDonors,m3v1_rep1_height){return(
d3.scaleBand().domain(rep1_defineSetDonors).range([0,m3v1_rep1_height]).padding(0.006)
)});
  main.variable(observer("rep1_defineSetRecipients")).define("rep1_defineSetRecipients", function(){return(
['India','Thailand','Brazil','Colombia','Korea','Poland','South Africa','Kuwait','Chile','Saudi Arabia']
)});
  main.variable(observer("rep1_defineSetDonors")).define("rep1_defineSetDonors", function(){return(
['United States','Japan','Germany','United Kingdom','France','Netherlands','Canada','Sweden','Norway','Italy','Denmark','Switzerland','Australia','Belgium','Spain','Saudi Arabia','Kuwait','Korea','Austria','Finland']
)});
  main.variable(observer("rep1_recipient")).define("rep1_recipient", ["d3","m3v1_mainData"], function(d3,m3v1_mainData){return(
d3.set(m3v1_mainData.map(d=> d.recipient)).values()
)});
  main.variable(observer("rep1_totalDonationsAmt")).define("rep1_totalDonationsAmt", ["m3v1_mainData"], function(m3v1_mainData){return(
m3v1_mainData.map(d=>d.net_amount)
)});
  main.variable(observer("m3v1_rep1_Mean")).define("m3v1_rep1_Mean", ["d3","m3v1_mainData"], function(d3,m3v1_mainData){return(
d3.mean(m3v1_mainData.map(d => d.donated_amount))
)});
  main.variable(observer("m3v1_rep1_color")).define("m3v1_rep1_color", ["d3"], function(d3){return(
d3.scaleSequential()
                .domain([0,48830067295])
                .interpolator(d3.interpolateReds)
)});
  main.variable(observer("m3v1_rep1_countries")).define("m3v1_rep1_countries", ["d3","m3v1_mainData"], function(d3,m3v1_mainData){return(
d3.set(m3v1_mainData.map(d=> d.donor)).values()
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
require('d3@5')
)});
  main.variable(observer("googleSheetCsvUrl")).define("googleSheetCsvUrl", function(){return(
'https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/gviz/tq?tqx=out:csv'
)});
  return main;
}
