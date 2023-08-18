import { Box } from "@mui/material";
import { styled } from "@mui/system";

const Widget = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    "& > :not(style)": {
        m: 1,
        width: 280,
        borderRadius: "1rem",
    },
});

export default Widget;
