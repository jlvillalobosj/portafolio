function GET(url){
    return fetch(url,
       { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
  }
  
  function GETbyID(url){
    return fetch(url,
       { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
  }

function POST(url,body){
    return fetch(url,
       { 
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
  }
  
  function PUT(url, body){
    return fetch(url,
       { 
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
  }

  function Delete(url){
    return fetch(url,
       { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
  }