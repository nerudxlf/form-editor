import React, {useEffect, useState} from 'react';
import {Container, Grid, Paper, TextField, Typography} from "@mui/material";

const Form = () => {
    const [forms, setForms] = useState();
    const [formId, setFormId] = useState();

    const getForms = async () => {
        if (formId) {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch("/api/form/answers?form_id=" + formId, requestOption);
            const answer = await response.json();
            if (response.ok) {
                setForms(answer);
            }
        }
    }

    useEffect(() => {
        getForms();
    }, [formId])

    console.log(forms)

    return (
        <Container maxWidth="xl" className="content">
            <Grid container spacing={0} sx={{mt: '5rem', display: "Flex", justifyContent: "center"}}>
                <Grid md={12} xs={12} lg={12} xl={12}>
                    <Paper elevation={0} sx={{p: 2}}>
                        <TextField variant="standard" label="Form Id" helperText="Enter form id" fullWidth
                                   onChange={(e) => setFormId(e.target.value)}/>
                    </Paper>
                </Grid>
                <Grid md={6} xs={12} lg={6} xl={6}>
                    {forms ? (
                        <Paper elevation={4} sx={{mt: 1, p: 2}}>
                            {
                                forms.map((form) => (
                                    <Paper elevation={0}>
                                        <Typography variant="h5" sx={{fontWeight: "bold"}}>Answer
                                            ID {form._id}</Typography>
                                        {form?.input_answers.map((item) => (
                                            <Typography>{item.question}: {item.answer}</Typography>
                                        ))}
                                        {form?.text_area_answers.map((item) => (
                                            <Typography>{item.question}: {item.answer}</Typography>
                                        ))}
                                        {form?.select_areas.map((item) => (
                                            <Typography>{item.question}: {item.answer}</Typography>
                                        ))}
                                    </Paper>
                                ))
                            }
                        </Paper>
                    ) : (<></>)}

                </Grid>
            </Grid>
        </Container>
    );
};

export default Form;