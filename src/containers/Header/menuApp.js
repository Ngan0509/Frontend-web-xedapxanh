export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.admin',
        menus: [
            {
                name: 'menu.admin.user-manage', link: '/system/admin/user-manage'
            },

            {
                name: 'menu.admin.filter-manage', link: '/system/admin/filter-manage'
            }
        ]
    },

    { //Quản lý xe đạp
        name: 'menu.admin.bicycle-manage', menus: [
            {
                name: 'menu.admin.bicycle-manage', link: '/system/admin/bicycle-manage'
            },
            { name: 'menu.admin.bicycle-markdown', link: '/system/admin/bicycle-markdown' },
            { name: 'menu.admin.bicycle-specifications', link: '/system/admin/bicycle-specifications' },
        ]
    },
    { //Quản lý phụ kiện
        name: 'menu.admin.accessories-manage', menus: [
            {
                name: 'menu.admin.accessories-manage', link: '/system/admin/accessories-manage'
            }
        ]
    },
];

export const shipperMenu = [
    { //Quản lý người dùng
        name: 'menu.shipper.user', menus: [
            {
                name: 'menu.shipper.user', link: '/system/shipper/user-manage'
            }
        ]
    }
];
