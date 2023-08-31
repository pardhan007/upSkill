import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Widget = styled(Box)(({ theme }) => ({
    boxShadow:
        theme.palette.mode === "light" &&
        "0px 0px 23px 14px rgba(232,232,233,0.75)",
    WebkitBoxShadow:
        theme.palette.mode === "light" &&
        "0px 0px 23px 14px rgba(232,232,233,0.75)",
    MozBoxShadow:
        theme.palette.mode === "light" &&
        "0px 0px 23px 14px rgba(232,232,233,0.75)",
    backgroundColor: theme.palette.mode === "light" ? "white" : "#252525",
    borderRadius: "1rem",
    position: "relative",
    m: 1,
    width: 290,
}));

export default Widget;
