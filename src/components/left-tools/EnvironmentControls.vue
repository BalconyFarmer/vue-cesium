<template>
    <div class="ops-section">
        <div class="ops-section__title">环境效果</div>
        <div class="ops-actions">
            <button class="ops-action" type="button" @mousedown="handleEnvironmentEffect('Night')">Night</button>
            <button class="ops-action" type="button" @mousedown="handleEnvironmentEffect('Rain')">Rain</button>
            <button class="ops-action" type="button" @mousedown="handleEnvironmentEffect('Snow')">Snow</button>
            <button class="ops-action" type="button" @mousedown="handleEnvironmentEffect('Frog')">Frog</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EnvironmentControls',
    data() {
        return {
            cApp: null
        }
    },
    methods: {
        handleEnvironmentEffect(effectType) {
            switch (effectType) {
                case 'Night':
                    this.cApp.environment.addDarckNessEff();
                    break;
                case 'Rain':
                    this.cApp.environment.addRain();
                    break;
                case 'Snow':
                    this.cApp.environment.addSnow();
                    break;
                case 'Frog':
                    this.cApp.environment.addFrog();
                    break;
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.cApp = window.cApp;
        }, 1000);
    }
}
</script>
