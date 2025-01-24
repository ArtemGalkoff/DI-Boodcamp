/* //Ex1
const url = 'https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

async function fetchGiphyData() {
  try {
const response = await fetch(url);
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
} */

/* fetchGiphyData();

//EX2
const url1 = 'https://api.giphy.com/v1/gifs/search?q=sun&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My&limit=10&offset=2';

async function fetchGiphyData() {
  try {
const response = await fetch(url1);
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchGiphyData();
 */
//Ex3

const url = "https://www.swapi.tech/api/starships/9/";
async function fetchGiphyData() {
    try {
  const response = await fetch(url);
   
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log(data);
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } 
  
 fetchGiphyData();

 //Ex4
 calling
// in 2 sec:
resolved