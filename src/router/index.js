import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/views/layout/Layout';

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  {
    path     : '/login',
    component: () => import('@/views/login/index'),
    hidden   : true
  },
  {
    path     : '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden   : true
  },
  {
    path     : '/404',
    component: () => import('@/views/errorPage/404'),
    hidden   : true
  },
  {
    path     : '/401',
    component: () => import('@/views/errorPage/401'),
    hidden   : true
  },
  {
    path     : '',
    component: Layout,
    redirect : '/home/index',
    hidden:true,
    children : [{
      hidden:true,
      path     : 'dashboard',
      redirect : '/home/index',
      component: () => import('@/views/dashboard/index'),
      name     : 'dashboard',
      meta     : {
        title  : 'dashboard',
        icon   : 'dashboard',
        noCache: true
      }
    }]
  },
  // {
  //   path     : '/documentation',
  //   component: Layout,
  //   redirect : '/documentation/index',
  //   children : [{
  //     path     : 'index',
  //     component: () => import('@/views/documentation/index'),
  //     name     : 'documentation',
  //     meta     : {
  //       title  : 'documentation',
  //       icon   : 'documentation',
  //       noCache: true
  //     }
  //   }]
  // },
  // {
  //   path     : '/guide',
  //   component: Layout,
  //   redirect : '/guide/index',
  //   children : [{
  //     path     : 'index',
  //     component: () => import('@/views/guide/index'),
  //     name     : 'guide',
  //     meta     : {
  //       title  : 'guide',
  //       icon   : 'guide',
  //       noCache: true
  //     }
  //   }]
  // }
];

export default new Router({
  mode          : 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes        : constantRouterMap
});

