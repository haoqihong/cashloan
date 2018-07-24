<template>
    <div class="dictionary">
        <el-row>
            <el-col :span="8">
                <div class="grid-content">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{$t('wordbook.title1')}}</span>
                    </div>
                    <el-input
                      :placeholder="$t('rule.filter')"
                      v-model="filterText">
                    </el-input>
                    <el-tree
                    class="filter-tree"
                    :data="data1"
                    :props="defaultProps"
                    node-key="id"
                    default-expand-all
                    highlight-current
                    :expand-on-click-node="false"
                    :render-content="renderContent"
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    ref="tree2">
                    </el-tree>
                  </el-card>
                </div>
            </el-col>
            <el-col :span="16" v-show="!isEdit">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{$t('wordbook.title2')}}</span>
                </div>
                <div class="filter-container">
                  <el-button class="filter-item" type="primary" v-waves @click="handleAdd">{{$t('btn.add')}}</el-button>
                </div>
                <el-table
                :data="tableData"
                border
                style="width: 100%"
                highlight-current-row>
                <el-table-column
                  align="center"
                  header-align="center"
                  prop="dictCode"
                  :label="$t('wordbook.code')"
                  width="150">
                </el-table-column>
                <el-table-column
                  align="center"
                  header-align="center"
                  prop="dictValue"
                  :label="$t('wordbook.value')"
                  width="150">
                </el-table-column>
                <el-table-column
                  align="center"
                  header-align="center"
                  prop="updName"
                  :label="$t('wordbook.upter')"
                  width="150">
                </el-table-column>
                <el-table-column
                  align="center"
                  header-align="center"
                  prop="updTime"
                  :label="$t('wordbook.uptId')"
                  width="150">
                </el-table-column>
                <el-table-column 
                  align="center"
                  header-align="center"
                  fixed="right" 
                  :label="$t('wordbook.operation')"
                  width="150"> 
                  <template scope="scope">
                    <el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">{{$t('btn.edit')}}
                    </el-button>
                    <el-button v-if="userManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">{{$t('btn.delete')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              </el-card>
            </el-col>
            <el-col :span="16" v-show="isEdit">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>{{$t('wordbook.wbedit')}}</span>
                </div>
                <div class="text item">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item :label="$t('wordbook.wbcode')" prop="ordCode">
                          <el-input v-model="ruleForm.ordCode"></el-input>
                      </el-form-item>
                      <el-form-item :label="$t('wordbook.wbname')" prop="ordName">
                          <el-input v-model="ruleForm.ordName"></el-input>
                      </el-form-item>
                      <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.submit')}}</el-button>
                      <el-button @click="cancelEdit">{{$t('btn.cancel')}}</el-button>
                      </el-form-item>
                  </el-form>
                </div>
              </el-card>
          </el-col>
        </el-row>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$t('wordbook.name')" :label-width="formLabelWidth" prop="treeItem">
              <el-input v-model="form.treeItem" auto-complete="off" disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('wordbook.code')" :label-width="formLabelWidth" prop="code">
              <el-input v-model="form.code" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('wordbook.value')" :label-width="formLabelWidth" prop="value">
              <el-input v-model="form.value" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('form')">{{$t('btn.cancel')}}</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">{{$t('btn.confirm')}}</el-button>
            <el-button v-else type="primary" @click="update('form')">{{$t('btn.confirm')}}</el-button>
          </div>
      </el-dialog>
    </div>
</template>

<script>
import { fetchTree, getObj, dictAdd, dictPut, dictDel, addObj, putObj, delObj } from 'api/admin/wordbook/index';
import { mapGetters } from 'vuex';
let id = 1000;
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        treeItem: '',
        code: '',
        value: ''
      },
      formLabelWidth: '80px',
      isEdit: false,
      ruleForm: {
        ordName: '',
        ordCode: '',
      },
      rules: {
        ordCode: [
            { 
                required: true, 
                message: this.$t('rule.wbcode'), 
                trigger: 'blur' 
            }
        ],
        ordName: [
            { 
                required: true, 
                message: this.$t('rule.wbname'), 
                trigger: 'blur' 
            }
        ],
        code: [
          { required: true, message: this.$t('rule.codes'), trigger: 'blur' }
        ],
        value: [
          { required: true, message: this.$t('rule.wbval'), trigger: 'blur' }
        ]
      },
      userManager_btn_edit: false,
      userManager_btn_del: false,
      data1: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      filterText: '',
      tableData: [],
      node: {},
      textMap: {
        update: this.$t('btn.edit'),
        create: this.$t('btn.add')
      },
      dialogStatus: '',
      currentId: null,
      editpId: null,
      okId: null,
      itemId: null
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  created() {
    this.userManager_btn_edit = this.elements['userManager:btn_edit'];
    this.userManager_btn_del = this.elements['userManager:btn_del'];
    this.tree();
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let obj = {};
                obj.code = this.ruleForm.ordCode;
                obj.title = this.ruleForm.ordName;
                obj.id = this.currentId;
                obj.parentId = this.editpId;
                dictPut(obj)
                .then(response => {
                    if (response.status === 200) {
                        this.$message({
                            message: this.$t('wordbook.editsuccess'),
                            type: 'success'
                        });
                        this.isEdit = false;
                        this.tree();
                    } else {
                        this.$message({
                            message: this.$t('wordbook.editfail'),
                            type: 'warning'
                        });
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    },
    append(store, data) {
        let msg = {id: id++, label: '子节点', children: []};
        let obj = {};
        obj.parentId = data.id;
        obj.title = msg.label;
        dictAdd(obj)
        .then(response => {
            if (response.status === 200) {
                this.$message({
                    message: this.$t('wordbook.addsuccess'),
                    type: 'success'
                });
                store.append(msg, data);
                this.tree();
            } else {
                this.$message({
                    message: this.$t('wordbook.addfail'),
                    type: 'warning'
                });
            }
        })
    },
    remove(store, data) {
      this.$confirm(this.$t('user.cue1'), this.$t('user.cue2'), {
          confirmButtonText: this.$t('btn.confirm'),
          cancelButtonText: this.$t('btn.cancel'),
          type: 'warning'
      })
      .then(() => {
      dictDel(data.id)
          .then(response => {
              this.$notify({
                      title: this.$t('user.success'),
                      message: this.$t('user.delsuccess'),
                      type: 'success',
                      duration: 2000
                  });
              store.remove(data);
              this.tree();
          })
      });
    },
    editshow(node, store, data) {
        this.isEdit = true;
        this.ruleForm.ordCode = data.code;
        this.ruleForm.ordName = data.label;
        this.currentId = data.id;
        this.editpId = data.parentId;
    },
    renderContent(h, { node, data, store }) {
        return (
        <span style="display: inline-block;width: 90%;">
            <span>
                <span>{node.label}</span>
            </span>
            <span style="float: right;">
                <i style="color:#309afe;font-size: 12px;margin-right: 5px;" class="el-icon-edit" on-click={ () => this.editshow(node, store, data) }></i>
                <i style="color:#309afe;font-size: 12px;margin-right: 5px;" class="el-icon-plus" on-click={ () => this.append(store, data) }></i>
                <i style="color:#309afe;font-size: 12px;margin-right: 5px;" class="el-icon-delete" on-click={ () => this.remove(store, data) }></i>
            </span>
        </span>);
    },
    handleNodeClick(data) {
      this.node = data;
      this.okId = data.id;
      this.getobj();
    },
    getobj() {
      const obj = {};
      obj.parentId = this.okId;
      getObj(obj).then(data => {
        this.tableData = data;
      })
    },
    tree() {
      fetchTree().then(data => {
        this.data1 = data;
      });
    },
    resetTemp() {
      this.form.code = undefined;
      this.form.value = undefined;
    },
    //列表添加
    handleAdd() {
      this.resetTemp();
      if(JSON.stringify(this.node) !== '{}') {
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.form.treeItem = this.node.label;
      } else {
        this.$message({
            showClose: true,
            message: this.$t('group.selectMenu'),
            type: 'warning'
        });
      }
    },
    //列表编辑
    handleUpdate(row) {
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
        this.form.treeItem = this.node.label;
        //console.log(row)
        this.form.code = row.dictCode;
        this.form.value = row.dictValue;
        this.itemId = row.id;
    },
    //列表删除
    handleDelete(row) {
        this.$confirm(this.$t('user.cue1'), this.$t('user.cue2'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
        })
        .then(() => {
          delObj(row.id)
              .then(() => {
                this.$notify({
                    title: this.$t('user.success'),
                    message: this.$t('user.delsuccess'),
                    type: 'success',
                    duration: 2000
                });
                const index = this.tableData.indexOf(row);
                this.tableData.splice(index, 1);
              });
        });
    },
    //取消编辑
    cancelEdit() {
        this.isEdit = false;
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let obj = {};
          obj.dictTypeId = this.okId;
          obj.dictCode = this.form.code;
          obj.dictValue = this.form.value;
          addObj(obj)
          .then(response => {
            if (response.status === 200) {
                this.$message({
                    message: this.$t('wordbook.addsuccess'),
                    type: 'success'
                });
                this.dialogFormVisible = false;
                this.getobj();
            } else {
                this.$message({
                    message: this.$t('wordbook.addfail'),
                    type: 'warning'
                });
            }
          })
        } else {
          return false;
        }
      });
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          let obj = {};
          obj.id = this.itemId;
          obj.dictCode = this.form.code;
          obj.dictValue = this.form.value;
          putObj(this.itemId, obj)
          .then(response => {
            if (response.status === 200) {
                this.$message({
                    message: this.$t('wordbook.wbeditsuc'),
                    type: 'success'
                });
                this.dialogFormVisible = false;
                this.getobj();
            } else {
                this.$message({
                    message: this.$t('wordbook.wbeditfail'),
                    type: 'warning'
                });
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
.dictionary {
  padding: 20px;
  box-sizing: border-box;
}
.grid-content {
  margin-right: 10px;
}
.el-tree {
  cursor: default;
  background: #fff;
  border: none!important;
}
</style>