import router from "@/router";
import store from "@/store";

router.beforeEach(async (to,from,next) => {
    const user = store.state.user;
    // let currentUser = user.loginUser;
    let token = localStorage.getItem('Authorization');

    const needAccess = (to.meta?.access) ?? 'notLogin'

    // 需要用户权限的情况
    if(needAccess !== 'notLogin' || to.path === '/') {
        if(token === null || token === ''){
           next(`/user/login`)
           return
        }
    }
    next()
})