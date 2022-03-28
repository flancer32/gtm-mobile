/**
 * 'Cfg' route.
 *
 * @namespace Gtm_Mob_Front_Ui_Cfg_Route
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_Ui_Cfg_Route';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Gtm_Mob_Front_Ui_Cfg_Route.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Mob_Front_Defaults} */
    const DEF = spec['Gtm_Mob_Front_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {TeqFw_Web_Front_Mod_Sw_Control} */
    const modSwControl = spec['TeqFw_Web_Front_Mod_Sw_Control$'];
    /** @type {TeqFw_Web_Front_Mod_Logger_Transport} */
    const modLogTrn = spec['TeqFw_Core_Shared_Api_Logger_ITransport$']; // as interface


    // WORKING VARS
    const template = `
<layout-base>
    <q-card class="bg-white q-ma-sm" style="min-width: 300px">
        <q-card-section>
        <div class="text-subtitle2">{{$t('ui.cfg.app.title')}}:</div>
        <div>
            <q-toggle
                    :disable="freezeToggleLog"
                    :label="$t('ui.cfg.app.log')"
                    color="green"
                    v-model="enabledLog"
                    v-on:click="processToggledLog"
            />
        </div>
        <div>
            <q-toggle
                    :disable="freezeToggleSw"
                    :label="$t('ui.cfg.app.swCache')"
                    color="green"
                    v-model="enabledCache"
                    v-on:click="processToggledSw"
            />
        </div>
        <div class="q-gutter-xs">
            <q-btn :label="$t('ui.cfg.app.btn.clean')" color="primary" v-on:click="cacheClean"></q-btn>
            <q-btn :label="$t('ui.cfg.app.btn.uninstall')" color="primary" v-on:click="uninstall"></q-btn>
        </div>
    </q-card-section>
    </q-card>
</layout-base>
`;

    // MAIN
    logger.setNamespace(NS);

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Mob_Front_Ui_Cfg_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                enabledCache: null,
                enabledLog: null,
                freezeToggleLog: null,
                freezeToggleSw: null,
            };
        },
        methods: {
            async cacheClean() {
                await modSwControl.cacheClean();
            },
            async processToggledLog() {
                this.freezeToggleLog = true;
                if (this.enabledLog) {
                    modLogTrn.enableLogs();
                    logger.info(`Logs transfer to the server is enabled.`);
                } else {
                    modLogTrn.disableLogs();
                    logger.info(`Logs transfer to the server is disabled.`);
                }
                this.freezeToggleLog = false;
            },
            async processToggledSw() {
                this.freezeToggleSw = true;
                const oldVal = !this.enabledCache;
                if (oldVal) {
                    await modSwControl.setCacheStatus(false);
                } else {
                    await modSwControl.setCacheStatus(true);
                }
                this.enabledCache = await modSwControl.getCacheStatus();
                this.freezeToggleSw = false;
            },
            async uninstall() {
                const sw = await navigator.serviceWorker.ready;
                await sw.unregister();
                location.reload();
            },
        },
        async mounted() {
            this.enabledCache = await modSwControl.getCacheStatus();
            this.enabledLog = await modLogTrn.isLogsMonitorOn();
        }
    };
}
