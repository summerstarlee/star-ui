<template>
  <div class="app_footer">
    {{CompanyInfo}}<a :href="LinkAddress" target="_blank">{{LinkInfo}}</a>
  </div>
</template>

<script>
import FooterInfo from '../config'
export default {
  name: 'AppFooter',
  data() {
    return {
      CompanyInfo: FooterInfo.CompanyInfo,
      LinkAddress: FooterInfo.LinkAddress,
      LinkInfo: FooterInfo.LinkInfo
    }
  }
}
</script>

<style lang='scss' scoped>
  a{
    color: #4584F4;
  }
</style>
