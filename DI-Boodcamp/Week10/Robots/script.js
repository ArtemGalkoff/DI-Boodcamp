const robots = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      image: 'https://robohash.org/Leanne%20Graham'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      image: 'https://robohash.org/Ervin%20Howell'
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      image: 'https://robohash.org/Clementine%20Bauch'
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      image: 'https://robohash.org/Patricia%20Lebsack'
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      image: 'https://robohash.org/Chelsey%20Dietrich'
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
      image: 'https://robohash.org/Mrs.%20Dennis%20Schulist'
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
      image: 'https://robohash.org/Kurtis%20Weissnat'
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
      image: 'https://robohash.org/Nicholas%20Runolfsdottir%20V'
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
      image:'https://robohash.org/Glenna%20Reichert'
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
      image:'https://robohash.org/Clementina%20DuBuque'
    }
    ];

    const robotContainer = document.getElementById('robot-container');

    function displayRobots(robots) {
    robotContainer.innerHTML = ''; 
    robots.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('robot');
        
        let img = document.createElement('img');
        img.src = item.image;
        img.alt = `${item.name}'s avatar`;
        
        div.appendChild(img);
        
        div.innerHTML += `
            <p class="robot-name">${item.name}</p>
            <p>username: ${item.username}</p>
            <p>email: ${item.email}</p>
        `;
        
        robotContainer.appendChild(div);
    });
}


displayRobots(robots);


const search = document.getElementById('search');
const button = document.getElementById('button');

button.addEventListener('click', function() {
    const searchValue = search.value.toLowerCase(); 

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchValue);
    });

    displayRobots(filteredRobots);
});

