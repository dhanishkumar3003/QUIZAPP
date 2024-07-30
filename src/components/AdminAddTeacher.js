import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddTeacher = () => {
    const nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            contact: "",
            gender: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full Name is required"),
            email: Yup.string()
                .matches(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    "Invalid email address"
                )
                .required("Email is required"),
            contact: Yup.string()
                .matches(/^[0-9]{10}$/, "Contact must be exactly 10 digits")
                .required("Contact is required"),
            gender: Yup.string().required("Gender is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: (values) => {
            console.log(values);
            const newTeacher = {
                teacher_name: values.fullName,
                teacher_password: values.confirmPassword,
                teacher_email: values.email,
                teacher_gender: values.gender
              };
            axios.post(`http://localhost:8888/teacher`, newTeacher)
                .then(response => {
                    window.alert('Teacher added successfully');
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error adding Teacher:', error);
                });
                
        },
        onReset: () => {
            localStorage.removeItem("studentFormData");
            console.log("Form data cleared from session storage.");
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Admin Add Teacher
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    onReset={formik.handleReset}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="name"
                        autoFocus
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="contact"
                        label="Contact"
                        name="contact"
                        autoComplete="contact"
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.contact && Boolean(formik.errors.contact)}
                        helperText={formik.touched.contact && formik.errors.contact}
                    />
                    <FormControl
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                    >
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            labelId="gender-label"
                            id="gender"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Gender"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                        {formik.touched.gender && formik.errors.gender && (
                            <Typography variant="caption" color="error">
                                {formik.errors.gender}
                            </Typography>
                        )}
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="confirm-password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.confirmPassword &&
                            Boolean(formik.errors.confirmPassword)
                        }
                        helperText={
                            formik.touched.confirmPassword && formik.errors.confirmPassword
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                    <Button fullWidth variant="contained" color="secondary" type="reset">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AdminAddTeacher;