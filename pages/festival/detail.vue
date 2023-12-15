<template>
  <div class="wrap">
    <div class="content">
      <div class="detail-wrap">
        <div class="detail-img">
          <el-carousel>
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
              <img :src="EVENT_DATA.PHOTOS && EVENT_DATA.PHOTOS[item] ? EVENT_DATA.PHOTOS[item]?.imgUrl : ''"
                height="100%" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="detail-info">
          <div class="tit">{{ EVENT_DATA.DETAIL?.title }}</div>
          <div class="info">
            <p class="line">
              <span class="text">서울</span> /
              <span class="text">축제</span>
              <span class="text">
                <el-rate disabled show-score text-color="#ff9900" :score-template="`{value} ${VIEW_TEXT.EvnPt}`"
                  :value="EVENT_DATA.DETAIL?.totalRating ? Number(EVENT_DATA.DETAIL?.totalRating) : 0">
                </el-rate>
              </span>
            </p>
            <p class="line">
              <span class="text">{{ VIEW_TEXT.EvnOvrDsc }}</span>
              <el-skeleton :rows="3" />
            </p>
          </div>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">{{ VIEW_TEXT.evnBasInfo }}</el-menu-item>
          <el-menu-item index="2">{{ VIEW_TEXT.evnUseInfo }}</el-menu-item>
          <el-menu-item index="3">{{ VIEW_TEXT.evnDtlInfo }}</el-menu-item>
          <el-menu-item index="4">{{ VIEW_TEXT.EvnRev }}</el-menu-item>
        </el-menu>
        <div class="">
          <!-- <el-skeleton :rows="10" /> -->
          <div>행사명 : {{ EVENT_DATA.DETAIL?.title }}</div>
          <div>주소 : {{ EVENT_DATA.DETAIL?.addr1 }} {{ EVENT_DATA.DETAIL?.addr2 }}</div>
          <div>홈페이지 : {{ EVENT_DATA.DETAIL?.eventhomepage }}</div>
          <div>연락처 : {{ EVENT_DATA.DETAIL?.sponsor1tel }}</div>
          <div>행사기간 : {{ EVENT_DATA.DETAIL?.eventstartdate }} ~ {{ EVENT_DATA.DETAIL?.eventenddate }}</div>
          <div>행사시간 : <span v-html="EVENT_DATA.DETAIL?.playtime"></span></div>
          <div>연령제한 : {{ EVENT_DATA.DETAIL?.agelimit }}</div>

        </div>
        <div class="">
          <!-- <el-skeleton :rows="10" /> -->
        </div>
        <div class="">
          <!-- <el-skeleton :rows="10" /> -->
          <div v-for="v, i in EVENT_DATA.PHOTOS" :key="i">
            <img :src="v.imgUrl" width="100%" />
          </div>
        </div>
        <div class="">
          <div v-for="v, i in EVENT_DATA.REVIEW" :key="i">
            <div v-if="v.language.substr(0, 2) === lang">
              <div>
                <img :src="v.profile_photo_url" width="50">
              </div>
              <div>
                작성자 : {{ v.author_name }} ({{ v.relative_time_description }}) / 별점: {{ v.rating }}
              </div>
              <div>
                {{ v.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// import imgpath from '~/static/images/logo.svg';
// const seoul = { lat: 37.5642135, lng: 127.0016985 };

export default {
  name: 'MapContentDetail',
  layout: 'index',
  data() {
    return {
      search: '',
      activeIndex: '1',
      lang: 'ko'
    }
  },
  head() {
    return {
      title: `${this.EVENT_DATA.DETAIL?.title}`
    }
  },
  computed: {
    ...mapState(['EVENT_DATA', 'VIEW_TEXT'])
  },
  created() {
    console.log('>>', this.$route.query?.place)
  },
  mounted() {
    const params = {
      contentid: String(this.$route.query?.place)
    }
    this.ACTION_MAP_DETAIL(params)
  },
  methods: {
    ...mapMutations(['MUTATIONS_MAP_LIST']),
    ...mapActions(['ACTION_MAP_DETAIL']),
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  }
}
</script>

<style lang="scss" ></style>
