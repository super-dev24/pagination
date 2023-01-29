import React, { useState } from "react";
import { Box, TextField, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import { postProducts } from "../action";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.state.name);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onGoBack = () => {
    navigate("/");
  };

  const onUpdateClick = async () => {
    await postProducts({
      id: location.state.id,
      name: value,
    });
    onGoBack();
  };

  return (
    <Stack>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          padding: "4rem",
        }}
      >
        <TextField
          label="Product Name"
          variant="outlined"
          value={value}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          sx={{ height: "3.4rem" }}
          onClick={onUpdateClick}
        >
          Update
        </Button>
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          padding: "4rem",
        }}
      >
        <Button
          variant="contained"
          sx={{ height: "3.4rem", width: "3.4rem" }}
          onClick={onGoBack}
        >
          <ArrowBackIcon />
        </Button>
      </Box>
    </Stack>
  );
};

export default EditProduct;
