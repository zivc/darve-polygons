const lines = require('./lines.js');

/*
   Comparing comparing an array of two numbers is easier
   to compare them when we are strings
   [100,200].toString() returns "100,200"

   Lets simplify the lines array to an object with a start and end
   attribute. This makes it a little more readable than refering to
   arr[0] and arr[1] etc.

   Also if the plot is null, lets just return two empty start and end
   positions, '' and ''
 */
const normalisedLines = lines.map(plot => {
   let start = null;
   let end = null;
   if (!plot) return {start, end};
   start = plot.lines;
   end = start.splice(2);
   return {start: start.toString(), end: end.toString()};
});

console.log('Looping through each line in the array from lines.js, after we have normalised it');

normalisedLines.forEach(plot => {

   // Get start and end constants from current plot we are working with
   const { start, end } = plot;

   // make sure they have values and aren't nulls
   if (start && end) {

      // Get the outcome of our recursive function
      const outcome = getCompletePolygonForPlot([plot], start);

      // If we have an outcome, spit it out
      if (outcome) {
         plot.polygon = true;
         console.log(''); console.log(''); // ignore these
         console.log('Lines used to complete polygon:');
         console.table(outcome);
      }

   }

});

function getCompletePolygonForPlot(currentPlots, origin) {
   // currentPlots is an array of the lines we've processed so far
   // origin is the start point of the first line

   // Out of all the lines we have plotted, find one that
   // matches the end value of the last plot we added to currentPlots
   const results = normalisedLines.filter(({start, end}) => {
      // if no start or end, return false
      if (!start || !end) return false;

      return start === currentPlots[currentPlots.length - 1].end;
   });

   // If no results, return false
   if (!results.length) return false;

   if (results[0].polygon) return false; // Already done this one, duplicate otherwise

   // If the first result matches the origin, return the currentPlots
   // the first item in currentPlots is this one
   if (results[0].start === origin) return currentPlots;

   // Otherwise, the line we have is connected, but isnt the final line
   // in this polygon, so lets repeat with this new value
   return getCompletePolygonForPlot([...currentPlots, results[0]], origin);
}
