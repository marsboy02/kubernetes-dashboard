import { Box, Button, Heading, Popover, TextInput } from "@primer/react";
import axios from "axios";
import { useState } from "react";

const ButtonContainer = ({ deployment, namespace }) => {
    const [replicasPopoverOpen, setReplicasPopoverOpen] = useState(false);
    const [imagePopoverOpen, setImagePopoverOpen] = useState(false);
    const [replicasNumber, setReplicasNumber] = useState("");
    const [imageText, setImageText] = useState("");

    const updateReplicas = (e) => {
        e.preventDefault();
        try {
            const response = axios.patch(
                "http://localhost:3000/deployments/replicas",
                {
                    name: deployment.name,
                    namespace: namespace,
                    replicas: replicasNumber,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const updateImage = (e) => {
        e.preventDefault();
        try {
            const response = axios.patch(
                "http://localhost:3000/deployments/image",
                {
                    name: deployment.name,
                    namespace: namespace,
                    image: imageText,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
                <Button
                    size="large"
                    onClick={() => setReplicasPopoverOpen(true)}
                >
                    set replicas
                </Button>
                <Popover open={replicasPopoverOpen}>
                    <Popover.Content
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Box as="form">
                            <Heading sx={{ fontSize: 2 }}>
                                레플리카 입력
                            </Heading>
                            <TextInput
                                type="number"
                                min={1}
                                value={replicasNumber}
                                onChange={(e) =>
                                    setReplicasNumber(e.target.value)
                                }
                            />
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button
                                    onClick={() =>
                                        setReplicasPopoverOpen(false)
                                    }
                                >
                                    close
                                </Button>
                                <Button type="submit" onClick={updateReplicas}>
                                    update
                                </Button>
                            </Box>
                        </Box>
                    </Popover.Content>
                </Popover>
            </Box>
            <Box>
                <Button size="large" onClick={() => setImagePopoverOpen(true)}>
                    set images
                </Button>
                <Popover open={imagePopoverOpen}>
                    <Popover.Content
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Box as="form">
                            <Heading sx={{ fontSize: 2 }}>이미지 입력</Heading>
                            <TextInput
                                value={imageText}
                                onChange={(e) => setImageText(e.target.value)}
                            />
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <Button
                                    onClick={() => setImagePopoverOpen(false)}
                                >
                                    close
                                </Button>
                                <Button type="submit" onClick={updateImage}>
                                    update
                                </Button>
                            </Box>
                        </Box>
                    </Popover.Content>
                </Popover>
            </Box>
        </Box>
    );
};

export default ButtonContainer;
