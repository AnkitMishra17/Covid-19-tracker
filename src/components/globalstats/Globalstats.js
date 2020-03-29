import React from 'react';
let covid = require('novelcovid');

function Globalstats() {
  (async () => {
    let data = await covid.getCountry({country: 'United States'});
    Object.entries(data).map(([key, value]) => {
      let node = document.createElement("LI");
      let textnode;
        textnode = document.createTextNode(`${key} : ${value}`);
      node.appendChild(textnode);
      let stats = document.getElementById('stats');
      stats.appendChild(node);});
})();
    return (
        <div>
        <ul id="stats"></ul>
        </div>
    )
}

export default Globalstats;
