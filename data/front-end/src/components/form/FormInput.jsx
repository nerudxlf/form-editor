import React from 'react';
import {Paper, TextField, Typography} from "@mui/material";

const FormInput = (props) => {
    const {handleChangeQuestion, handleChangeDescription, index, items} = props;
    return (
        <Paper square elevation={0} sx={{borderBottom: 2, pt: 1, pb: 1}}>
            <Paper elevation={0} sx={{display: "flex", justifyContent: 'space-between'}}>
                <Typography variant="h6">Input элемент</Typography>
            </Paper>
            <Paper elevation={0} sx={{display: "flex", mt: 1}}>
                <Paper elevation={0}>
                    <TextField
                        onChange={(e) => handleChangeQuestion(items, index, e)}
                        sx={{width: "268px"}}
                        size="small"
                        variant="outlined"
                        label="Вопрос"
                        helperText="Введите вопрос"
                        type="text"
                    />
                </Paper>
                <Paper elevation={0} sx={{pl: 2, flexGrow: 1}}>
                    <TextField
                        onChange={(e) => handleChangeDescription(items, index, e)}
                        fullWidth
                        multiline
                        maxRows={4}
                        size="small"
                        variant="outlined"
                        label="Описание"
                        helperText="Введите описание вопроса"
                        type="text"
                    />
                </Paper>
            </Paper>
        </Paper>
    );
};

export default FormInput;