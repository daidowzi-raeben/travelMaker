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
          <button type="button" class="btn btn-filter">필터</button>
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
          <button type="button" class="btn btn-list"></button>
          <button type="button" class="btn btn-normal active"></button>
          <button type="button" class="btn btn-image"></button>
        </div>
      </div>
      <ul class="thumb-list">
        <li v-for="(v, i) in EVENT_DATA.LIST" :key="i" class="thumb-list--item">
          <div class="thumb">
            <img :src="v.firstimage" alt="" />
          </div>
          <div class="text">
            <div class="tit">{{ v.title }}</div>
            <div class="info">
              <span>서울</span>
              <span>축제</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
            search: '',
            inProgress:'N',
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
        ...mapState(['EVENT_DATA'])
    },
    created() {
        this.ACTION_MAP_LIST()
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
        }
    }
}
</script>

<style lang="scss"></style>
