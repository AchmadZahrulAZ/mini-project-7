import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct, deleteProduct } from "../redux/async/productsSlice";
import { createLog } from "../redux/async/logsSlice";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: editingProduct.id, updatedData: editingProduct })).then(() => {
      dispatch(
        createLog({
          product_id: editingProduct.id,
          type: "update",
          quantity: 0,
          note: `Updated product: ${editingProduct.name}`,
          date: new Date().toISOString(),
        })
      );
      setEditingProduct(null); // Selesai mengedit
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(
        createLog({
          product_id: id,
          type: "delete",
          quantity: 0,
          note: `Deleted product with ID: ${id}`,
          date: new Date().toISOString(),
        })
      );
    });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) })
            }
          />
          <input
            type="number"
            value={editingProduct.stock}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })
            }
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
