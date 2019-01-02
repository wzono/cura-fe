<template>
  <div class="page-404">
    <LayoutBackBar title="Cura - 404">
      <div class="sorry-not-found">
        <div class="image-wrapper">
          <img src="http://cdn.wingsico.org/image/20181211-1.png">
        </div>
        <div class="text-wrapper">您访问的页面不见了/(ToT)/~~</div>
      </div>
    </LayoutBackBar>
  </div>
</template>

<style lang="scss">
.page-404 {
  .sorry-not-found {
    margin: 40px 0;
    .image-wrapper {
      position: relative;
      width: 300px;
      margin: auto;
      img {
        width: 100%;
        height: auto;
      }
    }
    .text-wrapper {
      margin-top: 20px;
      color: #999;
      font-size: 12px;
      line-height: 1.2;
      text-align: center;
    }
  }
}
</style>
