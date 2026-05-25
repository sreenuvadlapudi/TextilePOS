import { useEffect, useState } from 'react'
import { fetchCustomers } from '../../services/api.js'
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

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [editing, setEditing] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    let mounted = true
    fetchCustomers().then((data) => {
      if (mounted && data) setCustomers(data)
    })
    return () => (mounted = false)
  }, [])

  function handleAdd() {
    setEditing({ name: '', email: '', phone: '' })
    setOpenDialog(true)
  }

  function handleEdit(customer) {
    setEditing(customer)
    setOpenDialog(true)
  }

  function handleSave() {
    if (!editing) return
    setCustomers((prev) => {
      if (editing.id) return prev.map((c) => (c.id === editing.id ? editing : c))
      const newCustomer = { ...editing, id: `C-${Math.floor(Math.random() * 10000)}` }
      return [newCustomer, ...prev]
    })
    setOpenDialog(false)
  }

  function handleDelete(id) {
    fetch(`/api/customers/${id}`, { method: 'DELETE' }).catch(() => {})
    setCustomers((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Customer Management
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
        Add, edit, and remove customers.
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        sx={{ mb: 2 }}
      >
        Add Customer
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {editing?.id ? 'Edit Customer' : 'Add Customer'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, pt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={editing?.name || ''}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            size="small"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={editing?.email || ''}
            onChange={(e) => setEditing({ ...editing, email: e.target.value })}
            size="small"
          />
          <TextField
            fullWidth
            label="Phone"
            value={editing?.phone || ''}
            onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(c)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(c.id)}
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
