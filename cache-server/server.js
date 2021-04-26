const fetch = require('node-fetch');

var query = `    {
  getPerson(p_name: "Valentin") {
      name
      age
      height
  }
}`;
   
  fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));