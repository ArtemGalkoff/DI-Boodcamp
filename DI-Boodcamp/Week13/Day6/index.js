const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;


app.use(session({
  secret: 'trivia_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What is the largest mammal in the world?", answer: "Blue whale" },
];


const quizRouter = express.Router();


quizRouter.get('/', (req, res) => {
  req.session.score = 0;
  req.session.currentQuestionIndex = 0;

  const question = triviaQuestions[0].question;
  res.send(`
    <h1>Trivia Quiz Game</h1>
    <p>Question 1: ${question}</p>
    <form method="POST" action="/quiz">
      <input name="answer" autocomplete="off" required />
      <button type="submit">Submit Answer</button>
    </form>
  `);
});

quizRouter.post('/', (req, res) => {
  const userAnswer = req.body.answer.trim().toLowerCase();
  const currentIndex = req.session.currentQuestionIndex || 0;
  const correctAnswer = triviaQuestions[currentIndex].answer.toLowerCase();

  
  let feedback = '';
  if (userAnswer === correctAnswer) {
    req.session.score = (req.session.score || 0) + 1;
    feedback = '<p style="color:green;">Correct!</p>';
  } else {
    feedback = `<p style="color:red;">Incorrect! The correct answer was: ${triviaQuestions[currentIndex].answer}</p>`;
  }

  
  const nextIndex = currentIndex + 1;
  req.session.currentQuestionIndex = nextIndex;

  if (nextIndex >= triviaQuestions.length) {
    
    res.redirect('/quiz/score');
  } else {
    
    const nextQuestion = triviaQuestions[nextIndex].question;
    res.send(`
      <h1>Trivia Quiz Game</h1>
      ${feedback}
      <p>Question ${nextIndex + 1}: ${nextQuestion}</p>
      <form method="POST" action="/quiz">
        <input name="answer" autocomplete="off" required />
        <button type="submit">Submit Answer</button>
      </form>
    `);
  }
});

quizRouter.get('/score', (req, res) => {
  const score = req.session.score || 0;
  const total = triviaQuestions.length;

  res.send(`
    <h1>Trivia Quiz Game - Final Score</h1>
    <p>Your score: ${score} out of ${total}</p>
    <a href="/quiz">Play Again</a>
  `);
});

app.use('/quiz', quizRouter);

app.listen(PORT, () => {
  console.log(`Trivia Quiz Game app listening on http://localhost:${PORT}/quiz`);
});