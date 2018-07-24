import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/authredirect',
  component: _import('login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: _import('error/404'),
  hidden: true
},
{
  path: '/401',
  component: _import('error/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: '首页',
  hidden: true,
  meta: {
    title: 'dashboard'
  },
  children: [{
    path: 'dashboard',
    component: _import('dashboard/index'),
    meta: {
      title: 'dashboard'
    }
  }]
},
{
  path: '/introduction',
  component: Layout,
  redirect: '/introduction/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: 'index',
    component: _import('introduction/index'),
    name: '简述'
  }]
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [{
  path: '/adminSys/blacklist',
  redirect: '/blacklist',
  component: Layout,
  name: '黑名单',
  icon: 'setting',
  authority: 'blacklist',
  meta: {
    title: 'blacklist'
  },
  children: [{
    path: '/blacklist',
    component: _import('blacklist/index'),
    name: '黑名单',
    icon: 'setting',
    authority: 'blacklist',
    meta: {
      title: 'blacklist'
    }
  }]
}, {
  path: '/adminSys/customQuery',
  redirect: '/customQuery',
  component: Layout,
  name: '客服查询',
  icon: 'setting',
  authority: 'customQuery',
  meta: {
    title: 'customQuery'
  },
  children: [{
    path: '/customQuery',
    component: _import('customQuery/index'),
    name: '客服查询',
    icon: 'setting',
    authority: 'customQuery',
    meta: {
      title: 'customQuery'
    }
  }]
}, {
  path: '/trust',
  component: Layout,
  name: '信审管理',
  icon: 'setting',
  authority: 'trust',
  meta: {
    title: 'trust'
  },
  children: [{
    path: 'approval',
    icon: 'fa-user',
    component: _import('trust/approval/index'),
    name: '业务审批',
    authority: 'approval',
    meta: {
      title: 'approval'
    }
  }, {
    path: 'orderQuery',
    icon: 'fa-user',
    component: _import('trust/orderQuery/index'),
    name: '订单查询',
    authority: 'orderQuery',
    meta: {
      title: 'orderQuery'
    }
  }, {
    path: 'achievements',
    icon: 'fa-user',
    component: _import('trust/achievements/index'),
    name: '信审业绩统计',
    authority: 'achievements',
    meta: {
      title: 'achievements'
    }
  }, {
    path: 'approvalDispatch',
    icon: 'fa-user',
    component: _import('trust/approvalDispatch/index'),
    name: '信审派单',
    authority: 'approvalDispatch',
    meta: {
      title: 'approvalDispatch'
    }
  }, {
    path: 'confirmation',
    icon: 'fa-user',
    component: _import('trust/confirmation/index'),
    name: '业务审批确认',
    authority: 'confirmation',
    meta: {
      title: 'confirmation'
    }
  }, {
    path: 'approvalDetail',
    icon: 'fa-user',
    component: _import('trust/approvalDetail/index'),
    name: '审批详情',
    authority: 'approvalDetail',
    meta: {
      title: 'approvalDetail'
    }
  }, {
    path: 'addressList',
    icon: 'fa-user',
    component: _import('trust/addressList/index'),
    name: '通讯录',
    authority: 'addressList',
    meta: {
      title: 'addressList'
    }
  }, {
    path: 'achiQuery',
    icon: 'fa-user',
    component: _import('trust/achiQuery/index'),
    name: '统计查询',
    authority: 'achiQuery',
    meta: {
      title: 'achiQuery'
    }
  }, {
    path: 'endApprDetail',
    icon: 'fa-user',
    component: _import('trust/endApprDetail/index'),
    name: '终审详情',
    authority: 'endApprDetail',
    meta: {
      title: 'endApprDetail'
    }
  }]
}, {
  path: '/loan',
  component: Layout,
  name: '放款管理',
  icon: 'setting',
  authority: 'loan',
  meta: {
    title: 'loan'
  },
  children: [{
    path: 'lenders',
    icon: 'fa-user',
    component: _import('loan/lenders/index'),
    name: '业务放款',
    authority: 'lenders',
    meta: {
      title: 'lenders'
    }
  }, {
    path: 'loanDetail',
    icon: 'fa-user',
    component: _import('loan/loanDetail/index'),
    name: '放款详情',
    authority: 'loanDetail',
    meta: {
      title: 'loanDetail'
    }
  }]
}, {
  path: '/collection',
  component: Layout,
  name: '催收管理',
  icon: 'setting',
  authority: 'collection',
  meta: {
    title: 'collection'
  },
  children: [{
    path: 'processing',
    icon: 'fa-user',
    component: _import('collection/processing/index'),
    name: '催收业务处理',
    authority: 'processing',
    meta: {
      title: 'processing'
    }
  }, {
    path: 'grouping',
    icon: 'fa-user',
    component: _import('collection/grouping/index'),
    name: '催收分组管理',
    authority: 'grouping',
    meta: {
      title: 'grouping'
    }
  }, {
    path: 'externalUrge',
    icon: 'fa-user',
    component: _import('collection/externalUrge/index'),
    name: '外催',
    authority: 'externalUrge',
    meta: {
      title: 'externalUrge'
    }
  }, {
    path: 'dispatch',
    icon: 'fa-user',
    component: _import('collection/dispatch/index'),
    name: '催收查询',
    authority: 'dispatch',
    meta: {
      title: 'dispatch'
    }
  }, {
    path: 'achievement',
    icon: 'fa-user',
    component: _import('collection/achievement/index'),
    name: '催收业绩统计',
    authority: 'achievement',
    meta: {
      title: 'achievement'
    }
  }, {
    path: 'newGroup',
    icon: 'fa-user',
    component: _import('collection/newGroup/index'),
    name: '编辑分组',
    authority: 'newGroup',
    meta: {
      title: 'newGroup'
    }
  }, {
    path: 'collDetail',
    icon: 'fa-user',
    component: _import('collection/collDetail/index'),
    name: '催收详情',
    authority: 'collDetail',
    meta: {
      title: 'collDetail'
    }
  }, {
    path: 'extDetail',
    icon: 'fa-user',
    component: _import('collection/extDetail/index'),
    name: '外催详情',
    authority: 'extDetail',
    meta: {
      title: 'extDetail'
    }
  }, {
    path: 'collQueryDetail',
    icon: 'fa-user',
    component: _import('collection/collQueryDetail/index'),
    name: '催收查询详情',
    authority: 'collQueryDetail',
    meta: {
      title: 'collQueryDetail'
    }
  }]
}, {
  path: '/reduction',
  component: Layout,
  name: '减免',
  icon: 'setting',
  authority: 'reduction',
  meta: {
    title: 'reduction'
  },
  children: [{
    path: 'reduApply',
    icon: 'fa-user',
    component: _import('reduction/reduApply/index'),
    name: '减免申请',
    authority: 'reduApply',
    meta: {
      title: 'reduApply'
    }
  }, {
    path: 'reduAudit',
    icon: 'fa-user',
    component: _import('reduction/reduAudit/index'),
    name: '减免审核',
    authority: 'reduAudit',
    meta: {
      title: 'reduAudit'
    }
  }, {
    path: 'reduDetail',
    icon: 'fa-user',
    component: _import('reduction/reduDetail/index'),
    name: '减免详情',
    authority: 'reduDetail',
    meta: {
      title: 'reduDetail'
    }
  }, {
    path: 'auditDetail',
    icon: 'fa-user',
    component: _import('reduction/auditDetail/index'),
    name: '减免审核详情',
    authority: 'auditDetail',
    meta: {
      title: 'auditDetail'
    }
  }]
}, {
  path: '/baseManager',
  component: Layout,
  name: '系统管理',
  icon: 'setting',
  authority: 'baseManager',
  meta: {
    title: 'baseManager'
  },
  children: [{
    path: 'userManager',
    icon: 'fa-user',
    component: _import('admin/user/index'),
    name: '用户管理',
    authority: 'userManager',
    meta: {
      title: 'userManager'
    }
  }, {
    path: 'menuManager',
    icon: 'category',
    component: _import('admin/menu/index'),
    name: '菜单管理',
    authority: 'menuManager',
    meta: {
      title: 'menuManager'
    }
  }, {
    path: 'groupManager',
    icon: 'group_fill',
    component: _import('admin/group/index'),
    name: '角色权限管理',
    authority: 'groupManager',
    meta: {
      title: 'groupManager'
    }
  }, {
    path: 'groupTypeManager',
    icon: 'fa-users',
    component: _import('admin/groupType/index'),
    name: '角色类型管理',
    authority: 'groupTypeManager',
    meta: {
      title: 'groupTypeManager'
    }
  }, {
    path: 'dictManager',
    icon: 'fa-users',
    component: _import('admin/wordbook/index'),
    name: '数据字典',
    authority: 'dictManager',
    meta: {
      title: 'dictManager'
    }
  }, {
    path: 'gateLogManager',
    icon: 'viewlist',
    component: _import('admin/gateLog/index'),
    name: '操作日志',
    authority: 'gateLogManager',
    meta: {
      title: 'gateLogManager'
    }
  }, {
    path: 'departManager',
    icon: 'fa-users',
    component: _import('admin/department/index'),
    name: '组织机构管理',
    authority: 'departManager',
    meta: {
      title: 'departManager'
    }
  }]
}, {
  path: '/product',
  component: Layout,
  name: '产品管理',
  icon: 'setting',
  authority: 'product',
  meta: {
    title: 'product'
  },
  children: [{
    path: 'productManage',
    icon: 'fa-user',
    component: _import('product/productManage/index'),
    name: '产品管理',
    authority: 'productManage',
    meta: {
      title: 'productManage'
    }
  }, {
    path: 'authorize',
    icon: 'fa-user',
    component: _import('product/authorize/index'),
    name: '产品授权',
    authority: 'authorize',
    meta: {
      title: 'authorize'
    }
  }, {
    path: 'addProduct',
    icon: 'fa-user',
    component: _import('product/addProduct/index'),
    name: '新增产品',
    authority: 'addProduct',
    meta: {
      title: 'addProduct'
    }
  }]
}, {
  path: '/statisticalQuery',
  component: Layout,
  name: '统计查询管理',
  icon: 'setting',
  authority: 'statisticalQuery',
  meta: {
    title: 'statisticalQuery'
  },
  children: [{
    path: 'order',
    icon: 'fa-user',
    component: _import('statisticalQuery/order/index'),
    name: '业务订单查询',
    authority: 'order',
    meta: {
      title: 'order'
    }
  }, {
    path: 'overdue',
    icon: 'fa-user',
    component: _import('statisticalQuery/overdue/index'),
    name: '贷后逾期查询',
    authority: 'overdue',
    meta: {
      title: 'overdue'
    }
  }]
}, {
  path: '/controlCenter',
  component: Layout,
  name: '调度中心',
  icon: 'setting',
  authority: 'controlCenter',
  meta: {
    title: 'controlCenter'
  },
  children: [{
    path: 'attemper',
    icon: 'fa-user',
    component: _import('controlCenter/attemper/index'),
    name: '调度管理',
    authority: 'attemper',
    meta: {
      title: 'attemper'
    }
  }]
}, {
  path: '/version',
  component: Layout,
  name: '版本管理',
  icon: 'setting',
  authority: 'version',
  meta: {
    title: 'version'
  },
  children: [{
    path: 'AppVersion',
    icon: 'fa-user',
    component: _import('version/AppVersion/index'),
    name: '版本管理',
    authority: 'AppVersion',
    meta: {
      title: 'AppVersion'
    }
  }, {
    path: 'AppUpgrade',
    icon: 'fa-user',
    component: _import('version/AppUpgrade/index'),
    name: 'APP升级',
    authority: 'AppUpgrade',
    meta: {
      title: 'AppUpgrade'
    }
  }]
}, {
  path: '/reportForm',
  component: Layout,
  name: '报表管理',
  icon: 'setting',
  authority: 'reportForm',
  meta: {
    title: 'reportForm'
  },
  children: [{
    path: 'EndApprReport',
    icon: 'fa-user',
    component: _import('reportForm/EndApprReport/index'),
    name: '终审报表',
    authority: 'EndApprReport',
    meta: {
      title: 'EndApprReport'
    }
  }, {
    path: 'RushReport',
    icon: 'fa-user',
    component: _import('reportForm/RushReport/index'),
    name: '在催报表',
    authority: 'RushReport',
    meta: {
      title: 'RushReport'
    }
  }, {
    path: 'Reminders',
    icon: 'fa-user',
    component: _import('reportForm/Reminders/index'),
    name: '入催报表',
    authority: 'Reminders',
    meta: {
      title: 'Reminders'
    }
  }, {
    path: 'ReturnMoney',
    icon: 'fa-user',
    component: _import('reportForm/ReturnMoney/index'),
    name: '回款报表',
    authority: 'ReturnMoney',
    meta: {
      title: 'ReturnMoney'
    }
  }]
}];
