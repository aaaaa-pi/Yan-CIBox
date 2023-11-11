export default {
    namespaced: true,
    state: {
        loginUser: {
            userName: "未登录",
            userRole: "notLogin"
        },
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },
    mutations: {
        updateUser(state, payload) {
            state.loginUser = payload;
        },
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        }
    }
}