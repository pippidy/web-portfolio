const test = await fetch(
    'https://id.twitch.tv/oauth2/token?client_id=owlnvuu4x73puzega7fmhzymfe3voy&client_secret=iiuek5lwve85c4z713d5o6bbmpaccm&grant_type=client_credentials',
    {
      method: 'POST',
    }
  ).then((res) => {
    return res.json();
  });
  
  fetch('https://thingproxy.freeboard.io/fetch/https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${test.access_token}`,
      'Client-ID': 'owlnvuu4x73puzega7fmhzymfe3voy',
    },
    body: "fields *; where id = 1942;"
  }).then((res)=>res.json()).then(data=>console.log(data));