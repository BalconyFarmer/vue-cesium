<template>
    <div class="ops-section">
        <div class="ops-section__title">3D对象</div>
        <div class="ops-tiles">
            <div class="ops-tile b" title="bilbord" @mousedown="mouseDown('bilbord')"></div>
            <div class="ops-tile addIconBackground" title="bilbordBG" @mousedown="mouseDown('addIconBackground')"></div>
            <div class="ops-tile ParticalSys" title="粒子" @mousedown="mouseDown('ParticalSys')"></div>
            <div class="ops-tile p" title="点" @mousedown="mouseDown('点')"></div>
            <div class="ops-tile Box" title="Box" @mousedown="mouseDown('Box')"></div>
            <div class="ops-tile addEllipse" title="椭圆" @mousedown="mouseDown('addEllipse')"></div>
            <div class="ops-tile addEllipseTuo" title="椭圆体" @mousedown="mouseDown('addEllipseTuo')"></div>
            <div class="ops-tile addEllipseTuoWW" title="椭圆体外轮廓" @mousedown="mouseDown('addEllipseTuoWW')"></div>
            <div class="ops-tile y" title="圆柱体" @mousedown="mouseDown('圆柱体')"></div>
            <div class="ops-tile glowingLine" title="发光线" @mousedown="mouseDown('glowingLine')"></div>
            <div class="ops-tile orangeOutlined" title="橙色轮廓" @mousedown="mouseDown('orangeOutlined')"></div>
            <div class="ops-tile yellowLine" title="黄线" @mousedown="mouseDown('yellowLine')"></div>
            <div class="ops-tile redRectangle" title="红矩形" @mousedown="mouseDown('redRectangle')"></div>
            <div class="ops-tile greenRectangle" title="绿矩形" @mousedown="mouseDown('greenRectangle')"></div>
            <div class="ops-tile blueEllipsoid" title="蓝椭球" @mousedown="mouseDown('blueEllipsoid')"></div>
            <div class="ops-tile redSphere" title="红球" @mousedown="mouseDown('redSphere')"></div>
            <div class="ops-tile outlineOnly" title="仅轮廓" @mousedown="mouseDown('outlineOnly')"></div>
            <div class="ops-tile redWall" title="红墙" @mousedown="mouseDown('redWall')"></div>
            <div class="ops-tile greenWall" title="绿墙" @mousedown="mouseDown('greenWall')"></div>
            <div class="ops-tile blueWall" title="蓝墙" @mousedown="mouseDown('blueWall')"></div>
            <div class="ops-tile redCorridor" title="红走廊" @mousedown="mouseDown('redCorridor')"></div>
            <div class="ops-tile redPolygon" title="红多边形" @mousedown="mouseDown('redPolygon')"></div>
            <div class="ops-tile greenPolygon" title="绿多边形" @mousedown="mouseDown('greenPolygon')"></div>
            <div class="ops-tile orangePolygon" title="橙多边形" @mousedown="mouseDown('orangePolygon')"></div>
            <div class="ops-tile bluePolygon" title="蓝多边形" @mousedown="mouseDown('bluePolygon')"></div>
            <div class="ops-tile redLine" title="红线" @mousedown="mouseDown('redLine')"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorldBottom',
    data() {
        return {
            activeName: 'first',
            addGeoFlag: false,
            currentGeoType: null,
            geoPositionCartesian2: null
        }
    },
    methods: {
        mouseDown(ev) {
            this.currentGeoType = ev
            this.addGeoFlag = true
        },
        mouseUp() {
            if (this.addGeoFlag) {
                switch (this.currentGeoType) {
                    case 'addIconBackground':
                        window.cApp.innerGeometry.addIconBackground(this.geoPositionCartesian2, '默认', 2)
                        break
                    case '点':
                        window.cApp.innerGeometry.addPoint(this.geoPositionCartesian2)
                        break
                    case '圆柱体':
                        window.cApp.innerGeometry.addGeometry(this.geoPositionCartesian2)
                        break
                    case 'bilbord':
                        let _z = this.geoPositionCartesian2.z
                        this.geoPositionCartesian2.z = _z + 10
                        window.cApp.innerGeometry.addIcon(this.geoPositionCartesian2, '默认')
                        break
                    case 'Box':
                        window.cApp.innerGeometry.addBox(this.geoPositionCartesian2)
                        break
                    case 'addEllipse':
                        window.cApp.innerGeometry.addEllipse(this.geoPositionCartesian2)
                        break
                    case 'addEllipseTuo':
                        window.cApp.innerGeometry.addEllipseTuo(this.geoPositionCartesian2)
                        break
                    case 'addEllipseTuoWW':
                        window.cApp.innerGeometry.addEllipseTuoWW(this.geoPositionCartesian2)
                        break
                    case 'redCorridor':
                        window.cApp.innerGeometry.redCorridor(this.geoPositionCartesian2)
                        break
                    case 'redPolygon':
                        window.cApp.innerGeometry.redPolygon(this.geoPositionCartesian2)
                        break
                    case 'greenPolygon':
                        window.cApp.innerGeometry.greenPolygon(this.geoPositionCartesian2)
                        break
                    case 'orangePolygon':
                        window.cApp.innerGeometry.orangePolygon(this.geoPositionCartesian2)
                        break
                    case 'bluePolygon':
                        window.cApp.innerGeometry.bluePolygon(this.geoPositionCartesian2)
                        break
                    case 'redLine':
                        window.cApp.innerGeometry.redLine(this.geoPositionCartesian2)
                        break
                    case 'glowingLine':
                        window.cApp.innerGeometry.glowingLine(this.geoPositionCartesian2)
                        break
                    case 'orangeOutlined':
                        window.cApp.innerGeometry.orangeOutlined(this.geoPositionCartesian2)
                        break
                    case 'yellowLine':
                        window.cApp.innerGeometry.yellowLine(this.geoPositionCartesian2)
                        break
                    case 'redRectangle':
                        window.cApp.innerGeometry.redRectangle(this.geoPositionCartesian2)
                        break
                    case 'greenRectangle':
                        window.cApp.innerGeometry.greenRectangle(this.geoPositionCartesian2)
                        break
                    case 'blueEllipsoid':
                        window.cApp.innerGeometry.blueEllipsoid(this.geoPositionCartesian2)
                        break
                    case 'redSphere':
                        window.cApp.innerGeometry.redSphere(this.geoPositionCartesian2)
                        break
                    case 'outlineOnly':
                        window.cApp.innerGeometry.outlineOnly(this.geoPositionCartesian2)
                        break
                    case 'redWall':
                        window.cApp.innerGeometry.redWall(this.geoPositionCartesian2)
                        break
                    case 'greenWall':
                        window.cApp.innerGeometry.greenWall(this.geoPositionCartesian2)
                        break
                    case 'blueWall':
                        window.cApp.innerGeometry.blueWall(this.geoPositionCartesian2)
                        break
                    case 'ParticalSys':
                        window.cApp.particleSystems.init(this.geoPositionCartesian2)
                        break
                    case 'addMaterial':
                        window.cApp.innerMaterial.addMaterial(this.geoPositionCartesian2)
                        break
                    case 'addColor':
                        window.cApp.innerMaterial.addColor(this.geoPositionCartesian2)
                        break
                    case 'addImgMaterial':
                        window.cApp.innerMaterial.addImgMaterial(this.geoPositionCartesian2)
                        break
                    case 'addCheckerboardMaterialProperty':
                        window.cApp.innerMaterial.addCheckerboardMaterialProperty(this.geoPositionCartesian2)
                        break
                    case 'addStripeMaterialProperty':
                        window.cApp.innerMaterial.addStripeMaterialProperty(this.geoPositionCartesian2)
                        break
                    case 'addGridMaterialProperty':
                        window.cApp.innerMaterial.addGridMaterialProperty(this.geoPositionCartesian2)
                        break
                }
            }
            this.addGeoFlag = false
        },
    },
    mounted() {
        const self = this;

        // 延时设置以确保cApp已被初始化
        setTimeout(() => {
            this.cApp = window.cApp;

            this.cApp.eventCenter.addEventListener('geoPosition', (data) => {
                self.geoPositionCartesian2 = data.message.position;
            });
        }, 1000);

        // 添加全局 mouseup 事件监听器
        window.addEventListener('mouseup', this.mouseUp);
    },
    beforeDestroy() {
        // 移除全局 mouseup 事件监听器
        window.removeEventListener('mouseup', this.mouseUp);
    }
}
</script>

