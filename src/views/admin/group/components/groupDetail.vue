<template>
<el-row>
  <el-col :span="24">
    <el-button-group>
      <el-button type="primary" v-if="groupManager_btn_add" icon="plus" @click="handlerAdd">{{$t('btn.add')}}</el-button>
      <el-button type="primary" v-if="groupManager_btn_edit" icon="edit" @click="handlerEdit">{{$t('btn.edit')}}</el-button>
      <el-button type="primary" v-if="groupManager_btn_del" icon="delete" @click="handleDelete">{{$t('btn.delete')}}</el-button>
      <el-button type="primary" v-if="groupManager_btn_resourceManager" @click="handlerAuthority">
        <icon-svg icon-class="quanxian1"></icon-svg>{{$t('group.distribution')}}</el-button>
      <el-button type="primary" v-if="groupManager_btn_userManager" @click="handlerUser">
        <icon-svg icon-class="27"></icon-svg>{{$t('group.relationUser')}}</el-button>
    </el-button-group>
  </el-col>
  <el-col :span="8" style='margin-top:15px;'>
    <el-input :placeholder="$t('rule.filter')" v-model="filterText"> </el-input>
    <el-tree class="left-tree" :data="treeData" node-key="id" highlight-current :props="defaultProps" :filter-node-method="filterNode" ref="groupTree" @node-click="getNodeData" default-expand-all> </el-tree>
  </el-col>
  <el-col :span="16" style='margin-top:15px;'>
    <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
      <el-form-item :label="$t('group.name')">
        <el-input v-model="form.name" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item :label="$t('group.code')">
        <el-input v-model="form.code" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item :label="$t('group.description')">
        <el-input v-model="form.description" :disabled="formEdit"></el-input>
      </el-form-item>
      <el-form-item v-if="formStatus == 'update'">
        <el-button type="primary" v-if="groupManager_btn_edit" @click="update">{{$t('btn.update')}}</el-button>
        <el-button @click="onCancel">{{$t('btn.cancel')}}</el-button>
      </el-form-item>
      <el-form-item v-if="formStatus == 'create'">
        <el-button type="primary" v-if="groupManager_btn_add" @click="create">{{$t('btn.conserve')}}</el-button>
        <el-button @click="onCancel">{{$t('btn.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-dialog :title="dialogUserName" :visible.sync="dialogUserVisible">
    <group-user :groupId="currentId" @closeUserDialog="closeUserDialog" ref="groupUser"></group-user>
  </el-dialog>
  <el-dialog :title="dialogAuthorityName" size="large" :visible.sync="dialogAuthorityVisible">
    <group-authority :groupId="currentId" @closeAuthorityDialog="closeAuthorityDialog" ref="groupAuthority"></group-authority>
  </el-dialog>
</el-row>
</template>

<script>
import {
  fetchTree,
  getObj,
  addObj,
  delObj,
  putObj
} from 'api/admin/group/index';
import { mapGetters } from 'vuex';
export default {
  name: 'groupDetail',
  components: {
    'group-user': () => import('./groupUser'),
    'group-authority': () => import('./groupAuthority')
  },
  props: {
    type: {
      default: '1'
    }
  },
  data() {
    return {
      filterText: '',
      list: null,
      total: null,
      formEdit: true,
      formAdd: true,
      formStatus: '',
      dialogUserVisible: false,
      dialogUserName: this.$t('group.relationUser'),
      dialogAuthorityVisible: false,
      dialogAuthorityName: this.$t('group.relationHref'),
      listQuery: {
        groupType: this.type,
        name: undefined
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      labelPosition: 'right',
      groupManager_btn_edit: false,
      groupManager_btn_del: false,
      groupManager_btn_add: false,
      groupManager_btn_userManager: false,
      groupManager_btn_resourceManager: false,
      form: {
        code: undefined,
        name: undefined,
        description: undefined,
        groupType: this.type
      },
      currentId: -1
    }
  },
  watch: {
    filterText(val) {
      this.$refs.groupTree.filter(val);
    }
  },
  created() {
    this.getList();
    this.groupManager_btn_edit = this.elements['groupManager:btn_edit'];
    this.groupManager_btn_del = this.elements['groupManager:btn_del'];
    this.groupManager_btn_add = this.elements['groupManager:btn_add'];
    this.groupManager_btn_userManager = this.elements['groupManager:btn_userManager'];
    this.groupManager_btn_resourceManager = this.elements['groupManager:btn_resourceManager'];
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
    },
    handlerEdit() {
      if (this.currentId === -1) {
        this.$message({
            showClose: true,
            message: this.$t('group.selectMenu'),
            type: 'warning'
        });
      }
      if (this.form.id) {
        this.formEdit = false;
        this.formStatus = 'update';
      }
    },
    handlerAdd() {
      if (this.currentId === -1) {
        this.$message({
            showClose: true,
            message: this.$t('group.selectMenu'),
            type: 'warning'
        });
      } else {
        this.resetForm();
        this.formEdit = false;
        this.formStatus = 'create';
      }
    },
    handleDelete() {
      if (this.currentId === -1) {
        this.$message({
            showClose: true,
            message: this.$t('group.selectMenu'),
            type: 'warning'
        });
      } else {
        this.$confirm(this.$t('group.cue1'), this.$t('group.cue2'), {
          confirmButtonText: this.$t('btn.confirm'),
          cancelButtonText: this.$t('btn.cancel'),
          type: 'warning'
        }).then(() => {
          delObj(this.currentId).then(() => {
            this.getList();
            this.resetForm();
            this.onCancel();
            this.$notify({
              title: this.$t('group.success'),
              message: this.$t('group.delsuccess'),
              type: 'success',
              duration: 2000
            });
          });
        });
      }
    },
    update() {
      putObj(this.form.id, this.form).then(() => {
        this.getList();
        this.$notify({
          title: this.$t('group.success'),
          message: this.$t('group.crtsuccess'),
          type: 'success',
          duration: 2000
        });
      });
    },
    create() {
      addObj(this.form).then(() => {
        this.getList();
        this.$notify({
          title: this.$t('group.success'),
          message: this.$t('group.crtsuccess'),
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
        parentId: this.currentId,
        code: undefined,
        name: undefined,
        description: undefined,
        groupType: this.type
      };
    },
    handlerUser() {
      if (this.currentId === -1) {
        this.$message({
            showClose: true,
            message: this.$t('group.selectMenu'),
            type: 'warning'
        });
      } else {
        this.dialogUserVisible = true;
      }
      if (this.$refs.groupUser !== undefined) {
        this.$refs.groupUser.groupId = this.currentId;
        this.$refs.groupUser.initUsers();
      }
    },
    handlerAuthority() {
      if (this.currentId === -1) {
        this.$message({
            showClose: true,
            message: this.$t('group.selectMenu'),
            type: 'warning'
        });
      } else {
        this.dialogAuthorityVisible = true;
      }
      if (this.$refs.groupAuthority !== undefined) {
        this.$refs.groupAuthority.groupId = this.currentId;
        this.$refs.groupAuthority.initAuthoritys();
      }
    },
    closeUserDialog() {
      this.dialogUserVisible = false;
    },
    closeAuthorityDialog() {
      this.dialogAuthorityVisible = false;
    }
  }
}
</script>
<style scoped lang='scss'>
.left-tree {
  height: 450px;
  overflow: auto;
}
</style>
