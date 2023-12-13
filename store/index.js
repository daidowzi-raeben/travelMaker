import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import ASEETS_STORE from './modules/assetsStore.js'
import JOIN_STORE from './modules/joinStore.js'

Vue.use(Vuex)
const instance = axios.create()
instance.interceptors.request.use(
  function (config) {
    console.log('=============요청전==========')
    // 요청 성공 직전 호출됩니다.
    // axios 설정값을 넣습니다. (사용자 정의 설정도 추가 가능)
    return config
  },
  function (error) {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error)
  }
)

// const apiUrl = {
//   apiMain: '/student.php?type=main&smt_idx=1&sms_idx=1',
// }
// const LOCALSTORAGE = localStorage.getItem('STUDENT')
// console.log('LOCALSTORAGE', LOCALSTORAGE)

const createStore = () => {
  return new Store({
    state: {
      EVENT_DATA: {
        LIST: null,
        MAKERS: [],
        DETAIL: null,
      },
    },
    getters: {},
    mutations: {
      // ----------- intro
      MUTATIONS_MAP_LIST(state, payload) {
        state.EVENT_DATA.LIST = payload
        payload.forEach((v, i) => {
          const mapData = {
            position: {
              lat: Number(v.mapy),
              lng: Number(v.mapx),
            },
            // infoText: `${payload[i]?.title}`,
            detailData: payload[i],
          }

          state.EVENT_DATA.MAKERS.push(mapData)
        })
      },
    },
    actions: {
      ACTION_MAP_LIST({ commit }, params) {
        this.$axios
          .get(`${process.env.VUE_APP_API}?mode=list`, params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            commit('MUTATIONS_MAP_LIST', res.data)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
    },
    modules: {
      foo: {
        namespaced: true,
        modules: {
          assetsStore: ASEETS_STORE,
          joinStore: JOIN_STORE,
        },
      },
    },
  })
}

export default createStore
