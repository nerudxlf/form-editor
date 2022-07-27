import React, {useEffect, useState} from 'react';
import {Button, Container, Grid, MenuItem, Paper, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

const CurrentForm = () => {
    const [form, setForm] = useState();
    const [inputAnswers, setInputAnswers] = useState([]);
    const [textAreaAnswers, setTextAreaAnswers] = useState([]);
    const [selectAnswers, setSelectAnswers] = useState([]);
    const [save, setSave] = useState(false);
    const [result, setResult] = useState();

    const {id} = useParams();
    const getForm = async () => {
        const requestOption = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch("/api/form/?form_id=" + id, requestOption);
        const answer = await response.json();
        if (response.ok) {
            setForm(answer);
        }
    }

    const handleSubmit = async () => {
        const requestOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
        };
        const response = await fetch('/api/form/answer/', requestOption);
        const answer = await response.json();
        console.log(response);
    }

    const changeSave = async () => {
        setSave(true)
        const resultData = {
            form_id: id,
            text_area_answers: textAreaAnswers,
            input_answers: inputAnswers,
            select_areas: selectAnswers
        }
        setResult(resultData);
    }

    const handleChangeAnswers = async (answers, i, event, setData, question) => {
        let fields = [...answers];
        if (fields[i]) {
            fields[i] = {question: question, answer: event.target.value}
        } else {
            fields.push({question: question, answer: event.target.value})
        }
        setData(fields)
    }

    useEffect(() => {
        getForm();
    }, []);

    return (
        <Container maxWidth="xl" className="container">
            <Grid container sx={{mt: '5rem', display: "flex", justifyContent: "center"}}>
                <Grid md={8} xs={8} lg={8} xl={8}>
                    {form ? (
                        <Paper elevation={8} sx={{width: 1, p: 1}}>
                            <Paper elevation={0}>
                                <Typography sx={{textAlign: "center", fontWeight: "bold"}}
                                            variant="h4">{form.name}</Typography>
                                <Typography sx={{textAlign: "center"}} variant="h6">{form.description}</Typography>
                            </Paper>
                            <Paper elevation={0} sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 3,
                                flexDirection: "column",
                                alignItems: 'center',
                                p: 1
                            }}>
                                {form.inputs.map((item, i) => (
                                    <TextField
                                        sx={{width: "348px", mt: 1}}
                                        size="small"
                                        onChange={(e) => handleChangeAnswers(inputAnswers, i, e, setInputAnswers, item.question)}
                                        helperText="Введите ответ"
                                        label={item.question}
                                    />
                                ))}
                                {form.text_areas.map((item, i) => (
                                    <>
                                        <TextField
                                            sx={{width: "348px", mt: 1}}
                                            multiline
                                            rows={4}
                                            size="small"
                                            onChange={(e) => handleChangeAnswers(textAreaAnswers, i, e, setTextAreaAnswers, item.question)}
                                            helperText="Введите ответ"
                                            label={item.question}
                                        />
                                    </>
                                ))}
                                {form.select_areas.map((item, i) => (
                                    <>
                                        <TextField
                                            sx={{width: "348px", mt: 1}}
                                            size="small"
                                            select
                                            helperText="Введите ответ"
                                            label={item.question}
                                            onChange={(e) => handleChangeAnswers(selectAnswers, i, e, setSelectAnswers, item.question)}
                                        >
                                            {item.selects.map((select) => (
                                                <MenuItem value={select.text}>{select.text}</MenuItem>
                                            ))}
                                        </TextField>
                                    </>
                                ))}
                            </Paper>
                            <Paper elevation={0} sx={{display: "flex", flexDirection: 'row-reverse'}}>
                                {save ? (
                                        <Button color="success" size="small" variant="outlined" onClick={handleSubmit}>
                                            Сохранить
                                        </Button>) :
                                    (
                                        <Button size="small" onClick={changeSave} variant="outlined">
                                            Подтвердить
                                        </Button>)}
                            </Paper>
                        </Paper>
                    ) : (<></>)}
                </Grid>
            </Grid>
        </Container>
    );
};

export default CurrentForm;