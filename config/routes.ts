export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user/login',
                layout: false,
                name: 'login',
                component: './user/Login',
            },
            {
                path: '/user',
                redirect: '/user/login',
            },
        ],
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: './TrangChu',
        icon: 'HomeOutlined',
    },
    {
        path: '/gioi-thieu',
        name: 'About',
        component: './TienIch/GioiThieu',
        hideInMenu: true,
    },
    {
        path: '/',
        name: 'About',
        component: './TienIch/GioiThieu',
        hideInMenu: true,
    },
    {
        path: '/notification',
        routes: [
            {
                path: './subscribe',
                exact: true,
                component: './ThongBao/Subscribe',
            },
            {
                path: './check',
                exact: true,
                component: './ThongBao/Check',
            },
            {
                path: './',
                exact: true,
                component: './ThongBao/NotifOneSignal',
            },
        ],
        layout: false,
        hideInMenu: true,
    },
    {
        path: '/403',
        component: './exception/403/403Page',
        layout: false,
    },
    {
        path: '/hold-on',
        component: './exception/DangCapNhat',
        layout: false,
    },
	{
		path: '/random-user',
		name: 'Random User',
		icon: "UserOutlined",
		exact:true,
		component:'./RandomUser',
	},

// 	Bài 1
{
		path: '/bai-01',
		name: 'Bài 1',
		component: './Bai_1', 
		icon: 'ArrowsAltOutlined',
},
//   Bài 2
	{
		path: "/Quanlydondangkythanhvien",
		name: "Quản lý đơn đăng ký thành viên",
		component: "./Bai_2",
	},
	// Bài 3

	{
		path: '/club-management',
		name: 'Quản lý câu lạc bộ',
		component: './Bai_3',
		icon: 'TeamOutlined',
	},

//   Bài 4
      {
        path: '/bao-cao-thong-ke',
        name: 'Báo cáo thống kê',
        icon: 'BarChartOutlined',
        exact: true,
        component: './Bai_4',
      }

];
