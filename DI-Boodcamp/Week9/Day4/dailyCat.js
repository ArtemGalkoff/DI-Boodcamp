const gameInfo = [
    {
      username: "john",
      team: "red",
      score: 5,
      items: ["ball", "book", "pen"]
    },
    {
      username: "becky",
      team: "blue",
      score: 10,
      items: ["tape", "backpack", "pen"]
    },
    {
      username: "susy",
      team: "red",
      score: 55,
      items: ["ball", "eraser", "pen"]
    },
    {
      username: "tyson",
      team: "green",
      score: 1,
      items: ["book", "pen"]
    },
   ];

   for (const item of gameInfo) {
    console.log(item.username + '!');
  }

   gameInfo.forEach(item => {
    console.log(item.username + '!');
  });


  gameInfo.forEach(item => {
    if (item.score > 5) {
      console.log(item.username);
    }
  });

  const result = gameInfo.filter(user => user.score > 0).map(user => user.score); 

  const totalScore = result.reduce((accumulator, score) => {
  return accumulator + score;
   }, 0);