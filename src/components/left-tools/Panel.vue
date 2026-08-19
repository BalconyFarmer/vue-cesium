<template>
  <div class="ops-stack">
    <div class="ops-section">
      <div class="ops-section__title">选取位置</div>
      <p class="ops-caption">log, lat, height</p>
      <input
        id="copyValID"
        class="ops-readout"
        :value="clickPosition"
        readonly
        type="text"
      />
      <div class="ops-actions panel-copy">
        <el-button size="mini" @click="handleClick1('copyValID')"
          >Copy</el-button
        >
      </div>
      <p class="ops-caption">
        cartographic-log, cartographic-lat, cartographic-height
      </p>
      <input
        class="ops-readout"
        :value="clickPositionCartographic"
        readonly
        type="text"
      />
      <p class="ops-caption">Cartesian</p>
      <input
        class="ops-readout"
        :value="clickPositionCartesian"
        readonly
        type="text"
      />
    </div>
    <div class="ops-section">
      <div class="ops-section__title">相机位置</div>
      <p class="ops-caption">x, y, z, heading, pitch, roll</p>
      <input
        id="copyValID1"
        class="ops-readout"
        :value="cameraPosition"
        readonly
        type="text"
      />
      <div class="ops-actions panel-copy">
        <el-button size="mini" @click="handleClick1('copyValID1')"
          >Copy</el-button
        >
      </div>
    </div>
    <div class="ops-section">
      <div class="ops-section__title">实体信息</div>
      <p class="ops-caption">name</p>
      <div class="ops-readout ops-readout--text">
        {{ currentEntities ? currentEntities.name : "暂无数据" }}
      </div>
      <p class="ops-caption">Cartesian3</p>
      <div class="ops-readout ops-readout--text">
        {{ currentEntities ? currentEntities.position._value : "暂无数据" }}
      </div>
      <div class="ops-field">
        <el-input
          v-model="rotationParams.Heading"
          placeholder="Heading"
          size="mini"
        ></el-input>
      </div>
      <div class="ops-field">
        <el-input
          v-model="rotationParams.Pitch"
          placeholder="Pitch"
          size="mini"
        ></el-input>
      </div>
      <div class="ops-field">
        <el-input
          v-model="rotationParams.Roll"
          placeholder="Roll"
          size="mini"
        ></el-input>
      </div>
      <div class="ops-actions">
        <el-button size="mini" @click="rotateEntity">rotate</el-button>
      </div>
      <div class="ops-row">
        <span class="ops-row__label">drag</span>
        <el-switch
          v-model="switchValue"
          active-color="#6dff8a"
          inactive-color="#2c3d34"
          :width="32"
          @change="dragChange"
        ></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  data() {
    return {
      clickPosition: [],
      clickPositionCartographic: null,
      clickPositionCartesian: null,
      cameraPosition: [],
      switchValue: false,
      currentEntities: null,
      rotationParams: {
        Heading: 0,
        Pitch: 0,
        Roll: 0,
      },
      cApp: null,
    };
  },
  methods: {
    handleClick1(ID) {
      const copyVal = document.getElementById(ID);
      copyVal.select();
      document.execCommand("copy");
    },
    rotateEntity() {
      window.cApp.rotateEntity(
        parseInt(this.rotationParams.Heading),
        parseInt(this.rotationParams.Pitch),
        parseInt(this.rotationParams.Roll),
        this.currentEntities,
      );
    },
    dragChange() {
      window.cApp.event.dragFlag = this.switchValue;
    },
  },
  mounted() {
    setTimeout(() => {
      window.cApp.eventCenter.addEventListener("clickPosition", (data) => {
        this.clickPosition = data.message.position;
        this.clickPositionCartographic = data.message.positionCartographic;
        this.clickPositionCartesian = data.message.cartesian;
      });
      window.cApp.eventCenter.addEventListener("cameraPosition", (data) => {
        this.cameraPosition = data.message.position;
      });
      window.cApp.eventCenter.addEventListener("pickEntity", (data) => {
        this.currentEntities = data.message.position;
      });
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.panel-copy {
  margin: 6px 0 10px;
}

.ops-caption {
  margin-top: 8px;
}

.ops-readout--text {
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
