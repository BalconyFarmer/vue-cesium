<template>
    <div class="ops-stack">
        <div class="ops-section">
            <div class="ops-section__title">图层</div>
            <div v-if="!layersData.length" class="ops-empty">暂无图层</div>
            <div v-else class="ops-list">
                <div v-for="item in layersData" :key="item.name" class="ops-list__item">
                    {{ item.name }}
                </div>
            </div>
        </div>
        <div class="ops-section">
            <div class="ops-section__title">实体</div>
            <div v-if="!treeData.length" class="ops-empty">暂无实体</div>
            <div v-else class="ops-list">
                <div v-for="item in treeData" :key="item.id || item.name" class="ops-list__item"
                     @click="handleNodeClick({ label: item.name })">
                    {{ item.name || item.id }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            currentLeft: "实体",
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            cApp: null,
            treeData: [],
            layersData: [],

        }
    },
    methods: {
        handleNodeClick(data) {
            window.cApp.lookAtByName(data.label);
        },
    },
    mounted() {

        setInterval(() => {
            let viewer = window.cApp.viewer

            const imageryLayers = viewer.scene.imageryLayers;
            const imageryLayersList = [];
            for (let i = 0; i < imageryLayers.length; i++) {
                const layer = imageryLayers.get(i);
                imageryLayersList.push({
                    name: layer.imageryProvider.constructor.name,
                    show: layer.show,
                });
            }
            this.layersData = imageryLayersList


            // 获取所有实体
            const entities = viewer.entities.values;
            this.treeData = entities
            // 打印所有实体的信息
            entities.forEach(entity => {
                console.log('Entity ID:', entity.id);
                console.log('Entity Name:', entity.name);
                console.log('Entity Position:', entity.position ? entity.position.getValue(Cesium.JulianDate.now()) : 'No position');
            });
        }, 1000)


    }
}
</script>
