import define1 from "./a33468b95d0b15b0@699.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["countries-50m.json",new URL("./files/55260abbc777c0a3b8fed19f3929dd822fef9d5118b53b76b2176d20782910e599eac919999ea8ee85a60b783fd37082574f6591fd46c0d70ddf9b00df71ce27",import.meta.url)],["m1-viz2-worldGeo.json",new URL("./files/df90bceb57ab0e1109e92519b241aeb3a604f3d4d253e4123af0199abd25dd81dd92e280c413db18a9d8f8a775bd475c60d85546b9184718ded3957e4650a2a5",import.meta.url)],["m1_transformationForV1.json",new URL("./files/8c78734c9e2303a165dbdb917c2de98b5b0bfd73e9c2bdce1a8257a9bd1a1c5c10fb3c617f79e23fc372226a5f0b3e67aa865c369c721cbe42760900ff38e3d7",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Mini-Projects

## Dataset 

AidData Dataset - This dataset contains information about financial transactions for aid purposes between two countries. We load a [simplified and reduced version](https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/) of the [AidData dataset](https://www.aiddata.org/data/aiddata-core-research-release-level-1-3-1).

In the AidData dataset, each row represents a financial transaction between two countries. The dataset contains the following attributes:
1. Year: year of the commitment
2. Donor: country providing the financial resource
3. Recipient: country or organization receiving the money
4. Commitment Amount: the total amount of financial resources provided
5. Coalesced Purpose Name: the purpose of the transaction
`
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
  main.variable(observer("json_data")).define("json_data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("m1_transformationForV1.json").json()
)});
  main.variable(observer("m1_v2_worldGeo")).define("m1_v2_worldGeo", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("m1-viz2-worldGeo.json").json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Mini-Project-1 : Graph Design - GEO

### Visualization 1: The amount donated and recieved by countries

1) How do the countries compare in terms of how much they receive and donate? 

2) Are there countries that donate much more than they receive or receive much more than they donate?
`
)});
  main.variable(observer("mini1_viz1")).define("mini1_viz1", ["d3","DOM","width_m1_viz1","height_m1_viz1","json_data","x_m1_viz1","y_m1_viz1","xAxis_m1_viz1","xAxis2_m1_viz1","yAxis_m1_viz1","margin_m1_viz1"], function(d3,DOM,width_m1_viz1,height_m1_viz1,json_data,x_m1_viz1,y_m1_viz1,xAxis_m1_viz1,xAxis2_m1_viz1,yAxis_m1_viz1,margin_m1_viz1)
{
  const svg = d3.select(DOM.svg(width_m1_viz1, height_m1_viz1));
  
    svg.append("g")
            .selectAll("rect")
            .data(json_data)
            .join("rect")
            .attr("fill", d => d3.interpolateRdGy([d.net_amount > 0 ? 1 :-8]))
      
            .attr("x", d => x_m1_viz1(Math.min(d.net_amount, 0)))
            .attr("y", (d, i) => y_m1_viz1(i))
            .attr("width", d => Math.abs(x_m1_viz1(d.net_amount) - x_m1_viz1(0)))
            .attr("height", y_m1_viz1.bandwidth());

    svg.append("g")
            .attr("font-family", "Saira")
            .attr("font-weight","bold")
            .attr("font-size", 12)
            .selectAll("text")
            .data(json_data)
            .join("text")
            .attr("text-anchor", d => d.net_amount < 0 ? "end" : "start")
            .attr("x", d => x_m1_viz1(d.net_amount) + Math.sign(d.net_amount) * 4)
            .attr("y", (d, i) => y_m1_viz1(i) + y_m1_viz1.bandwidth() / 2)
            .attr("dy", "0.45em")
            .text(d => d.country);

    svg.append("g")
          .call(xAxis_m1_viz1);
	  
    svg.append("g")
	        .call(xAxis2_m1_viz1);	

    svg.append("g")
          .call(yAxis_m1_viz1);

    svg.append('text')
        .attr('x', 225)
        .attr('y',margin_m1_viz1.top +30 )
        .attr("font-family", "Saira")
        .attr("font-weight","bold")
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'hanging')
        .text('Viz 1: The amount donated and recieved by countries');

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
### Note: 

"Appendix: Mini-Project-1 - Visualization 1" contains the margin, variables, axes,.. and other definitions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Visualization 1: Inference

In this visualization, I have considered the top few countries that donated and top few countries that recieved amounts. From the visualization, it is clear that developing countries like India, Thailand, Brazil, Colombia, etc recieve the maximum amount of aid. There are mostly newly developing countries and major developing countries in this list. Therefore, from this visualization - one can conclude that, counntries like India, Brazil, Indonesia, etc receive much more than they donate.

On the contrary, countries like United States, Germany, United Kingdom are developed nations that donate more aid than they recieve. This visualization helps us easily demarcate between the countries that are recieving aid and the ones that are donating aid. We can notice that, there are 2 axis that help us achieve this easy demarcation. 

The idea behind having 2 axis is to use one for donated amount and one for received amount. Furthermore, we are also using 2 different set of colors for the bar representations. Additionally, we are also displaying the name of the country on the diverging bars - which makes it easier to distinguish and understand which country falls into which category. 

The goal of this visualization is to consider the top countries that are donating and receiving aid. We depict these countries using diverging color bars. This form of visualization helps us understand both the ends of the spectrum. Furthermore, we are not considering all the countries in the dataset - as we have picked a narrow scale. Using a much broader scale can help us visualize more countries, but some countries would not have a visible bar representation. Therefore, we pick a relevant scale to get an overall idea of the top few countries. 
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

### Visualization 2: Geographical distribution of Aid Data

 1) Do the countries that mostly receive or mostly donate tend to cluster around specific geographical areas of the world? 

 2) Are there neighboring countries that have radically different patterns in terms of how much they receive vs. how much they donate?

