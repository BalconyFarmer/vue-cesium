require('@dvgis/cesium-map')

export default class BaseLayer {
    constructor(app) {
        this.app = app
    }

    clearImageryLayers() {
        if (!this.app.viewer) return
        const layers = this.app.viewer.imageryLayers
        while (layers.length > 0) {
            layers.remove(layers.get(0), false)
        }
    }

    addImageryProvider(provider) {
        if (!this.app.viewer || !provider) return
        const viewer = this.app.viewer
        const add = () => {
            if (this.app.viewer !== viewer) return
            viewer.imageryLayers.addImageryProvider(provider)
        }
        if (provider.ready || provider.tilingScheme) {
            add()
            return
        }
        if (provider.readyPromise) {
            provider.readyPromise.then(add)
        }
    }

    switchLayer(data) {
        this.clearImageryLayers()

        switch (data) {
            case 'ArcGis实景图层':
                this.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                    maximumLevel: 18
                }))
                break
            case 'geoq智图黑':
                this.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                    subdomains: ['a', 'b', 'c', 'd'],
                    maximumLevel: 18
                }))
                break
            case '高德卫星':
                this.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                    url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                    minimumLevel: 3,
                    maximumLevel: 18,
                }))
                this.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                    url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
                    minimumLevel: 3,
                    maximumLevel: 18,
                }))
                break
            case '纯黑':
                this.app.viewer.scene.globe.baseColor = Cesium.Color.BLACK
                break
            case '百度地图':
                this.addImageryProvider(new Cesium.BaiduImageryProvider({
                    style: 'dark',
                    crs: 'WGS84'
                }))
                break
            case '腾讯地图':
                this.addImageryProvider(new Cesium.TencentImageryProvider({
                    style: 1
                }))
                break
            case '天地图': {
                const tdtKey = '4a00a1dc5387b8ed8adba3374bd87e5e'
                const tdtSub = ['0', '1', '2', '3', '4', '5', '6', '7']
                this.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                    url: 'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + tdtKey,
                    subdomains: tdtSub,
                    maximumLevel: 18
                }))
                this.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                    url: 'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + tdtKey,
                    subdomains: tdtSub,
                    maximumLevel: 18
                }))
                break
            }
        }
    }
}
