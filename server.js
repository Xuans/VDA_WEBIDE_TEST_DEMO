const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
KoaBody({ multipart: true })
const Mock = require('mockjs')
const app = new Koa()
const router = new Router()
const shell = require('shelljs')
const path=require('path');
const fs = require('fs')


//获取配置
const getConfig = () => {

	let params = {
		port: 7007
	};

	process.argv.filter(e => e.startsWith('--')).forEach(e => {
		const f = e.replace(/^--/, '');
		const parts = f.split('=');
		params[params[0]] = parts.slice(1).join('=');
		if (parts.length && parts[0]) {
			params[parts[0]] = parts.slice(1).join('=')
		}
	});

	return params;
};

const config=getConfig();
let Users = [];


for (let i = 0; i < 66; i++) {
	Users.push(Mock.mock({
		id: Mock.Random.guid(),
		name: Mock.Random.cname(),
		addr: Mock.mock('@county(true)'),
		'age|18-60': 1,
		birth: Mock.Random.date(),
		sex: Mock.Random.integer(0, 1)
	}));
}

//获取用户列表
router.get('/-/user/list', (ctx) => {
	let { name } = ctx.request.query;

	let mockUsers = Users.filter(user => {
		if (name && user.name.indexOf(name) == -1) return false;
		return true;
	});
	ctx.body = {
		users: mockUsers
	};

});

//获取用户列表（分页）
router.get('/-/user/listpage', (ctx) => {

	let { page, name } = ctx.request.query;

	let mockUsers = Users.filter(user => {
		if (name && user.name.indexOf(name) == -1) return false;
		return true;
	});
	let total = mockUsers.length;
	mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));

	ctx.body = {
		status: true,
		content: {
			total: total,
			users: mockUsers
		}
	};
});

//删除用户
router.get('/-/user/remove', (ctx) => {
	let { id } = ctx.request.query;

	Users = Users.filter(u => u.id !== id);
	ctx.body = {
		code: 200,
		msg: '删除成功'
	};

});


//编辑用户
router.get('/-/user/edit', (ctx) => {
	let { id, name, addr, age, birth, sex } = ctx.request.query;

	Users.some(u => {
		if (u.id === id) {
			u.name = name;
			u.addr = addr;
			u.age = age;
			u.birth = birth;
			u.sex = sex;
			return true;
		}
	});

	ctx.body = {
		code: 200,
		msg: '编辑成功'
	};

});

//新增用户
router.get('/-/user/add', (ctx) => {
	let { name, addr, age, birth, sex } = ctx.request.query;

	Users.push({
		name: name,
		addr: addr,
		age: age,
		birth: birth,
		sex: sex
	});
	ctx.body = {
		code: 200,
		msg: '新增成功'
	};
});
//路由列表
const routerList = [
	{
		"path": "open",
		"name": "open",
		"component": "spa/open",
		"meta": {
			"title": "OPEN",
			"icon": "el-icon-goods"
		}
	},
	{
		"path": "spa",
		"name": "spa",
		"component": "spa/spa",
		"meta": {
			"title": "SPA",
			"icon": "el-icon-goods"
		}
	},
	{
		"path": "case",
		"name": "case",
		"meta": {
			"title": "案例",
			"icon": "el-icon-tickets"
		},
		"children": [
			{
				"path": "table",
				"name": "table",
				"component": "example/table",
				"meta": {
					"title": "表格",
					"icon": "el-icon-goods"
				}
			}, {
				"path": "rightMenu",
				"name": "rightMenu",
				"component": "example/rightMenu",
				"meta": {
					"title": "右键菜单",
					"icon": "el-icon-menu"
				}
			}, {
				"path": "form",
				"name": "form",
				"component": "form/form",
				"meta": {
					"title": "表单",
					"icon": "el-icon-setting"
				}
			}, {
				"path": "hasSubTab",
				"name": "hasSubTab",
				"component": "example/hasSubTab",
				"meta": {
					"title": "嵌套子页面",
					"icon": "el-icon-setting"
				}
			}, {
				"path": "dycSubTab",
				"name": "dycSubTab",
				"component": "example/dycSubTab",
				"meta": {
					"title": "动态子页面",
					"icon": "el-icon-setting"
				}
			}, {
				"path": "dynForm",
				"name": "dynForm",
				"component": "example/dynForm",
				"meta": {
					"title": "动态表单",
					"icon": "el-icon-setting"
				}
			}, {
				"path": "markdown",
				"name": "markdown",
				"component": "example/markdown",
				"meta": {
					"title": "富文本编辑器",
					"icon": "el-icon-setting"
				}
			}

		]
	}


];




