import axios from "axios"

// state
const state = {
    JOIN_ID: null
}

// getters
const getters = {}

// mutations
const mutations = {
    JOIN_MUTATIONS_AXIOS_GET(state, payLoad) {
        state.JOIN_ID = payLoad
    }
}

// actions
const actions = {
    JOIN_ACTION_AXIOS_GET({ commit }, params) {
        console.log('ACTION_AXIOS_GET', params, process.env.VUE_APP_API)
        axios
            .get(process.env.VUE_APP_API, { params })
            .then((res) => {
                console.log(res)
                commit('JOIN_MUTATIONS_AXIOS_GET', res.data)
            })
            .catch((res) => {
                console.error('ACTIONS_TEACHER_FALSE', res)
            })
    },
}

export default {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters,
}