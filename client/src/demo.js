import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DataGrid from "./datagrid";
import getCustomToolbar from "./CustomToolbar";
import { useProducts } from "./hooks/products";
import { deleteProducts, postProducts } from "./api";

const CustomToolbar = getCustomToolbar();

const columns = [
  { field: "id", hide: true },
  {
    field: "name",
    headerName: "Product Name",
    minWidth: 200,
    flex: 1,
    editable: true,
  },
];

export default function PageSizeCustomOptions() {
  const [searchParams] = useSearchParams();
  const [limit, setLimit] = useState(+searchParams.get("equals") || 5);
  const [offset, setOffset] = useState(+searchParams.get("startWith") || 0);
  const [rows, setRows] = useState([]);

  const { data } = useProducts(limit, offset);

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
        offset={offset}
        setOffset={setOffset}
        totalCount={rows?.totalCount}
      />
    </div>
  );
}
