<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('menu.hrefName')" v-model="listQuery.name"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">{{$t('btn.search')}}</el-button>
      <el-button class="filter-item" v-if="menuManager_btn_element_add" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">{{$t('btn.add')}}</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="id" width="65">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('menu.hrefCode')"><template scope="scope">
  <span>
    {{scope.row.code}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('menu.hrefType')"><template scope="scope">
  <span>
    {{scope.row.type}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('menu.hrefName')"><template scope="scope">
  <span>
    {{scope.row.name}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('menu.hrefUrl')"><template scope="scope">
  <span>
    {{scope.row.uri}}</span>
</template>
</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('menu.requestType')"><template scope="scope">
  <span>
    {{scope.row.method}}</span>
</template>

</el-table-column>
    <el-table-column width="200px" align="center" :label="$t('menu.description')"><template scope="scope">
  <span>
    {{scope.row.description}}</span>
</template>

</el-table-column>
    <el-table-column fixed="right" align="center" :label="$t('menu.operation')" width="150"><template scope="scope">
  <el-button v-if="menuManager_btn_element_edit" size="small" type="success" @click="handleUpdate(scope.row)">
    {{$t('btn.edit')}}
  </el-button>
  <el-button v-if="menuManager_btn_element_del" size="small" type="danger" @click="handleDelete(scope.row)">{{$t('btn.delete')}}
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
      <el-form-item :label="$t('menu.hrefCode')" prop="code">
        <el-input v-model="form.code" :placeholder="$t('rule.hrefCode')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.hrefType')" prop="type">
         <el-select class="filter-item" v-model="form.type" :placeholder="$t('rule.hrefType')">
          <el-option v-for="item in  typeOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('menu.hrefName')" prop="name">
        <el-input v-model="form.name" :placeholder="$t('rule.hrefName')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.hrefUrl')" prop="uri">
        <el-input v-model="form.uri" :placeholder="$t('rule.hrefUrl')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('menu.requestType')" prop="method">
        <el-select class="filter-item" v-model="form.method" :placeholder="$t('rule.requestType')">
          <el-option v-for="item in  methodOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
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
} from 'api/admin/element/index';
import { mapGetters } from 'vuex';
export default {
  name: 'element',
  // props: {
  //   menuId: {
  //     default: '1'
  //   }
  // },
  data() {
    return {
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      typeOptions: ['uri', 'button'],
      form: {
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      },
      rules: {
        code: [{
          required: true,
          message: this.$t('rule.hrefCode'),
          trigger: 'blur'
        }
        ],
        type: [{
          required: true,
          message: this.$t('rule.hrefType'),
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: this.$t('rule.hrefName'),
          trigger: 'blur'
        }],
        uri: [{
          required: true,
          message: this.$t('rule.hrefUrl'),
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: this.$t('rule.length'),
          trigger: 'blur'
        }
        ],
        method: [{
          required: true,
          message: this.$t('rule.requestType'),
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: this.$t('rule.length'),
          trigger: 'blur'
        }
        ],
        description: [{
          required: true,
          message: this.$t('rule.inp'),
          trigger: 'blur'
        },
        {
          min: 3,
          max: 20,
          message: this.$t('rule.length'),
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
        name: undefined,
        menuId: this.menuId
      },
      dialogFormVisible: false,
      dialogStatus: '',
      menuManager_btn_element_add: false,
      menuManager_btn_element_edit: false,
      menuManager_btn_element_del: false,
      menuId: -1,
      textMap: {
        update: this.$t('btn.edit'),
        create: this.$t('btn.create')
      },
      tableKey: 0
    }
  },
  created() {
    this.getList();
    this.menuManager_btn_element_add = this.elements['menuManager:btn_element_add'];
    this.menuManager_btn_element_del = this.elements['menuManager:btn_element_del'];
    this.menuManager_btn_element_edit = this.elements['menuManager:btn_element_edit'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.listQuery.menuId = this.menuId;
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
      this.$confirm(this.$t('menu.cue1'), this.$t('menu.cue2'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$notify({
            title: this.$t('menu.success'),
            message: this.$t('menu.delsuccess'),
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
      this.form.menuId = this.menuId;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: this.$t('menu.success'),
              message: this.$t('menu.crtsuccess'),
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
      const set = this.$refs;
      set[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      this.form.menuId = this.menuId;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: this.$t('menu.success'),
              message: this.$t('menu.crtsuccess'),
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
        code: undefined,
        type: undefined,
        name: undefined,
        uri: undefined,
        menuId: undefined,
        method: undefined,
        description: undefined
      };
    }
  }
}
</script>
