<template>
  <div class="specification mt-5">
    <h3 class="text-3xl font-semibold mb-2">
      仕様
    </h3>
    <div class="description">
      <p class="text-lg">
        EMVCoが出しているContactless Specifications for Payment Systemsという仕様書にEMV Contactlessの仕様全般が書かれていて，オーディオ関連は9.1.2 Audio Indicationに書かれている．
      </p>
      <p class="text-lg">
        読み取り完了音はSuccess Toneと定義されていて，約1500Hzの正弦波を約500ミリ秒の周期で鳴らすと規定されている．
      </p>
      <p class="text-lg">
        警告音はAlert Toneと定義されていて，約750Hzの正弦波を使用して，約200ミリ秒オン，200ミリ秒オフ，約200ミリ秒オンのダブルビープを鳴らすと規定されている．
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Specification',
});
</script>
