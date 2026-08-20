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

    wrapTileFilter(provider, filter) {
        const origin = provider.requestImage.bind(provider)
        provider.requestImage = function (x, y, level, request) {
            const result = origin(x, y, level, request)
            if (!Cesium.defined(result)) return result
            return Promise.resolve(result).then((image) => {
                if (!Cesium.defined(image)) return image
                return filter(image)
            })
        }
    }

    filterTdtTechBlue(image, isLabel) {
        const width = image.width || 256
        const height = image.height || 256
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
        const imgData = ctx.getImageData(0, 0, width, height)
        const data = imgData.data
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] === 0) continue
            const r = 255 - data[i]
            const g = 255 - data[i + 1]
            const b = 255 - data[i + 2]
            if (isLabel) {
                data[i] = Math.min(255, r * 0.45 + 20)
                data[i + 1] = Math.min(255, g * 0.75 + 40)
                data[i + 2] = Math.min(255, b * 0.95 + 60)
            } else {
                data[i] = r * 0.12
                data[i + 1] = g * 0.36
                data[i + 2] = b * 0.72
            }
        }
        ctx.putImageData(imgData, 0, 0)
        // 交回 ImageBitmap，避免 canvas 被 WebGL 再翻转一次
        return createImageBitmap(canvas)
    }

    addTdtLayers(types, filter) {
        const tdtKey = '4a00a1dc5387b8ed8adba3374bd87e5e'
        const tdtSub = ['0', '1', '2', '3', '4', '5', '6', '7']
        types.forEach((type) => {
            const provider = new Cesium.UrlTemplateImageryProvider({
                url: 'https://t{s}.tianditu.gov.cn/DataServer?T=' + type + '&x={x}&y={y}&l={z}&tk=' + tdtKey,
                subdomains: tdtSub,
                maximumLevel: 18
            })
            if (filter) this.wrapTileFilter(provider, (image) => filter(image, type))
            this.addImageryProvider(provider)
        })
    }

    switchLayer(data) {
        this.clearImageryLayers()
        if (this.app.viewer) this.app.viewer.scene.globe.baseColor = Cesium.Color.BLUE

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
            case '天地图':
            case '天地图矢量':
                this.addTdtLayers(['vec_w', 'cva_w'])
                break
            case '天地图矢量科技蓝':
                this.app.viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#041428')
                this.addTdtLayers(['vec_w', 'cva_w'], (image, type) => this.filterTdtTechBlue(image, type === 'cva_w'))
                break
            case '天地图影像':
                this.addTdtLayers(['img_w', 'cia_w'])
                break
            case '天地图影像无注记':
                this.addTdtLayers(['img_w'])
                break
            case '天地图地形':
                this.addTdtLayers(['ter_w', 'cta_w'])
                break
            case '天地图矢量英文':
                this.addTdtLayers(['vec_w', 'eva_w'])
                break
            case '天地图影像英文':
                this.addTdtLayers(['img_w', 'eia_w'])
                break
            case '天地图影像境界':
                this.addTdtLayers(['img_w', 'cia_w', 'ibo_w'])
                break
        }
    }
}
