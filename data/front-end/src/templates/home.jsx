import React, {useState} from 'react';
import {Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import FormInput from "../components/form/FormInput";
import FormTextArea from "../components/form/FormTextArea";
import FormSelect from "../components/form/FormSelect";

const Home = () => {
    const [formName, setFormName] = useState();
    const [formDescription, setFormDescription] = useState();
    const [items, setItems] = useState([]);
    const [result, setResult] = useState({data: {}});
    const [save, setSave] = useState(false);

    const handleSubmit = async () => {
        const requestOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(result),
        }
        const response = await fetch('/api/form/', requestOption);
        const answer = await response.json();
    }

    const changeSave = async () => {
        let inputs = [];
        let textAreas = [];
        let selects = [];
        items.map((item) => {
            if (item.element === "Input") {
                inputs.push({question: item.question, description: item.description});
            } else if (item.element === "TextArea") {
                textAreas.push({question: item.question, description: item.description});
            } else if (item.element === "Select") {
                let options = [];
                item.option.map((o) => {
                    console.log(o);
                    options.push({text: o.text});
                })
                selects.push({question: item.question, description: item.description, selects: options});
            }
        })
        const resultData = {
            name: formName,
            description: formDescription,
            inputs: inputs,
            text_areas: textAreas,
            select_areas: selects,
        }
        setResult(resultData);
        setSave(true);
    }

    const createNewInput = async () => {
        setItems(inputs => [...items, {element: "Input"}])
    }
    const createNewTextArea = async () => {
        setItems(inputs => [...items, {element: "TextArea"}])
    }
    const createNewSelect = async () => {
        setItems(inputs => [...items, {element: "Select"}])
    }

    const handleChangeQuestion = async (inputs, i, event) => {
        const fields = [...inputs];
        fields[i].question = event.target.value;
        setItems(fields);
    }

    const handleChangeDescription = async (inputs, i, event) => {
        const fields = [...inputs];
        fields[i].description = event.target.value;
        setItems(fields);
    }

    const handleChangeOptions = async (inputs, i, data) => {
        const fields = [...inputs];
        fields[i].option = data;
        setItems(fields)
    }

    return (
        <Container maxWidth="xl" className="content">
            <Grid container spacing={0} sx={{mt: '5rem', display: "Flex", justifyContent: "center"}}>
                <Grid md={8} xs={12} sm={12} lg={8} xl={6}>
                    <Paper elevation={0}>
                        <Typography variant="h4" sx={{textAlign: "center", fontWeight: "bold"}}>
                            Редактор форм
                        </Typography>
                    </Paper>
                    <Paper elevation={0} sx={{alignItems: 'baseline', mt: 4}}>
                        <Paper elevation={6} sx={{p: 1, flexGrow: 1}}>
                            <Typography variant="h5" sx={{textAlign: "center", fontWeight: "bold"}}>
                                Форма
                            </Typography>
                            <Paper elevation={0} sx={{display: "flex", borderBottom: 4, pt: 1, pb: 1}} square>
                                <Paper elevation={0}>
                                    <TextField
                                        sx={{width: "196px"}}
                                        size="small"
                                        variant="outlined"
                                        helperText="Введите название формы"
                                        onChange={(e) => setFormName(e.target.value)}
                                        label="Название"
                                        type="text"
                                    />
                                </Paper>
                                <Paper elevation={0} sx={{pl: 2, flexGrow: 1}}>
                                    <TextField
                                        multiline
                                        fullWidth
                                        maxRows={4}
                                        size="small"
                                        helperText="Введите описание формы"
                                        variant="outlined"
                                        onChange={(e) => setFormDescription(e.target.value)}
                                        label="Описание"
                                        type="text"
                                    />
                                </Paper>
                            </Paper>
                            <Paper elevation={0} sx={{p: 1}}>
                                {
                                    items.map((item, index) => (
                                        item.element === "Input" ? (
                                            <FormInput
                                                handleChangeQuestion={handleChangeQuestion}
                                                handleChangeDescription={handleChangeDescription}
                                                index={index}
                                                items={items}/>
                                        ) : (item.element === "TextArea" ? (
                                                <FormTextArea
                                                    handleChangeQuestion={handleChangeQuestion}
                                                    handleChangeDescription={handleChangeDescription}
                                                    index={index}
                                                    items={items}/>
                                            ) : (
                                                <FormSelect
                                                    handleChangeQuestion={handleChangeQuestion}
                                                    handleChangeDescription={handleChangeDescription}
                                                    handleChangeOptions={handleChangeOptions}
                                                    index={index}
                                                    items={items}/>
                                            )
                                        )
                                    ))
                                }
                            </Paper>
                            {items.length > 0 ? (
                                <Paper elevation={0}
                                       sx={{mt: 2, p: 2, display: "Flex", flexDirection: 'row-reverse'}}>
                                    {save ? (<Button variant="outlined" color="success"
                                                     onClick={handleSubmit}>Сохранить</Button>) : (
                                        <Button variant="outlined" onClick={changeSave}>Подтвердить</Button>)}
                                </Paper>
                            ) : (<></>)}
                        </Paper>
                        <Paper elevation={6} sx={{p: 1, mt: 2}}>
                            <Typography variant="h5" sx={{textAlign: "center", fontWeight: "bold"}}>
                                Компоненты
                            </Typography>
                            <Paper elevation={0} sx={{display: "Flex", justifyContent: "space-evenly"}}>
                                <Paper sx={{mt: 2, pb: 1, pl: 2, pr: 2}} square elevation={0}>
                                    <Button variant="outlined" size="medium" fullWidth sx={{pl: 2}}
                                            onClick={createNewInput}>
                                        Добавить Input
                                    </Button>
                                </Paper>
                                <Paper sx={{mt: 2, pb: 1, pl: 2, pr: 2}} square elevation={0}>
                                    <Button variant="outlined" size="medium" fullWidth onClick={createNewTextArea}>
                                        Добавить TextArea
                                    </Button>
                                </Paper>
                                <Paper sx={{mt: 2, pb: 1, pl: 2, pr: 2}} square elevation={0}>
                                    <Button variant="outlined" size="medium" fullWidth onClick={createNewSelect}>
                                        Добавить Select
                                    </Button>
                                </Paper>
                            </Paper>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;