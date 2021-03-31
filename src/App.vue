<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="flexible">
            <md-app-toolbar class="md-large md-primary">
                <div class="md-toolbar-row">
                    <div class="md-toolbar-section-start">
                        <md-button class="md-icon-button">
                        <md-icon>menu</md-icon>
                        </md-button>
                    </div>

                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button">
                        <md-icon>more_vert</md-icon>
                        </md-button>
                    </div>
                </div>

                <div class="md-toolbar-row md-toolbar-offset">
                    <span class="md-display-1">Objects Finder</span>
                </div>
            </md-app-toolbar>

            <md-app-content>
                <router-view></router-view>

                <md-dialog :md-active.sync="showDialog">
                    <md-dialog-title>Add object</md-dialog-title>
                    <md-dialog-content>
                        <contribute-form></contribute-form>
                    </md-dialog-content>
                </md-dialog>
                
                <md-button @click="showDialog = true" class="md-fab md-primary">
                    <md-icon>add</md-icon>
                </md-button>
            </md-app-content>
        </md-app>
    </div>
</template>

<style>
.md-app {
    max-height: 100vh;
}

.md-app-toolbar {
    height: 196px;
}

.md-app-container {
    overflow-x: hidden !important;
}

.md-fab {
    position: fixed !important;
    bottom: 16px;
    right: 16px;
}
</style>

<script>
export default {
    components: {
        contributeForm: () => import('./components/Form')
    },
    data() {
        return {
            showDialog: false
        }
    }
}
</script>