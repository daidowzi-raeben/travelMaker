<template>
  <div class="wrap">
    <div class="content">
      <div class="search-top">
        <div class="left">
          <div class="search-wrap">
            <form @submit.prevent="onClickListSearch">
              <el-input v-model="search" placeholder="가고싶은 곳을 검색해보세요"></el-input>
              <button type="submit" class="btn search-btn">
                <i class="el-icon-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div class="right">
          <button type="button" class="btn btn-filter" @click="filterModalShow = true">필터</button>
        </div>
      </div>
      <div v-if="filterData.isFilter === true" class="filter-list">
        <div v-if="filterData.do" class="label">
          {{ LOCATION_CODE[`do${filterData.do}`] }}
          <!-- <button type="button" class="btn-delete">&times;</button> -->
        </div>

        <template v-if="filterData.gu && filterData.gu.length > 0">
          <div v-for="(v, i) in filterData.gu" :key="i" class="label">
            {{ LOCATION_CODE[`do${filterData.do}`] }} / {{ onLoadGuName(v) }}
            <!-- <button type="button" class="btn-delete">&times;</button> -->
          </div>
        </template>
        <div class="label reset" @click="onClickResetFilter">
          필터초기화
          <!-- <button type="button" class="btn-delete">&times;</button> -->
        </div>
      </div>
      <div class="list-option">
        <div class="left">
          <label class="text-check">
            <input type="checkbox" true-value="Y" false-value="N" value="Y" @change="onChangeInProgress" />
            <span class="text">진행중인 축제만 보기</span>
          </label>
        </div>
        <div class="right">
          <button type="button" class="btn btn-list" :class="{ active: listMode == 'list' }"
            @click="onClickListMode('list')"></button>
          <button type="button" class="btn btn-normal" :class="{ active: listMode == 'normal' }"
            @click="onClickListMode('normal')"></button>
          <button type="button" class="btn btn-image" :class="{ active: listMode == 'image' }"
            @click="onClickListMode('image')"></button>
        </div>
      </div>
      <ul v-if="EVENT_DATA.LIST != ''" class="thumb-list"
        :class="{ list: listMode == 'list', image: listMode == 'image' }">
        <template v-for="(v, i) in EVENT_DATA.LIST">
          <li v-if="i < isRowItemCnt * isPage" :key="i" class="thumb-list--item" @click="onClickToDetail(v)">
            <div class="thumb">
              <img v-if="v.firstimage" :src="v.firstimage" alt="" />
              <img v-else src="../../static/images/Thumbnail.svg" alt="" />
            </div>
            <div class="text">
              <div class="tit">{{ v.title }}</div>
              <div class="info">
                <span>{{ LOCATION_CODE[`do${v.areacode}`] }}</span> /
                <span>축제</span>
              </div>
            </div>
          </li>
        </template>
      </ul>
      <div v-else class="nodata">
        <img src="../../static/images/nodata.svg" alt="" />
        데이터가 없어요.
      </div>
    </div>
    <div class="modal" v-bind:class="{ show: filterModalShow }">
      <div class="modal-dim" @click="filterModalShow = false"></div>
      <div class="modal-con bottom">
        <button type="button" class="btn btn-close" @click="filterModalShow = false">&times;</button>
        <div class="input-label">날짜</div>
        <div class="input-wrap">
          <el-date-picker v-model="filterData.stDt" type="date" placeholder="날짜선택">
          </el-date-picker>
          <span class="text">~</span>
          <el-date-picker v-model="filterData.edDt" :picker-options="onLoadDisabledDate(filterData.stDt)" type="date"
            placeholder="날짜선택">
          </el-date-picker>
        </div>
        <div class="input-label">{{ VIEW_TEXT.location }}</div>
        <div class="input-wrap">
          <el-select placeholder="시/도" :value="filterData.do" @change="onChangeGuData">
            <el-option :label="'전체'" :value="''">
            </el-option>
            <el-option v-for="(v, i) in LOCATION_CODE.do" :key="i" :label="v.doName" :value="v.doCode">
            </el-option>
          </el-select>
          <el-select multiple collapse-tags placeholder="시/군/구" :value="filterData.gu" @change="onChangeLocation">
            <el-option v-for="(v, i) in LOCATION_CODE[`gu${filterData.do}`]" :key="i" :label="v.guName" :value="v.guCode">
            </el-option>
          </el-select>
        </div>
        <!-- <div class="input-label">분류</div>
        <div class="input-wrap">
          <el-select v-model="value" placeholder="대분류">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="소분류">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="btn-wrap">
          <el-button type="primary" @click="onClickFilter">필터적용</el-button>
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
      isRowItemCnt: 10,
      isPage: 1,
      isThow: true,
      listMode: 'normal',
      search: '',
      inProgress: 'N',

      date1: '',
      date2: '',
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
      filterData: {
        isFilter: false,
        stDt: null,
        edDt: null,
        do: '',
        gu: []

      },

    }
  },
  head() {
    return {
      title: '트립포인트 행사/축제 목록 보기'
    }
  },
  computed: {
    ...mapState(['EVENT_DATA', 'VIEW_TEXT']),
    ...mapState(['LOCATION_CODE'])
  },
  created() {
    this.ACTION_MAP_LIST();

  },
  mounted() {
    // 리스트 모드 클릭 기록 있을 시 저장값 반영
    if (localStorage.getItem('listMode')) this.onClickListMode(localStorage.getItem('listMode'))

    // 인피니티 스크롤
    document.addEventListener('scroll', this.handlerScrollEvents);
  },
  unmounted() {
    document.removeEventListener('scroll', this.handlerScrollEvents);
  },
  methods: {
    ...mapMutations(['MUTATIONS_MAP_LIST', 'MUTATIONS_MAP_LIST_FILTER']),
    ...mapActions(['ACTION_MAP_LIST', 'ACTION_MAP_PLACE_ID']),

    onClickToDetail(v, p) {
      console.log(v)
      if (v?.place_id) {
        this.$router.push(`/festival/detail?place=${v?.secretKey}`)
      } else {
        this.ACTION_MAP_PLACE_ID(v)
      }
    },

    onLoadDisabledDate(v) {
      const option = {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }
      return option

    },
    onChangeGuData(v) {
      this.filterData.do = v
      this.filterData.gu = ''
    },
    onChangeLocation(v) {
      this.filterData.gu = v
    },
    onClickListMode(v) {
      this.listMode = v
      localStorage.setItem('listMode', v)
    },
    onChangeInProgress({ target }) {
      console.log(target.checked)
      const filterParams = {
        key: 'isNow',
        value: 'Y'
      }
      if (target.checked === true) {
        this.MUTATIONS_MAP_LIST_FILTER(filterParams)
      } else {
        this.MUTATIONS_MAP_LIST_FILTER()
      }
    },
    onClickListSearch() {
      const params = {
        str: this.search,
        stDt: null,
        edDt: null,
        do: null,
        gu: null,
      }
      if (this.filterData.isFilter === true) {
        params.stDt = this.filterData.stDt
        params.edDt = this.filterData.edDt
        params.do = this.filterData.do
        params.gu = this.filterData.gu
      }
      if (this.search || this.filterData.isFilter === true) {
        this.ACTION_MAP_LIST(params)
      } else {
        this.ACTION_MAP_LIST()
      }
    },
    handlerScrollEvents() {
      const docuHeight = document.body.clientHeight
      const isHeight = window.innerHeight + window.scrollY
      // this.isThow = true
      // console.log(docuHeight, isHeight)
      if (this.isThow === true && docuHeight - 200 < isHeight) {
        this.isPage++
        this.isThow = false
        setTimeout(() => {
          this.isThow = true
        }, 500);
      }
    },
    onClickFilter() {
      this.filterData.isFilter = true
      this.filterModalShow = false
      this.onClickListSearch()
    },
    onLoadGuName(v) {
      for (let i = 0; i < this.LOCATION_CODE[`gu${this.filterData.do}`].length; i++) {
        if (this.LOCATION_CODE[`gu${this.filterData.do}`][i].guCode === v) {
          return this.LOCATION_CODE[`gu${this.filterData.do}`][i].guName
        }


      }

    },
    onClickResetFilter() {
      this.filterData = {
        isFilter: false,
        stDt: null,
        edDt: null,
        do: '',
        gu: []

      }
      this.onClickListSearch()
    }
  }
}
</script>

<style lang="scss"></style>
