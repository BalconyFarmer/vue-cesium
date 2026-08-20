<template>
  <div class="ops-stack">
    <div class="ops-section">
      <div class="ops-section__title">底图 / 模式</div>
      <div class="ops-field">
        <el-select
          v-model="optionsLayersIndex"
          placeholder="基础底图"
          size="mini"
        >
          <el-option
            v-for="item in optionsLayers"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="ops-field">
        <el-select v-model="modelData" placeholder="模型对象" size="mini">
          <el-option
            v-for="item in modelDataList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="ops-field">
        <el-select v-model="value" placeholder="请选择地图3D模式" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="ops-section">
      <div class="ops-section__title">显示</div>
      <div v-for="(label, key) in switches" :key="key" class="ops-row">
        <span class="ops-row__label">{{ label }}</span>
        <el-switch
          v-model="flags[key]"
          :active-color="activeColor"
          :inactive-color="inactiveColor"
          :width="32"
          @change="handleSwitchChange(key)"
        ></el-switch>
      </div>
      <div class="ops-row">
        <span class="ops-row__label">整体亮度</span>
        <div class="ops-row__control">
          <el-slider v-model="brightness" :max="2" :step="0.1"></el-slider>
        </div>
      </div>
      <div class="ops-row">
        <span class="ops-row__label">视角大小</span>
        <div class="ops-row__control">
          <el-slider v-model="fov" :max="2" :step="0.1"></el-slider>
        </div>
      </div>
    </div>
    <div class="ops-section">
      <div class="ops-section__title">动作</div>
      <div class="ops-actions">
        <el-button
          v-for="(label, key) in buttons"
          :key="key"
          size="mini"
          @click="handleSelect(key)"
        >
          {{ label }}
        </el-button>
      </div>
      <div class="ops-row">
        <span class="ops-row__label">clock暂停</span>
        <el-switch
          v-model="clockFlag"
          :active-color="activeColor"
          :inactive-color="inactiveColor"
          :width="32"
          @change="clockChange"
        ></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clockFlag: true,

      changeGlobleLightFlag: false,
      changeLightFlag: false,
      terrainFlag: false,
      brightness: 1,
      fov: 1,
      optionsLayers: [
        { value: "天地图矢量", label: "天地图矢量" },
        { value: "天地图矢量科技蓝", label: "天地图矢量(科技蓝)" },
        { value: "天地图影像", label: "天地图影像" },
        { value: "天地图影像无注记", label: "天地图影像(无注记)" },
        { value: "天地图地形", label: "天地图地形晕渲" },
        { value: "天地图矢量英文", label: "天地图矢量(英文注记)" },
        { value: "天地图影像英文", label: "天地图影像(英文注记)" },
        { value: "天地图影像境界", label: "天地图影像+境界" },
        { value: "高德卫星", label: "高德卫星 + 高德文字" },
        { value: "百度地图", label: "百度地图" },
        { value: "腾讯地图", label: "腾讯地图" },
        { value: "geoq智图黑", label: "geoq智图黑" },
        { value: "ArcGis实景图层", label: "ArcGis实景图层" },
        { value: "纯黑", label: "纯黑" },
      ],
      optionsLayersIndex: "geoq智图黑",
      modelData: null,
      modelDataList: [
        { value: "JSON闪光路", label: "JSON闪光路" },
        { value: "西双版纳JSON掩模", label: "西双版纳JSON掩模" },
        { value: "西双版纳JSON", label: "西双版纳JSON" },
        { value: "云南JSON", label: "云南JSON" },
        { value: "纽约tiles", label: "纽约tiles" },
        { value: "倾斜摄影", label: "倾斜摄影" },
        { value: "华盛顿IMG", label: "华盛顿IMG" },
        { value: "OSM建筑", label: "OSM建筑" },
      ],
      options: [
        { value: "3D模式", label: "3D模式" },
        { value: "2.5D模式", label: "2.5D模式" },
        { value: "2D模式", label: "2D模式" },
      ],
      value: "地球模式",
      flags: {
        changeGlobleLightFlag: false,
        changeLightFlag: false,
        changeShadowFlag: false,
        terrainFlag: false,
      },
      activeColor: "#6dff8a",
      inactiveColor: "#2c3d34",
      switches: {
        changeGlobleLightFlag: "SunLight光照",
        changeLightFlag: "光照系统",
        changeShadowFlag: "shadow",
        terrainFlag: "地形叠加",
      },
      buttons: {
        addBloom: "Bloom",
        addOutline: "Outline",
        14: "关闭冗余",
        动画组件: "动画组件",
      },
    };
  },
  watch: {
    brightness(newValue) {
      if (this.cApp) this.cApp.updateBrightness(this.brightness);
    },
    fov(newValue) {
      if (this.cApp) this.cApp.updataFov(this.fov);
    },
    value(newValue) {
      if (this.cApp) this.cApp.switchViewMode(this.value);
    },
    optionsLayersIndex(newValue) {
      if (this.cApp) this.cApp.baseLayer.switchLayer(this.optionsLayersIndex);
    },
    modelData(newValue) {
      if (this.cApp) this.loadModelData(this.modelData);
    },
  },
  methods: {
    clockChange() {
      if (this.clockFlag) {
        this.cApp.clock.stop();
      } else {
        this.cApp.clock.start();
      }
    },
    handleSwitchChange(key) {
      if (!this.cApp) return;
      if (key === "changeGlobleLightFlag") this.cApp.switchLight();
      else if (key === "changeLightFlag") this.cApp.addLight();
      else if (key === "changeShadowFlag") this.cApp.changeShadow();
      else if (key === "terrainFlag") this.toggleTerrain();
    },
    handleSelect(key) {
      if (!this.cApp) return;
      if (key === "addBloom") this.cApp.addBloom();
      else if (key === "addOutline") this.cApp.addOutline();
      else if (key === "14") this.cApp.closeAll();
      else if (key === "动画组件") this.cApp.clock.closeAimationToolbar();
    },
    loadModelData(key) {
      if (!this.cApp) return;
      if (key === "JSON闪光路") this.cApp.loadJson.loadJsonRoad();
      else if (key === "西双版纳JSON掩模") this.cApp.loadJson.loadJsonYanMo();
      else if (key === "西双版纳JSON") this.cApp.addTimeAction();
      else if (key === "云南JSON") this.cApp.loadJson.loadJsonData();
      else if (key === "纽约tiles") this.cApp.cesium3DTileset.toYN();
      else if (key === "倾斜摄影") this.cApp.obliquePhotography.addOblique();
      else if (key === "华盛顿IMG") this.cApp.huashengdunImg();
      else if (key === "OSM建筑") this.cApp.addOSMBuilding();
    },
    toggleTerrain() {
      if (this.flags.terrainFlag) this.cApp.addTerrain();
      else this.cApp.removeTerrain();
    },
  },
  mounted() {
    setTimeout(() => {
      this.cApp = window.cApp;
    }, 1000);
  },
};
</script>
