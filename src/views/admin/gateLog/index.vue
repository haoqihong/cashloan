<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('gateLog.crtName')" v-model="listQuery.crtName"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">{{$t('btn.search')}}</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="id" width="65">
        <template scope="scope">
          <span>{{scope.row.id}}</span>
</template>
</el-table-column>
<el-table-column width="200px" align="center" :label="$t('gateLog.list')"><template scope="scope">
  <span>
    {{scope.row.menu}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" :label="$t('gateLog.opt')"><template scope="scope">
  <span>
    {{scope.row.opt}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" :label="$t('gateLog.url')"><template scope="scope">
  <span>
    {{scope.row.uri}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" :label="$t('gateLog.crtTime')"><template scope="scope">
  <span>
    {{scope.row.crtTime}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" :label="$t('gateLog.crtUser')"><template scope="scope">
  <span>
    {{scope.row.crtUser}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" :label="$t('gateLog.operator')"><template scope="scope">
  <span>
    {{scope.row.crtName}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" :label="$t('gateLog.crtHost')"><template scope="scope">
  <span>
    {{scope.row.crtHost}}</span>
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
    </div>
</template>

<script>
import {
  page
} from 'api/admin/gateLog/index';
export default {
  name: 'gateLog',
  data() {
    return {
      list: [],
      listLoading: true,
      total: null,
      listQuery: {
        page: 1,
        limit: 20,
        crtName: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      gateLogManager_btn_edit: '1',
      gateLogManager_btn_del: '1',
      gateLogManager_btn_add: '1',
      textMap: {
        update: this.$t('btn.edit'),
        create: this.$t('btn.create')
      },
      tableKey: 0
    }
  },
  created() {
    this.getList();
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
    }
  }
}
</script>
