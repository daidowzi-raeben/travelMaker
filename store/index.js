import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import ASEETS_STORE from './modules/assetsStore.js'
import JOIN_STORE from './modules/joinStore.js'
import LOCATION_DATA from '~/static/json/location.json'
import TEXT_LIST_DATA from '~/static/json/textList.json'

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
      IS_LOADING: false,
      LOCATION_CODE: LOCATION_DATA,
      EVENT_DATA: {
        LIST: null,
        LIST_BACK: null,
        MAKERS: [],
        MAKERS_LIST: [],
        DETAIL: {},
        REVIEW: [],
        PHOTOS: [],
        PHOTOS_COMN: [],
      },
      VIEW_TEXT: {},
      TEXT_LIST: TEXT_LIST_DATA,
    },
    getters: {},
    mutations: {
      // ----------- intro

      MUTATIONS_LANGAGE_SET(state, payload) {
        state.VIEW_TEXT = state.TEXT_LIST[payload]
      },
      MUTATIONS_MAP_LIST_FILTER(state, payload) {
        if (!payload) {
          return (state.EVENT_DATA.LIST = state.EVENT_DATA.LIST_BACK)
        }
        const filteredData = state.EVENT_DATA.LIST.filter(
          (data) => data[payload.key] === payload.value
        )

        state.EVENT_DATA.LIST = filteredData
      },
      MUTATIONS_MAP_DETAIL(state, payload) {
        state.EVENT_DATA.DETAIL = payload.detail
        state.EVENT_DATA.REVIEW = payload.review
        state.EVENT_DATA.PHOTOS = payload.photos
        state.EVENT_DATA.PHOTOS_COMN = payload.photosComn
      },
      MUTATIONS_MAP_MAKERS_LIST(state, payload) {
        state.EVENT_DATA.MAKERS_LIST = []

        const filteredData = state.EVENT_DATA.MAKERS.filter(
          (data) =>
            data.position.lng >= payload.La.lo &&
            data.position.lng <= payload.La.hi &&
            data.position.lat >= payload.eb.lo &&
            data.position.lat <= payload.eb.hi
        )

        state.EVENT_DATA.MAKERS_LIST = filteredData
      },
      MUTATIONS_MAP_LIST(state, payload) {
        state.EVENT_DATA.LIST = payload
        state.EVENT_DATA.LIST_BACK = payload
        state.EVENT_DATA.MAKERS = []
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
      ACTION_MAP_DETAIL({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}?mode=detail&contentid=${params?.contentid}`,
            params,
            {
              header: {
                'Context-Type': 'multipart/form-data',
              },
            }
          )
          .then((res) => {
            console.log(res.data)
            commit('MUTATIONS_MAP_DETAIL', res.data)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_MAP_LIST({ commit }, params) {
        let str = ''
        let stDt = ''
        let edDt = ''
        let dos = ''
        let gu = ''
        if (params?.str) {
          str = params.str
        }
        if (params?.stDt) {
          stDt = new Date(params.stDt)
            .toLocaleDateString()
            .replace(/\./g, '')
            .replace(/\s/g, '-')
        }
        if (params?.edDt) {
          edDt = new Date(params.edDt)
            .toLocaleDateString()
            .replace(/\./g, '')
            .replace(/\s/g, '-')
        }
        if (params?.do) {
          dos = params.do
        }
        if (params?.gu) {
          let gudata = ''
          params?.gu.forEach((element) => {
            gudata += element + '|'
          })
          gu = gudata
        }
        this.$axios
          .get(
            `${process.env.VUE_APP_API}?mode=list&str=${str}&stDt=${stDt}&edDt=${edDt}&do=${dos}&gu=${gu}`,
            params,
            {
              header: {
                'Context-Type': 'multipart/form-data',
              },
            }
          )
          .then((res) => {
            console.log(res.data)
            commit('MUTATIONS_MAP_LIST', res.data)
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      },
      ACTION_MAP_PLACE_ID({ commit }, params) {
        this.$axios
          .get(
            `${process.env.VUE_APP_API}?mode=getPlaceId&location=${params?.mapy},${params?.mapx}&radius=1&keyword=${params?.title}`,
            params,
            {
              header: {
                'Context-Type': 'multipart/form-data',
              },
            }
          )
          .then((res) => {
            console.log(res.data)
            // commit('MUTATIONS_MAP_PLACE_ID', res.data)
            if (res?.data?.results && res?.data?.results.length > 0) {
              const placeId = res?.data?.results[0]?.place_id

              this.$axios
                .get(
                  `${process.env.VUE_APP_API}?mode=placeId&q=${placeId}&idx=${params?.idx}`,
                  params,
                  {
                    header: {
                      'Context-Type': 'multipart/form-data',
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data)
                  // 라우터 이동
                  this.$router.push(
                    `/festival/detail?place=${params?.secretKey}`
                  )
                  // commit('MUTATIONS_MAP_PLACE_ID', res.data)
                })
                .catch((res) => {
                  console.log('AXIOS FALSE', res)
                })
            } else {
              this.$router.push(`/festival/detail?place=${params?.secretKey}`)
            }
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
