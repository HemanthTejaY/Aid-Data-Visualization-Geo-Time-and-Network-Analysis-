# AidData Visualization: Geo,Time & Network Analysis
In this project, I have used **D3.js** to engineer a comprehensive dashboard that answers various questions about global AidData.

**Dataset Used** : [AidData Dataset](https://www.aiddata.org/data/aiddata-core-research-release-level-1-3-1) 

**Simplified Copy of the Dataset Used** : [Simplified Dataset](https://drive.google.com/open?id=1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8) 

In the AidData dataset, each row represents a financial transaction between two countries. The dataset contains the following attributes:
* Year: year of the commitment
* Donor: country providing the financial resource
* Recipient: country or organization receiving the money
* Commitment Amount: the total amount of financial resources provided
* Coalesced Purpose Name: the purpose of the transaction

Below is an **example** of the data:

 <p align="center">
  <img height="225" width="850" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/data.png">
</p>

## Graph Design: GEO 

**Visualization 1:** How do the countries compare in terms of how much they receive and donate? Are there countries that donate much more than they receive or receive much more than they donate?

 <p align="center">
  <img height="625" width="850" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/m1V1.svg">
</p>


**Visualization 2:** Do the countries that mostly receive or mostly donate tend to cluster around specific geographical areas of the world? Are there neighboring countries that have radically different patterns in terms of how much they receive vs. how much they donate?

 <p align="center">
  <img height="225" width="650" src="https://github.com/HemanthTejaY/Aid-Data-Visualization-Geo-Time-and-Network-Analysis-/blob/main/images/m1V2.png">
</p>

**Visualization 3:** Are there any major differences in how the top 5 most frequent purposes of disbursements (across all countries) distribute geographically in terms of  countries that receive donations? Are there countries that tend to receive more of certain types of donations than others?


