import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material'
import {
  ShoppingCart as ProductsIcon,
  People as CustomersIcon,
  CloudUpload as FilesIcon,
  BarChart as AnalyticsIcon,
} from '@mui/icons-material'

const adminFeatures = [
  {
    icon: ProductsIcon,
    title: 'Manage Products',
    description: 'Add, edit, delete products and upload images',
    link: '/admin/products',
    color: '#3b82f6',
  },
  {
    icon: CustomersIcon,
    title: 'Customer Management',
    description: 'Manage customer information and details',
    link: '/admin/customers',
    color: '#10b981',
  },
  {
    icon: FilesIcon,
    title: 'Files & Uploads',
    description: 'Upload and manage files for your business',
    link: '/admin/files',
    color: '#f59e0b',
  },
  {
    icon: AnalyticsIcon,
    title: 'Analytics Dashboard',
    description: 'View business metrics and analytics',
    link: '/admin/analytics',
    color: '#8b5cf6',
  },
]

export default function AdminDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Admin Panel
      </Typography>
      <Typography variant="body1" sx={{ color: '#6b7280', mb: 4 }}>
        Quick access to admin features
      </Typography>

      <Grid container spacing={3}>
        {adminFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <Grid item xs={12} sm={6} md={6} lg={3} key={feature.link}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '12px',
                      backgroundColor: `${feature.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 28, color: feature.color }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={feature.link}
                    fullWidth
                    variant="contained"
                    sx={{
                      background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Open
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
