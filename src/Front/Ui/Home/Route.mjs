/**
 * 'Home' route.
 *
 * @namespace Gtm_Mob_Front_Ui_Home_Route
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_Ui_Home_Route';

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Gtm_Mob_Front_Ui_Home_Route.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Mob_Front_Defaults} */
    const DEF = spec['Gtm_Mob_Front_Defaults$'];

    // WORKING VARS
    const template = `
<layout-base>
    <div>HOME</div>
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Mob_Front_Ui_Home_Route
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {};
        },
        methods: {},
        async mounted() {

        }
    };
}
