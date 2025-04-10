import component from "@/locales/en-US/component";

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
    // {
    //     path: '/vanbang',
    //     name: 'Văn bằng',
    //     icon: 'FileTextOutlined',
    //     exact: true,
    //     component: './BAI_TH_4/vanBang',
    // },
	{
		path: '/random-user',
		name: 'Random User',
		icon: "UserOutlined",
		exact:true,
		component:'./RandomUser',
	},
	// Bài 3
	{
		path: '/club-management',
		name: 'Quản lý câu lạc bộ',
		component: './Bai_3',
		icon: 'TeamOutlined',
	},
    {
        path: '/quan-ly-phong-hoc',
        name: 'Quản lý phòng học',
        icon: "BuildOutlined",
        exact: true,
        component: './QuanLyPhongHoc',
    },
    {
        path: '/quan-ly-khoa-hoc',
        name: 'Quản lý khóa học',
        icon: "BookOutlined",
        exact: true,
        component: './QuanLyKhoaHoc',
      }
      ,
      {
        path: '/bao-cao-thong-ke',
        name: 'Báo cáo thống kê',
        icon: 'BarChartOutlined',
        exact: true,
        component: './Bai_4',
      }

];