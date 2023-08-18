import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "./FlexBetween";
import { AddOutlined, MoreVertOutlined } from "@mui/icons-material";

const MiddleSection = () => {
    const [selectTab, setSelectTab] = useState("posts");
    return (
        <Box width="50%" padding="0rem 1rem">
            <Box>
                <FlexBetween>
                    <FlexBetween gap="1rem">
                        <Avatar sx={{ width: 50, height: 50 }} />
                        <Box>
                            <Typography fontSize="1.3rem" fontWeight="600">
                                DSA Community
                            </Typography>
                            <Typography sx={{ color: "grey" }}>
                                4142 Members
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <FlexBetween gap="1rem">
                        <Button startIcon={<AddOutlined />}>
                            <Typography fontSize="0.8rem">Join</Typography>
                        </Button>
                        <MoreVertOutlined />
                    </FlexBetween>
                </FlexBetween>
            </Box>
            <Box
                width="100%"
                borderTop="1px solid #FFD1DA"
                borderBottom="1px solid #FFD1DA"
                marginTop="0.5rem"
            >
                <Button
                    sx={{
                        width: "50%",
                        padding: "1rem",
                        color: selectTab === "posts" ? "#F44F45" : "black",
                        "&:hover": {
                            backgroundColor: "#FAF3F0",
                        },
                    }}
                    onClick={() => setSelectTab("posts")}
                >
                    <Typography fontSize="0.8rem" fontWeight="600">
                        Posts
                    </Typography>
                </Button>
                <Button
                    sx={{
                        width: "50%",
                        padding: "1rem",
                        color:
                            selectTab === "announcement" ? "#F44F45" : "black",

                        "&:hover": {
                            backgroundColor: "#FAF3F0",
                        },
                    }}
                    onClick={() => setSelectTab("announcement")}
                >
                    <Typography fontSize="0.8rem" fontWeight="600">
                        Announcement
                    </Typography>
                </Button>
            </Box>
            <Button
                sx={{
                    width: "100%",
                    textAlign: "center",
                    padding: "0.8rem",
                    backgroundColor: "#F44F45",
                    color: "white",
                    borderRadius: "2rem",
                    marginTop: "0.5rem",
                    "&:hover": {
                        backgroundColor: "#F44F45",
                    },
                }}
            >
                Join DSA Community
            </Button>
        </Box>
    );
};

export default MiddleSection;
