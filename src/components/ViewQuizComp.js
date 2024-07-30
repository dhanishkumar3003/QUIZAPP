import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Radio, FormControl, FormControlLabel, FormGroup, Button, Badge, List, ListItem, ListItemText, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function QuestionBank() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [examName, setExamName] = useState("");
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('loggedin')) {
            navigate("/");
        } else {
            fetchQuestions();
            axios.get("http://localhost:8888/student").then((res) => {
                setUsers(res.data);
            }).catch(error => {
                console.error("Error fetching users:", error);
            });
        }
    }, [navigate]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:8888/tests');
            if (response.status !== 200) {
                throw new Error('Failed to fetch questions');
            }
            const data = response.data;
            const storedExamName = sessionStorage.getItem("exam");

            if (data.length > 0) {
                const exam = data.find(test => test.examName.toLowerCase() === storedExamName.toLowerCase());
                if (exam) {
                    const examQuestions = exam.questions;
                    setQuestions(examQuestions);
                    setUserAnswers(Array(examQuestions.length).fill(null));
                    setCorrectAnswers(examQuestions.map(question => question.correctAnswer));
                    setExamName(storedExamName);
                } else {
                    console.error('Exam not found');
                }
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleNextQuestion = () => {
        if (userAnswers[currentQuestionIndex] !== null) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Please select an answer before proceeding to the next question.');
        }
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleAnswerChange = (event) => {
        const selectedAnswer = event.target.value;
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestionIndex] = selectedAnswer;
        setUserAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        const confirmed = window.confirm("Are you sure you want to submit?");

        if (confirmed) {
            setShowScore(true);
            let quizScore = 0;
            for (let i = 0; i < questions.length; i++) {
                if (userAnswers[i] === correctAnswers[i]) {
                    quizScore++;
                }
            }
            setScore(quizScore);
            const examResult = {
                examName: examName,
                score: quizScore
            };

            const findUser = users.find((user) => user.student_email === sessionStorage.getItem("email"));
            if (findUser) {
                const results_modified = [...findUser.results, examResult];
                const modified = {
                    ...findUser,
                    results: results_modified
                };

                axios.put(`http://localhost:8888/student/${findUser.id}`, modified)
                    .then(response => {
                        console.log("Submission successful");
                    })
                    .catch(error => {
                        console.error("Error submitting data:", error);
                    });
            } else {
                console.error("User not found");
            }
        } else {
            console.log("Submission canceled");
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            {!showScore && (
                <Card variant="outlined" className="question-card">
                    <CardContent>
                        <Typography variant="h5" component="h2" className="exam-title">
                            {examName} Exam Questions
                        </Typography>
                        {currentQuestion && (
                            <div>
                                <Typography variant="h6" gutterBottom className="question-text">
                                    <strong>{currentQuestion.question}</strong>
                                </Typography>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        {currentQuestion.options.map((option, index) => (
                                            <FormControlLabel
                                                key={index}
                                                control={<Radio />}
                                                label={option}
                                                value={option}
                                                checked={userAnswers[currentQuestionIndex] === option}
                                                onChange={handleAnswerChange}
                                                className="radio-option"
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                                <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
                                    <Grid item>
                                        {currentQuestionIndex > 0 && (
                                            <Button variant="contained" color="secondary" onClick={handlePreviousQuestion} className="nav-button">
                                                Previous
                                            </Button>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        {currentQuestionIndex < questions.length - 1 ? (
                                            <Button variant="contained" color="primary" onClick={handleNextQuestion} className="nav-button">
                                                Next
                                            </Button>
                                        ) : (
                                            <Button variant="contained" color="primary" onClick={handleSubmit} className="submit-button">
                                                Submit
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
            {showScore && (
                <Card variant="outlined" className="score-card">
                    <CardContent>
                        <Typography variant="h5" component="h2" className="result-title">
                            Quiz Results
                        </Typography>
                        <Typography variant="body1" gutterBottom className="score-text">
                            Total Score: {score} / {questions.length}
                        </Typography>
                        <List>
                            {questions.map((question, index) => (
                                <ListItem key={index} className="result-item">
                                    <ListItemText
                                        primary={<strong>{question.question}</strong>}
                                        secondary={
                                            <>
                                                <Typography variant="body2" component="span" className="user-answer">
                                                    Your answer: {userAnswers[index]}
                                                </Typography>
                                                <Typography variant="body2" component="span" className="correct-answer">
                                                    Correct answer: {correctAnswers[index]}
                                                </Typography>
                                                <br />
                                                {userAnswers[index] === correctAnswers[index] ? (
                                                    <Badge color="success" badgeContent="Correct" className="badge" />
                                                ) : (
                                                    <Badge color="error" badgeContent="Incorrect" className="badge" />
                                                )}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
                            <Button variant="contained" color="secondary" onClick={handleLogout} className="logout-button">
                                Logout
                            </Button>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
}

export default QuestionBank;
