<template>
    <div class="department">
        <el-button type="primary" class="init">{{$t('department.init')}}</el-button>
        <el-row>
            <el-col :span="11">
                <div class="grid-content">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{$t('department.title1')}}</span>
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
                    ref="tree1">
                    </el-tree>
                  </el-card>
                </div>
            </el-col>
            <el-col :span="13" v-show="!isEdit">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>{{$t('department.title2')}}</span>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="$t('department.user')" name="first">
                        <div class="filter-container">
                            <el-input @keyup.enter.native="handleFilter_user" style="width: 200px;" class="filter-item" :placeholder="$t('department.name')" v-model="listQuery.name"> </el-input>
                            <el-button class="filter-item" type="primary" v-waves @click="handleFilter_user">{{$t('btn.search')}}</el-button>
                        </div>
                        <el-table
                            max-height="280"
                            :data="list"
                            border
                            style="width: 100%"
                            highlight-current-row>
                            <el-table-column
                            align="center"
                            header-align="center"
                            prop="name"
                            :label="$t('department.name')">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            header-align="center"
                            prop="sex"
                            :label="$t('department.sex')">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            header-align="center"
                            prop="username"
                            :label="$t('department.username')">
                            </el-table-column>
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
                    </el-tab-pane>
                    <el-tab-pane :label="$t('department.usergroup')" name="second">
                        <div class="filter-container">
                            <el-input @keyup.enter.native="handleFilter_post" style="width: 200px;" class="filter-item" :placeholder="$t('department.group')" v-model="groupQuery.name"> </el-input>
                            <el-button class="filter-item" type="primary" v-waves @click="handleFilter_post">{{$t('btn.search')}}</el-button>
                            <el-button class="filter-item" type="success" style="margin-left: 10px;" @click="relation_user">{{$t('department.rltuser')}}</el-button>
                            <!-- <el-button class="filter-item" type="success" style="margin-left: 10px;" @click="relation_role">{{$t('department.rltrole')}}</el-button> -->
                            <el-button class="filter-item" type="success" style="margin-left: 10px;" @click="data_authorization">{{$t('department.data')}}</el-button>
                        </div>
                        <el-table
                            max-height="280"
                            :data="list1"
                            @row-click="relationFn"
                            border
                            style="width: 100%"
                            highlight-current-row>
                            <el-table-column
                            align="center"
                            header-align="center"
                            prop="name"
                            :label="$t('department.group')">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            header-align="center"
                            prop="code"
                            :label="$t('department.code')">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            header-align="center"
                            prop="description"
                            :label="$t('user.describe')"
                            show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="pagination-container">
                            <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="groupQuery.page"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="groupQuery.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total1">
                            </el-pagination>
                        </div>
                        <el-dialog :title="$t('department.rltuser')" :visible.sync="dialogFormVisible">
                            <span>{{$t('department.rltuser')}}</span>
                            <el-select style="width: 80%;" v-model="input2" multiple filterable remote :placeholder="$t('rule.keyword')" :remote-method="remoteMemberMethod">
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.username"
                                :value="item.id">
                                </el-option>
                            </el-select>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="hold">{{$t('btn.conserve')}}</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog :title="$t('department.rltrole')" :visible.sync="dialogFormVisible1">
                            <el-button type="primary" @click="dialogFormVisible1 = false" style="margin-bottom: 10px;">{{$t('btn.conserve')}}</el-button>
                            <el-input
                            :placeholder="$t('rule.filter')"
                            v-model="filterText1">
                            </el-input>
                            <el-tree
                            class="filter-tree"
                            :data="data2"
                            show-checkbox
                            node-key="id"
                            :props="defaultProps"
                            default-expand-all
                            :filter-node-method="filterNode"
                            ref="tree2">
                            </el-tree>
                        </el-dialog>
                        <el-dialog :title="$t('department.data')" :visible.sync="dialogFormVisible2">
                            <el-button type="primary" @click="hold1" style="margin-bottom: 10px;">{{$t('btn.conserve')}}</el-button>
                            <el-input
                            :placeholder="$t('rule.filter')"
                            v-model="filterText2">
                            </el-input>
                            <el-tree
                            class="filter-tree"
                            :data="data3"
                            show-checkbox
                            node-key="id"
                            :props="defaultProps"
                            default-expand-all
                            :default-checked-keys="def_checked"
                            :filter-node-method="filterNode"
                            ref="tree3"
                            :check-strictly="true">
                            </el-tree>
                        </el-dialog>
                    </el-tab-pane>
                </el-tabs>
              </el-card>
            </el-col>
            <el-col :span="13" v-show="isEdit">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                    <span>{{$t('department.groupEdit')}}</span>
                    </div>
                    <div class="text item">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item :label="$t('department.ordCode')" prop="ordCode">
                            <el-input v-model="ruleForm.ordCode"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('department.ordName')" prop="ordName">
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
    </div>
