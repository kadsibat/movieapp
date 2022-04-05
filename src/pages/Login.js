import {
    Avatar,
    Container,
    Grid,
    TextField,
    Typography,
    Button,
    Link
  } from "@mui/material";
  import LoginIcon from '@mui/icons-material/Login';
  import React from "react";
  import { Formik, useFormik } from "formik";
  import { useNavigate } from "react-router-dom";
  import * as Yup from "yup";
  import { signInWithEmailAndPassword} from "firebase/auth";
  import { auth } from "../auth/firebase-config";
  
  const Schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("No password provided")
      .min(8, "Password is too short - should be 8 chars minimum")
      .matches(/\d+/, "Password must have a number")
      .matches(/[a-z]+/, "Password must have a lowercase")
      .matches(/[A-Z]+/, "Password must have a uppercase")
      .matches(/[!?.@#$%^&*()-+]+/, "Password must have a special char"),

  });
  
  const Login = () => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Schema,
      onSubmit: async (values) => {
        try {
          let user = await signInWithEmailAndPassword (auth, values.email,values.password)
          console.log(user);
    
          navigate("/")
        } catch (error) {
            alert(error.message)
        }
      },
    });
  
    return (
      <Container
        sx={{
          height: "30rem",
          marginTop: "1rem",
          bgcolor: "Background.paper",
          boxShadow: 2,
          borderRadius: 2,
          textAlign: "center",
          padding: "1rem",
        }}
        maxWidth="sm"
      >
        <Avatar
          sx={{
            margin: "auto",
            bgcolor: "primary.main",
          }}
        >
          <LoginIcon/>
        </Avatar>
        <Typography sx={{ marginTop: "1rem", MARGİNbOTTOM: "1rem" }} variant="h4">
          Login
        </Typography>
        <Formik>
          {({
            values,
            handleSubmit,
            touched,
            errors,
            handleBlur,
            handleChange,
          }) => (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.email && formik.errors.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.touched.password && formik.errors.password}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                  />
                </Grid>
    
                <Grid item xs={12}>
                  <Button fullWidth item variant="contained" type="submit">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
        <Typography sx={{marginTop:"2rem"}}>
            Already have a account ? <Link onClick={()=>navigate("/register")} sx={{textDecaration:"none",cursor:"pointer"}}>Register</Link>
        </Typography>
      </Container>
    );
  };
  
  export default Login;
  