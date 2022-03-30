/**
 * UI component for task card in the list on the home route.
 *
 * @namespace Gtm_Mob_Front_Ui_Home_Task
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_Ui_Home_Task';

// MODULE'S FUNCTIONS
/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @returns {Gtm_Mob_Front_Ui_Home_Task.vueCompTmpl}
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
    /** @type {typeof Gtm_Mob_Front_Enum_Task_Status} */
    const STATUS = spec['Gtm_Mob_Front_Enum_Task_Status$'];

    // VARS
    const template = `
<q-card style="min-width: 300px;">
    <q-card-section :class="classTitle">
        <div class="text-h6">{{item.title}}</div>
    </q-card-section>
    
    <q-card-section class="row">
        <div class="col">
            <q-img
                :src="url"
                class="q-pa-xs"
                spinner-color="white"
                style="max-height: 140px; max-width: 100%"
            />
        </div>
        <div class="col text-right">
            <div class="">
                <q-btn color="primary" icon="send" v-on:click="btnSend" />
            </div>
            <div class="q-mt-md">
                <q-btn color="primary" icon="delete" v-on:click="btnDelete" />
            </div>
        </div>
        
    </q-card-section>
</q-card>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Mob_Front_Ui_Home_Task
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                url: './img/placeholder.png',
            };
        },
        props: {
            /** @type {Gtm_Mob_Front_Dto_Task.Dto} */
            item: null,
        },
        computed: {
            classTitle() {
                /** @type {Gtm_Mob_Front_Dto_Task.Dto} */
                const task = this.item;
                const bg = (task.status === STATUS.NEW) ? 'bg-primary' : 'bg-secondary';
                return `${bg} text-white`;
            }
        },
        methods: {
            btnDelete() {
                const dialog = wgDialogTaskDel.get();
                dialog.setTask(this.item);
                dialog.displayDialog();
            },
            async btnSend() {
                const trx = await idb.startTransaction(idbTask);
                /** @type {Gtm_Mob_Front_IDb_Store_Task.Dto} */
                const found = await idb.readOne(trx, idbTask, this?.item?.id);
                if (found) {
                    found.status = STATUS.SENT;
                    await idb.updateOne(trx, idbTask, found);
                    logger.info(`Task #${found.id} is sent to the back.`);
                }
                trx.commit();
                wgHome.get().loadTasks();
            }
        },
        async mounted() { },
    };
}
