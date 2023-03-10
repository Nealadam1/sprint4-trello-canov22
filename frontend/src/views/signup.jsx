import * as React from "react"
import { useEffect } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { signup } from "../store/actions/user.action"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWeebly } from "@fortawesome/free-brands-svg-icons"
import SignupLeft from "../assets/img/signup-left.svg"
import SignupRight from "../assets/img/signup-right.svg"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Workflow
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export function Signup({ setIsSignup }) {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    signup({
      username: data.get("username"),
      password: data.get("password"),
      fullname: data.get("fullname"),
    })
    navigate("/board")
  }

  function navToLogin() {
    navigate("/login")
  }

  // useEffect(() => {
  //   /* global google */
  //   google
  // }, [])

  return (
    <section className="login-signup">

      <div className="logo-login-signup">
        <Link to="/board">
          <span className="logo-icon">
            <FontAwesomeIcon className="btn-icon" icon={faWeebly} />
          </span>
          <span className="logo-text">orkflow</span>
        </Link>
      </div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 5,
              borderRadius: 3,
              padding:8,
              backgroundColor: '#fff',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up for your account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="full-name"
                    name="fullname"
                    required
                    fullWidth
                    id="fullname"
                    label="Fullname"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="user-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <button onClick={navToLogin} variant="body3">
                    Already have an account? Sign in
                  </button>
                </Grid>
              </Grid>
            </Box>

          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      <section className="signup-footer">
        <img className="signup-left" src={SignupLeft} alt="" />
        <img className="signup-right" src={SignupRight} alt="" />

      </section>
    </section>

  )
}
