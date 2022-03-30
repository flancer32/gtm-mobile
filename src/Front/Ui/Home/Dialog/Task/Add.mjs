/**
 * UI component for dialog to add new task.
 *
 * @namespace Gtm_Mob_Front_Ui_Home_Dialog_Task_Add
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_Ui_Home_Dialog_Task_Add';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Gtm_Mob_Front_Ui_Home_Dialog_Task_Add
 */
class IUiComp {
    displayDialog() {}
}

// MODULE'S FUNCTIONS
/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @returns {Gtm_Mob_Front_Ui_Home_Dialog_Task_Add.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Mob_Front_Defaults} */
    const DEF = spec['Gtm_Mob_Front_Defaults$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
    /** @type {Gtm_Mob_Front_Widget_Home} */
    const wgHome = spec['Gtm_Mob_Front_Widget_Home$'];
    /** @type {Gtm_Mob_Front_Widget_Home_Dialog_Task_Add} */
    const wgDialogTaskAdd = spec['Gtm_Mob_Front_Widget_Home_Dialog_Task_Add$'];
    /** @type {TeqFw_Core_Shared_Util_Date.addDays|function} */
    const addDays = spec['TeqFw_Core_Shared_Util_Date.addDays'];
    /** @type {TeqFw_Core_Shared_Util_Format.date|function} */
    const formatDate = spec['TeqFw_Core_Shared_Util_Format.date'];
    /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
    const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
    /** @type {TeqFw_Web_Front_App_Store_IDB} */
    const idb = spec['Gtm_Mob_Front_IDb_Main$']; // get as singleton, type as interface
    /** @type {Gtm_Mob_Front_IDb_Store_Task} */
    const idbTask = spec['Gtm_Mob_Front_IDb_Store_Task$'];
    /** @type {Gtm_Mob_Front_IDb_Store_Graveyard} */
    const idbGraveyard = spec['Gtm_Mob_Front_IDb_Store_Graveyard$'];
    /** @type {typeof Gtm_Mob_Front_Enum_Task_Status} */
    const STATUS = spec['Gtm_Mob_Front_Enum_Task_Status$'];

    // VARS
    const template = `
<q-dialog v-model="display">
    <q-card>
        <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{$t('ui.dialog.add.title')}}</div>
        </q-card-section>

        <q-card-section class="">
            <q-select v-model="fldGraveyard"
                :label="$t('ui.dialog.add.task.graveyard')"
                :options="optsGraveyard"
                dense
                options-dense
                outlined
                style="min-width: 150px"
            />
            <q-input v-model="fldTitle"
                     :label="$t('ui.dialog.add.task.title')"
                     class="q-pa-xs"
                     dense
                     outlined
            />
            <q-input v-model="fldDateDue"
                     :label="$t('ui.dialog.add.task.due')"
                     :rules="['date']"
                     class="q-pa-xs"
                     dense
                     mask="date"
                     outlined
            >
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="fldDateDue">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat/>
                                </div>
                            </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
            <q-img
                    :src="url"
                    class="q-pa-xs"
                    spinner-color="white"
                    style="max-height: 140px; max-width: 100%"
            />
            <!--<q-uploader-->
            <!--url="http://localhost:4444/upload"-->
            <!--style="max-width: 250px"-->
            <!--/>-->
            <!--<input type="file" id="pictureTest">-->

            <q-input v-model="fldDesc"
                     class="q-pa-xs"
                     outlined
                     autogrow
            />

        </q-card-section>

        <q-card-actions align="center">
            <q-btn color="primary" :label="$t('btn.save')" padding="sm" v-on:click="btnSave" />
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
     * @memberOf Gtm_Mob_Front_Ui_Home_Dialog_Task_Add
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {},
        data() {
            return {
                display: false,
                fldDateDue: formatDate(addDays(7)),
                fldDesc: null,
                fldGraveyard: null,
                fldTitle: null,
                optsGraveyard: [],
                url: './img/placeholder.png',
            };
        },
        methods: {
            displayDialog() {
                this.display = true;
            },
            /**
             * Add new task to IDB.
             * @return {Promise<void>}
             */
            async btnSave() {
                const trx = await idb.startTransaction(idbTask);
                /** @type {Gtm_Mob_Front_IDb_Store_Task.Dto} */
                const dto = idbTask.createDto();
                dto.dateDue = castDate(this.fldDateDue);
                dto.desc = this.fldDesc;
                dto.graveyardBid = this.fldGraveyard.value;
                dto.status = STATUS.NEW;
                dto.title = this.fldTitle;
                const taskId = await idb.create(trx, idbTask, dto);
                logger.info(`New task is added to IDB as #${taskId}.`);
                trx.commit();
                this.display = false;
                wgHome.get().loadTasks();
            },
        },
        async mounted() {
            // FUNCS
            async function getOtsGraveyard() {
                const res = [];
                const trx = await idb.startTransaction(idbGraveyard, false);
                /** @type {Gtm_Mob_Front_IDb_Store_Graveyard.Dto[]} */
                const items = await idb.readSet(trx, idbGraveyard);
                for (const one of items)
                    res.push({label: one.name, value: one.bid},)
                trx.commit();
                return res;
            }

            // MAIN
            wgDialogTaskAdd.set(this);
            this.optsGraveyard = await getOtsGraveyard();
        },
    };
}
