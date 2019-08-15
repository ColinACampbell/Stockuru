let app = angular.module("App",[]);

// TODO refractor this code

app.controller("App-Controller",($scope,$http)=>{

    timeSeriesDate = new RefractorInterface().getTimeSeriesDate();
    refractorInterface = new RefractorInterface();
    $scope.error = false;

    // called on ng-click for search button
    $scope.search = function()
    {

        if ($scope.results) // due to some logical error regarding the graph, the result to show must be true in order for the graph to be destroyed
            refractorInterface.destroyGraphs(); // destroy the old graph to replace it with a new graph
       

        let symbol = $scope.searchBoxValue;
        $http(
            {
                method:"GET",
                url:"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+symbol+"&interval=5min&interval=1min&apikey=8BVNR2HVI48HGDV5",
            }
            ).then((response)=>{

                    console.log(response.data)
                    $scope.rawData = response.data

                    if ("Error Message" in $scope.rawData)
                    {
                        console.log("Sorry Something went wrong");
                        $scope.results = false;
                        $scope.error = true;
                        //alert("You have exceeded the amount of calls that can be made, or the symbol doesn't exists");

                    }
                        

                    $scope.timeSeriesData = $scope.rawData['Time Series (Daily)'];// get time seriese objects

                     // show graphs for volume traded and closing price timeline
                    refractorInterface.showVolumeGraph($scope.timeSeriesData);
                    refractorInterface.showClosingGraph($scope.timeSeriesData);

                    
                    $scope.statistics = $scope.timeSeriesData[timeSeriesDate]; 
                    //console.log(timeSeriesDate)
                    console.log($scope.statistics)
 
                    // results are used to display the table if any object is returned from the url
                    $scope.results = true
                    $scope.error = false;
                    if ($scope.statistics === null || $scope.statistics === undefined)
                    {
                        $scope.results = false;
                    }
                    else 
                        $scope.results == true;
    
                    $scope.info = {
                        name: symbol,
                        open :  Number(Math.round($scope.statistics['1. open'] +'e2')+'e-2'), // refractor this code here
                        close : Number(Math.round($scope.statistics['4. close'] +'e2')+'e-2') ,
                        high :  Number(Math.round($scope.statistics['2. high'] +'e2')+'e-2'),
                        low :   Number(Math.round($scope.statistics['3. low'] +'e2')+'e-2') ,
                        volume : Number(Math.round($scope.statistics['5. volume'] +'e2')+'e-2') 
                    }
    
                    //console.log($scope.info)
            })
    }
})


// Class provides methods for code that needs organization has but no explicit obligation to a defined concept
class RefractorInterface
{  
    getTimeSeriesDate()
    {


        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        
        let date = new Date();
        let month = date.getMonth() + 1;
        let monthDate = date.getDate(); // get the day of the month from 1 - 31
        let day = date.getDay(); // get the day of the week, eg returns 0, if day is sunday, 1 if monday, etc.
        let year = date.getFullYear();

        let currentDay = days[day];
        let isSaturday = currentDay.localeCompare(days[6]);
        let isSunday = currentDay.localeCompare(days[0])

        if (isSaturday === 0) // if its a saturday
        {
            monthDate = monthDate - 1 // represents a friday
        }
        else if (isSunday === 0)
        {
            monthDate = monthDate - 2 // also represents a friday
        }
           


        // stringfy the dates to make them double digits as strings
        month = month.toString();
        monthDate = monthDate.toString();

        if ( month.length === 1)
            month = "0" + month;
        if ( monthDate.length === 1)
            monthDate = "0" + monthDate;

        // yyyy-mm-dd
        var timeSeriesDate = year +"-"+ month + "-" + monthDate;
        console.log(timeSeriesDate);
        return timeSeriesDate;
    }


    showVolumeGraph(timeSeriesStamps)
    {

        if (timeSeriesStamps === null || timeSeriesStamps === undefined )
            return;

        let items = [];
        let stampKeys = Object.keys(timeSeriesStamps);

        //console.log(timeSeriesStamps['2019-05-10']);

        for (let i = 0; i < stampKeys.length ; i++)
        {
            let item = {};
            let stampKey = stampKeys[i];
            let statistics = timeSeriesStamps[stampKey]
            //console.log(stampKey);

            let date = stampKey;
            let volume = Number(Math.round(statistics['5. volume'] +'e2')+'e-2');

            item.x = date;
            item.y = volume;
            item.group = 1;
            items.push(item);
        }


        var container = document.getElementById('volume-trend-graph');
        console.log(container)
        var dataset = new vis.DataSet(items);
        var options = {
            start: stampKeys[stampKeys.length - 1],
            end: stampKeys[0],
            width:  '95%',
            height: '350px'
        };

        this.volumeGraph = new vis.Graph2d(container, dataset,options);
        //console.log(items);
    }

    showClosingGraph(timeSeriesStamps)
    {

        if (timeSeriesStamps === null || timeSeriesStamps === undefined )
            return;

        let items = [];
        let stampKeys = Object.keys(timeSeriesStamps);

        //console.log(timeSeriesStamps['2019-05-10']);

        for (let i = 0; i < stampKeys.length ; i++)
        {
            let item = {};
            let stampKey = stampKeys[i];
            let statistics = timeSeriesStamps[stampKey]
            //console.log(stampKey);

            let date = stampKey;
            let closing = Number(Math.round(statistics['4. close'] +'e2')+'e-2');

            item.x = date;
            item.y = closing;
            item.group = 1;
            items.push(item);
        }


        var container = document.getElementById('price-trend-graph');
        console.log(container)
        var dataset = new vis.DataSet(items);
        var options = {
            start: stampKeys[stampKeys.length - 1],
            end: stampKeys[0],
            width:  '95%',
            height: '350px'
        };

        this.closingGraph = new vis.Graph2d(container, dataset,options);
        //console.log(items);
    }

    destroyGraphs()
    {
        if (this.volumeGraph != undefined)
        {
            this.volumeGraph.destroy();
        }

        if ( this.closingGraph != undefined)
        {
            this.closingGraph.destroy();
        }
    }
}