<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="flexible">
            <md-app-toolbar class="md-large md-primary">
                <div class="md-toolbar-row">
                    <div class="md-toolbar-section-start">
                        <md-menu md-direction="bottom-start">
                            <md-button class="md-icon-button" md-menu-trigger>
                                <md-icon>menu</md-icon>
                            </md-button>

                            <md-menu-content>
                                <a href="https://github.com/Aryqs-Ipsum/objects-omsistuff" target="_blank">
                                    <md-menu-item>Source code</md-menu-item>
                                </a>
                                <a href="https://github.com/Aryqs-Ipsum/objects-omsistuff/issues/new" target="_blank">
                                    <md-menu-item>Report a bug</md-menu-item>
                                </a>
                                <a href="https://omsistuff.ga/assets/terms" target="_blank">
                                    <md-menu-item>Terms & Privacy</md-menu-item>
                                </a>
                            </md-menu-content>
                        </md-menu>
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
                    <md-dialog-actions>
                        <md-button class="md-primary" @click="showDialog = false">cancel</md-button>
                    </md-dialog-actions>
                </md-dialog>
            </md-app-content>
        </md-app>

        <md-button @click="showDialog = true" class="md-fab md-primary">
            <md-icon>add</md-icon>
        </md-button>
    </div>
</template>

<style>
.md-app {
    max-height: 100vh;
}

.md-app-toolbar {
    height: 196px;
    z-index: 3 !important;
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