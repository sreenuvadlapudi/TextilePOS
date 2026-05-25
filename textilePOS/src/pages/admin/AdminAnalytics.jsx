import { useEffect, useState } from 'react'
import { fetchDashboardOverview, fetchSales } from '../../services/api.js'
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, Card, CardContent } from '@mui/material'

export default function AdminAnalytics() {
  const [overview, setOverview] = useState(null)
  const [sales, setSales] = useState([])

  useEffect(() => {
    let mounted = true
    fetchDashboardOverview().then((d) => {
      if (mounted) setOverview(d)
    })
    fetchSales().then((s) => {
      if (mounted) setSales(s)
    })
    return () => (mounted = false)
  }, [])

  if (!overview)
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading analytics...</Typography>
      </Box>
    )

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Analytics
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                ₹{overview.revenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ color: '#10b981', mt: 1 }}>
                Change: {overview.revenueChange}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Products In Stock
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {overview.productsInStock}
              </Typography>
              <Typography variant="body2" sx={{ color: '#10b981', mt: 1 }}>
                Change: {overview.stockChange}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Open Orders
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {overview.openOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Customers
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {overview.customers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Top Products
        </Typography>
        <List>
          {overview.topProducts.map((p) => (
            <ListItem key={p.id}>
              <ListItemText primary={p.name} secondary={`${p.units} units sold`} />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper>
        <Typography variant="h6" sx={{ fontWeight: 700, p: 2 }}>
          Recent Sales
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Invoice</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.invoice}</TableCell>
                  <TableCell>{s.customer}</TableCell>
                  <TableCell>{s.date}</TableCell>
                  <TableCell>₹{s.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
