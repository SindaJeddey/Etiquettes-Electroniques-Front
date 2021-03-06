import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CategoryIcon from '@material-ui/icons/Category';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreIcon from '@material-ui/icons/Store';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React from "react";

export const ADMIN = [
        {
            title:'Home',
            path:'/',
            icon: <HomeIcon />,
            navBar: null
        },
        {
            title:'Profile',
            path:'/profile',
            icon: <AccountCircleIcon />,
            navBar: null

        },
        {
            title:'Operators',
            path:'/operators',
            icon: <PersonIcon />
        },{
            title:'Super-Operators',
            path:'/super-operators',
            icon: <PersonIcon />
        },
        {
            title:'Categories',
            path:'/categories',
            icon: <CategoryIcon />
        },
        {
            title:'Products',
            path:'/products?products=all',
            icon: <ShoppingCartIcon />
        },
        {
            title:'Stores',
            path:'/stores',
            icon: <StoreIcon />,
            navBar: [
                {
                    title: 'Browse Stores',
                    icon: <SearchIcon/>,
                    path:'/stores?operation=browse'

                },
                {
                    title: 'Browse In Store Products',
                    icon: <SearchIcon/>,
                    path:'/stores?operation=browseProducts'
                }
            ]
        },
        {
            title:'About',
            path:'/about',
            icon: <InfoIcon />,
            navBar: null
        },
        {
            title:'Logout',
            path:'/logout',
            icon: <ExitToAppIcon />,
            navBar: null
        },

    ];
export const OPERATOR = [
    {
        title:'Home',
        path:'/',
        icon: <HomeIcon />,
        navBar: null
    },
    {
        title:'Profile',
        path:'/profile',
        icon: <AccountCircleIcon />,
        navBar: null

    },
    {
        title:'Categories',
        path:'/categories',
        icon: <CategoryIcon />,
        navBar: [
            {
                title: 'Browse Categories',
                icon: <SearchIcon/>,
                path:'/categories?operation=browse'
            },
            {
                title: 'Add Categories',
                icon: <AddCircleOutlineIcon/>,
                path:'/categories?operation=add'
            }
        ]
    },
    {
        title:'Products',
        path:'/products',
        icon: <ShoppingCartIcon />,
        navBar: [
            {
                title: 'Browse Products',
                icon: <SearchIcon/>,
                path:'/products?operation=browse'
            },
            {
                title: 'Add Products',
                icon: <AddCircleOutlineIcon/>,
                path:'/products?operation=add'
            }
        ]
    },
    {
        title:'Stores',
        path:'/stores',
        icon: <StoreIcon />,
        navBar: [
            {
                title: 'Browse Stores',
                icon: <SearchIcon/>,
                path:'/stores?operation=browse'

            },
            {
                title: 'Browse In Store Products',
                icon: <SearchIcon/>,
                path:'/stores?operation=browseProducts'
            }
        ]
    },
    {
        title:'About',
        path:'/about',
        icon: <InfoIcon />,
        navBar: null
    },
    {
        title:'Logout',
        path:'/logout',
        icon: <ExitToAppIcon />,
        navBar: null
    },

];
export const SUPER_OPERATOR = [
    {
        title:'Home',
        path:'/',
        icon: <HomeIcon />,
        navBar: null
    },
    {
        title:'Profile',
        path:'/profile',
        icon: <AccountCircleIcon />,
        navBar: null

    },
    {
        title:'Products',
        path:'/products',
        icon: <ShoppingCartIcon />,
        navBar: [
            {
                title: 'Browse Products',
                icon: <SearchIcon/>,
                path:'/products?operation=browse'
            },
            {
                title: 'Add Products',
                icon: <AddCircleOutlineIcon/>,
                path:'/products?operation=add'
            }
        ]
    },
    {
        title:'Stores',
        path:'/stores',
        icon: <StoreIcon />,
        navBar: [
            {
                title: 'Browse Stores',
                icon: <SearchIcon/>,
                path:'/stores?operation=browse'

            },
            {
                title: 'Browse In Store Products',
                icon: <SearchIcon/>,
                path:'/stores?operation=browseProducts'
            }
        ]
    },
    {
        title:'About',
        path:'/about',
        icon: <InfoIcon />,
        navBar: null
    },
    {
        title:'Logout',
        path:'/logout',
        icon: <ExitToAppIcon />,
        navBar: null
    },

];
