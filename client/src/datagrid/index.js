import { Box } from "@mui/material";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid-pro";
import React, { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useSearchParams } from "react-router-dom";

export default function DataGrid({
  initialRows,
  columns,
  handleDeleteRow,
  handleSaveRow,
  onEditClick,
  dataGridProps,
  setLimit,
  limit,
  setOffset,
  offset,
  totalCount,
  filterValue,
  setFilterValue,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [rowCount, setRowCount] = useState(totalCount || 0);
  const [changedRow, setChangedRow] = useState({});
  const initialFilterValue = Object.keys(filterValue).map((value, index) => ({
    id: value + index,
    columnField: "name",
    operatorValue: value,
    value: filterValue[value],
  }));

  useEffect(() => {
    setRowCount((prevRowCount) =>
      totalCount !== undefined ? totalCount : prevRowCount
    );
  }, [totalCount, setRowCount]);

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleEditClick = (id) => () => {
    onEditClick(id);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    if (changedRow.name) handleSaveRow(id, changedRow?.name);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  useEffect(() => {
    setSearchParams({ page: offset, perPage: limit, ...filterValue });
  }, [limit, offset, filterValue]);

  const handleDeleteClick = (id) => () => {
    handleDeleteRow(id);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setChangedRow(updatedRow);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    handleSaveRow(newRow.id, newRow.name);
    return updatedRow;
  };

  const handlePageChange = (newOffset) => {
    if (newOffset > offset - 1) setOffset(offset + 1);
    else setOffset(offset - 1);
  };

  const handleFilterModelChange = (e) => {
    setFilterValue(
      e.items.reduce(
        (prev, curr) => ({
          ...prev,
          ...(curr.value && { [curr.operatorValue]: curr.value }),
        }),
        {}
      )
    );
    setOffset(1);
  };

  const actions = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 150,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key="save"
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          key="edit"
          icon={<EditTwoToneIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: 520,
        position: "relative",
        "& .MuiDataGrid-columnHeaders": selectedRowIds.length > 0 && {
          backgroundColor: "rgb(200, 250, 205)",
        },
      }}
    >
      <div style={{ flexGrow: 1, height: 520 }}>
        <DataGridPro
          {...dataGridProps}
          initialState={{
            filter: {
              filterModel: {
                items: initialFilterValue,
              },
            },
          }}
          columns={[...columns, actions]}
          rows={rows}
          disableSelectionOnClick
          onSelectionModelChange={setSelectedRowIds}
          pageSize={limit}
          page={offset - 1}
          onPageChange={handlePageChange}
          onPageSizeChange={setLimit}
          rowsPerPageOptions={[5, 10, 20]}
          rowHeight={56}
          editMode="row"
          rowModesModel={rowModesModel}
          processRowUpdate={processRowUpdate}
          onRowModesModelChange={setRowModesModel}
          experimentalFeatures={{ newEditingApi: true }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
            filterPanel: { linkOperators: ["and"] },
          }}
          rowCount={rowCount}
          paginationMode="server"
          onFilterModelChange={handleFilterModelChange}
        />
      </div>
    </Box>
  );
}
