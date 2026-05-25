import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material'
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material'

export default function AdminFiles() {
  const [files, setFiles] = useState([])

  function handleUpload(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setFiles((prev) => [{ id: Date.now(), name: f.name, url }, ...prev])
  }

  function handleDelete(id) {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Files & Uploads
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
        Upload and manage files for products and assets.
      </Typography>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          border: '2px dashed #667eea',
          borderRadius: 2,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
        }}
        component="label"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <CloudUploadIcon sx={{ fontSize: 40, color: '#667eea' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Click to upload files
          </Typography>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            or drag and drop
          </Typography>
          <input type="file" onChange={handleUpload} style={{ display: 'none' }} />
        </Box>
      </Paper>

      <Paper>
        {files.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center', color: '#9ca3af' }}>
            <Typography>No files uploaded yet</Typography>
          </Box>
        ) : (
          <List>
            {files.map((f, index) => (
              <ListItem
                key={f.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDelete(f.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{
                  borderBottom: index < files.length - 1 ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      component="a"
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        color: '#667eea',
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {f.name}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  )
}
