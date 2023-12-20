import Vue from 'vue'
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense) // 디스플레이 광고
Vue.use(Ads.InArticleAdsense) // 콘텐츠 내 자동 삽입 광고
Vue.use(Ads.InFeedAdsense) // 인피드 광고
