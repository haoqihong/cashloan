<template>
<el-row>
  <el-col :span="24">
    <el-button type="primary" v-if="groupManager_menu" @click="update">{{$t('btn.conserve')}}</el-button>
  </el-col>
  <el-col :span="8" style='margin-top:15px;'>
    <el-input :placeholder="$t('rule.filter')" v-model="filterText"> </el-input>
    <el-tree class="filter-tree" check-strictly :data="treeData" show-checkbox node-key="id" highlight-current :props="defaultProps" :filter-node-method="filterNode" ref="menuTree" @check-change="selectFn" @node-click="getNodeData" default-expand-all>
    </el-tree>
  </el-col>
  <el-col :span="16" style='margin-top:15px;'>
    <el-table ref="elementTable" :data="list" border fit highlight-current-row @select="handleSelectionChange" style="width: 100%"
    @select-all="selectAllChange">
      <el-table-column v-if="groupManager_element" type="selection" width="55" :selectable='checkboxInit'> </el-table-column>
      <el-table-column width="200px" align="center" :label="$t('group.hrefCode')"><template scope="scope">
    <span>
        {{scope.row.code}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('group.hrefType')"><template scope="scope">
    <span>
        {{scope.row.type}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('group.hrefName')"><template scope="scope">
    <span>
        {{scope.row.name}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('group.hrefUrl')"><template scope="scope">
    <span>
        {{scope.row.uri}}</span>
</template>
</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('group.requestType')"><template scope="scope">
    <span>
        {{scope.row.method}}</span>
</template>
</el-table-column>
  </el-table>
        </el-col>

    </el-row>

</template>
<script>
import {
  fetchTree
} from 'api/admin/menu/index';
import {
  page
} from 'api/admin/element/index';
import {
  removeElementAuthority,
  addElementAuthority,
  getElementAuthority,
  modifyMenuAuthority,
  getMenuAuthority,
  allRemove,
  allAdd
} from 'api/admin/group/index';
import { mapGetters } from 'vuex';
export default {
  name: 'menu',
  props: {
    groupId: {
      default: '1'
    }
  },
  data() {
    return {
      isDisabled: false,
      filterText: '',
      list: null,
      total: null,
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      groupManager_menu: false,
      groupManager_element: false,
      currentId: -1
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.groupManager_menu = this.elements['groupManager:menu'];
    this.groupManager_element = this.elements['groupManager:element'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    checkboxInit(row, index){
      if (!this.isDisabled) 
        return 0;//不可勾选
      else
        return 1;//可勾选
    },
    selectFn(data, val, val1) {
      this.isDisabled = val;
    },
    getList() {
      fetchTree(this.listQuery).then(data => {
        this.treeData = data;
        this.initAuthoritys();
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      this.listQuery.menuId = data.id;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        getElementAuthority(this.groupId).then(data => {
          const obj = {};
          for (let i = 0; i < this.list.length; i++) {
            obj[this.list[i].id] = this.list[i];
          }
          const toggle = {};
          for (let i = 0; i < data.data.length; i++) {
            const id = data.data[i]
            if (obj[id] !== undefined && toggle[id] === undefined) {
              this.$refs.elementTable.toggleRowSelection(obj[data.data[i]]);
              toggle[id] = true;
            }
          }
        });
      });
      this.currentId = data.id;
      this.showElement = true;
    },
    // getTreeNodeKey(node) {
    //   return node.id;
    // },
    //表格复选框改变时触发
    handleSelectionChange(val, row) {
      let flag = true;
      for (let i = 0; i < val.length; i++) {
        if (val[i].id === row.id) {
          addElementAuthority(this.groupId, {
            menuId: this.currentId,
            elementId: row.id
          });
          flag = false;
          break;
        }
      }
      if (flag) {
        removeElementAuthority(this.groupId, {
          menuId: this.currentId,
          elementId: row.id
        });
      }
    },
    selectAllChange(val) {
      let arr = [];
      val.forEach(item => {
        arr.push(item.id)
      })
      let alls = arr.join()
      let flag = true;
      for (let i = 0; i < val.length; i++) {
        allAdd(this.groupId, {
          menuId: this.currentId,
          elementId: alls
        });
        flag = false;
        break;
      }
      // if (flag) {
      //   allRemove(this.groupId, {
      //     menuId: this.currentId,
      //     elementId: alls
      //   });
      // }
    },
    update() {
      this.$emit('closeAuthorityDialog');
      const nodes = this.$refs.menuTree.getCheckedNodes();
      const ids = [];
      for (let i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].id);
      }
      modifyMenuAuthority(this.groupId, {
        menuTrees: ids.join()
      }).then(() => {
        this.$notify({
          title: this.$t('group.success'),
          message: this.$t('group.savesuccess'),
          type: 'success',
          duration: 2000
        });
      });
    },
    initAuthoritys() {
      getMenuAuthority(this.groupId).then(data => {
        const result = [];
        for (let i = 0; i < data.data.length; i++) {
          result.push(data.data[i].id);
        }
        this.$refs.menuTree.setCheckedKeys(result);
      });
    }
  }
}
</script>
