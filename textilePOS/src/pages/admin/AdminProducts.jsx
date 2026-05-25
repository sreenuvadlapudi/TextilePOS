import { useEffect, useState } from 'react'
import { fetchProducts } from '../../services/api.js'
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

function ProductForm({ initial = {}, onCancel, onSave, open }) {
  const [product, setProduct] = useState({
    sku: '',
    name: '',
    price: 0,
    stock: 0,
    image: '',
    ...initial,
  })

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setProduct((p) => ({ ...p, image: url }))
    }
  }

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {initial?.sku ? 'Edit Product' : 'Add Product'}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, pt: 2 }}>
        <TextField
          fullWidth
          label="SKU"
          value={product.sku}
          onChange={(e) => setProduct({ ...product, sku: e.target.value })}
          size="small"
        />
        <TextField
          fullWidth
          label="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          size="small"
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value || 0) })}
          size="small"
        />
        <TextField
          fullWidth
          label="Stock"
          type="number"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value || 0) })}
          size="small"
        />
        <Box>
          <TextField
            type="file"
            accept="image/*"
            onChange={handleFile}
            inputProps={{ style: { padding: 8 } }}
            fullWidth
          />
          {product.image && (
            <Box sx={{ mt: 2 }}>
              <img src={product.image} alt="preview" style={{ width: 120, borderRadius: 8 }} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={() => onSave(product)} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    let mounted = true
    fetchProducts().then((data) => {
      if (mounted && data) setProducts(data)
    })
    return () => (mounted = false)
  }, [])

  function handleAdd() {
    setEditing({})
    setShowForm(true)
  }

  function handleEdit(p) {
    setEditing(p)
    setShowForm(true)
  }

  async function handleSave(product) {
    // Try to persist to API if available
    try {
      await fetch('/api/products', { method: 'POST', body: JSON.stringify(product), headers: { 'Content-Type': 'application/json' } })
    } catch (e) {
      // ignore network failures — keep local state
    }
    setProducts((prev) => {
      const exists = prev.find((x) => x.sku === product.sku)
      if (exists) return prev.map((x) => (x.sku === product.sku ? product : x))
      return [product, ...prev]
    })
    setShowForm(false)
  }

  function handleDelete(sku) {
    // best-effort API delete
    fetch(`/api/products/${sku}`, { method: 'DELETE' }).catch(() => {})
    setProducts((prev) => prev.filter((p) => p.sku !== sku))
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Products Admin
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
        Manage products: add, update, delete and upload images.
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Add Product
      </Button>

      <ProductForm
        initial={editing}
        open={showForm}
        onCancel={() => setShowForm(false)}
        onSave={handleSave}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>SKU</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.sku || p.id} hover>
                <TableCell>{p.sku || p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  {p.image ? (
                    <Box
                      component="img"
                      src={p.image}
                      sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                      alt=""
                    />
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(p)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(p.sku || p.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