<style lang="scss" scoped>
.addEllipseTuoWW {
        background-image: url("../../assets/geometryIcons/addEllipseTuoWW.png");
        background-size: 100% 100%;
    }

    .addEllipseTuo {
        background-image: url("../../assets/geometryIcons/addEllipseTuo.png");
        background-size: 100% 100%;
    }

    .addEllipse {
        background-image: url("../../assets/geometryIcons/addEllipse.png");
        background-size: 100% 100%;
    }

    .Box {
        background-image: url("../../assets/geometryIcons/Box.png");
        background-size: 100% 100%;
    }

    .addGridMaterialProperty {
        background-image: url("../../assets/geometryIcons/material/addGridMaterialProperty.png");
        background-size: 100% 100%;
    }

    .addStripeMaterialProperty {
        background-image: url("../../assets/geometryIcons/material/addStripeMaterialProperty.png");
        background-size: 100% 100%;
    }

    .addCheckerboardMaterialProperty {
        background-image: url("../../assets/geometryIcons/material/addCheckerboardMaterialProperty.png");
        background-size: 100% 100%;
    }

    .addImgMaterial {
        background-image: url("../../assets/geometryIcons/material/addImgMaterial.png");
        background-size: 100% 100%;
    }

    .addColor {
        background-image: url("../../assets/geometryIcons/material/addColor.png");
        background-size: 100% 100%;
    }

    .addMaterialLightLine {
        background-image: url("../../assets/geometryIcons/material/发光线条.png");
        background-size: 100% 100%;
    }

    .addMaterial {
        background-image: url("../../assets/geometryIcons/material.png");
        background-size: 100% 100%;
    }

    .glowingLine {
        background-image: url("../../assets/geometryIcons/glowingLine.png");
        background-size: 100% 100%;
    }

    .yellowLine {
        background-image: url("../../assets/geometryIcons/yellowLine.png");
        background-size: 100% 100%;
    }

    .redRectangle {
        background-image: url("../../assets/geometryIcons/redRectangle.png");
        background-size: 100% 100%;
    }

    .greenRectangle {
        background-image: url("../../assets/geometryIcons/greenRectangle.png");
        background-size: 100% 100%;
    }

    .blueEllipsoid {
        background-image: url("../../assets/geometryIcons/blueEllipsoid.png");
        background-size: 100% 100%;
    }

    .redSphere {
        background-image: url("../../assets/geometryIcons/redSphere.png");
        background-size: 100% 100%;
    }

    .outlineOnly {
        background-image: url("../../assets/geometryIcons/outlineOnly.png");
        background-size: 100% 100%;
    }

    .blueWall {
        background-image: url("../../assets/geometryIcons/blueWall.png");
        background-size: 100% 100%;
    }

    .greenWall {
        background-image: url("../../assets/geometryIcons/greenWall.png");
        background-size: 100% 100%;
    }

    .redWall {
        background-image: url("../../assets/geometryIcons/redWall.png");
        background-size: 100% 100%;
    }

    .p {
        background-image: url("../../assets/geometryIcons/p.png");
        background-size: 100% 100%;
    }

    .y {
        background-image: url("../../assets/geometryIcons/y.png");
        background-size: 100% 100%;
    }

    .b {
        background-image: url("../../assets/geometryIcons/b.png");
        background-size: 100% 100%;
    }

    .addIconBackground {
        background-image: url("../../assets/geometryIcons/addIconBackground.png");
        background-size: 100% 100%;
    }

    .ParticalSys {
        background-image: url("../../assets/geometryIcons/ParticalSys.png");
        background-size: 100% 100%;
    }

    .redCorridor {
        background-image: url("../../assets/geometryIcons/redCorridor.png");
        background-size: 100% 100%;
    }

    .redPolygon {
        background-image: url("../../assets/geometryIcons/redPolygon.png");
        background-size: 100% 100%;
    }

    .greenPolygon {
        background-image: url("../../assets/geometryIcons/greenPolygon.png");
        background-size: 100% 100%;
    }

    .orangePolygon {
        background-image: url("../../assets/geometryIcons/orangePolygon.png");
        background-size: 100% 100%;
    }

    .bluePolygon {
        background-image: url("../../assets/geometryIcons/bluePolygon.png");
        background-size: 100% 100%;
    }

.redLine {
    background-image: url("../../assets/geometryIcons/redLine.png");
    background-size: 100% 100%;
}
</style>
