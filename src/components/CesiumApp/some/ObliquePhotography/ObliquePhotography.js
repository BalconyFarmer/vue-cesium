
import { ImageryProviderWebExtendTool } from "./1-2ImageryProvider-WebExtend"

export default class ObliquePhotography {
    constructor(app) {
        this.app = app
    }

    addOblique() {
        const viewer = this.app.viewer
        const addAndZoom = (tileset) => {
            viewer.scene.primitives.add(tileset)
            viewer.zoomTo(tileset)
        }

        if (Cesium.Cesium3DTileset.fromIonAssetId) {
            Cesium.Cesium3DTileset.fromIonAssetId(354307).then(addAndZoom)
            return
        }

        const tileset = viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: Cesium.IonResource.fromAssetId(354307),
            })
        )
        if (tileset.readyPromise) {
            tileset.readyPromise.then(() => viewer.zoomTo(tileset))
        }
    }

}
