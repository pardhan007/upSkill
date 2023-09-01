import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Widget = styled(Box)(({ theme }) => ({
    boxShadow:
        theme.palette.mode === "light" && "0px 10px 15px -3px rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.mode === "light" ? "white" : "#252525",
    borderRadius: "1rem",
    position: "relative",
    border: `0.5px solid ${theme.palette.primary.bordercolor}`,
    m: 1,
}));

export default Widget;
