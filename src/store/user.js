export default {
    namespaced: true,
    state: {
        loginUser: {
            userName: "未登录",
            userRole: "notLogin"
        }
    },
    mutations: {
        updateUser(state, payload) {
            state.loginUser = payload;
        }
    }
}