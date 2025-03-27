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

	///////////////////////////////////
	// DEFAULT MENU
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

	// BAI THUC HANH 2
	// {
	// 	path: '/monhoc/cau-truc-de-thi',
	// 	name: 'Cấu trúc đề thi',
	// 	component: './Bai2/CauTruc',
	// 	icon: 'ReadOutlined', 
	// },

	// {
	// 	path: '/monhoc/de-thi',
	// 	name: 'Đề thi',
	// 	component: './Bai2/DeThi',
	// 	icon: 'ReadOutlined', 
	// },
	// {
	// 	path: '/essay-question',
	// 	name: 'Quản lý câu hỏi',
	// 	component: '@/pages/Bai2/EssayQuestion',
	// },
	// {
	// 	path: '/khoikienthuc',
	// 	name: 'Khối kiến thức',
	// 	component: './Bai2/Khoikienthuc',
	// },
	// {
	// 	path: '/Quanlymonhoc',
	// 	name: 'Quản lý môn học',
	// 	component: './Bai2/Quanlymonhoc',
	// },
	// {
	// 	path: '/oantuti',
	// 	name: 'OanTuTi',
	// 	component: '@/pages/Bai2/oantuti',
	// 	icon: 'ArrowsAltOutlined',
	// },
	// {
	// 	path: '/monhoc/tro-choi',
	// 	name: 'Trò chơi đoán số',
	// 	component: './MonHoc/DoanSo',
	// 	icon: 'ReadOutlined', // Đảm bảo icon ReadOutlined đã được import/config trong dự án
	// },
	// {
	// 	path: '/monhoc/danh-muc-mon-hoc',
	// 	name: 'Danh mục môn học',
	// 	component: './MonHoc/DanhMucMonHoc',
	// 	icon: 'BookOutlined', // Đảm bảo icon BookOutlined đã được import/config trong dự án
	//   },
	//   {
	// 	path: '/monhoc/muc-tieu-hoc-tap',
	// 	name: 'Mục tiêu học tập',
	// 	component: './MonHoc/MucTieuHocTap',
	// 	icon: 'ReadOutlined', // Đảm bảo icon ReadOutlined đã được import/config trong dự án
	//   },
	  
	// {
	// 	path: '/random-user',
	// 	name: 'RandomUser',
	// 	component: './RandomUser',
	// 	icon: 'ArrowsAltOutlined',
	// },
	// {
	// 	path: '/todo-list',
	// 	name: 'TodoList',
	// 	component: './TodoList',
	// 	icon: 'UnorderedListOutlined',
	// },
	// {
	// 	path: '/todo-list',
	// 	name: 'Quản lý tiến độ học tập',
	// 	component: './MonHoc/TienDoHocTap',
	// 	icon: 'UnorderedListOutlined',
	// },

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	

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
		path: '/',
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
		component: './exception/404',
	},
		// In config/routes.ts or config/config.js routes section
		{
			path: '/vanbang',
			name: 'Văn bằng',
			icon: 'FileTextOutlined',
			component: './BAI_TH_4/vanBang',
		  },
		  
		  
		  // Catch-all route LAST
		  {
			component: './exception/404',
		  }
];
