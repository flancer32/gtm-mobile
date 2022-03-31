/**
 * UI component for dialog to delete task.
 *
 * @namespace Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete
 */
class IUiComp {
    displayDialog() {}

    /**
     * @param {Gtm_Mob_Front_Dto_Task.Dto} data
     */
    setTask(data) {}
}

// MODULE'S FUNCTIONS
/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @returns {Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Mob_Front_Defaults} */
    const DEF = spec['Gtm_Mob_Front_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {Gtm_Mob_Front_Widget_Home} */
    const wgHome = spec['Gtm_Mob_Front_Widget_Home$'];
    /** @type {Gtm_Mob_Front_Widget_Home_Dialog_Task_Delete} */
    const wgDialogTaskDel = spec['Gtm_Mob_Front_Widget_Home_Dialog_Task_Delete$'];
    /** @type {TeqFw_Web_Front_App_Store_IDB} */
    const idb = spec['Gtm_Mob_Front_IDb_Main$']; // get as singleton, type as interface
    /** @type {Gtm_Mob_Front_IDb_Store_Task} */
    const idbTask = spec['Gtm_Mob_Front_IDb_Store_Task$'];

    // VARS
    const template = `
<q-dialog v-model="display">
    <q-card>
        <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{$t('ui.dialog.del.title')}}</div>
        </q-card-section>

        <q-card-section class="">
            <div>{{item.title}}</div>
            <q-img
                    :src="url"
                    class="q-pa-xs"
                    spinner-color="white"
                    style="max-height: 140px; max-width: 100%"
            />            
        </q-card-section>

        <q-card-actions align="center">
            <q-btn color="primary" :label="$t('btn.ok')" padding="sm" v-on:click="btnOk" />
            <q-btn color="primary" :label="$t('btn.cancel')" padding="sm" v-close-popup/>
        </q-card-actions>

    </q-card>
</q-dialog>
`;

    // MAIN
    logger.setNamespace(NS);

    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                display: false,
                /** @type {Gtm_Mob_Front_Dto_Task.Dto} */
                item: null,
            };
        },
        computed: {
            url() {
                return this?.item?.image ?? './img/placeholder.png';
            },
        },
        methods: {
            /**
             * Delete task from IDB.
             * @return {Promise<void>}
             */
            async btnOk() {
                const trx = await idb.startTransaction(idbTask);
                const taskId = await idb.deleteOne(trx, idbTask, this.item.id);
                logger.info(`Task #${taskId} is deleted from IDB.`);
                trx.commit();
                this.display = false;
                wgHome.get().loadTasks();
            },

            displayDialog() {
                this.display = true;
            },


            /**
             * @param {Gtm_Mob_Front_Dto_Task.Dto} data
             */
            setTask(data) {
                this.item = data;
            }
        },
        async mounted() {
            // FUNCS


            // MAIN
            wgDialogTaskDel.set(this);
        },
    };
}
