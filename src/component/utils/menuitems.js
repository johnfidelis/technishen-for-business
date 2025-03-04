import {
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  People as PeopleIcon,
  Group as GroupIcon,
  Business as BusinessIcon,
  Storefront as StorefrontIcon,
  PostAdd as PostAddIcon,
  List as ListIcon,
  PlayCircleFilledWhite as PlayCircleFilledWhiteIcon,
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  ReceiptLong as ReceiptLongIcon,
  Description as InvoiceIcon,
  Done as DoneIcon,
  Check as CheckIcon,
  Work as WorkIcon,
  Settings as SettingsIcon,
  Receipt as ReceiptIcon,
  ExpandMore,
  AddCircleOutlineRounded,
  ArrowOutward,
} from '@mui/icons-material'
import DescriptionIcon from '@mui/icons-material/Description'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

export const menuItems = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
    routeTo: '/dashboard',
  },
  {
    mainCategory: 'Ticket',
    icon: <AssignmentIcon />,
    subcategories: [
      {
        name: 'Create Ticket',
        routeTo: '/dashboard/ticket/i/create',
        icon: <AddCircleOutlineRounded />,
      },
      {
        name: 'Open - Unassigned',
        routeTo: '/dashboard/ticket/i/open-unassigned',
        icon: <AssignmentIcon />,
      },
      {
        name: 'Assigned Tickets',
        routeTo: '/dashboard/ticket/i/assigned',
        icon: <PersonIcon />,
      },
      {
        name: 'Open Tickets',
        routeTo: '/dashboard/ticket/i/open',
        icon: <ListIcon />,
      },
      {
        name: 'Resolved Tickets',
        routeTo: '/dashboard/ticket/i/resolved',
        icon: <CheckCircleIcon />,
      },
      {
        name: 'All Tickets',
        routeTo: '/dashboard/ticket/i/all',
        icon: <AssignmentTurnedInIcon />,
      },
    ],
  },
  {
    mainCategory: 'Manage Employees',
    icon: <PeopleIcon />,
    subcategories: [
      {
        name: 'Create Employees',
        routeTo: '/dashboard/employee/create',
        icon: <AddCircleOutlineRounded />,
      },
      {
        name: 'View Employees',
        routeTo: '/dashboard/employee/all',
        icon: <GroupIcon />,
      },
      {
        name: 'View Fulfillers',
        routeTo: '/dashboard/employee/fulfilers',
        icon: <GroupIcon />,
      },
      {
        name: 'Fulfillers Group',
        routeTo: '/dashboard/employee/fulfilers/group',
        icon: <GroupIcon />,
      },
    ],
  },
  {
    mainCategory: 'Manage Customers',
    icon: <BusinessIcon />,
    subcategories: [
      {
        name: 'Create Customer',
        routeTo: '/dashboard/customer/create',
        icon: <AddCircleOutlineRounded />,
      },
      {
        name: 'View Customers',
        routeTo: '/dashboard/customer/all',
        icon: <GroupIcon />,
      },
    ],
  },
  {
    mainCategory: 'Service Catalogue',
    icon: <StorefrontIcon />,
    subcategories: [
      {
        name: 'Create Catalogue',
        routeTo: '/dashboard/catalog/create',
        icon: <AddCircleOutlineRounded />,
      },
      {
        name: 'Employee Catalogue',
        routeTo: '/dashboard/catalog/employee',
        icon: <PeopleIcon />,
      },
      {
        name: 'Customer Catalogue',
        routeTo: '/dashboard/catalog/customer',
        icon: <BusinessIcon />,
      },
    ],
  },
  {
    mainCategory: 'Resourcing',
    icon: <WorkIcon />,
    subcategories: [
      {
        name: 'Dashboard',
        routeTo: '/',
        icon: <DashboardIcon />,
      },
      {
        name: 'Create Post',
        routeTo: '/',
        icon: <AddCircleOutlineRounded />,
      },
      {
        name: 'Open Posts',
        routeTo: '/',
        icon: <ListIcon />,
      },
      {
        name: 'Interviews',
        routeTo: '/',
        icon: <PlayCircleFilledWhiteIcon />,
      },
      {
        name: 'Offer to approve',
        routeTo: '/',
        icon: <PersonIcon />,
      },
      {
        name: 'Awaiting start date',
        routeTo: '/',
        icon: <DateRangeIcon />,
      },
      {
        name: 'Effective Assignments',
        routeTo: '/',
        icon: <AssignmentTurnedInIcon />,
      },
      {
        name: 'Timecard / Expense',
        routeTo: '/',
        icon: <ReceiptLongIcon />,
      },
      {
        name: 'Invoicing',
        routeTo: '/',
        icon: <InvoiceIcon />,
      },
      {
        name: 'Completed Assignments',
        routeTo: '/',
        icon: <DoneIcon />,
      },
      {
        name: 'Closed Posts',
        routeTo: '/',
        icon: <CheckIcon />,
      },
    ],
  },
  {
    mainCategory: "Asset Management",
    icon: <CategoryIcon />,
    subcategories: [
      {
        name: "Dashboard",
        routeTo: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Create Asset",
        routeTo: "/",
        icon: <AddCircleOutlineRounded />,
      },
      {
        name: "View Asset",
        routeTo: "/",
        icon: <AssignmentIcon />,
      },
      {
        name: "Insurance",
        routeTo:  "/",
        icon: <ReceiptLongIcon />,
      },
      {
        name: "Assets For Sale",
        routeTo:  "/",
        icon: <StorefrontIcon />,
      },
      {
        name: "Marketplace",
        routeTo:  "/",
        icon: <CategoryIcon />,
      },
      {
        name: "Search Asset",
        routeTo:  "/",
        icon: <ReceiptIcon />,
      },
    ],
  },
  {
    mainCategory: "External Ticket",
    icon: <CategoryIcon />,
    subcategories: [
      {
        name: "Dashboard",
        routeTo: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Transactions",
        routeTo: "/",
        icon: <ReceiptLongIcon />,
      },
      {
        name: "Unassigned",
        routeTo: "/",
        icon: <AssignmentIcon />,
      },
      {
        name: "Open Tickets",
        routeTo: "/",
        icon: <ListIcon />,
      },
    
      {
        name: "Resolved Tickets",
        routeTo: "/",
        icon: <CheckCircleIcon />,
      },
      {
        name: "Canceled",
        routeTo: "/",
        icon: <DoneIcon />,
      },
    ],
  },
  {
    mainCategory: "Job Opportunity",
    icon: <WorkIcon />,
    subcategories: [
      {
        name: "Dashboard",
        routeTo: "/",
        icon: <DashboardIcon />,
      },
      {
        name: "Available Jobs",
        routeTo: "/",
        icon: <ListIcon />,
      },
      {
        name: "Applied Jobs",
        routeTo: "/",
        icon: <AssignmentIcon />,
      },
      {
        name: "Interviews",
        routeTo: "/",
        icon: <PlayCircleFilledWhiteIcon />,
      },
      {
        name: "Offer to approve",
        routeTo: "/",
        icon: <PersonIcon />,
      },
      {
        name: "Awaiting start date",
        routeTo:"/",
        icon: <DateRangeIcon />,
      },
      {
        name: "Effective Assignments",
        routeTo: "/",
        icon: <AssignmentTurnedInIcon />,
      },
      {
        name: "Timecard / Expense",
        routeTo: "/",
        icon: <ReceiptLongIcon />,
      },
      {
        name: "Invoicing",
        routeTo: "/",
        icon: <InvoiceIcon />,
      },
      {
        name: "Completed Assignments",
        routeTo: "/",
        icon: <DoneIcon />,
      },
    ],
  },
  {
    name: 'Settings',
    icon: <SettingsIcon />,
    routeTo: '/',
  },
  {
    name: 'Billing',
    icon: <ReceiptIcon />,
    routeTo: '/',
  },
  {
    name: 'Products Docs',
    icon: <DescriptionIcon />,
    routeTo: '/',
  },
  {
    name: 'Support',
    icon: <HelpOutlineIcon />,
    routeTo: '/',
  },
]