</template>

<script>
    import { fetchTreeG, fetchTree, fetchUser, group, getUser, getGroupUser, addUserGroup, authGroupUser, getOrgByGroup,
    orgAdd, orgPut, orgDel } from 'api/admin/department/index'
    import { page } from 'api/admin/user/index';
    let id = 1000;
    let addNode=false;
    export default {
        data() {
            return {
                loading: false,
                isEdit: false,
                ruleForm: {
                    ordName: '',
                    ordCode: '',
                },
                gridData: [],
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                data1: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                filterText: '',
                input1: '',
                input2: [],
                list: [],
                activeName: 'first',
                list1: [],
                total: null,
                listQuery: {
                    page: 1,
                    limit: 20,
                    orgId: undefined,
                    name: undefined
                },
                total1: null,
                groupQuery: {
                    page: 1,
                    limit: 10,
                    code: undefined,
                    name: undefined
                },
                formLabelWidth: '120px',
                addform: {
                    name: '',
                    code: ''
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: this.$t('rule.group'),
                            trigger: 'blur'
                        }
                    ],
                    code: [
                        {
                            required: true,
                            message: this.$t('rule.codenull'),
                            trigger: 'blur'
                        }
                    ],
                    ordCode: [
                        { 
                            required: true, 
                            message: this.$t('rule.ordCode'),
                            trigger: 'blur' 
                        }
                    ],
                    ordName: [
                        { 
                            required: true, 
                            message: this.$t('rule.ordName'), 
                            trigger: 'blur' 
                        }
                    ]
                },
                current_row: {},
                options: [],
                filterText1: '',
                data2: [],
                filterText2: '',
                data3: [],
                def_checked: [],
                currentId: null,
                editpId: null,
                currentTree: {}
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree1.filter(val);
            },
            filterText1(val) {
                this.$refs.tree2.filter(val);
            },
            filterText2(val) {
                this.$refs.tree3.filter(val);
            }
        },
        created() {
            this.tree();
        },
        methods: {
            tree() {
                fetchTree().then(data => {
                    this.data1 = data;
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {};
                        obj.orgTypeCode = this.ruleForm.ordCode;
                        obj.orgName = this.ruleForm.ordName;
                        obj.id = this.currentId;
                        obj.parentId = this.editpId;
                        orgPut(this.currentId, obj)
                        .then(response => {
                            if (response.status === 200) {
                                this.$message({
                                    message: this.$t('department.editsuccess'),
                                    type: 'success'
                                });
                                this.isEdit = false;
                                this.tree();
                            } else {
                                this.$message({
                                    message: this.$t('department.editfail'),
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
                obj.orgName = msg.label;
                orgAdd(obj)
                .then(response => {
                    if (response.status === 200) {
                        this.$message({
                            message: this.$t('department.addsuccess'),
                            type: 'success'
                        });
                        store.append(msg, data);
                        this.tree();
                    } else {
                        this.$message({
                            message: this.$t('department.addfail'),
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
                orgDel(data.id)
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
            //用户管理搜索
            handleFilter_user() {
                this.getList()
            },
            //tab切换
            handleClick(tab, event) {
                //console.log(tab, event);
            },
            //用户组搜索
            handleFilter_post() {
                this.getGroup()
            },
            //关联用户
            relation_user() {
                if(JSON.stringify(this.current_row) != '{}') {
                    this.dialogFormVisible = true;
                    getGroupUser(this.current_row.id)
                        .then(res => {
                            if(res.data !== "") {
                                this.options = res.data;
                                const mems = [];
                                for (let i = 0; i < res.data.length; i++) {
                                    mems.push(res.data[i].id);
                                }
                                this.input2 = mems;
                            }
                        })
                } else {
                    this.$notify({
                        title: this.$t('department.cue2'),
                        message: this.$t('department.cue1'),
                        type: 'warning'
                    });
                }
            },
            // //关联用户保存
            hold() {
                let obj = {};
                if (this.input2.length > 0) obj.userIds = this.input2.join();
                if (obj.userIds !== "") {
                    this.dialogFormVisible = false
                    addUserGroup(this.current_row.id, obj) 
                    .then(res => {
                        if (res.status === 200) {
                            this.$message({
                                message: this.$t('department.msg1'),
                                type: 'success'
                            });
                        } else {
                            this.$message.error(this.$t('department.msg2'));
                        }
                    })
                } else {
                    this.$message({
                        message: '请选择关联用户',
                        type: 'warning'
                    });
                }
            },
            remoteMemberMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    this.loading = false;
                    page({
                        username: query,
                        limit: 100
                    }).then(response => {
                        this.options = response.data.rows;
                        this.loading = false;
                    });
                } else {
                    this.options = [];
                }
            },
            //数据授权
            data_authorization() {
                if(JSON.stringify(this.current_row) != '{}') {
                    this.dialogFormVisible2 = true;
                    fetchTree()
                    .then(res => {
                        this.data3 = res;
                    })
                    getOrgByGroup(this.current_row.id)
                    .then(res => {
                        this.def_checked = [];
                        res.data.forEach(item => {
                            this.def_checked.push(Number(item.orgId))
                        })
                        this.def_checked = Array.from(new Set(this.def_checked))
                    })
                } else {
                    this.$notify({
                        title: this.$t('department.cue2'),
                        message: this.$t('department.cue1'),
                        type: 'warning'
                    });
                }
            },
            //数据授权保存
            hold1() {
                this.dialogFormVisible2 = false;
                let tr3 = this.$refs.tree3.getCheckedKeys().join()
                let obj1 = {};
                obj1.orgId = tr3;
                if(obj1.orgId !== "") {
                    authGroupUser(this.current_row.id, obj1) 
                    .then(res => {
                        if(res.status === 200) {
                            this.$message({
                                message: this.$t('group.savesuccess'),
                                type: 'success'
                            });
                            getOrgByGroup(this.current_row.id)
                            .then(res => {
                                this.def_checked = [];
                                res.data.forEach(item => {
                                    this.def_checked.push(Number(item.orgId))
                                })
                                this.def_checked = Array.from(new Set(this.def_checked))
                            })
                        }
                    })
                }
            },
            handleNodeClick(data) {
                this.currentTree = data;
                this.listQuery.orgId = data.id;
                this.getList();
                this.groupQuery.code = 'auth_group';
                this.getGroup();
            },
            //用户管理
            getList() {
                fetchUser(this.listQuery)
                .then(response => {
                    this.list = response.data.rows;
                    this.total = Number(response.data.total);
                })
            },
            //用户组
            getGroup() {
                group(this.groupQuery)
                .then(response => {
                    this.list1 = response.data.rows;
                    this.total1 = Number(response.data.total);
                })
            },
            handleSizeChange(val) {
                this.listQuery.limit = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.page = val;
                this.getList();
            },
            handleSizeChange1(val) {
                this.groupQuery.limit = val;
                this.getGroup();
            },
            handleCurrentChange1(val) {
                this.groupQuery.page = val;
                this.getGroup();
            },
            //选中行的数据
            relationFn(row) {
                this.current_row = row
                //数据授权回显
                getOrgByGroup(this.current_row.id)
                    .then(res => {
                        this.def_checked = [];
                        res.data.forEach(item => {
                            this.def_checked.push(Number(item.orgId))
                        })
                        this.def_checked = Array.from(new Set(this.def_checked))
                    })
                //关联用户回显
                // getGroupUser(this.current_row.id)
                //     .then(res => {
                //         if(res.data !== "") {
                //             this.input2 = [];
                //             res.data.forEach(item => {
                //                 this.input2.push(Number(item.id))
                //             })
                //             this.input2 = Array.from(new Set(this.input2))
                //         }
                //     })
            },
            //取消编辑
            cancelEdit() {
                this.isEdit = false;
            }
        }
    }
</script>

<style scoped lang="scss">
.department {
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
.init {
  margin-bottom: 10px;
}
.el-tree-node__label {
    font-size: 14px;
}
</style>