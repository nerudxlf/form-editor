import React, {useState} from 'react';
import {Button, Paper, TextField, Typography} from "@mui/material";
import FormOption from "./FormOption";

const FormSelect = (props) => {
    const {handleChangeQuestion, handleChangeDescription, handleChangeOptions, index, items} = props;
    const [options, setOptions] = useState([]);

    const addOptions = async () => {
        setOptions((prevOptions) => [
            ...prevOptions,
            {
                element: "Option"
            }
        ])
    }

    const handleChangeOption = async (options, i, event) => {
        const fields = [...options];
        fields[i].text = event.target.value;
        setOptions(fields)
        handleChangeOptions(items, index, fields);
    }

    return (
        <Paper square elevation={0} sx={{borderBottom: 2, pt: 1, pb: 1}}>
            <Paper elevation={0} sx={{display: "flex", justifyContent: 'space-between'}}>
                <Typography variant="h6">Select элемент</Typography>
            </Paper>
            <Paper elevation={0} sx={{display: "flex", mt: 1}}>
                <Paper elevation={0}>
                    <TextField
                        onChange={(e) => handleChangeQuestion(items, index, e)}
                        helperText="Введите вопрос"
                        sx={{width: "268px"}}
                        size="small"
                        variant="outlined"
                        label="Вопрос"
                        type="text"
                    />
                </Paper>
                <Paper elevation={0} sx={{pl: 2, flexGrow: 1}}>
                    <TextField
                        onChange={(e) => handleChangeDescription(items, index, e)}
                        fullWidth
                        helperText="Введите описание вопроса"
                        multiline
                        maxRows={4}
                        size="small"
                        variant="outlined"
                        label="Описание"
                        type="text"
                    />
                </Paper>

            </Paper>
            <Paper elevation={0} sx={{mt: 1}}>
                <Paper elevation={0} sx={{display: "flex", justifyContent: "space-between"}}>
                    <Paper elevation={0}>
                        <Typography sx={{fontWeight: "bold"}}>Option элементы</Typography>
                    </Paper>
                    <Paper elevation={0} sx={{pl: 2}}>
                        <Button variant="outlined" size="medium" fullWidth onClick={addOptions}>Добавить Option</Button>
                    </Paper>
                </Paper>
                <Paper elevation={0} sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                    {options.map((item, indexJ) => (
                        item.element === "Option" ? (
                            <FormOption handleChangeOptions={handleChangeOption}
                                        indexJ={indexJ}
                                        items={options}/>
                        ) : (<></>)
                    ))}
                </Paper>
            </Paper>
        </Paper>
    );
};

export default FormSelect;