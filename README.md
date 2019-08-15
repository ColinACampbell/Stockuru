# Stockuru
Web app that allow users to search the price trend and volume for a given stock on the NASDAQ given the trading symbol.

# How does it work ?
The application was built using the [AngularJS framework](https://angularjs.org/), [VIS JS library](https://visjs.org/) for data visualization and the [Alpha Vantage API](https://www.alphavantage.co/documentation/) for providing the data sets.

# What have I learned ?
I've learned how to make REST API calls and parsing JSON array into objects that would be parsed into the graphing API. 

# How to use it.
1. Clone the repository.
2. Open `index.html` in any browser.
3. VIOLA !.

## Please Note
The api key used on this repository is the demonstration key used in the [Alpha Vantage API](https://www.alphavantage.co/documentation/) tutorials, you may use your own key if you wish ( amount of calls/searches allowed per minute is limited ).

# ScreenShots
## Mobile
![Mobile upper half](https://github.com/ColinACampbell/Stockuru/blob/master/graphics/Mobile_Top.png)  
![Mobile lower half](https://github.com/ColinACampbell/Stockuru/blob/master/graphics/Mobile_Low.png)  
## Desktop
![Mobile upper half](https://github.com/ColinACampbell/Stockuru/blob/master/graphics/Full_Top.png)  
![Mobile lower half](https://github.com/ColinACampbell/Stockuru/blob/master/graphics/Full_Low.png)  

# Challanges/Issues
While on a slow internet connection, whenever a different symbol is entered and searched, instead of the graphs being deleted and drawn again to represent they newly searched stock, the graphs for the newly entered stocks are drawn under the graphs of the previously searched stock. 
