import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            DKGH Enerprises{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

function StudentVoucherComp() {
    const [exam, setExam] = useState('');
    const [exams, setExams] = useState([]);

    useEffect(() => {
        // Fetch the data from the JSON file using axios
        axios.get("http://localhost:8888/tests")
            .then(response => {
                // Filter exams where examstatus is true
                const filteredExams = response.data.filter(exam => exam.examstatus);
                setExams(filteredExams);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const nav = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            voucher: data.get('voucher'),
            exam: exam,
        });
        let voucher = data.get('voucher');
        axios.get("http://localhost:8888/voucher").then((res) => {
            let userData = res.data;
            const filteredData = userData.filter((val) => val.voucher_number == data.get('voucher'));
            if (filteredData.length > 0) {
                console.log(data.get('voucher'), exam)
                sessionStorage.setItem("voucher", voucher);
                sessionStorage.setItem("exam", exam);
                nav("/questionbank");
            } else {
                window.alert("invalid quiz link");
            }
        });
    };

    const handleExamChange = (event) => {
        setExam(event.target.value);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Enter your voucher code
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="voucher"
                            label="Voucher"
                            name="voucher"
                            autoComplete="voucher"
                            autoFocus
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="exam-label">Exam</InputLabel>
                            <Select
                                labelId="exam-label"
                                id="exam"
                                value={exam}
                                onChange={handleExamChange}
                                label="Exam"
                                name="exam"
                            >
                                {exams.map((examItem) => (
                                    <MenuItem key={examItem.examName} value={examItem.examName}>
                                        {examItem.examName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Start Quiz
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default StudentVoucherComp;
