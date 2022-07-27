import React, {useEffect, useState} from 'react';
import {Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Home = () => {
    const [form, setForm] = useState();
    const [formId, setFormId] = useState();
    const getForm = async () => {
        if (formId) {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch("/api/form/?form_id=" + formId, requestOption);
            const answer = await response.json();
            if (response.ok) {
                setForm(answer);
            }
        }
    }

    useEffect(() => {
        getForm();
    }, [formId])

    return (
        <Container maxWidth="xl" className="container">
            <Grid container sx={{mt: '5rem', display: "flex", justifyContent: "center"}}>
                <Grid md={12} xs={12} lg={12} xl={12}>
                    <Paper elevation={0} sx={{p: 2}}>
                        <TextField variant="standard" label="Form Id" helperText="Enter form id" fullWidth
                                   onChange={(e) => setFormId(e.target.value)}/>
                    </Paper>
                </Grid>
                <Grid md={12} xs={12} lg={12} xl={12}>
                    {form ? (
                        <Paper elevation={12} sx={{p: 2, display: "flex", justifyContent: "space-between"}}>
                            <Paper elevation={0}>
                                <Typography>{form.name}</Typography>
                                <Typography>{form.description}</Typography>
                            </Paper>
                            <Link to={"/answer/" + form._id} style={{textDecoration: 'none'}}>
                                <Button variant="outlined" size="small">Открыть</Button>
                            </Link>
                        </Paper>
                    ) : (<></>)}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;