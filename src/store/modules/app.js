import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    visitedViews: [],
    cachedViews: [],
    language: Cookies.get('language') || 'zh',
    isEcho: 3,
    apprDetails: sessionStorage.getItem('apprDetails') ? JSON.parse(sessionStorage.getItem('apprDetails')) : {},
    apprDetailsEnd: sessionStorage.getItem('apprDetailsEnd') ? JSON.parse(sessionStorage.getItem('apprDetailsEnd')) : {},
    queryDetail: sessionStorage.getItem('queryDetail') ? JSON.parse(sessionStorage.getItem('queryDetail')) : {},
    loanDetails: sessionStorage.getItem('loanDetails') ? JSON.parse(sessionStorage.getItem('loanDetails')) : {},
    editGroups: sessionStorage.getItem('editGroups') ? JSON.parse(sessionStorage.getItem('editGroups')) : {},
    collDetails: sessionStorage.getItem('collDetails') ? JSON.parse(sessionStorage.getItem('collDetails')) : {},
    collQueryDetails: sessionStorage.getItem('collQueryDetails') ? JSON.parse(sessionStorage.getItem('collQueryDetails')) : {},
    extDetails: sessionStorage.getItem('extDetails') ? JSON.parse(sessionStorage.getItem('extDetails')) : {},
    reduDetails: sessionStorage.getItem('reduDetails') ? JSON.parse(sessionStorage.getItem('reduDetails')) : {},
    auditDetails: sessionStorage.getItem('auditDetails') ? JSON.parse(sessionStorage.getItem('auditDetails')) : {},
    approvalPage: new Map(),
    trustAchiPage: new Map(),
    apprDispPage: new Map(),
    confirmPage: new Map(),
    orderPage: new Map(),
    lendersPage: new Map(),
    processPage: new Map(),
    groupPage: new Map(),
    collDispPage: new Map(),
    collAchiPage: new Map(),
    extPage: new Map(),
    applyPage: new Map(),
    auditPage: new Map(),
    customPage: new Map(),
    blackPage: new Map(),
    appVerPage: new Map(),
    endReportPage: new Map(),
    rushReportPage: new Map(),
    remindersPage: new Map(),
    returnMonPage: new Map()
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, title: view.meta.title, path: view.path })
      state.cachedViews.push(view.name)
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_ISECHO: (state, flag) => {
      state.isEcho = flag
    },
    SET_APPRDETAIL: (state, data) => {
      state.apprDetails = data
      sessionStorage.setItem('apprDetails', JSON.stringify(data));
    },
    SET_APPRDETAILEND: (state, data) => {
      state.apprDetailsEnd = data
      sessionStorage.setItem('apprDetailsEnd', JSON.stringify(data));
    },
    SET_QUERYDETAIL: (state, data) => {
      state.queryDetail = data
      sessionStorage.setItem('queryDetail', JSON.stringify(data));
    },
    SET_LOANDETAIL: (state, data) => {
      state.loanDetails = data
      sessionStorage.setItem('loanDetails', JSON.stringify(data));
    },
    SET_EDITGROUP: (state, data) => {
      state.editGroups = data
      sessionStorage.setItem('editGroups', JSON.stringify(data));
    },
    SET_COLLDETAIL: (state, data) => {
      state.collDetails = data
      sessionStorage.setItem('collDetails', JSON.stringify(data));
    },
    SET_COLLQUERYDETAIL: (state, data) => {
      state.collQueryDetails = data
      sessionStorage.setItem('collQueryDetails', JSON.stringify(data));
    },
    SET_EXTDETAIL: (state, data) => {
      state.extDetails = data
      sessionStorage.setItem('extDetails', JSON.stringify(data));
    },
    SET_REDUDETAIL: (state, data) => {
      state.reduDetails = data
      sessionStorage.setItem('reduDetails', JSON.stringify(data));
    },
    SET_AUDITDETAIL: (state, data) => {
      state.auditDetails = data
      sessionStorage.setItem('auditDetails', JSON.stringify(data));
    },
    SAVE_APPR_PAGE: (state, { path, listQuery }) => {
      state.approvalPage.set(path, listQuery);
    },
    SAVE_TRUST_ACHI_PAGE: (state, { path, listQuery }) => {
      state.trustAchiPage.set(path, listQuery);
    },
    SAVE_APPR_DISP_PAGE: (state, { path, listQuery }) => {
      state.apprDispPage.set(path, listQuery);
    },
    SAVE_CONFIRM_PAGE: (state, { path, listQuery }) => {
      state.confirmPage.set(path, listQuery);
    },
    SAVE_ORDER_PAGE: (state, { path, listQuery }) => {
      state.orderPage.set(path, listQuery);
    },
    SAVE_LENDERS_PAGE: (state, { path, listQuery }) => {
      state.lendersPage.set(path, listQuery);
    },
    SAVE_PROCESS_PAGE: (state, { path, listQuery }) => {
      state.processPage.set(path, listQuery);
    },
    SAVE_GROUP_PAGE: (state, { path, listQuery }) => {
      state.groupPage.set(path, listQuery);
    },
    SAVE_COLL_DISP_PAGE: (state, { path, listQuery }) => {
      state.collDispPage.set(path, listQuery);
    },
    SAVE_COLL_ACHI_PAGE: (state, { path, listQuery }) => {
      state.collAchiPage.set(path, listQuery);
    },
    SAVE_EXT_PAGE: (state, { path, listQuery }) => {
      state.extPage.set(path, listQuery);
    },
    SAVE_APPLY_PAGE: (state, { path, listQuery }) => {
      state.applyPage.set(path, listQuery);
    },
    SAVE_AUDIT_PAGE: (state, { path, listQuery }) => {
      state.auditPage.set(path, listQuery);
    },
    SAVE_CUSTOM_PAGE: (state, { path, listQuery }) => {
      state.customPage.set(path, listQuery);
    },
    SAVE_BLACK_PAGE: (state, { path, listQuery }) => {
      state.blackPage.set(path, listQuery);
    },
    SAVE_APP_VER_PAGE: (state, { path, listQuery }) => {
      state.appVerPage.set(path, listQuery);
    },
    SAVE_END_REPORT_PAGE: (state, { path, listQuery }) => {
      state.endReportPage.set(path, listQuery);
    },
    SAVE_RUSH_REPORT_PAGE: (state, { path, listQuery }) => {
      state.rushReportPage.set(path, listQuery);
    },
    SAVE_REMINDERS_PAGE: (state, { path, listQuery }) => {
      state.remindersPage.set(path, listQuery);
    },
    SAVE_RETURN_MON_PAGE: (state, { path, listQuery }) => {
      state.returnMonPage.set(path, listQuery);
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({ commit }, view) => {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setIsEcho({ commit }, flag) {
      commit('SET_ISECHO', flag)
    },
    setApprDetail({ commit }, data) {
      commit('SET_APPRDETAIL', data)
    },
    setApprDetailEnd({ commit }, data) {
      commit('SET_APPRDETAILEND', data)
    },
    setQueryDetail({ commit }, data) {
      commit('SET_QUERYDETAIL', data)
    },
    setLoanDetail({ commit }, data) {
      commit('SET_LOANDETAIL', data)
    },
    setEditGroup({ commit }, data) {
      commit('SET_EDITGROUP', data)
    },
    setCollDetail({ commit }, data) {
      commit('SET_COLLDETAIL', data)
    },
    setCollQueryDetail({ commit }, data) {
      commit('SET_COLLQUERYDETAIL', data)
    },
    setExtDetail({ commit }, data) {
      commit('SET_EXTDETAIL', data)
    },
    setReduDetail({ commit }, data) {
      commit('SET_REDUDETAIL', data)
    },
    setAuditDetail({ commit }, data) {
      commit('SET_AUDITDETAIL', data)
    },
    saveApprPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_APPR_PAGE', { path, listQuery });
    },
    saveTrustAchiPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_TRUST_ACHI_PAGE', { path, listQuery });
    },
    saveApprDispPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_APPR_DISP_PAGE', { path, listQuery });
    },
    saveConfirmPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_CONFIRM_PAGE', { path, listQuery });
    },
    saveOrderPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_ORDER_PAGE', { path, listQuery });
    },
    saveLendersPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_LENDERS_PAGE', { path, listQuery });
    },
    saveProcessPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_PROCESS_PAGE', { path, listQuery });
    },
    saveGroupPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_GROUP_PAGE', { path, listQuery });
    },
    saveCollDispPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_COLL_DISP_PAGE', { path, listQuery });
    },
    saveCollAchiPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_COLL_ACHI_PAGE', { path, listQuery });
    },
    saveExtPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_EXT_PAGE', { path, listQuery });
    },
    saveApplyPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_APPLY_PAGE', { path, listQuery });
    },
    saveAuditPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_AUDIT_PAGE', { path, listQuery });
    },
    saveCustomPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_CUSTOM_PAGE', { path, listQuery });
    },
    saveBlackPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_BLACK_PAGE', { path, listQuery });
    },
    saveAppVerPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_APP_VER_PAGE', { path, listQuery });
    },
    saveEndReportPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_END_REPORT_PAGE', { path, listQuery });
    },
    saveRushReportPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_RUSH_REPORT_PAGE', { path, listQuery });
    },
    saveRemindersPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_REMINDERS_PAGE', { path, listQuery });
    },
    saveReturnMonPage: ({ commit }, { path, listQuery }) => {
      commit('SAVE_RETURN_MON_PAGE', { path, listQuery });
    }
  }
};

export default app;
