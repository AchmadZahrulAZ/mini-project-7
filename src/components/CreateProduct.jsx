import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../redux/async/productsSlice';
import { createLog } from '../redux/async/logsSlice';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [useScanner, setUseScanner] = useState(false); // Toggle untuk QR scanner
  const [scanError, setScanError] = useState(''); // Untuk menampilkan pesan error
  const [productData, setProductData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  // Fungsi untuk menangani input manual
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menangani hasil scan
  const handleScan = (err, result) => {
    if (err) {
      console.error('Scanner Error:', err);
      setScanError('Failed to scan. Please try again.');
    }

    if (result) {
      setProductData((prev) => ({ ...prev, id: result.text }));
      setScanError(''); // Reset error jika scan berhasil
    }
  };

  // Fungsi untuk mengirimkan data produk baru
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi jika data tidak lengkap
    if (!productData.id || !productData.name || !productData.price || !productData.stock) {
      alert('Please fill in all required fields.');
      return;
    }

    // Konversi "price" dan "stock" ke number
    const formattedData = {
      ...productData,
      price: parseInt(productData.price, 10),
      stock: parseInt(productData.stock, 10),
    };

    // Dispatch Create Product
    dispatch(createProduct(formattedData)).then(() => {
      // Dispatch Create Log dengan stok awal produk
      dispatch(
        createLog({
          product_id: formattedData.id,
          type: 'create',
          quantity: formattedData.stock, // Gunakan stok awal
          note: `Added new product: ${formattedData.name}`,
          date: new Date().toISOString(),
        })
      );
    });

    // Reset Form
    setProductData({
      id: '',
      name: '',
      description: '',
      price: '',
      stock: '',
    });
    setUseScanner(false);
  };

  return (
    <div>
      <h2>Create Product</h2>
      {/* Toggle untuk QR Scanner */}
      <button onClick={() => setUseScanner(!useScanner)}>
        {useScanner ? 'Switch to Manual Input' : 'Use QR Code Scanner'}
      </button>

      {/* Komponen QR Barcode Scanner */}
      {useScanner && (
        <div>
          <BarcodeScannerComponent
            onUpdate={handleScan}
            width={300}
            height={200}
            delay={500} // Delay untuk menghindari multiple reads
          />
          {scanError && <p style={{ color: 'red' }}>{scanError}</p>}
        </div>
      )}

      {/* Form Input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Product ID"
          value={productData.id}
          onChange={handleInputChange}
          disabled={useScanner} // Disable manual input jika scanner aktif
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={productData.stock}
          onChange={handleInputChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