export const asyncRouterMap = [
  // {
  //   path      : '/permission',
  //   component : Layout,
  //   redirect  : '/permission/index',
  //   alwaysShow: true, // will always show the root menu
  //   meta      : {
  //     title: 'permission',
  //     icon : 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children  : [{
  //     path     : 'page',
  //     component: () => import('@/views/permission/page'),
  //     name     : 'pagePermission',
  //     meta     : {
  //       title: 'pagePermission',
  //       roles: ['admin'] // or you can only set roles in sub nav
  //     }
  //   }, {
  //     path     : 'directive',
  //     component: () => import('@/views/permission/directive'),
  //     name     : 'directivePermission',
  //     meta     : {
  //       title: 'directivePermission'
  //       // if do not set roles, means: this page does not require permission
  //     }
  //   }]
  // },

  // {
  //   path     : '/icon',
  //   component: Layout,
  //   children : [{
  //     path     : 'index',
  //     component: () => import('@/views/svg-icons/index'),
  //     name     : 'icons',
  //     meta     : {
  //       title  : 'icons',
  //       icon   : 'icon',
  //       noCache: true
  //     }
  //   }]
  // },

  // {
  //   path     : '/components',
  //   component: Layout,
  //   redirect : 'noredirect',
  //   name     : 'component-demo',
  //   meta     : {
  //     title: 'components',
  //     icon : 'component'
  //   },
  //   children : [
  //     {
  //       path     : 'tinymce',
  //       component: () => import('@/views/components-demo/tinymce'),
  //       name     : 'tinymce-demo',
  //       meta     : {title: 'tinymce'}
  //     },
  //     {
  //       path     : 'markdown',
  //       component: () => import('@/views/components-demo/markdown'),
  //       name     : 'markdown-demo',
  //       meta     : {title: 'markdown'}
  //     },
  //     {
  //       path     : 'json-editor',
  //       component: () => import('@/views/components-demo/jsonEditor'),
  //       name     : 'jsonEditor-demo',
  //       meta     : {title: 'jsonEditor'}
  //     },
  //     {
  //       path     : 'splitpane',
  //       component: () => import('@/views/components-demo/splitpane'),
  //       name     : 'splitpane-demo',
  //       meta     : {title: 'splitPane'}
  //     },
  //     {
  //       path     : 'avatar-upload',
  //       component: () => import('@/views/components-demo/avatarUpload'),
  //       name     : 'avatarUpload-demo',
  //       meta     : {title: 'avatarUpload'}
  //     },
  //     {
  //       path     : 'dropzone',
  //       component: () => import('@/views/components-demo/dropzone'),
  //       name     : 'dropzone-demo',
  //       meta     : {title: 'dropzone'}
  //     },
  //     {
  //       path     : 'sticky',
  //       component: () => import('@/views/components-demo/sticky'),
  //       name     : 'sticky-demo',
  //       meta     : {title: 'sticky'}
  //     },
  //     {
  //       path     : 'count-to',
  //       component: () => import('@/views/components-demo/countTo'),
  //       name     : 'countTo-demo',
  //       meta     : {title: 'countTo'}
  //     },
  //     {
  //       path     : 'mixin',
  //       component: () => import('@/views/components-demo/mixin'),
  //       name     : 'componentMixin-demo',
  //       meta     : {title: 'componentMixin'}
  //     },
  //     {
  //       path     : 'back-to-top',
  //       component: () => import('@/views/components-demo/backToTop'),
  //       name     : 'backToTop-demo',
  //       meta     : {title: 'backToTop'}
  //     },
  //     {
  //       path     : 'drag-dialog',
  //       component: () => import('@/views/components-demo/dragDialog'),
  //       name     : 'dragDialog-demo',
  //       meta     : {title: 'dragDialog'}
  //     },
  //     {
  //       path     : 'dnd-list',
  //       component: () => import('@/views/components-demo/dndList'),
  //       name     : 'dndList-demo',
  //       meta     : {title: 'dndList'}
  //     },
  //     {
  //       path     : 'drag-kanban',
  //       component: () => import('@/views/components-demo/dragKanban'),
  //       name     : 'dragKanban-demo',
  //       meta     : {title: 'dragKanban'}
  //     }
  //   ]
  // },
  //
  // {
  //   path     : '/charts',
  //   component: Layout,
  //   redirect : 'noredirect',
  //   name     : 'charts',
  //   meta     : {
  //     title: 'charts',
  //     icon : 'chart'
  //   },
  //   children : [
  //     {
  //       path     : 'keyboard',
  //       component: () => import('@/views/charts/keyboard'),
  //       name     : 'keyboardChart',
  //       meta     : {
  //         title  : 'keyboardChart',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path     : 'line',
  //       component: () => import('@/views/charts/line'),
  //       name     : 'lineChart',
  //       meta     : {
  //         title  : 'lineChart',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path     : 'mixchart',
  //       component: () => import('@/views/charts/mixChart'),
  //       name     : 'mixChart',
  //       meta     : {
  //         title  : 'mixChart',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  //
  // {
  //   path     : '/tab',
  //   component: Layout,
  //   children : [{
  //     path     : 'index',
  //     component: () => import('@/views/tab/index'),
  //     name     : 'tab',
  //     meta     : {
  //       title: 'tab',
  //       icon : 'tab'
  //     }
  //   }]
  // },
  //
  // {
  //   path     : '/table',
  //   component: Layout,
  //   redirect : '/table/complex-table',
  //   name     : 'table',
  //   meta     : {
  //     title: 'Table',
  //     icon : 'table'
  //   },
  //   children : [
  //     {
  //       path     : 'dynamic-table',
  //       component: () => import('@/views/table/dynamicTable/index'),
  //       name     : 'dynamicTable',
  //       meta     : {title: 'dynamicTable'}
  //     },
  //     {
  //       path     : 'drag-table',
  //       component: () => import('@/views/table/dragTable'),
  //       name     : 'dragTable',
  //       meta     : {title: 'dragTable'}
  //     },
  //     {
  //       path     : 'inline-edit-table',
  //       component: () => import('@/views/table/inlineEditTable'),
  //       name     : 'inlineEditTable',
  //       meta     : {title: 'inlineEditTable'}
  //     },
  //     {
  //       path     : 'tree-table',
  //       component: () => import('@/views/table/treeTable/treeTable'),
  //       name     : 'treeTableDemo',
  //       meta     : {title: 'treeTable'}
  //     },
  //     {
  //       path     : 'custom-tree-table',
  //       component: () => import('@/views/table/treeTable/customTreeTable'),
  //       name     : 'customTreeTableDemo',
  //       meta     : {title: 'customTreeTable'}
  //     },
  //     {
  //       path     : 'complex-table',
  //       component: () => import('@/views/table/complexTable'),
  //       name     : 'complexTable',
  //       meta     : {title: 'complexTable'}
  //     }
  //   ]
  // },

  // {
  //   path     : '/example',
  //   component: Layout,
  //   redirect : '/example/list',
  //   name     : 'example',
  //   meta     : {
  //     title: 'example',
  //     icon : 'example'
  //   },
  //   children : [
  //     {
  //       path     : 'create',
  //       component: () => import('@/views/example/create'),
  //       name     : 'createArticle',
  //       meta     : {
  //         title: 'createArticle',
  //         icon : 'edit'
  //       }
  //     },
  //     {
  //       path     : 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name     : 'editArticle',
  //       meta     : {
  //         title  : 'editArticle',
  //         noCache: true
  //       },
  //       hidden   : true
  //     },
  //     {
  //       path     : 'list',
  //       component: () => import('@/views/example/list'),
  //       name     : 'articleList',
  //       meta     : {
  //         title: 'articleList',
  //         icon : 'list'
  //       }
  //     }
  //   ]
  // },

  // {
  //   path     : '/nested',
  //   component: Layout,
  //   redirect : '/nested/menu1/menu1-1',
  //   name     : 'nested',
  //   meta     : {
  //     title: 'nested',
  //     icon : 'nested'
  //   },
  //   children : [
  //     {
  //       path     : 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name     : 'menu1',
  //       meta     : {title: 'menu1'},
  //       redirect : '/nested/menu1/menu1-1',
  //       children : [
  //         {
  //           path     : 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name     : 'menu1-1',
  //           meta     : {title: 'menu1-1'}
  //         },
  //         {
  //           path     : 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name     : 'menu1-2',
  //           redirect : '/nested/menu1/menu1-2/menu1-2-1',
  //           meta     : {title: 'menu1-2'},
  //           children : [
  //             {
  //               path     : 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name     : 'menu1-2-1',
  //               meta     : {title: 'menu1-2-1'}
  //             },
  //             {
  //               path     : 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name     : 'menu1-2-2',
  //               meta     : {title: 'menu1-2-2'}
  //             }
  //           ]
  //         },
  //         {
  //           path     : 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name     : 'menu1-3',
  //           meta     : {title: 'menu1-3'}
  //         }
  //       ]
  //     },
  //     {
  //       path     : 'menu2',
  //       name     : 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta     : {title: 'menu2'}
  //     }
  //   ]
  // },
  //
  // {
  //   path     : '/error',
  //   component: Layout,
  //   redirect : 'noredirect',
  //   name     : 'errorPages',
  //   meta     : {
  //     title: 'errorPages',
  //     icon : '404'
  //   },
  //   children : [
  //     {
  //       path     : '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name     : 'page401',
  //       meta     : {
  //         title  : 'page401',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path     : '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name     : 'page404',
  //       meta     : {
  //         title  : 'page404',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  //
  // {
  //   path     : '/error-log',
  //   component: Layout,
  //   redirect : 'noredirect',
  //   children : [{
  //     path     : 'log',
  //     component: () => import('@/views/errorLog/index'),
  //     name     : 'errorLog',
  //     meta     : {
  //       title: 'errorLog',
  //       icon : 'bug'
  //     }
  //   }]
  // },
  //
  // {
  //   path     : '/excel',
  //   component: Layout,
  //   redirect : '/excel/export-excel',
  //   name     : 'excel',
  //   meta     : {
  //     title: 'excel',
  //     icon : 'excel'
  //   },
  //   children : [
  //     {
  //       path     : 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name     : 'exportExcel',
  //       meta     : {title: 'exportExcel'}
  //     },
  //     {
  //       path     : 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name     : 'selectExcel',
  //       meta     : {title: 'selectExcel'}
  //     },
  //     {
  //       path     : 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name     : 'uploadExcel',
  //       meta     : {title: 'uploadExcel'}
  //     }
  //   ]
  // },
  //
  // {
  //   path      : '/zip',
  //   component : Layout,
  //   redirect  : '/zip/download',
  //   alwaysShow: true,
  //   meta      : {
  //     title: 'zip',
  //     icon : 'zip'
  //   },
  //   children  : [{
  //     path     : 'download',
  //     component: () => import('@/views/zip/index'),
  //     name     : 'exportZip',
  //     meta     : {title: 'exportZip'}
  //   }]
  // },
  //
  // {
  //   path     : '/theme',
  //   component: Layout,
  //   redirect : 'noredirect',
  //   children : [{
  //     path     : 'index',
  //     component: () => import('@/views/theme/index'),
  //     name     : 'theme',
  //     meta     : {
  //       title: 'theme',
  //       icon : 'theme'
  //     }
  //   }]
  // },
  //
  // {
  //   path     : '/clipboard',
  //   component: Layout,
  //   redirect : 'noredirect',
  //   children : [{
  //     path     : 'index',
  //     component: () => import('@/views/clipboard/index'),
  //     name     : 'clipboardDemo',
  //     meta     : {
  //       title: 'clipboardDemo',
  //       icon : 'clipboard'
  //     }
  //   }]
  // },
  //
  // {
  //   path     : '/i18n',
  //   component: Layout,
  //   children : [{
  //     path     : 'index',
  //     component: () => import('@/views/i18n-demo/index'),
  //     name     : 'i18n',
  //     meta     : {
  //       title: 'i18n',
  //       icon : 'international'
  //     }
  //   }]
  // },

  {
    path     : '/home',
    redirect : '/home/index',
    component: Layout,
    meta     : {
      title: 'home',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/home/index.vue'),
        name     : 'homeIndex',
        meta     : {
          title: '首页',
          icon : 'dashboard',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/pictures',
    redirect : '/pictures/index',
    component: Layout,
    meta     : {
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/pictures/index.vue'),
        name     : 'picturesIndex',
        meta     : {
          title: '轮播图',
          icon : 'component',
          noCache: true
        }
      },
      {
        hidden:true,
        path     : 'create',
        component: () => import('@/views/pictures/create.vue'),
        name     : 'picturesCreate',
        meta     : {
          title: '创建轮播图',
          icon : 'star',
          noCache: true
        }
      },
      {
        hidden:true,
        path     : 'update',
        component: () => import('@/views/pictures/edit.vue'),
        name     : 'picturesUpdate',
        meta     : {
          title: '创建轮播图',
          icon : 'star',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/list-one',
    redirect : '/list-one/index',
    component: Layout,
    meta     : {
      title: 'list-one',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/list-one/index.vue'),
        name     : 'listOneIndex',
        meta     : {
          title: '赴加生子福利',
          icon : 'star',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/list-two',
    redirect : '/list-two/index',
    component: Layout,
    meta     : {
      title: 'list-two',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/list-two/index.vue'),
        name     : 'listTwoIndex',
        meta     : {
          title: '成功案例',
          icon : 'list',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/list-three',
    redirect : '/list-three/index',
    component: Layout,
    meta     : {
      title: 'list-three',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/list-three/index.vue'),
        name     : 'listThreeIndex',
        meta     : {
          title: '月子中心',
          icon : 'people',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/list-four',
    redirect : '/list-four/index',
    component: Layout,
    meta     : {
      title: 'list-four',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/list-four/index.vue'),
        name     : 'listFourIndex',
        meta     : {
          title: '政策解析',
          icon : 'documentation',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/list-five',
    redirect : '/list-five/index',
    component: Layout,
    meta     : {
      title: 'list-five',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/list-five/index.vue'),
        name     : 'listFiveIndex',
        meta     : {
          title: '赴加生子费用',
          icon : 'money',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/list-six',
    redirect : '/list-six/index',
    component: Layout,
    meta     : {
      title: 'list-six',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/list-six/index.vue'),
        name     : 'listSixIndex',
        meta     : {
          title: '赴加攻略',
          icon : 'form',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/list-seven',
    redirect : '/list-seven/index',
    component: Layout,
    meta     : {
      title: 'list-seven',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/list-seven/index.vue'),
        name     : 'listSevenIndex',
        meta     : {
          title: '赴加签证',
          icon : 'international',
          noCache: true
        }
      }
    ]
  },
  {
    path     : '/list-eight',
    redirect : '/list-eight/index',
    component: Layout,
    meta     : {
      title: 'list-eight',
      icon : 'star',
      noCache: true
    },
    children : [
      {
        path     : 'index',
        component: () => import('@/views/list-eight/index.vue'),
        name     : 'listEightIndex',
        meta     : {
          title: '大温介绍',
          icon : 'table',
          noCache: true
        }
      }
    ]
  },
  {
    hidden   : true,
    path     : '/user',
    component: Layout,
    children : [
      {
        path     : 'updatepwd',
        component: () => import('@/views/user/updatepwd'),
        name     : 'updatePwd',
        meta     : {
          title: '修改密码',
          icon : 'edit',
          noCache: true
        },
        hidden   : true
      }
  ]
  },
  {
    hidden   : true,
    path     : '/article',
    component: Layout,
    children : [
      {
        path     : 'create',
        component: () => import('@/views/article/create'),
        name     : 'createArticle',
        meta     : {
          title: '新增文章',
          icon : 'edit',
          noCache: true
        },
        hidden   : true
      },
      {
        path     : 'update',
        component: () => import('@/views/article/edit'),
        name     : 'editArticle',
        meta     : {
          title: '修改文章',
          icon : 'edit',
          noCache: true
        },
        hidden   : true
      }
    ]
  },
  {
    path    : '*',
    redirect: '/404',
    hidden  : true
  }
];
