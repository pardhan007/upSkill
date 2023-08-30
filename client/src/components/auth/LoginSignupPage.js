import React, { useState } from "react";
import { Box, Dialog, IconButton, useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { setLoginPage } from "../../state/state";

const LoginSignupPage = () => {
    const [openDialog, setOpenDialog] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpenDialog(false);
        dispatch(setLoginPage());
    };
    const isMobileScreen = useMediaQuery("(max-width:560px)");

    return (
        <>
            {!user && (
                <Dialog onClose={handleClose} open={openDialog}>
                    <Box
                        width={isMobileScreen ? "auto" : "500px"}
                        display="flex"
                        flexDirection="column"
                        padding="1rem"
                        paddingBottom="2rem"
                    >
                        <Box>
                            <IconButton onClick={handleClose}>
                                <Close />
                            </IconButton>
                        </Box>
                        <Box>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                gap="1rem"
                            >
                                <img
                                    src="../assets/logo.png"
                                    alt="logo"
                                    style={{ width: "5.5rem" }}
                                />
                                {/* <Typography>To continue</Typography> */}
                            </Box>
                            <Box marginTop="1rem">
                                <Form />
                            </Box>
                        </Box>
                    </Box>
                </Dialog>
            )}
        </>
    );
};

export default LoginSignupPage;
