import React, {useEffect, useState} from 'react';
import {Container, Grid, Paper, TextField, Typography} from "@mui/material";


const Form = () => {
    const [answer, setAnswer] = useState();
    const [answerId, setAnswerId] = useState();
    const getAnswer = async () => {
        if (answerId) {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch("/api/form/answer/?answer_id=" + answerId, requestOption);
            const answer = await response.json();
            if (response.ok) {
                setAnswer(answer);
            }
        }
    }
    console.log(answer)

    useEffect(() => {
        getAnswer();
    }, [answerId])

    return (
        <Container maxWidth="xl" className="container">
            <Grid container sx={{mt: '5rem', display: "flex", justifyContent: "center"}}>
                <Grid md={12} xs={12} lg={12} xl={12}>
                    <Paper elevation={0} sx={{p: 2}}>
                        <TextField variant="standard" label="Answer Id" helperText="Enter answer id" fullWidth
                                   onChange={(e) => setAnswerId(e.target.value)}/>
                    </Paper>
                </Grid>
                <Grid md={6} xs={6} lg={6} xl={6}>
                    {answer ? (
                        <Paper elevation={6} sx={{p: 2}}>
                            <Paper elevation={0}>
                                <Typography sx={{textAlign: "center", fontWeight: "bold"}} variant="h5">Ответы
                                    формы</Typography>
                            </Paper>
                            {answer?.input_answers.map((item) => (
                                <Paper elevation={0}>
                                    <Typography>{item.question}: {item.answer}</Typography>
                                </Paper>
                            ))}
                            {answer?.text_area_answers.map((item) => (
                                <Paper elevation={0}>
                                    <Typography>{item.question}: {item.answer}</Typography>
                                </Paper>
                            ))}
                            {answer?.select_areas.map((item) => (
                                <Paper elevation={0}>
                                    <Typography>{item.question}: {item.answer}</Typography>
                                </Paper>
                            ))}
                        </Paper>
                    ) : (<></>)}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Form;