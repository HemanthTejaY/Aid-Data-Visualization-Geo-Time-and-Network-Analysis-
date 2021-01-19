# AidData Visualization: Geo,Time & Network Analysis
In this project, I have used **D3.js** to engineer a comprehensive dashboard that answers various questions about global AidData.

**Dataset Used** : [AidData Dataset](https://www.aiddata.org/data/aiddata-core-research-release-level-1-3-1) 

**Simplified Copy of the Dataset Used** : [Simplified Dataset](https://drive.google.com/open?id=1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8) 

In the AidData dataset, each row represents a financial transaction between two countries. The dataset contains the following attributes:
* **Year:** year of the commitment
* **Donor:** country providing the financial resource
* **Recipient:** country or organization receiving the money
* **Commitment Amount:** the total amount of financial resources provided
* **Coalesced Purpose Name:** the purpose of the transaction

Below is an **example** of the data:

 <p align="center">
  <img height="225" width="850" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/data.png">
</p>

## Graph Design: GEO 

#### Visualization 1:
**Question:** How do the countries compare in terms of how much they receive and donate? Are there countries that donate much more than they receive or receive much more than they donate?

 <p align="center">
  <img height="600" width="850" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/m1V1.svg">
</p>

**INFERENCE :** In this visualization, I have considered the top few countries that donated and top few countries that recieved amounts. From the visualization, it is clear that developing countries like India, Thailand, Brazil, Colombia, etc recieve the maximum amount of aid. There are mostly newly developing countries and major developing countries in this list. Therefore, from this visualization - one can conclude that, counntries like India, Brazil, Indonesia, etc receive much more than they donate.

On the contrary, countries like United States, Germany, United Kingdom are developed nations that donate more aid than they recieve. This visualization helps us easily demarcate between the countries that are recieving aid and the ones that are donating aid. We can notice that, there are 2 axis that help us achieve this easy demarcation.

The idea behind having 2 axis is to use one for donated amount and one for received amount. Furthermore, we are also using 2 different set of colors for the bar representations. Additionally, we are also displaying the name of the country on the diverging bars - which makes it easier to distinguish and understand which country falls into which category.

The goal of this visualization is to consider the top countries that are donating and receiving aid. We depict these countries using diverging color bars. This form of visualization helps us understand both the ends of the spectrum. Furthermore, we are not considering all the countries in the dataset - as we have picked a narrow scale. Using a much broader scale can help us visualize more countries, but some countries would not have a visible bar representation. Therefore, we pick a relevant scale to get an overall idea of the top few countries.

**View Notebook** : [Click Here](https://observablehq.com/d/274d3900fadd46c1) 

#### Visualization 2:
**Question:** Do the countries that mostly receive or mostly donate tend to cluster around specific geographical areas of the world? Are there neighboring countries that have radically different patterns in terms of how much they receive vs. how much they donate?

 <p align="center">
  <img height="320" width="600" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/m1V2.png">
</p>

**INFERENCE :** In order to depict the geographical distribution of Aid Data, I have used a world map with a spectrum of 2 colors. In this case, I have used "RED" to depict countries where the received amount is more and "NAVY BLUE" to depict countries where donated amount is greater than the recevied amount. The shade of RED/NAVY BLUE encodes the absolute difference between the amount donated and the amount received in $ Billion. Essentially, a very light shade of RED would mean that the country has recieved aid in small amounts. Similarly, a light shade of BLUE would mean that the country has donated aid in small amounts.

Therefore, we can conclude that the countries that donate more are United States, European Nations like Germany, France, Netherlans, UK, Spain. Similarly, we can conclude that Japan has made significant donations in eastern Asia. Australia - a country that is located south of Indonesia, bordered by the Pacific Ocean and Indian Ocean has also donated aid.

Developing Countries in Asia and South America like, India, Bangladesh, Brazil, Argentina recieve most of the aid. In the north American region, USA donates the maximum aid. Similarly we see that western european nations donate more while the eastern europen nations receive more. In the Asian side of the globe, Japan donates the highest Aid whereas India, Bangladesh ,etc recieve aid. Uopn, analyzing the data we can conclude that middle eastern countries like Saudi Arabia, UAE, Kuwait give more aid while countries like Russia recieve aid.

**View Notebook** : [Click Here](https://observablehq.com/d/274d3900fadd46c1) 

## Graph Design: TIME
#### Visualization 1:
**Question:**  a) How does the amount donated vs. amount received change over time for each country? <br/>
b) Are there countries that mostly send or mostly receive and countries that have a similar amount of donations they receive and send? <br/>
c) Are there countries that change their role over time? That is, they used to mostly send donations and turn into mostly receiving donations and vice-versa? <br/>
d) Are there countries in which you can find a sudden increase ("peak") or a sudden decrease ("valley")? <br/>

 <p align="center">
  <img height="520" width="800" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/m2V1.png">
