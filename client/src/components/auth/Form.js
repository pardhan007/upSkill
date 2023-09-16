import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin, setLoginPage } from "../../state/state";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form2 = () => {
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });

    const [registerValues, setRegisterValues] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    function handleLoginValue(e) {
        setLoginValues((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }
    function handleRegisterValue(e) {
        setRegisterValues((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }

    const handleDirect = () => {
        setLoginValues((prev) =>
            (prev.email = "guest@example.com")((prev.password = "123456"))
        );
        login();
    };

    const login = async () => {
        setLoading(true);
        try {
            const loggedInUserResponse = await fetch(
                `${process.env.REACT_APP_SERVER}/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginValues),
                }
            );

            if (!loggedInUserResponse.ok) {
                throw new Error("Invalid Credentials");
            }

            const loggedIn = await loggedInUserResponse.json();

            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn,
                        token: loggedIn.token,
                    })
                );
                dispatch(setLoginPage());
                toast.success("Login successful");
            }
            setTimeout(() => {
                navigate(0);
            }, 500);
        } catch (error) {
            console.error(error);
            if (error.message === "Invalid Credentials") {
                toast.error("Invalid Credentials");
            } else {
                toast.error("An error occurred during login");
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async () => {
        setLoading(true);
        try {
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_SERVER}/api/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registerValues),
                }
            );

            if (!savedUserResponse.ok) {
                throw new Error("Failed to register");
            }

            const savedUser = await savedUserResponse.json();

            if (savedUser) {
                setPageType("login");
                toast.success("Registration successful");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap="0.5rem">
            <Typography>E-mail address*</Typography>
            <TextField
                hiddenLabel
                size="small"
                variant="outlined"
                placeholder="example@gmail.com"
                name="email"
                type="email"
                required
                onChange={
                    pageType === "login"
                        ? handleLoginValue
                        : handleRegisterValue
                }
                value={
                    pageType === "login"
                        ? loginValues.email
                        : registerValues.email
                }
            />
            <Typography>Password*</Typography>
            <TextField
                hiddenLabel
                size="small"
                variant="outlined"
                placeholder="Password"
                name="password"
                type="password"
                required
                onChange={
                    pageType === "login"
                        ? handleLoginValue
                        : handleRegisterValue
                }
                value={
                    pageType === "login"
                        ? loginValues.password
                        : registerValues.password
                }
            />

            {isRegister && (
                <>
                    <Typography>Name*</Typography>
                    <TextField
                        hiddenLabel
                        size="small"
                        variant="outlined"
                        placeholder="e.g - harsh"
                        name="name"
                        type="text"
                        required
                        onChange={
                            pageType === "login"
                                ? handleLoginValue
                                : handleRegisterValue
                        }
                        value={registerValues.name}
                    />
                    <Typography>Username*</Typography>
                    <TextField
                        hiddenLabel
                        size="small"
                        variant="outlined"
                        placeholder="e.g - harsh908918"
                        name="username"
                        type="text"
                        required
                        onChange={
                            pageType === "login"
                                ? handleLoginValue
                                : handleRegisterValue
                        }
                        value={registerValues.username}
                    />
                </>
            )}

            <LoadingButton
                sx={{
                    color: "white",
                    backgroundColor: "#232323",
                    borderRadius: "2.5rem",
                    padding: "0.5rem",
                    "&:hover": { backgroundColor: "grey" },
                    marginY: "1rem",
                }}
                loading={loading}
                loadingIndicator={
                    <CircularProgress color="success" size={20} />
                }
                onClick={pageType === "login" ? login : register}
                type="submit"
            >
                {isLogin ? "Sign in" : "Sign up"}
            </LoadingButton>
            {isLogin && (
                <Button
                    onClick={handleDirect}
                    type="submit"
                    sx={{
                        mb: "1rem",
                        padding: "0.5rem",
                        backgroundColor: "skyblue",
                        borderRadius: "2.5rem",
                        color: "black",
                        "&:hover": { backgroundColor: "#A0C49D" },
                    }}
                >
                    Direct Login
                </Button>
            )}
            <Typography display="flex" sx={{ fontWeight: "600" }}>
                {isLogin ? (
                    <span>
                        Don't have an account?{" "}
                        <span
                            style={{
                                color: "#F44F45",
                                fontWeight: "400",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                            }}
                        >
                            Sign up here.
                        </span>{" "}
                    </span>
                ) : (
                    <span>
                        Already have an account?{" "}
                        <span
                            style={{
                                color: "#F44F45",
                                fontWeight: "400",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                            }}
                        >
                            Login here
                        </span>
                    </span>
                )}
            </Typography>
        </Box>
    );
};

export default Form2;
