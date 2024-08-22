import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function Input({ error, type, id, name, style, placeholder, onChangeHandler, stateValue,required }) {
    return (
        <TextField
            required={required}
            error={error}
            id={id || "outlined-required"}
            label={name}
            name={name}
            value={stateValue}
            onChange={onChangeHandler}
            placeholder={placeholder}
            type={type}
            className={'w-full p-6 md:p-0'}
        />
    );
}

export function PasswordInput({ error, id, name, placeholder, onChangeHandler, stateValue ,required}) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            required={required}
            error={error}
            id={id || "outlined-password-input"}
            label={name}
            name={name}
            value={stateValue}
            onChange={onChangeHandler}
            placeholder={placeholder}
            type={showPassword ? 'text' : 'password'}
            className={'w-full p-6 md:p-0'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
