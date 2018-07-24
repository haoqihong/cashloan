<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.account')" v-model="listQuery.username"> </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">{{$t('btn.search')}}</el-button>
    <el-button class="filter-item"  v-if="userManager_btn_add"  style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">{{$t('btn.add')}}</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" :label="$t('user.num')" width="65">
      <template scope="scope">
        <span>{{scope.row.index}}</span>
      </template>
    </el-table-column>
    <el-table-column width="200" align="center" :label="$t('user.name')"> <template scope="scope">
        <span>{{scope.row.name}}</span>
      </template> </el-table-column>
    <el-table-column width="110" align="center" :label="$t('user.account')"> <template scope="scope">
            <span>{{scope.row.username}}</span>
          </template> </el-table-column>
    <el-table-column width="280" align="center" :label="$t('user.orgName')"> <template scope="scope">
            <span>{{scope.row.orgName}}</span>
          </template> </el-table-column>
    <el-table-column width="280" align="center" :label="$t('menu.type')" prop='type'> 
      <template scope="scope">
          <span v-show="scope.row.type=== '2'">{{$t('user.external')}}</span>
          <span v-show="scope.row.type!== '2'">{{$t('user.inside')}}</span>
      </template> 
    </el-table-column>      
    <el-table-column width="110" align="center" :label="$t('user.sex')"> <template scope="scope">
            <span>{{scope.row.sex}}</span>
          </template> </el-table-column>
    <el-table-column width="300" align="center" :label="$t('user.remarks')"> <template scope="scope">
            <span>{{scope.row.description}}</span>
          </template> </el-table-column>
    <el-table-column width="180" align="center" :label="$t('user.lastTime')"> <template scope="scope">
          <span>{{scope.row.updTime}}</span>
        </template> </el-table-column>
    <el-table-column width="200" align="center" :label="$t('user.lastRenewing')"> <template scope="scope">
            <span>{{scope.row.updName}}</span>
          </template> </el-table-column>
    <el-table-column align="center" :label="$t('user.operation')" width="150" fixed="right" > <template scope="scope">
        <el-button v-if="userManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">{{$t('btn.edit')}}
        </el-button>
        <el-button v-if="userManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">{{$t('btn.delete')}}
        </el-button>
      </template> </el-table-column>
  </el-table>
  <div class="pagination-container">
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="listQuery.page"
    :page-sizes="[10, 20, 30, 50]"
    :page-size="listQuery.limit"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
  </div>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close = "closeDialog">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item :label="$t('user.name')" prop="name">
        <el-input v-model="form.name" :placeholder="$t('rule.name')" autoComplete="off"></el-input>
      </el-form-item>
      <div style="display: flex;">
        <el-form-item :label="$t('user.account')" prop="username">
          <el-input v-if="dialogStatus == 'create'" v-model="form.username" :placeholder="$t('rule.account')"></el-input>
          <el-input v-else v-model="form.username" :placeholder="$t('rule.account')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.type')" prop="type">
          <el-radio-group v-model="form.type" v-if="dialogStatus == 'create'">
            <el-radio label="1" style="color: #aaa">{{$t('user.inside')}}</el-radio>
            <el-radio label="2" style="color: #aaa">{{$t('user.external')}}</el-radio>
          </el-radio-group>
          <el-radio-group v-else v-model="form.type">
            <el-radio label="1" style="color: #aaa">{{$t('user.inside')}}</el-radio>
            <el-radio label="2" style="color: #aaa">{{$t('user.external')}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item v-if="dialogStatus == 'create'" :label="$t('user.psd')" prop="password">
        <el-input type="password" v-model="form.password" :placeholder="$t('rule.psd')" autoComplete="off"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.company')" prop="ids">
        <el-input v-model="form.ids" :placeholder="$t('rule.company')">
          <el-button slot="append" @click="choice" class="search-btn"><i class="el-icon-search"></i></el-button>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('user.sex')">
        <el-select class="filter-item" v-model="form.sex" :placeholder="$t('rule.choose')">
          <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('user.describe')">
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" :placeholder="$t('rule.content')" v-model="form.description"> </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">{{$t('btn.cancel')}}</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')" :disabled="isDisable">{{$t('btn.confirm')}}</el-button>
      <el-button v-else type="primary" @click="update('form')">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
  <el-dialog
      width="30%"
      :title="$t('user.chooseCompany')"
      :visible.sync="innerVisible"
      append-to-body
      class="chooseFn">
    <el-input v-model="input" :placeholder="$t('rule.filter')"></el-input>
    <el-tree 
      :data="data1" 
      :props="defaultProps" 
      @node-click="handleNodeClick" 
      check-on-click-node
      highlight-current
      default-expand-all></el-tree>
    <span slot="footer" class="dialog-footer">  
      <el-button type="primary" class="add-btn" @click="addFn">{{$t('btn.add')}}</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  fetchTree,
  justUserExit
} from 'api/admin/user/index';
import { mapGetters } from 'vuex';
export default {
  name: 'user',
  data() {
    return {
      isDisable: false,
      form: {
        username: undefined,
        name: undefined,
        sex: this.$t('user.male'),
        password: undefined,
        orgId: undefined,
        description: undefined,
        ids: undefined,
        type: '1'
      },
      rules: {
        name: [
          {
            required: true,
            message: this.$t('rule.name'),
            trigger: 'blur'
          }],
        username: [
          {
            required: true,
            message: this.$t('rule.account'),
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: this.$t('rule.length'),
            trigger: 'blur'
          },
          { validator: function(rule, value, callback) {
            if (value) {
              if (/[\u4E00-\u9FA5]/g.test(value)) {
                callback(new Error('账户不能输入汉字!'));
              } else {
                callback();
              }
            }
            callback();
          }, trigger: 'blur'}
        ],
        password: [
          {
            required: true,
            message: this.$t('rule.psd'),
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: this.$t('rule.length'),
            trigger: 'blur'
          }
        ],
        ids: [
          {
            required: true,
            message: this.$t('rule.company'),
            trigger: 'change'
          },
          {
            min: 1,
            max: 20,
            message: this.$t('rule.length'),
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: this.$t('rule.userType'),
            trigger: 'blur'
          }
        ]
      },
      list: [],
      listLoading: true,
      total: null,
      listQuery: {
        page: 1,
        limit: 10,
        username: ''
      },
      sexOptions: [this.$t('user.male'), this.$t('user.female')],
      dialogFormVisible: false,
      innerVisible: false,
      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: this.$t('btn.edit'),
        create: this.$t('btn.create')
      },
      tableKey: 0,
      input: '',
      data1: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectnode: '',
      selectId: '',
      isexistence: undefined,
      listId: null
    }
  },
  created() {
    this.getList();
    this.userManager_btn_edit = this.elements['userManager:btn_edit'];
    this.userManager_btn_del = this.elements['userManager:btn_del'];
    this.userManager_btn_add = this.elements['userManager:btn_add'];
    fetchTree().then(data => {
      this.data1 = data;
    });
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    closeDialog(done) {
      done();
      this.$refs["form"].resetFields();
    },
    getList() {
      page(this.listQuery)
        .then(response => {
          if (response.status === 200) {
            this.listLoading = false;
            this.list = response.data.rows;
            this.list.forEach((item, index) => {
              item.index = index + (this.listQuery.page - 1) * this.listQuery.limit + 1
            })
            this.total = Number(response.data.total);
          } else {
            this.listLoading = true;
          }
        })
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      this.listId = row.id;
      this.selectId = row.orgId;
      getObj(row.id)
        .then(response => {
          if (response.data.type !== '2' || response.data.type === '') {
            response.data.type = '1'
          }
          this.form = response.data;
          this.dialogFormVisible = true;
          this.dialogStatus = 'update';
          this.form.ids = response.data.orgName;
        });
    },
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
              const index = this.list.indexOf(row);
              this.list.splice(index, 1);
            });
        });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          //判断账户是否存在
          let obj = {};
          obj.username = this.form.username;
          justUserExit(obj)
          .then(res => {
            this.isexistence = res
              if (this.isexistence === false) {
                this.isDisable = true;
                this.form.orgId = this.selectId
                addObj(this.form)
                .then((response) => {
                  if (response.status === 200) {
                    this.isDisable = false
                    this.dialogFormVisible = false;
                    this.getList();
                    this.$notify({
                      title: this.$t('user.success'),
                      message: this.$t('user.crtsuccess'),
                      type: 'success',
                      duration: 2000
                    });
                  }
                });
            } else {
              this.$message({
                showClose: true,
                message: this.$t('user.exist'),
                type: 'error'
              });
            }
          })
          //若账户不存在则添加
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.orgId = this.selectId;
          // if (this.form.type === '2' && this.form.username.substring(this.form.username.length - 3) !== '-os') {
          //   this.form.username = this.form.username + '-os'
          // }
          putObj(this.listId, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: this.$t('user.success'),
              message: this.$t('user.crtsuccess'),
              type: 'success',
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {
        username: undefined,
        name: undefined,
        sex: this.$t('user.male'),
        password: undefined,
        orgId: undefined,
        description: undefined,
        ids: undefined,
        type: '1'
      };
    },
    addFn() {
      this.innerVisible = false;
      this.form.orgId = this.selectnode;
      this.form.ids = this.selectnode;
    },
    handleNodeClick(data) {
      this.selectnode = data.label
      this.selectId = data.id
    },
    choice() {
      this.innerVisible = true;
    }
  }
}
</script>
<style scope lang="scss">
.search-btn {
  background: #eee!important;
  border-radius: 0!important;
}
.add-btn {
  text-align: right;
}
.chooseFn>div {
  width: 30%;
}
.el-tree {
    cursor: default;
    background: #fff;
    border: none!important;
}
</style>

