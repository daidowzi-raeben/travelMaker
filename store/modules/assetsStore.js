import axios from "axios"

// state
const state = {
    CS_CUS_SEARCH_DATA: {}
}

// getters
const getters = {}

// mutations
const mutations = {
}

// actions
const actions = {
    ACTION_AXIOS_GET({ commit }, params) {
        console.log('ACTION_AXIOS_GET', params)
        axios
            .get(process.env.VUE_APP_API, { params })
            .then((res) => {
                commit('MUTATIONS_AXIOS_GET', res.data)
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