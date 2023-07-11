import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { useFormik } from 'formik'
import * as yup from 'yup'

import Error from "./Error";

const LoginForm = ({ currentUser, updateCurrentUser }) => {
    const defaultTheme = createTheme();
    const navigate = useNavigate();
    if (currentUser) {
        navigate("/");
    }

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState(null);
    
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const userSchema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required"),
      password: yup
        .string()
        .required("Password is required"),
    });
  
    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: (values) => {
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            if (res.ok) {
              res.json()
              .then(data => {
                  updateCurrentUser(data)
                  navigate("/")
              })
            } else {
              res.json().then(err => setErrors(err.error));
            }
          })
          .catch(err => setErrors(err.error));
      },
    });
    return (
        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <p style={{ color: "red" }}>{formik.errors.username}</p>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    onChange={formik.handleChange}
                    InputProps={{endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            > {showPassword ? <VisibilityOff /> : <Visibility />} 
                            </IconButton>
                        </InputAdornment>
                    )}}
                    />
                    <p style={{ color: "red" }}>{formik.errors.password}</p>
                </Grid>
                { errors ? <Error msg={errors} /> : null }
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}

export default LoginForm;