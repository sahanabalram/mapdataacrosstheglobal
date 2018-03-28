$(document).ready(function(){
    // declare width and height of the whole map visualization
    var width = 1000;
    var height = 400;
// D3 has built in functionality and hence projection is being used to read the geoJSON data
    var projection = d3.geo.equirectangular();
    // lat and lon coordinated gets displayed on the screen
    var path = d3.geo.path().projection(projection);
    // following elements are added to create the SVG canvas
    var svg = d3.select("body").append("svg").attr("width",width).attr("height",height)

    // append the data 
    svg.append("rect").attr("width",width).attr("height",height).attr("fill","white");
    // create an empty placeholder to hold the geomerty elements in the SVG
    var g = svg.append("g");
    // add the d3.json to load the topojson data
    d3.json("https://d3js.org/world-50m.v1.json",function(error,data){
        if(error){
            console.log(error);
        }

        g.append("path").datum(topojson.feature(data,data.objects.countries)).attr("d",path);

        // create the zoom effect

        var zoom = d3.behavior.zoom()
        .on("zoom",function(){
            g.attr("transform","translate(" + d3.event.scale + ")");
            g.selectAll("path").attr("d",path.projection(projection));
        });

        // append zoom effect to the svg canvas
        svg.append("zoom");

        // load data from json file from freecodecamp

        d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",function(error,data){
            if(error){
                console.log(error);
            }

            var locations = data.features;
            // create the meteorite circles
            var hue = 0;
            // create an onject to hold the data of the meteorites 
            locations.map(function(d){
                // each circle has its own property of color
                hue += 0.36;
                d.color = "hsl(" + hue + ", 100%,  50%)";
            });
        })
    })
});