`
)});
  main.variable(observer()).define(["legend","d3","colors"], function(legend,d3,colors){return(
legend({
  color: d3.scaleOrdinal(["> $500B", "$300B-$500B", "Recieved Moderate", "Recieved Less", "<-Recieved","Donated->","Donated Less","Donated Moderate", "$300-$500B", ">$500B"], colors),
  title: "AID : How much donated or recieved in a billion dollar scale",
  tickSize: 10,
  width : 820
})
)});
  main.variable(observer("mini1_viz2")).define("mini1_viz2", ["d3","DOM","width_m1_vis2","height_m1_vis2","margin_m1_vis2","m1_v2_worldGeo","path","m1_vis2_storeUsedCountries","lightgray","color","m1_vis2_computeCountryNet"], function(d3,DOM,width_m1_vis2,height_m1_vis2,margin_m1_vis2,m1_v2_worldGeo,path,m1_vis2_storeUsedCountries,lightgray,color,m1_vis2_computeCountryNet)
{
 
      const svg = d3.select(DOM.svg(width_m1_vis2+500, height_m1_vis2));
 
      const g = svg.append('g')
           .attr('transform', `translate(${margin_m1_vis2.left}, ${margin_m1_vis2.top})`);

      g.selectAll('.border')
          .data(m1_v2_worldGeo.features)
          .join('path')
           .attr('class', 'border')
          .attr('d', path)
          .attr('fill', d => m1_vis2_storeUsedCountries.indexOf(d.properties.name) == -1 ? lightgray : color(m1_vis2_computeCountryNet[d.properties.name]))
          .attr('stroke', 'gray')
          .attr('stroke-width',0.5);
	  
	    g.append('text')
          .attr('x', width_m1_vis2/2)
          .attr('y',margin_m1_vis2.top + 80)
          .attr("font-family", "Saira")
          .attr("font-weight","bold")
          .attr("font-size", 20)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'hanging')
          .text('Visualisation 2: Geographical Distribution of Aid Data');	 

        return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
### Note: 

"Appendix: Mini-Project-1 - Visualization 2" contains the margin, variables, axes,.. and other definitions`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Visualization 2: Inference

In order to depict the geographical distribution of Aid Data, I have used a world map with a spectrum of 2 colors. In this case, I have used "RED" to depict countries where the received amount is more and "NAVY BLUE" to depict countries where donated amount is greater than the recevied amount. The shade of RED/NAVY BLUE encodes the absolute difference between the amount donated and the amount received in $ Billion.
Essentially, a very light shade of RED would mean that the country has recieved aid in small amounts. Similarly, a light shade of BLUE would mean that the country has donated aid in small amounts.

Therefore, we can conclude that the countries that donate more are United States, European Nations like Germany, France, Netherlans, UK, Spain. Similarly, we can conclude that Japan has made significant donations in eastern Asia. Australia - a country that is located south of Indonesia, bordered by the Pacific Ocean and Indian Ocean has also donated aid. 

