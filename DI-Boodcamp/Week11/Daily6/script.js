document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const userInput = document.getElementById('userInput').value; 
    if (!userInput.trim()) {
        alert('Please enter a search term!');
        return;
    }

    await fetchGiphyData(userInput);
});

async function fetchGiphyData(userInput) {
    const url = `https://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My&limit=1`; 

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Loading...</p>'; 

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();


        resultDiv.innerHTML = '';

        if (data.data.length > 0) {
            data.data.forEach(gifData => {
                const gifUrl = gifData.images.original.url; 
                const gifElement = document.createElement('div'); 

                const imgElement = document.createElement('img');
                imgElement.src = gifUrl;
                imgElement.alt = 'GIF';

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'DELETE';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', () => {
                    gifElement.remove(); 
                });

                gifElement.appendChild(imgElement); 
                gifElement.appendChild(deleteButton); 
                resultDiv.appendChild(gifElement); 
            });
        } else {
            resultDiv.innerHTML = '<p>No GIFs found for your query.</p>';
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        resultDiv.innerHTML = '<p>There was an error fetching the data.</p>';
    }
}


document.getElementById('deleteAllBtn').addEventListener('click', function () {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; 
});