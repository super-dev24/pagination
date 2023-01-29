import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataGrid from "../components/DataGrid";
import getCustomToolbar from "../components/CustomToolbar";
import { useProducts } from "../hooks/products";
import { deleteProducts, postProducts } from "../action";
import { getGridStringOperators } from "@mui/x-data-grid";

const CustomToolbar = getCustomToolbar();

const filterOperators = getGridStringOperators().filter(({ value }) =>
  ["equals", "startsWith"].includes(value)
);

const columns = [
  {
    field: "name",
    headerName: "Product Name",
    minWidth: 200,
    filterOperators,
    flex: 1,
    editable: true,
  },
];

export default function PageSizeCustomOptions() {
  const [searchParams] = useSearchParams();
  const [limit, setLimit] = useState(+searchParams.get("perPage") || 5);
  const [offset, setOffset] = useState(+searchParams.get("page") || 1);
  const [filterValue, setFilterValue] = useState(
    ["equals", "startsWith"].reduce(
      (prev, curr) => ({
        ...prev,
        ...(searchParams.get(curr) && { [curr]: searchParams.get(curr) }),
      }),
      {}
    )
  );
  const [rows, setRows] = useState([]);
  const paramsObj = useMemo(
    () => ({
      limit,
      offset,
      filterValue,
    }),
    [limit, offset, filterValue]
  );
  const { data } = useProducts(paramsObj);

  const navigate = useNavigate();
  const handleEditClick = (id) => {
    const { name } = rows.products.find((row) => row.id === id);
    navigate(`/products/${id}`, { state: { id, name } });
  };

  const handleDeleteRow = async (id) => {
    await deleteProducts({
      id,
      offset,
      limit,
    }).then((res) => {
      setRows(res.data);
    });
  };

  const handleSaveRow = async (id, name) => {
    await postProducts({
      id,
      name,
      offset,
      limit,
    }).then((res) => {
      setRows(res.data);
    });
  };

  useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        columns={columns}
        initialRows={rows?.products || []}
        handleSaveRow={handleSaveRow}
        handleDeleteRow={handleDeleteRow}
        onEditClick={handleEditClick}
        dataGridProps={{
          pagination: true,
          components: {
            Toolbar: CustomToolbar,
          },
          loading: false,
        }}
        setLimit={setLimit}
        limit={limit}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        offset={offset}
        setOffset={setOffset}
        totalCount={rows?.totalCount}
      />
    </div>
  );
}
