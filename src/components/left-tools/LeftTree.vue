<template>
  <div class="ops-stack">
    <div class="ops-section">
      <div class="ops-section__title">图层</div>
      <div v-if="!layersData.length" class="ops-empty">暂无图层</div>
      <div v-else class="ops-list">
        <div
          v-for="(item, index) in layersData"
          :key="'layer-' + index"
          class="ops-list__item"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="ops-section">
      <div class="ops-section__title">实体</div>
      <div v-if="!treeData.length" class="ops-empty">暂无实体</div>
      <div v-else class="ops-list">
        <div
          v-for="(item, index) in treeData"
          :key="'entity-' + index + '-' + item.id"
          class="ops-list__item"
          @click="handleNodeClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [],
      layersData: [],
      timer: null,
    };
  },
  methods: {
    handleNodeClick(data) {
      if (window.cApp) window.cApp.lookAtByName(data.name);
    },
    refreshTree() {
      if (!window.cApp || !window.cApp.viewer) return;
      const viewer = window.cApp.viewer;
      const imageryLayers = viewer.scene.imageryLayers;
      const imageryLayersList = [];
      for (let i = 0; i < imageryLayers.length; i++) {
        const layer = imageryLayers.get(i);
        const provider = layer.imageryProvider;
        imageryLayersList.push({
          id: "layer-" + i,
          name: provider.name || provider.constructor.name,
          show: layer.show,
        });
      }
      this.layersData = imageryLayersList;
      this.treeData = viewer.entities.values.map((entity, index) => ({
        id: entity.id || "entity-" + index,
        name: entity.name || entity.id || "entity-" + index,
      }));
    },
  },
  mounted() {
    this.timer = setInterval(this.refreshTree, 1000);
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
};
</script>
