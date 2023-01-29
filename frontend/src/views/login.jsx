import * as React from "react"
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
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { login } from "../store/actions/user.action"
import SignupLeft from "../assets/img/signup-left.svg"
import SignupRight from "../assets/img/signup-right.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWeebly } from "@fortawesome/free-brands-svg-icons"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Workflow
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export function Login({ setIsSignup }) {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = new FormData(event.currentTarget)
      const user = await login({
        username: data.get("username"),
        password: data.get("password"),
      })
      if (!user) return
    } catch (err) {
      console.log(err)
      return
    }
    navigate("/board")
  }

  function navToSignup() {
    navigate("/signup")
  }

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
              marginTop: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 5,
              borderRadius: 3,
              padding: 8,
              backgroundColor: "#fff",
            }}
          >
            <Typography component="h1" variant="h5">
              Log in to Workflow
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
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
                Continue
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <a onClick={navToSignup} href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </a>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      <section className="signup-footer">
        <img className="signup-left" src={SignupLeft} alt="" />
        <img className="signup-right" src={SignupRight} alt="" />
      </section>
    </section>
  )
}
