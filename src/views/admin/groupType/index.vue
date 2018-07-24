<template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('groupType.typeName')" v-model="listQuery.name"> </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">{{$t('btn.search')}}</el-button>
    <el-button class="filter-item" v-if="groupTypeManager_btn_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">{{$t('btn.add')}}</el-button>
  </div>
  <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column align="center" label="id" width="65"> <template scope="scope">
                  <span>
                    {{scope.row.id}}
                  </span>
</template>
      </el-table-column>
      <el-table-column width="200px" align="center" :label="$t('groupType.code')">
<template scope="scope">
<span>{{scope.row.code}}</span>
</template>

    </el-table-column>
        <el-table-column width="200px" align="center" :label="$t('groupType.typeName')"><template scope="scope">
  <span>
                {{scope.row.name}}</span>
</template>

    </el-table-column>
    <el-table-column width="200px" align="center" :label="$t('groupType.description')">
<template scope="scope">
<span>
                {{scope.row.description}}
              </span>
</template>

    </el-table-column>
        <el-table-column width="200px" align="center" :label="$t('groupType.lastTime')"><template scope="scope">
  <span>
                {{scope.row.updTime}}</span>
</template>

    </el-table-column>
        <el-table-column width="200px" align="center" :label="$t('groupType.lastRenewing')"><template scope="scope">
  <span>
                {{scope.row.updName}}</span>
</template>

    </el-table-column>
        <el-table-column width="200px" align="center" :label="$t('groupType.updHost')"><template scope="scope">
  <span>
                {{scope.row.updHost}}</span>
</template>

    </el-table-column>
    <el-table-column align="center" :label="$t('groupType.operation')" width="150" fixed="right"><template scope="scope">
  <el-button v-if="groupTypeManager_btn_edit" size="small" type="success" @click="handleUpdate(scope.row)">
    {{$t('btn.edit')}}
  </el-button>
  <el-button v-if="groupTypeManager_btn_del" size="small" type="danger" @click="handleDelete(scope.row)">{{$t('btn.delete')}}
  </el-button>
</template>
    </el-table-column>
  </el-table>
  <div v-show="!listLoading" class="pagination-container">
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
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item :label="$t('groupType.code')" prop="code">
        <el-input v-model="form.code" :placeholder="$t('rule.codes')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('groupType.typeName')" prop="name">
        <el-input v-model="form.name" :placeholder="$t('rule.typeName')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('groupType.description')" prop="description">
        <el-input v-model="form.description" :placeholder="$t('rule.description')"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">{{$t('btn.cancel')}}</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">{{$t('btn.confirm')}}</el-button>
      <el-button v-else type="primary" @click="update('form')">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj
} from 'api/admin/groupType/index';
import { mapGetters } from 'vuex';
export default {
  name: 'groupType',
  data() {
    return {
      form: {
        code: undefined,
        name: undefined,
        description: undefined
      },
      rules: {
        code: [{
          required: true,
          message: this.$t('rule.codes'),
          trigger: 'blur'
        }, {
          min: 3,
          max: 20,
          message: this.$t('rule.length'),
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: this.$t('rule.typeName'),
          trigger: 'blur'
        }, {
          min: 3,
          max: 20,
          message: this.$t('rule.length'),
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: this.$t('rule.description'),
          trigger: 'blur'
        }, {
          min: 3,
          max: 20,
          message: this.$t('rule.length'),
          trigger: 'blur'
        }]
      },
      list: [],
      listLoading: true,
      total: null,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      groupTypeManager_btn_edit: false,
      groupTypeManager_btn_del: false,
      groupTypeManager_btn_add: false,
      textMap: {
        update: this.$t('btn.edit'),
        create: this.$t('btn.create')
      },
      tableKey: 0
    }
  },
  created() {
    this.getList();
    this.groupTypeManager_btn_edit = this.elements['groupTypeManager:btn_edit'];
    this.groupTypeManager_btn_del = this.elements['groupTypeManager:btn_del'];
    this.groupTypeManager_btn_add = this.elements['groupTypeManager:btn_add'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        this.total = Number(response.data.total);
        this.listLoading = false;
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
      getObj(row.id).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = 'update';
      });
    },
    handleDelete(row) {
      this.$confirm(this.$t('groupType.cue1'), this.$t('groupType.cue2'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: this.$t('groupType.success'),
            message: this.$t('groupType.delsuccess'),
            type: 'success',
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      });
    },
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: this.$t('groupType.success'),
              message: this.$t('groupType.crtsuccess'),
              type: 'success',
              duration: 2000
            });
          })
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
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: this.$t('groupType.success'),
              message: this.$t('groupType.crtsuccess'),
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
        sex: this.$t('groupType.male'),
        password: undefined,
        description: undefined
      };
    }
  }
}
</script>
