import React, { useState } from "react";
import {
    Box,
    Dialog,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Form from "./Form";

const LoginSignupPage = () => {
    const [openDialog, setOpenDialog] = useState(true);

    const handleClose = () => {
        setOpenDialog(false);
    };
    const isMobileScreen = useMediaQuery("(max-width:560px)");

    return (
        <>
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
        </>
    );
};

export default LoginSignupPage;
