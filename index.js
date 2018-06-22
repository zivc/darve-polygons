const lines = require('./lines.js');

const normalisedLines = lines.map(stringify);

normalisedLines.forEach(plot => {
   console.log('');
   console.log('');
   const { start, end } = plot;
   if (start && end) {
      console.log('plot', [plot]);
      var outcome = getLineThatStartsOn([plot], start);
      console.log('Line', plot, (outcome ? 'forms' : 'doesnt'), 'complete polygon');
      if (outcome) {
         console.log('Lines used to complete polygon:');
         console.table(outcome);
      }
   }
});

function stringify(obj) {
   let start = '';
   let end = '';
   if (!obj) return {start,end};
   start = obj.lines;
   end = start.splice(2);
   return {start: start.toString(), end: end.toString()};
}

function getLineThatStartsOn(currentPlots, origin) {
   const results = normalisedLines.filter(({start,end}) => {
      if (!start || !end) return;
      return start === currentPlots[currentPlots.length - 1].end;
   });
   if (!results.length) return false;
   if (results[0].start === origin) return [...currentPlots, results[0]];
   return getLineThatStartsOn([...currentPlots, results[0]], origin);
}
