import { useState, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { menuItems } from './utils/menuitems'
import { ThemeContext } from '@/context/ThemeContext'
import { ArrowOutward } from '@mui/icons-material'

const SidebarMenu = () => {
  const { theme } = useContext(ThemeContext)
  const pathname = usePathname()

  const [expanded, setExpanded] = useState(
    typeof window !== 'undefined'
      ? sessionStorage.getItem('expandedCategory') || null
      : null,
  )

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    const newExpanded = isExpanded ? panel : null
    setExpanded(newExpanded)
    sessionStorage.setItem('expandedCategory', newExpanded || '')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List>
        {menuItems.map((category, index) => {
          const isServiceCatalogue =
            category.mainCategory === 'Service Catalogue'
          const isResourcing = category.mainCategory === 'Resourcing'
          const isAssetManagment = category.mainCategory === 'Asset Management'
          const isExternalTicket = category.mainCategory === 'External Ticket'
          const isJobOpportunity = category.mainCategory === 'Job Opportunity'
          const isBilling = category.name === 'Billing'
          const isSupport = category.name === 'Support'

          return (
            <>
              {category.subcategories ? (
                <Accordion
                  key={category.mainCategory}
                  expanded={expanded === category.mainCategory}
                  onChange={handleAccordionChange(category.mainCategory)}
                  sx={{
                    backgroundColor: 'white',
                    color: '#000000',
                    boxShadow: 'none',
                    border: 'none',
                    '&:before': { display: 'none' },
                    '& .MuiAccordionSummary-root': { borderBottom: 'none' },
                    '& .MuiAccordionDetails-root': {
                      paddingTop: 0,
                      paddingBottom: 0,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#000000' }} />}
                  >
                    <ListItemIcon sx={{ color: '#000000' }}>
                      {category.icon}
                    </ListItemIcon>
                    <Typography sx={{ fontSize: '0.80em' }}>
                      {category.mainCategory}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List component="div" disablePadding>
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.routeTo}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <ListItem
                            button
                            sx={{
                              backgroundColor:
                                pathname === sub.routeTo
                                  ? '#f5f5f5'
                                  : 'inherit',
                              position: 'relative',
                              '&:before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: pathname === sub.routeTo ? '5px' : '0',
                                backgroundColor:
                                  pathname === sub.routeTo
                                    ? theme.secondary_color
                                    : 'transparent',
                                transition: 'width 0.3s ease',
                              },
                              ':hover': { backgroundColor: '#f5f5f5' },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                color:
                                  pathname === sub.routeTo
                                    ? theme.secondary_color
                                    : '#000000',
                              }}
                            >
                              {sub.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={sub.name}
                              primaryTypographyProps={{
                                sx: { fontSize: '0.8em', pl: 1 },
                              }}
                            />
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <Link
                  key={category.name}
                  href={category.routeTo}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItem
                    button
                    sx={{
                      backgroundColor:
                        pathname === category.routeTo ? '#f5f5f5' : 'inherit',
                      ':hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          pathname === category.routeTo
                            ? theme.secondary_color
                            : '#000000',
                      }}
                    >
                      {category.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          {category.name}
                          {['Products Docs', 'Support'].includes(
                            category.name,
                          ) && (
                            <ArrowOutward
                              sx={{
                                fontSize: '1.5em',
                                color: '#000000',
                              }}
                            />
                          )}
                        </span>
                      }
                      primaryTypographyProps={{
                        sx: { fontSize: '0.8em' },
                      }}
                    />
                  </ListItem>
                </Link>
              )}

              {/* Green Divider after Service Catalogue */}
              {isServiceCatalogue && <Divider />}

              {/* Red Divider after Resourcing */}
              {isResourcing && <Divider />}
              {isAssetManagment && <Divider />}
              {isExternalTicket && <Divider />}
              {isJobOpportunity && (
                <Divider sx={{ backgroundColor: '#000000', my: 1 }} />
              )}
              {isBilling && (
                <Divider sx={{ backgroundColor: '#000000', my: 1 }} />
              )}
              {isSupport && (
                <Divider sx={{ backgroundColor: '#000000', my: 1 }} />
              )}
            </>
          )
        })}

        <Box sx={{ textAlign: 'center', mb: 2, pl: 1, pr: 1 }}>
          <Typography variant="body2" sx={{ color: '#000000' }}>
            © All Rights Reserved by TECHNISHEN™
          </Typography>
        </Box>
      </List>
    </Box>
  )
}

export default SidebarMenu
