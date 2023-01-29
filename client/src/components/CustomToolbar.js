import React from "react";
import { Button, Stack } from "@mui/material";
import {
  GridColumnHeaderSeparator,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import UploadIcon from "@mui/icons-material/Upload";

export default function getCustomToolbar() {
  function CustomToolbar() {
    const handleUploadFile = (event) => {
      const fileUploaded = event.target.files[0];
      // props.handleFile(fileUploaded);
    };

    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          py: 1.5,
          px: 0.75,
          ".MuiDataGrid-columnSeparator": {
            position: "static",
          },
        }}
      >
        <Stack direction="row">
          <GridToolbarFilterButton />
          <GridColumnHeaderSeparator
            height={16}
            resizable={false}
            resizing={false}
          />
          <Button type="button" variant="text" component="label">
            <UploadIcon fontSize="small" /> &nbsp; Import
            <input type="file" onChange={handleUploadFile} hidden />
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  }

  return CustomToolbar;
}