</p>

**View Notebook** : [Click Here](https://observablehq.com/d/9c18e1ca8e484c1a) 

**INFERENCE :** In order to answer this question, I have used a heat map with a diverging scale. Note that, the scale uses multiple colors across the spectrum. This helps us get a vivid idea by mapping the respective color. Therefore, by using a diverging color scale with multiple colors, we are able to depict how the donated and received amount varies with time across the different countries.

We are creating a scale ranging from low to high differences in millions of dollars and use this value to determine the color of the cell in the heatmap. Through this heatmap, we are analyzing data from the years 1973 to 2009. A heatmap will help us view the data of multiple countries at the same time. This form of representation will help us compare countries easily and also understand the pattern changes of each country over time. A color scale with multiple colors helps us in understanding these patterns better.

Furthermore, using a heatmap with a common color scale, helps us study the patterns for different countries at the same time. Using a heatmap would be more helpful to compare countries, rather than generating a seperate graph for each country. Furthermore, from the graph we can observe that countries that have provided more donations are in the bottom of the heatmap,while countries which recieve more donations are placed on the top. Ordering the countries in this way, will help us group and demarcate the countries in a better way.

From the heatmap, one can easily infer that countries like India, Thailand and Brazil mostly recieve while on the other hand, countries like Germany and United States mostly donate. We can also conclude that countries like Spain, Korea, Norway, etc which used to receive donations in the earlier years (before 2000s) but have now started giving more donations in 2000s.

This form of represenatation can also help us determine, the lows and highs. In other words, we can determine - which year what country donated the maximum amount (in the given time frame) or which country recieved the maximum amount in a given year. A lot of examples can be seen of the peaks and valleys in the graph. For example, we see that Spain's donations peak around 2006 - 2010. We see a valley for Kuwait in 1992. We see a valley for Australia in 2001. We can also see a valley for Ireland in 2002. So many such examples can be provided of peaks and valleys.

#### Visualization 2:
**Question:**

 <p align="center">
  <img height="420" width="550" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/m2V2.png">
</p>

**View Notebook** : [Click Here](https://observablehq.com/d/9d2e3cf8fa48ca17)

**INFERENCE :** Here I have used a line chart to show how the top 10 purposes of disburements vary over time. Each line is color coded and represents a purpose of disburement.This graph provides easy way to see the variations in each of the purposes as well as compare them amongst each other. By using this form of representation, we can compare the top 10 purposes of disburements with their variations in amounts over time. This graph provides easy way to see the variations in each of the purposes as well as compare them amongst each other. We see that RESCHEDULING AND REFINANCING has higher amount than other purposes. 

We can see an increasing trend in Mineral/Metal prospection and exploration purpose and the Telecommunications purpose. These purposes have have more amount in the 2000s. We see that RESCHEDULING AND REFINANCING has an increasing trend during the 90s but starts decreasing during 2000s. Similarly, Power generation/renewable sources has an increasing trend during the early 2000s but starts decreasing post 2005.We also see sudden peaks and valleys. RESCHEDULING AND REFINANCING had peaks in early 1990s and Power generation/renewable sources had peaks post 1990s. We also see sudden peaks and valleys in the graphs of Mineral/Metal prospection and exploration.

## Graph Design: NETWORKS
#### Visualization 1:
**Question:**   Create an overview of the relationships between countries so that it is possible to see who donates to whom and how much. The main question one should be able to answer is: who are the major donors and to which countries do they donate the most and how much? And conversely, who are the major receivers and which countries do they receive from the most and how much? (we only care about the top 10 recipients and the top 20 donors)

 <p align="center">
  <img height="620" width="550" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/m3v22.png">
</p>

**View Notebook** : [Click Here](https://observablehq.com/d/47dbfe4c5b979c21)

#### Visualization 2:
**Question:**  Considering only the top 5 purposes of donation, how does the relationship between countries look like in terms of purposes? What composition (distribution) of  purposes do the donations between each pair of countries have? Are there countries that donate to a given country using multiple purposes? Or do counties always donate using one single purpose when donating to another country? (we only care about the top 10 recipients and the top 20 donors)

**View Notebook** : [Click Here](https://observablehq.com/d/a2b5cf8fe2f02367)
