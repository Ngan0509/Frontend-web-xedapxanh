export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.admin',
        menus: [
            {
                name: 'menu.admin.user-manage', link: '/system/admin/user-manage'
            },
            {
                name: 'menu.admin.bicycle-manage', link: '/system/admin/bicycle-manage'
            },
            {
                name: 'menu.admin.accessories-manage', link: '/system/admin/accessories-manage'
            }
        ]
    }
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
