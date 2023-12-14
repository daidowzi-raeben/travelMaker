<template>
  <div class="wrap">
    <div class="content">
      <div class="search-top">
        <div class="left">
          <div class="search-wrap">
            <el-input
              v-model="search"
              placeholder="가고싶은 곳을 검색해보세요"
            ></el-input>
            <button type="button" class="btn search-btn">
              <i class="el-icon-search"></i>
            </button>
          </div>
        </div>
        <div class="right">
          <button type="button" class="btn btn-filter" @click="filterModalShow = true">필터</button>
        </div>
      </div>
      <div class="list-option">
        <div class="left">
          <label class="text-check">
            <input v-model="inProgress" type="checkbox" true-value="Y" false-value="N" />
            <span class="text">진행중인 축제만 보기</span>
          </label>
        </div>
        <div class="right">
          <button type="button" class="btn btn-list" v-bind:class="{ active: listMode == 'list' }" @click="listMode = 'list'"></button>
          <button type="button" class="btn btn-normal" v-bind:class="{ active: listMode == 'normal' }" @click="listMode = 'normal'"></button>
          <button type="button" class="btn btn-image" v-bind:class="{ active: listMode == 'image' }" @click="listMode = 'image'"></button>
        </div>
      </div>
      <ul class="thumb-list" v-bind:class="{ list: listMode == 'list', image: listMode == 'image' }">
        <li v-for="(v, i) in EVENT_DATA.LIST" :key="i" class="thumb-list--item" @click="onClickToDetail(v)">
          <div class="thumb">
            <img :src="v.firstimage" alt="" />
          </div>
          <div class="text">
            <div class="tit">{{ v.title }}</div>
            <div class="info">
              <span>서울</span> /
              <span>축제</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="modal" v-bind:class="{ show: filterModalShow }">
      <div class="modal-dim" @click="filterModalShow = false"></div>
      <div class="modal-con bottom">
        <button type="button" class="btn btn-close" @click="filterModalShow = false">&times;</button>
        <div class="input-label">날짜</div>
        <div class="input-wrap">
          <el-date-picker
            v-model="date1"
            type="date"
            placeholder="날짜선택">
          </el-date-picker>
          <span class="text">~</span>
          <el-date-picker
            v-model="date2"
            type="date"
            placeholder="날짜선택">
          </el-date-picker>
        </div>
        <div class="input-label">지역</div>
        <div class="input-wrap">
          <el-select  placeholder="시/도" :value="location.do" @change="onChangeGuData">
            <el-option
              v-for="(v,i) in LOCATION_CODE.do"
              :key="i"
              :label="v.doName"
              :value="v.doCode">
            </el-option>
          </el-select>
          <el-select  placeholder="시/군/구" :value="location.gu" @change="onChangeLocation">
            <el-option
              v-for="(v, i) in LOCATION_CODE[`gu${location.do}`]"
              :key="i"
              :label="v.guName"
              :value="v.guCode">
            </el-option>
          </el-select>
        </div>
        <div class="input-label">분류</div>
        <div class="input-wrap">
          <el-select v-model="value" placeholder="대분류">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="소분류">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="btn-wrap">
          <el-button type="primary">필터적용</el-button>
        </div>
      </div>
    </div>
    <router-link to="/map" class="bottom-btn"><span class="icon icon-map"></span>지도보기</router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// import imgpath from '~/static/images/logo.svg';
const seoul = { lat: 37.5642135, lng: 127.0016985 };

export default {
    name: 'MapContent',
    layout: 'index',
    data() {
        return {
            listMode: 'normal',
            search: '',
            inProgress:'N',

            date1:'',
            date2:'',
            options: [{
              value: 'Option1',
              label: 'Option1'
            }, {
              value: 'Option2',
              label: 'Option2'
            }, {
              value: 'Option3',
              label: 'Option3'
            }, {
              value: 'Option4',
              label: 'Option4'
            }, {
              value: 'Option5',
              label: 'Option5'
            }],
            value: '',

            location: {
                do: '',
                gu : '',
            },

            filterModalShow: false,

            place: 'Singapore',
            shape: {
                coords: [10, 10, 10, 15, 15, 15, 15, 10],
                type: 'poly'
            },
            makerImg: {
                url: 'https://an2-img.amz.wtchn.net/image/v2/gL_DmC5m7rzEdBNnml8ybQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1KbklsMHNJbkFpT2lJdmRqSXZjM1J2Y21VdmFXMWhaMlV2TVRZNE1EVXhOVFk1TnpBNE9ERTBOakV3TnlJc0luRWlPamd3TENKM0lqb3hPVEl3ZlEuOEtVTGZueEJKRnllcUlSdzdjZVVCR2dwdjJ4dV9lR2xfVVpIWDNMSGNZcw',
                scaledSize: { width: 20, height: 20 },
            },
            center: seoul,
            // info window
            infoWinOpen: false,
            infoWindowPos: null,
            currentMidx: null,
            infoOptions: {
                content: '',
                pixelOffset: {
                    width: 0,
                    height: -35
                }
            },
        }
    },
    computed: {
        ...mapState(['EVENT_DATA']),
        ...mapState(['LOCATION_CODE'])
    },
    created() {
        this.ACTION_MAP_LIST();
    },
    mounted() {
    },
    methods: {
        ...mapMutations(['MUTATIONS_MAP_LIST']),
        ...mapActions(['ACTION_MAP_LIST', 'ACTION_MAP_PLACE_ID']),

        onClickToDetail(v, p) {
            console.log(v)
            if (v?.place_id) {
                this.$router.push(`/festival/detail?place=${v?.secretKey}`)
            } else {
                this.ACTION_MAP_PLACE_ID(v)
            }
        },

        onChangeGuData(v) {
            this.location.do = v
            this.location.gu = ''
        },
        onChangeLocation(v) {
            this.location.gu = v
        }
    }
}
</script>

<style lang="scss"></style>
