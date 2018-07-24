<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
     <el-button-group>
    <el-button type="primary" v-if="menuManager_btn_add" icon="plus" @click="handlerAdd">{{$t('btn.add')}}</el-button>
    <el-button type="primary" v-if="menuManager_btn_edit" icon="edit" @click="handlerEdit">{{$t('btn.edit')}}</el-button>
    <el-button type="primary" v-if="menuManager_btn_del" icon="delete" @click="handleDelete">{{$t('btn.delete')}}</el-button>
  </el-button-group>
  </div>

<el-row>
  <el-col :span="8" style='margin-top:15px;'>
    <el-input
      :placeholder="$t('rule.filter')"
      v-model="filterText">
    </el-input>
    <el-tree
      class="filter-tree"
      :data="treeData"
      node-key="id"
      highlight-current
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="menuTree"
      @node-click="getNodeData"
      default-expand-all
      >
    </el-tree>
  </el-col>
  <el-col :span="16" style='margin-top:15px;'>
     <el-card class="box-card">
    <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
      <el-form-item :label="$t('menu.code')" prop="code">
          <el-input v-model="form.code" :disabled="formEdit" :placeholder="$t('rule.code')"></el-input>
      </el-form-item>
          <el-form-item :label="$t('menu.title')" prop="title">
          <el-input v-model="form.title" :disabled="formEdit"  :placeholder="$t('rule.title')"></el-input>
      </el-form-item>
          <el-form-item :label="$t('menu.parentId')" prop="parentId">
          <el-input v-model="form.parentId" :disabled="formEdit" :placeholder="$t('rule.parentId')" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.icon')" prop="icon">
          <el-input v-model="form.icon" :disabled="formEdit" :placeholder="$t('rule.icon')"></el-input>
      </el-form-item>
          <el-form-item :label="$t('menu.href')" prop="href">
          <el-input v-model="form.href" :disabled="formEdit" :placeholder="$t('rule.href')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.type')" prop="type">
         <el-select class="filter-item" v-model="form.type"  :disabled="formEdit"  :placeholder="$t('rule.type')">
          <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('menu.isShow')" prop="show">
        <el-select class="filter-item" v-model='form.show' :disabled="formEdit" :placeholder="$t('rule.choose')">
            <el-option
            v-for='item in showMenu'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('menu.sort')" prop="orderNum">
          <el-input v-model="form.orderNum" :disabled="formEdit" :placeholder="$t('rule.sort')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.description')" prop="description">
          <el-input v-model="form.description" :disabled="formEdit" :placeholder="$t('rule.description')"></el-input>
      </el-form-item>
       <el-form-item :label="$t('menu.component')" prop="attr1">
          <el-input v-model="form.attr1" :disabled="formEdit" :placeholder="$t('rule.component')"></el-input>
      </el-form-item>
       <el-form-item v-if="formStatus == 'update'">
        <el-button type="primary" @click="update">{{$t('btn.update')}}</el-button>
        <el-button @click="onCancel">{{$t('btn.cancel')}}</el-button>
      </el-form-item>
      <el-form-item v-if="formStatus == 'create'">
        <el-button type="primary" @click="create">{{$t('btn.conserve')}}</el-button>
        <el-button @click="onCancel">{{$t('btn.cancel')}}</el-button>
      </el-form-item>
    </el-form>
     </el-card>
    <el-card class="box-card">
        <span>{{$t('menu.resource')}}</span>
      <menu-element :menuId='currentId' ref="menuElement"></menu-element>
    </el-card>
  </el-col>
</el-row>
  </div>
</template>

<script>
import {
  fetchTree, getObj, addObj, delObj, putObj
} from 'api/admin/menu/index';
import { mapGetters } from 'vuex';
export default {
  name: 'menu',
  components: {
    'menu-element': () => import('./components/element')
  },
  data() {
    return {
      showMenu: [
          {
            value: '1',
            label: this.$t('approvalDetail.yes')
          },
          {
            value: '0',
            label: this.$t('approvalDetail.no')
          }
      ],
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      showElement: false,
      typeOptions: ['menu', 'dirt'],
      listQuery: {
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      labelPosition: 'right',
      form: {
        code: undefined,
        title: undefined,
        parentId: undefined,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        attr1: undefined,
        show: undefined
      },
      currentId: -1,
      menuManager_btn_add: false,
      menuManager_btn_edit: false,
      menuManager_btn_del: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.menuManager_btn_add = this.elements['menuManager:btn_add'];
    this.menuManager_btn_del = this.elements['menuManager:btn_del'];
    this.menuManager_btn_edit = this.elements['menuManager:btn_edit'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      fetchTree(this.listQuery).then(data => {
        this.treeData = data;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update';
      }
      getObj(data.id).then(response => {
        this.form = response.data;
      });
      this.currentId = data.id;
      this.showElement = true;
      this.$refs.menuElement.menuId = data.id;
      this.$refs.menuElement.getList();
    },
    handlerEdit() {
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
      }
    },
    handlerAdd() {
      this.resetForm();
      this.formEdit = false;
      this.formStatus = 'create';
    },
    handleDelete() {
      this.$confirm(this.$t('menu.cue1'), this.$t('menu.cue2'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        delObj(this.currentId).then(() => {
          this.getList();
          this.resetForm();
          this.onCancel();
          this.$notify({
            title: this.$t('menu.success'),
            message: this.$t('menu.delsuccess'),
            type: 'success',
            duration: 2000
          });
        });
      });
    },
    update() {
      console.log(this.form)
      putObj(this.form.id, this.form).then(() => {
        this.getList();
        this.$notify({
          title: this.$t('menu.success'),
          message: this.$t('menu.uptsuccess'),
          type: 'success',
          duration: 2000
        });
      });
    },
    create() {
      addObj(this.form).then(() => {
        this.getList();
        this.$notify({
          title: this.$t('menu.success'),
          message: this.$t('menu.crtsuccess'),
          type: 'success',
          duration: 2000
        });
      });
    },
    onCancel() {
      this.formEdit = true;
      this.formStatus = '';
    },
    resetForm() {
      this.form = {
        code: undefined,
        title: undefined,
        parentId: this.currentId,
        href: undefined,
        icon: undefined,
        orderNum: undefined,
        description: undefined,
        path: undefined,
        enabled: undefined,
        type: undefined,
        show: undefined
      };
    }
  }
}
</script>

