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
    { //Quản lý người dùng
        name: 'menu.admin.order-manage', menus: [
            {
                name: 'menu.admin.order-manage-s2', link: '/system/admin/order-manage-s2'
            },
            {
                name: 'menu.admin.order-manage', link: '/system/admin/order-manage'
            },
            {
                name: 'menu.admin.order-manage-s6', link: '/system/admin/order-manage-s6'
            }
        ]
    }
];

export const shipperMenu = [
    { //Quản lý người dùng
        name: 'menu.shipper.order-manage-shipper', menus: [
            {
                name: 'menu.shipper.order-manage-shipper-s3', link: '/system/shipper/order-manage-shipper/s3'
            },
            {
                name: 'menu.shipper.order-manage-shipper-s4', link: '/system/shipper/order-manage-shipper/s4'
            },
            {
                name: 'menu.shipper.order-manage-shipper-s5', link: '/system/shipper/order-manage-shipper/s5'
            }
        ]
    }
];
