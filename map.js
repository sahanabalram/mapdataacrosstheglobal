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

            // append the circle data in svg canvas using D3 selectAll inbuit method
            g.selectAll("circle").data(locations).enter().append("circle").attr("cx",function(d){
                if(d.geometry){
                    return projection([d.geometry.coordinates[0],d.geometry.coordinates[1]])[0];
                }
            })
            .attr("cy",function(d){
                if(d.geometry){
                    return projection([d.geometry.coordinates[0],d.geometry.coordinates[1]])[1];
                }
            })

            .attr("r",function(d){
                if(d.properties.mass){
                    // math.pow is used to display the mass from the json data that is received
                    return Math.pow(parseInt(d.properties.mass), 1 / 9);
                }
            })
            // fill circle with  colors
            .style("fill",function(d){
                return d.color;
            })
// append data from the json file given by freecodecamp on the tooltip
            .on("mouseover",function(data){
                d3.select(this).style("fill","black");
                d3.select("#name").text(data.properties.name);
                d3.select("#nametype").text(data.properties.nametype);
                d3.select("#fall").text(data.properties.fall);
                d3.select("#mass").text(data.properties.mass);
                d3.select("#recclass").text(data.properties.recclass);
                d3.select("#reclat").text(data.properties.reclat);
                d3.select("#reclong").text(data.properties.reclong);
            })
        })
    })
});