router.get('/-/router/get', function (ctx) {

	ctx.body = {
		content: {
			router: routerList
		},
		status: true
	}
})

router.post('/login', function (ctx) {
	ctx.body = {
		content: {
			name: 'admin',
			avatar: 'https://vue.awebide.com/img/user.png',
			ctoken: 'asdadaeff121123ada'
		},
		status: true
	}
})


router.get('/-/gitlog/get', function (ctx) {
	let _cmd = `git log --pretty=format:"%h - %an, %ar : %s"`;
	//let t = `git log  --pretty=format:'{"commit": "%h","author": "%an","date": "%ad","message": "%s"}'`

	ctx.body = {
		gitlog: new Promise((resolve, reject) => {
			shell.exec(_cmd, (code, stdout, stderr) => {
				console.log(stdout);
				if (code) {
					reject(stderr)
				} else {
					resolve(JSON.parse(stdout)[0])
				}
			})
		})
	}
})

router.get('/-/getMainList', function (ctx) {

	var mainList = {

		"result": [{
			"name": "AWEB 社区",
			"href": "https://www.awebide.com/"
		}, {
			"name": "AWEB 开发者中心",
			"href": "https://docs.awebide.com"
		}, {
			"name": "资源市场",
			"href": "https://market.awebide.com"
		}, {
			"name": "桌面示例",
			"href": "https://pc.awebide.com"
		}, {
			"name": "监控示例",
			"href": "https://monitor.awebide.com"
		}, {
			"name": "移动示例",
			"href": "https://mobile.awebide.com"
		}]

	};
	ctx.body = {
		content: mainList,
		status: true
	}
})

router.get('/-/theme/change', (ctx) => {
	let { theme ,oldTheme} =ctx.request.query;
	let themeLib = path.resolve(__dirname, '../server/module/themes');
	let themeScss = path.resolve(__dirname, './element-variables.scss');
	let projectThemeLib = path.resolve(__dirname, './theme');
	let sthemePath = path.join(themeLib,theme,'style.css');
	let sthemeTarget =path.join(projectThemeLib,'index.css');


	console.log('newTheme',theme);
	console.log('oldTheme',oldTheme)
	if (fs.existsSync(themeScss)) {
		console.log(themeScss)
		let varStr = fs.readFileSync(themeScss).toString();

		varStr = varStr.replace(`$--color-primary: ${oldTheme} !default;`,`$--color-primary: ${theme} !default;`);
    
	  fs.writeFileSync(themeScss, varStr);

	const child = execFile('npm run', ['theme'], {
				shell: true,
			cwd: __dirname
	}, (error, stdout, stderr) => {
				if (error) {
						throw error;
				}
				console.log(stdout);
				ctx.body = {
					status: true,
					msg: '更换主题成功'
				};
	
		});



 }


});

//若删掉代理，预览时候不能获取数据
let dataSourcePath=path.join(__dirname,'./server/module/dataSource.js');
if(fs.existsSync(dataSourcePath)){
	require(dataSourcePath)(app,require('./server/config/config.json').dataSource)
}


app.use(KoaBody());

app.use(router.routes());

app.use(router.allowedMethods());

app.use(require('koa-static')(__dirname + '/public'))
//start server
// var options = {
// 	key: fs.readFileSync('./ssl/server.key'), //ssl文件路径
// 	cert: fs.readFileSync('./ssl/server.pem') //ssl文件路径
// };

// http.createServer(app.callback()).listen(80);
// https.createServer(options, app.callback()).listen(443);

app.listen(config.port, () => {
	console.error(`服务器启动成功：${config.port}`);
});


