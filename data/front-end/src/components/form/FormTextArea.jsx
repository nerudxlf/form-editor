import React from 'react';
import {Paper, TextField, Typography} from "@mui/material";

const FormTextArea = (props) => {
    const {handleChangeQuestion, handleChangeDescription, index, items} = props;
    return (
        <Paper square elevation={0} sx={{borderBottom:2, pt: 1, pb: 1}}>
            <Paper elevation={0} sx={{display: "flex", justifyContent: 'space-between'}}>
                <Typography variant="h6">TextArea элемент</Typography>
            </Paper>
            <Paper elevation={0} sx={{display: "flex", mt: 1}}>
                <Paper elevation={0}>
                    <TextField
                        onChange={(e)=>handleChangeQuestion(items, index, e)}
                        helperText="Введите вопрос"
                        sx={{width: "268px"}}
                        size="small"
                        variant="outlined"
                        label="Вопрос"
                        type="text"
                    />
                </Paper>
                <Paper elevation={0} sx={{pl:2, flexGrow: 1}}>
                    <TextField
                        onChange={(e)=>handleChangeDescription(items, index, e)}
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
        </Paper>
    );
};

export default FormTextArea;