import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";

function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/quiz");
        setQuizzes(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch quiz data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "black", color: "white", py: 6 }}>
      <Container>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          Space Quizzes
        </Typography>

        <Typography variant="h6" align="center" gutterBottom>
          Apologies, this page is under construction. Please check back later.
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Typography align="center" color="error">
            {error}
          </Typography>
        )}

        {!loading && !error && quizzes.length > 0 && (
          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                sx={{ bgcolor: "grey.900", color: "white", mb: 4 }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {quiz.question}
                  </Typography>
                  <RadioGroup
                    value={answers[quiz.id] || ""}
                    onChange={(e) => handleChange(quiz.id, e.target.value)}
                  >
                    {quiz.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio sx={{ color: "white" }} />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                  {submitted && (
                    <Typography
                      variant="body2"
                      color={
                        answers[quiz.id] === quiz.answer ? "success.main" : "error"
                      }
                    >
                      {answers[quiz.id] === quiz.answer
                        ? "Correct!"
                        : `Incorrect. Correct answer: ${quiz.answer}`}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
            {!submitted && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit Answers
              </Button>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default QuizPage;
