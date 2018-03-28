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
    svg.append("rect").attr("width",width).attr("height",height)
});