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

**View Code** : [Click Here](https://observablehq.com/d/274d3900fadd46c1) 

#### Visualization 2:
**Question:** Do the countries that mostly receive or mostly donate tend to cluster around specific geographical areas of the world? Are there neighboring countries that have radically different patterns in terms of how much they receive vs. how much they donate?

 <p align="center">
  <img height="320" width="600" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/m1V2.png">
</p>

**INFERENCE :** In order to depict the geographical distribution of Aid Data, I have used a world map with a spectrum of 2 colors. In this case, I have used "RED" to depict countries where the received amount is more and "NAVY BLUE" to depict countries where donated amount is greater than the recevied amount. The shade of RED/NAVY BLUE encodes the absolute difference between the amount donated and the amount received in $ Billion. Essentially, a very light shade of RED would mean that the country has recieved aid in small amounts. Similarly, a light shade of BLUE would mean that the country has donated aid in small amounts.

Therefore, we can conclude that the countries that donate more are United States, European Nations like Germany, France, Netherlans, UK, Spain. Similarly, we can conclude that Japan has made significant donations in eastern Asia. Australia - a country that is located south of Indonesia, bordered by the Pacific Ocean and Indian Ocean has also donated aid.

Developing Countries in Asia and South America like, India, Bangladesh, Brazil, Argentina recieve most of the aid. In the north American region, USA donates the maximum aid. Similarly we see that western european nations donate more while the eastern europen nations receive more. In the Asian side of the globe, Japan donates the highest Aid whereas India, Bangladesh ,etc recieve aid. Uopn, analyzing the data we can conclude that middle eastern countries like Saudi Arabia, UAE, Kuwait give more aid while countries like Russia recieve aid.

**View Code** : [Click Here](https://observablehq.com/d/274d3900fadd46c1) 

## Graph Design: TIME
#### Visualization 1:
**Question:**  a) How does the amount donated vs. amount received change over time for each country? <br/>
b) Are there countries that mostly send or mostly receive and countries that have a similar amount of donations they receive and send? <br/>
c) Are there countries that change their role over time? That is, they used to mostly send donations and turn into mostly receiving donations and vice-versa? <br/>
d) Are there countries in which you can find a sudden increase ("peak") or a sudden decrease ("valley")? <br/>


**View Code** : [Click Here](https://observablehq.com/d/9c18e1ca8e484c1a) 


**INFERENCE :** 

#### Visualization 2:
**Question:**

**INFERENCE :** 




