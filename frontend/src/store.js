import { createStore } from 'vuex';
import wofApi from "./httpLayers/wofApi";

const store = createStore({
    state() {
        return {
            username: null,
            email: null,
            accountType: null,
        }
    },
    mutations: {
        logOut(state) {
            state.username = null;
            state.email = null;
            state.accountType = null;

        },
        setUser(state, payload) {
            state.username = payload.username;
            state.email = payload.email;
            state.accountType = payload.accountType;
        }
    },
    actions: {
        async logIn(context, payload) {
            await wofApi
                .post("/login", { username: payload.username, password: payload.password })
                .then((response) => {
                    context.commit('setUser', response.data);
                    return true;
                })
                .catch((error) => {
                    if (error.response) {
                        throw new Error(`${error.response.data.message}`);
                    } else if (error.request) {
                        throw new Error("Service refused connection");
                    } else {
                        throw new Error("Undefined error");
                    }
                });
            return false;
        }
    },
    getters: {
        username(state) {
            return state.username;
        },
        email(state) {
            return state.email;
        },
        accountType(state) {
            return state.accountType;
        },
    }
});

export default store;