Developing Countries in Asia and South America like, India, Bangladesh, Brazil, Argentina recieve most of the aid. In the north American region, USA donates the maximum aid. Similarly we see that western european nations donate more while the eastern europen nations receive more. In the Asian side of the globe, Japan donates the highest Aid whereas India, Bangladesh ,etc recieve aid. Uopn, analyzing the data we can conclude that middle eastern countries like Saudi Arabia, UAE, Kuwait give more aid while countries like Russia recieve aid.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Mini-Project-2 : Graph Design - TIME

### Visualization 1: 

a) How does the amount donated vs. amount received change over time for each country? 

b) Are there countries that mostly send or mostly receive and countries that have a similar amount of donations they receive and send?

c) Are there countries that change their role over time? That is, they used to mostly send donations and turn into mostly receiving donations and vice-versa?

d) Are there countries in which you can find a sudden increase ("peak") or a sudden decrease ("valley")?

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

### Visualization 2: 

1) What are the top 10 purposes of disbursements (in terms of total amount of disbursement) and how does their relative amount compare over time? E.g., are there purposes that tend to be prominent for a period of time and others that become more prominent during other periods?

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

### Visualization 3: 

1) Focusing exclusively on countries that receive donations, how do donations shift geographically over time? 

2) Do donations tend to be always in the same regions of the world over the years or they have been shifting over time?

