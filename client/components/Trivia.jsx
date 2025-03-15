/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, Alert, Container, Row, Col,
} from 'react-bootstrap';

const TriviaGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const fetchQuestions = (category = 'food_and_drink') => {
    axios
      .get(`https://the-trivia-api.com/v2/questions?tags=${category}`)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('err fetching trivia questions');
        setLoading(false);
        console.error('err fetching trivia questions', err);
      });
  };

  useEffect(() => {
    axios
      .get('/auth/current_user')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error('err fetching user', err);
        setUser(null);
      });

    fetchQuestions('food_and_drink');
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (answer === correctAnswer) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const submitScore = () => {
    if (!user) {
      return;
    }
    const googleId = user.googleId;
    axios
      .post('http://127.0.0.1:8080/leaderboard', {
        googleId,
        score,
      })
      .then((res) => {
        console.log('score submitted', res.data);
      })
      .catch((err) => {
        console.error('err submitting score', err);
      });
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setAnswered(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz over! Your final score is ${score}`);
      submitScore();
    }
  };

  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Alert variant="info">Loading trivia questions...</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!questions || questions.length === 0 || currentQuestion >= questions.length) {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <Alert variant="warning">No questions available</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  const currentTrivia = questions[currentQuestion];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div className="text-center">
            <h3>Food & Drink Trivia</h3>
            <p>{currentTrivia.question.text}</p>

            <div>
              {currentTrivia.incorrectAnswers
                .concat(currentTrivia.correctAnswer)
                .map((option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAnswerSelection(option)}
                    variant={selectedAnswer === option ? (option === currentTrivia.correctAnswer ? 'success' : 'danger') : 'light'}
                    className="mb-3 w-70"
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </Button>
                ))}
            </div>

            {selectedAnswer !== null && (
              <div>
                <p className={selectedAnswer === currentTrivia.correctAnswer ? 'text-success' : 'text-danger'}>
                  {selectedAnswer === currentTrivia.correctAnswer ? 'Correct!' : 'Incorrect!'}
                </p>
                <Button onClick={handleNextQuestion} variant="info" disabled={!answered}>
                  Next Question
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TriviaGame;
