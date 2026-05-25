import { formatCurrency } from '../utils/format.js'
import { useEffect, useState } from 'react'
import { fetchDashboardOverview } from '../services/api.js'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Badge,
} from '@mui/material'
import {
  TrendingUp as RevenueIcon,
  Inventory2 as StockIcon,
  WarningAmber as AlertIcon,
  People as CustomersIcon,
  LocalFireDepartment as TopProductIcon,
  ShoppingCart as OrderIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Sparkles as SparkleIcon,
} from '@mui/icons-material'

export default function Dashboard() {
  const [overview, setOverview] = useState(null)

  useEffect(() => {
    fetchDashboardOverview().then(setOverview)
  }, [])

  if (!overview) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography variant="h6" sx={{ color: '#9ca3af' }}>
          Loading dashboard...
        </Typography>
      </Box>
    )
  }

  const lowStockItems = overview.lowStockItems || []
  const salesReport = overview.salesReport || {}

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(overview.revenue),
      icon: RevenueIcon,
      color: '#3b82f6',
      bgColor: '#dbeafe',
      change: `${overview.revenueChange}% from last month`,
      changePositive: overview.revenueChange > 0,
    },
    {
      title: 'Products in Stock',
      value: overview.productsInStock,
      icon: StockIcon,
      color: '#10b981',
      bgColor: '#d1fae5',
      change: `${overview.stockChange}% change`,
      changePositive: overview.stockChange > 0,
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockItems.length,
      icon: AlertIcon,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      change: 'Items need reorder',
      changePositive: false,
    },
    {
      title: 'Active Customers',
      value: overview.customers,
      icon: CustomersIcon,
      color: '#8b5cf6',
      bgColor: '#f3e8ff',
      change: 'Repeat buyers',
      changePositive: true,
    },
  ]

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      {/* Premium Header */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '300px',
            height: '300px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            transform: 'translate(100px, -100px)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SparkleIcon sx={{ fontSize: 32 }} />
            Business Dashboard
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, fontSize: '1rem' }}>
            ✨ Real-time insights into your textile business performance
          </Typography>
        </Box>
      </Box>

      {/* Stats Grid - Premium Design */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, idx) => {
          const Icon = stat.icon
          const isPositive = stat.changePositive
          const TrendIcon = isPositive ? ArrowUpIcon : ArrowDownIcon
          return (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Tooltip title={stat.change} placement="top">
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}05 100%)`,
                    border: `2px solid ${stat.color}30`,
                    borderLeft: `5px solid ${stat.color}`,
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(90deg, transparent, ${stat.color}10, transparent)`,
                      animation: 'shimmer 3s infinite',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 16px 48px ${stat.color}40`,
                      border: `2px solid ${stat.color}60`,
                    },
                    '@keyframes shimmer': {
                      '0%': { transform: 'translateX(-100%)' },
                      '100%': { transform: 'translateX(100%)' },
                    },
                  }}
                >
                  <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: '#475569',
                          fontSize: '0.85rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {stat.title}
                      </Typography>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '12px',
                          background: `linear-gradient(135deg, ${stat.color}30, ${stat.color}10)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 4px 12px ${stat.color}20`,
                        }}
                      >
                        <Icon sx={{ fontSize: 28, color: stat.color, fontWeight: 800 }} />
                      </Box>
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1.5,
                      }}
                    >
                      {stat.value}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        p: 1,
                        backgroundColor: isPositive ? '#ecfdf5' : '#fee2e2',
                        borderRadius: '8px',
                        width: 'fit-content',
                      }}
                    >
                      <TrendIcon
                        sx={{
                          fontSize: 16,
                          color: isPositive ? '#10b981' : '#ef4444',
                          fontWeight: 700,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: isPositive ? '#10b981' : '#ef4444',
                        }}
                      >
                        {stat.change}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          )
        })}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Sales Performance */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '1.1rem',
              }}
            >
              📊 Sales Performance
            </Typography>
            <List sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
              {[
                { label: 'Total Revenue', value: formatCurrency(salesReport.totalRevenue || overview.revenue), color: '#3b82f6' },
                { label: 'Average Invoice', value: formatCurrency(salesReport.averageSale || 0), color: '#10b981' },
                { label: 'Paid Invoices', value: salesReport.paid || '—', color: '#8b5cf6' },
              ].map((item, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    p: 2,
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${item.color}`,
                    border: `1px solid ${item.color}20`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: `0 4px 12px ${item.color}20`,
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        boxShadow: `0 0 12px ${item.color}60`,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={item.value}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#6b7280',
                    }}
                    secondaryTypographyProps={{
                      fontWeight: 800,
                      fontSize: '1.2rem',
                      color: item.color,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Stock Alerts */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '1.1rem',
                }}
              >
                ⚠️ Low Stock Alerts
              </Typography>
              <Badge
                badgeContent={lowStockItems.length}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: lowStockItems.length > 0 ? '#ef4444' : '#10b981',
                    color: 'white',
                    fontWeight: 700,
                  },
                }}
              >
                <AlertIcon sx={{ color: '#f59e0b', fontSize: 24 }} />
              </Badge>
            </Box>
            {lowStockItems.length > 0 ? (
              <List sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
                {lowStockItems.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      p: 2,
                      backgroundColor: '#fffbeb',
                      borderRadius: '12px',
                      borderLeft: '4px solid #f59e0b',
                      border: '1px solid #fcd34d',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <AlertIcon sx={{ color: '#f59e0b', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.stock} units remaining`}
                      primaryTypographyProps={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#92400e',
                      }}
                      secondaryTypographyProps={{
                        color: '#b45309',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                      }}
                    />
                    <Chip
                      label="Reorder Soon"
                      size="small"
                      sx={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        fontWeight: 700,
                        ml: 2,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: '#ecfdf5',
                  borderRadius: '12px',
                  border: '2px dashed #10b981',
                }}
              >
                <Typography sx={{ color: '#10b981', fontWeight: 700, fontSize: '1rem' }}>
                  ✓ All inventory is healthy!
                </Typography>
                <Typography sx={{ color: '#6ee7b7', fontSize: '0.85rem', mt: 0.5 }}>
                  No items require immediate reordering
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '1.1rem',
              }}
            >
              🔥 Top Selling Products
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                    <TableCell sx={{ fontWeight: 800, color: '#1f2937', py: 2 }}>Product</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: '#1f2937', py: 2 }}>
                      Sold
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overview.topProducts.map((item, idx) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f9fafb',
                          transform: 'scale(1.01)',
                        },
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Badge
                            badgeContent={idx + 1}
                            sx={{
                              '& .MuiBadge-badge': {
                                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'][idx % 3],
                                color: 'white',
                                fontWeight: 700,
                                right: -8,
                                top: 8,
                              },
                            }}
                          >
                            <TopProductIcon
                              sx={{
                                fontSize: 28,
                                color: ['#3b82f6', '#10b981', '#f59e0b'][idx % 3],
                              }}
                            />
                          </Badge>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: '#1f2937',
                              fontSize: '0.95rem',
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: '#8b5cf6', py: 2, fontSize: '1rem' }}>
                        {item.units}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Recent Purchases */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '1.1rem',
              }}
            >
              🛒 Recent Purchase Orders
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                    <TableCell sx={{ fontWeight: 800, color: '#1f2937', py: 2 }}>Vendor</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: '#1f2937', py: 2 }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overview.recentPurchases.map((invoice, idx) => (
                    <TableRow
                      key={invoice.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f9fafb',
                          transform: 'scale(1.01)',
                        },
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: ['#667eea', '#764ba2', '#f093fb'][idx % 3],
                              boxShadow: `0 0 12px ${['#667eea', '#764ba2', '#f093fb'][idx % 3]}60`,
                            }}
                          />
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: '#1f2937',
                              fontSize: '0.95rem',
                            }}
                          >
                            {invoice.vendor}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: '#667eea', py: 2, fontSize: '1rem' }}>
                        {formatCurrency(invoice.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
