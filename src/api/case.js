export const caseRouter=[
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
    "name":"spa",
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
            "component": "example/dynFormCase",
            "meta": {
                "title": "动态表单",
                "icon": "el-icon-setting"
            }
        }, {
            "path": "markdown",
            "name": "markdown",
            "component": "example/markdownCase",
            "meta": {
                "title": "富文本编辑器",
                "icon": "el-icon-setting"
            }
        }
        
    ]
}
]