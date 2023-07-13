import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar } from '@mui/material';
import { Box } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from '@mui/material';
import { GlobalStyles } from '@mui/material';

const defaultTheme = createTheme();

function HeaderBar() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Company name
                    </Typography>
                    <nav>
                        <Link
                        variant="button"
                        color="text.primary"
                        href="jobs"
                        sx={{ my: 1, mx: 1.5 }}
                        >
                        Active Job
                        </Link>
                        <Link
                        variant="button"
                        color="text.primary"
                        href="jobs"
                        sx={{ my: 1, mx: 1.5 }}
                        >
                        Past Job
                        </Link>
                        <Link
                        variant="button"
                        color="text.primary"
                        href=":username"
                        sx={{ my: 1, mx: 1.5 }}
                        >
                        Profile
                        </Link>
                    </nav>
                    <Button href="login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default HeaderBar