<template>
    <div class="ops-section" @click="$emit('open-dialog')">
        <div class="ops-section__title">场景项目</div>
        <div class="ops-list">
            <div class="ops-list__item" @click="runChengdu">0. 纽约</div>
            <div class="ops-list__item" @click="runShanghai">1. 上海</div>
            <div class="ops-list__item" @click="runTrain">2. 火车</div>
            <div class="ops-list__item" @click="runXSBN">3. 西双版纳</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cApp: null,
            dialogVisible: false,
            fakeBoard: false
        };
    },
    methods: {
        runChengdu() {
            this.cApp.runChengDu();
            this.fakeBoard = true;
            this.dialogVisible = false;
        },
        runShanghai() {
            this.cApp.runShanghai();
            this.fakeBoard = true;
            this.dialogVisible = false;
        },
        runTrain() {
            this.fakeBoard = true;
            this.dialogVisible = false;
            this.cApp.train.testChinaData();
        },
        runXSBN() {
            this.fakeBoard = true;
            this.dialogVisible = false;
            this.cApp.runXSBN();
        }
    },
    mounted() {
        setTimeout(() => {
            this.cApp = window.cApp;
        }, 1000);
    }
};
</script>
