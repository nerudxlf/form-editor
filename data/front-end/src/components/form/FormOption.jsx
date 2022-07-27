import React from 'react';
import {Paper, TextField} from "@mui/material";

const FormOption = (props) => {
    const {handleChangeOptions, indexJ, items} = props;
    return (
        <Paper elevation={0} sx={{p: 1}}>
            <TextField
                onChange={((e) => handleChangeOptions(items, indexJ, e))}
                sx={{width: "196px"}}
                size="small"
                variant="outlined"
                label="Вариант ответа"
                helperText="Введите вартиант ответа"
                type="text"/>
        </Paper>
    );
};

export default FormOption;