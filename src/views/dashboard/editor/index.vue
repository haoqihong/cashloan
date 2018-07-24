<template>
	<div class="dashboard-editor-container" style="margin-top: 110px;">
		<div class="box-card" >
      <div class="icon">
        <img :src="first" alt="">
      </div>
      <div class="info">
        <div style="font-size:22px;color: #696b6e;">
          {{$t('dashboard.firstAgency')}}
        </div>
        <div style="font-size:20px;color: #f1f1f2;">
          Preliminary examination
        </div>
        <div style="font-size:26px;color: #4d9dff;">
          {{num}}{{$t('dashboard.term')}}
        </div>
      </div>
      <div class="go">
      </div>
      <span class="text">Go</span>
		</div>
    <div class="box-card" >
      <div class="icon">
        <img :src="end" alt="">
      </div>
      <div class="info">
        <div style="font-size:22px;color: #696b6e;">
          {{$t('dashboard.endAgency')}}
        </div>
        <div style="font-size:20px;color: #f1f1f2;">
          Ultimate review
        </div>
        <div style="font-size:26px;color: #4d9dff;">
          {{num}}{{$t('dashboard.term')}}
        </div>
      </div>
      <div class="go">
      </div>
      <span class="text">Go</span>
		</div>
    <div class="box-card" >
      <div class="icon">
        <img :src="loan" alt="">
      </div>
      <div class="info">
        <div style="font-size:22px;color: #696b6e;">
          {{$t('dashboard.loanAgency')}}
        </div>
        <div style="font-size:20px;color: #f1f1f2;">
          Waiting for lending
        </div>
        <div style="font-size:26px;color: #4d9dff;">
          {{num}}{{$t('dashboard.term')}}
        </div>
      </div>
      <div class="go">
      </div>
      <span class="text">Go</span>
		</div>
    <div class="box-card" >
      <div class="icon">
        <img :src="coll" alt="">
      </div>
      <div class="info">
        <div style="font-size:22px;color: #696b6e;">
          {{$t('dashboard.collAgency')}}
        </div>
        <div style="font-size:20px;color: #f1f1f2;">
          Collection matters
        </div>
        <div style="font-size:26px;color: #4d9dff;">
          {{num}}{{$t('dashboard.term')}}
        </div>
      </div>
      <div class="go">
      </div>
      <span class="text">Go</span>
		</div>
    <div class="box-card" >
      <div class="icon">
        <img :src="other" alt="">
      </div>
      <div class="info">
        <div style="font-size:22px;color: #696b6e;">
          {{$t('dashboard.other')}}
        </div>
        <div style="font-size:20px;color: #f1f1f2;">
          Ultimate review
        </div>
        <div style="font-size:26px;color: #4d9dff;">
          {{num}}{{$t('dashboard.term')}}
        </div>
      </div>
      <div class="go">
      </div>
      <span class="text">Go</span>
		</div>
	</div>
</template>

<script>
  import first from '@/assets/images/first.png'
  import end from '@/assets/images/end.png'
  import loan from '@/assets/images/loan.png'
  import coll from '@/assets/images/coll.png'
  import other from '@/assets/images/other.png'
  export default {
    name: 'dashboard-editor',
    data() {
      return {
        first,
        end,
        loan,
        coll,
        other,
        num: 8
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box-card {
  width: 30%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d1dbe5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  padding: 25px;
  box-sizing: border-box;
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
}
.icon>img {
  width: 58px;
}
.info {
  text-align: right;
  cursor: pointer;
}
.go {
  position: absolute;
  right: 0;
  top: 0;
  border-top-right-radius: 4px;
  width: 0;
  top: 0;
  border-color:#dfe4ec #dfe4ec transparent transparent;
  border-width: 20px 20px 20px 20px;
  border-style: solid;
  cursor: pointer;
}
.text {
  position: absolute;
  right: 3px;
  top: 2px;
  color: #fff;
  cursor: pointer;
}
</style>
