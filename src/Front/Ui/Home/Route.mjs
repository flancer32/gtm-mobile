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
    /** @type {Gtm_Mob_Front_Ui_Home_Dialog_Task_Add.vueCompTmpl} */
    const uiDialogTaskView = spec['Gtm_Mob_Front_Ui_Home_Dialog_Task_Add$'];
    /** @type {Gtm_Mob_Front_Widget_Home_Dialog_Task_Add} */
    const wgDialogTaskView = spec['Gtm_Mob_Front_Widget_Home_Dialog_Task_Add$'];

    // WORKING VARS
    const template = `
<layout-base>
    <div class="q-ma-sm">
        <q-btn dense color="primary" icon="add" v-on:click="addTask" />
    </div>
    <ui-dialog-task-view />
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
        components: {uiDialogTaskView},
        data() {
            return {};
        },
        methods: {
            addTask() {
                const wg = wgDialogTaskView.get();
                wg.displayDialog();
            },
        },
        async mounted() {
            this.addTask();
        }
    };
}