3) Can you build a visualization that shows the “history of donations” so that one can get a sense of which regions of the world have had more need for donations over the years?
`
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
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.variable(observer()).define(["md"], function(md){return(
md`
### Appendix: Mini-Project-1 - Visualization 1`
)});
  main.variable(observer("margin_m1_viz1")).define("margin_m1_viz1", function(){return(
{top: 50, right: 70, bottom: 60, left: 70}
)});
  main.variable(observer("heightOfBar_m1_viz1")).define("heightOfBar_m1_viz1", function(){return(
20
)});
  main.variable(observer("height_m1_viz1")).define("height_m1_viz1", ["json_data","heightOfBar_m1_viz1","margin_m1_viz1"], function(json_data,heightOfBar_m1_viz1,margin_m1_viz1){return(
Math.ceil((json_data.length + 0.7) * heightOfBar_m1_viz1) + margin_m1_viz1.top + margin_m1_viz1.bottom
)});
  main.variable(observer("width_m1_viz1")).define("width_m1_viz1", function(){return(
1000
)});
  main.variable(observer("x_m1_viz1")).define("x_m1_viz1", ["d3","json_data","margin_m1_viz1","width_m1_viz1"], function(d3,json_data,margin_m1_viz1,width_m1_viz1){return(
d3.scaleLinear()
    .domain(d3.extent(json_data, d => d.net_amount))
    .rangeRound([margin_m1_viz1.left, width_m1_viz1 - margin_m1_viz1.right])
)});
  main.variable(observer("y_m1_viz1")).define("y_m1_viz1", ["d3","json_data","margin_m1_viz1","height_m1_viz1"], function(d3,json_data,margin_m1_viz1,height_m1_viz1){return(
d3.scaleBand()
    .domain(d3.range(json_data.length))
    .rangeRound([margin_m1_viz1.top, height_m1_viz1 - margin_m1_viz1.bottom])
    .padding(0.1)
)});
  main.variable(observer("tickFormat")).define("tickFormat", ["d3"], function(d3){return(
d3.formatPrefix(".1", 1e10)
)});
  main.variable(observer("extent")).define("extent", ["d3","json_data"], function(d3,json_data){return(
d3.extent(json_data,d=>d.net_amount)
)});
  main.variable(observer("linear")).define("linear", ["d3"], function(d3){return(
d3.scaleLinear()
 .domain([0,-36606,3397,4000])
  .range(["rgb(171, 0, 41)","rgb(251, 180, 104)","rgb(247, 172, 92)", "rgb(1, 92, 49)"])
)});
  main.variable(observer("xAxis_m1_viz1")).define("xAxis_m1_viz1", ["height_m1_viz1","margin_m1_viz1","d3","x_m1_viz1","width_m1_viz1","tickFormat"], function(height_m1_viz1,margin_m1_viz1,d3,x_m1_viz1,width_m1_viz1,tickFormat){return(
g => g
    .attr("transform", `translate(0,${height_m1_viz1-margin_m1_viz1.bottom+30})`)
    .call(d3.axisTop(x_m1_viz1).ticks(width_m1_viz1 /80).tickFormat(tickFormat))

      .append("text")
        .attr("fill", "black")
        .attr("font-family", "Saira")
        .attr("font-weight","bold")
        .attr("font-size", "20px")
        .attr("x", width_m1_viz1/2)
        .attr("y", 20)
        .text("Net Amount (Defined as : Donated Amount - Received Amount)")
)});
  main.variable(observer("xAxis2_m1_viz1")).define("xAxis2_m1_viz1", ["margin_m1_viz1","d3","x_m1_viz1","width_m1_viz1","tickFormat"], function(margin_m1_viz1,d3,x_m1_viz1,width_m1_viz1,tickFormat){return(
g => g
      .attr("transform", `translate(0,${margin_m1_viz1.top-20})`)
      .call(d3.axisBottom(x_m1_viz1).ticks(width_m1_viz1 / 80).tickFormat(tickFormat))
      .append("text")
        .attr("font-family", "Saira")
        .attr("font-weight","bold")
        .attr("font-size", "20px")
        .attr("fill", "black")
        .attr("x", width_m1_viz1/2)
        .attr("y", -10)
        .text("Net Amount (Defined as : Donated Amount - Received Amount)")
)});
  main.variable(observer("yAxis_m1_viz1")).define("yAxis_m1_viz1", ["x_m1_viz1","d3","y_m1_viz1","json_data"], function(x_m1_viz1,d3,y_m1_viz1,json_data){return(
g => g
    .attr("transform", `translate(${x_m1_viz1(0)},0)`)
    .call(d3.axisLeft(y_m1_viz1).tickFormat(i => json_data[i].name).tickSize(0).tickPadding(6))
    .call(g => g.selectAll(".tick text").filter(i => json_data[i].value < 0)
        .attr("text-anchor", "start")
        .attr("x", 6))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Appendix: Mini-Project-1 - Visualization 2`
)});
  main.variable(observer("colors")).define("colors", function(){return(
['#a50026','#d73027','#f46d43','#f2ac68','#fee08b','#b0fffe','#9a83f7','#5454b8','#271a98','#180068']
)});
  main.variable(observer("lightgray")).define("lightgray", function(){return(
'#dcdcdc'
)});
  main.variable(observer("margin_m1_vis2")).define("margin_m1_vis2", function(){return(
{top: 0, right: 0, bottom: 0, left: 0}
)});
  main.variable(observer("width_m1_vis2")).define("width_m1_vis2", function(){return(
1000
)});
  main.variable(observer("height_m1_vis2")).define("height_m1_vis2", function(){return(
800
)});
  main.variable(observer("changemean")).define("changemean", ["d3","json_data"], function(d3,json_data){return(
d3.mean(json_data, d => d.net_amount)
)});
  main.variable(observer("m1_vis2_storeUsedCountries")).define("m1_vis2_storeUsedCountries", ["json_data"], function(json_data){return(
json_data.map(d => d.country)
)});
  main.variable(observer("m1_vis2_countrySet")).define("m1_vis2_countrySet", ["m1_v2_worldGeo"], function(m1_v2_worldGeo){return(
m1_v2_worldGeo.features.map(d => d.properties.name)
)});
  main.variable(observer("m1_vis2_computeCountryNet")).define("m1_vis2_computeCountryNet", ["json_data"], function(json_data){return(
Object.fromEntries(new Map(json_data.map(d => [d.country, d.net_amount])))
)});
  main.variable(observer("projection")).define("projection", ["d3","width_m1_vis2","height_m1_vis2","m1_v2_worldGeo"], function(d3,width_m1_vis2,height_m1_vis2,m1_v2_worldGeo){return(
d3.geoNaturalEarth1()
      .fitSize([width_m1_vis2, height_m1_vis2], m1_v2_worldGeo)
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath().projection(projection)
)});
  main.variable(observer("m1_vis2_computeNetSet")).define("m1_vis2_computeNetSet", ["json_data"], function(json_data){return(
json_data.map(d=>d.net_amount)
)});
  main.variable(observer("color")).define("color", ["d3","m1_vis2_computeNetSet"], function(d3,m1_vis2_computeNetSet){return(
d3.scaleQuantile().domain(m1_vis2_computeNetSet)
.range(['#a50026','#d73027','#f46d43','#f2ac68','#fee08b','#b0fffe','#9a83f7','#5454b8','#271a98','#180068'])
)});
  main.variable(observer("lineardiv")).define("lineardiv", ["d3","json_data"], function(d3,json_data){return(
d3.scaleDiverging().domain(json_data.map(d=>d.net_amount))
   .interpolator(d3.interpolateRdBu)
)});
  main.variable(observer("x")).define("x", ["d3"], function(d3){return(
d3.scaleLinear()
    .domain([-1, 1])
    .range([0, 960])
)});
  return main;
}
