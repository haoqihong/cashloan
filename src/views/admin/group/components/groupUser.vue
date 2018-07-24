<template>
<el-form label-width="80px">
  <el-form-item :label="$t('group.relationship1')">
    <el-select style="width: 80%;" v-model="members" multiple filterable remote :placeholder="$t('rule.keyword')" :remote-method="remoteMemberMethod" :loading="loading">
      <el-option v-for="item in mItems" :key="item.id" :label="item.username" :value="item.id"> </el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" v-if="groupManager_btn_userManager" @click="onSubmit">{{$t('btn.conserve')}}</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import {
  page
} from 'api/admin/user/index';
import {
  getUsers,
  modifyUsers
} from 'api/admin/group/index';
import { mapGetters } from 'vuex';
export default {
  props: {
    groupId: {
      default: '1'
    }
  },
  data() {
    return {
      mItems: [],
      members: [],
      loading: false,
      groupManager_btn_userManager: false
    }
  },
  created() {
    this.initUsers();
    this.groupManager_btn_userManager = this.elements['groupManager:btn_userManager'];
  },
  computed: {
    ...mapGetters([
      'elements'
    ])
  },
  methods: {
    remoteMemberMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.loading = false;
        page({
          username: query,
          limit: 100
        }).then(response => {
          this.mItems = response.data.rows;
          this.loading = false;
        });
      } else {
        this.mItems = [];
      }
    },
    onSubmit() {
      const vals = {};
      if (this.members.length > 0) vals.members = this.members.join();
      modifyUsers(this.groupId, vals).then(() => {
        this.$emit('closeUserDialog');
        this.$notify({
          title: this.$t('group.success'),
          message: this.$t('group.savesuccess'),
          type: 'success',
          duration: 2000
        });
      });
    },
    initUsers() {
      getUsers(this.groupId).then(response => {
        this.mItems = response.data.members;
        const mems = [];
        for (let i = 0; i < response.data.members.length; i++) {
          mems.push(response.data.members[i].id);
        }
        this.members = mems;
      });
    }
  }
}
</script>
