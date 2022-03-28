/**
 * Base layout widget.
 *
 * @namespace Gtm_Mob_Front_Layout_Base
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_Layout_Base';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @memberOf Gtm_Mob_Front_Layout_Base
 * @returns {Gtm_Mob_Front_Layout_Base.vueCompTmpl}
 */
export default function Factory(spec) {
    // DEPS
    /** @type {Gtm_Mob_Front_Defaults} */
    const DEF = spec['Gtm_Mob_Front_Defaults$'];

    // DEFINE WORKING VARS & PROPS
    const template = `
<q-layout view="lHr lpR lFr">

    <q-header reveal>
        <q-toolbar>
            <q-btn dense flat round icon="menu" to="${DEF.ROUTE_HOME}"/>
            <q-toolbar-title>{{ title }}</q-toolbar-title>
            <q-space></q-space>
            <q-btn dense flat round icon="settings" to="${DEF.ROUTE_CFG}"/>
        </q-toolbar>
    </q-header>
    <q-page-container style="height: 100%">
        <div style="display: grid; height: 100%; align-items: center; justify-items: center;">
            <slot/>
        </div>
    </q-page-container>

    <q-footer class="bg-primary text-white"></q-footer>

</q-layout>
`;

    // COMPOSE RESULT
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Mob_Front_Layout_Base
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                title: this.$t('ui.home.title'),
            };
        },
    };
}

// to get namespace on debug
Object.defineProperty(Factory, 'namespace', {value: NS});
