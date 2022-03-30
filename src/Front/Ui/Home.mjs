/**
 * 'Home' route.
 *
 * @namespace Gtm_Mob_Front_Ui_Home
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_Ui_Home';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf Gtm_Mob_Front_Ui_Home_Dialog_Task_Add
 */
class IUiComp {
    addTask() {}

    loadTasks() {}
}

// MODULE'S FUNCTIONS
/**
 * Factory to create template for new Vue component instances.
 *
 * @returns {Gtm_Mob_Front_Ui_Home.vueCompTmpl}
 */
export default function (spec) {
    /** @type {Gtm_Mob_Front_Defaults} */
    const DEF = spec['Gtm_Mob_Front_Defaults$'];
    /** @type {Gtm_Mob_Front_Ui_Home_Dialog_Task_Add.vueCompTmpl} */
    const uiDialogTaskAdd = spec['Gtm_Mob_Front_Ui_Home_Dialog_Task_Add$'];
    /** @type {Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete.vueCompTmpl} */
    const uiDialogTaskDel = spec['Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete$'];
    /** @type {Gtm_Mob_Front_Ui_Home_Task.vueCompTmpl} */
    const uiTask = spec['Gtm_Mob_Front_Ui_Home_Task$'];
    /** @type {Gtm_Mob_Front_Widget_Home} */
    const wgHome = spec['Gtm_Mob_Front_Widget_Home$'];
    /** @type {Gtm_Mob_Front_Widget_Home_Dialog_Task_Add} */
    const wgDialogTaskAdd = spec['Gtm_Mob_Front_Widget_Home_Dialog_Task_Add$'];
    /** @type {TeqFw_Web_Front_App_Store_IDB} */
    const idb = spec['Gtm_Mob_Front_IDb_Main$']; // get as singleton with interface
    /** @type {Gtm_Mob_Front_IDb_Store_Task} */
    const idbTask = spec['Gtm_Mob_Front_IDb_Store_Task$'];
    /** @type {Gtm_Mob_Front_IDb_Store_Graveyard} */
    const idbGraveyard = spec['Gtm_Mob_Front_IDb_Store_Graveyard$'];
    /** @type {Gtm_Mob_Front_Dto_Task} */
    const dtoTask = spec['Gtm_Mob_Front_Dto_Task$'];

    // WORKING VARS
    const template = `
<layout-base>
    <div class="q-ma-sm">
        <q-btn dense color="primary" icon="add" v-on:click="addTask" />
        <ui-task v-for="(one) in tasks" :item="one" class="q-ma-sm"/>
    </div>
    <ui-dialog-task-add />
    <ui-dialog-task-del />
</layout-base>
`;
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gtm_Mob_Front_Ui_Home
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiDialogTaskAdd, uiDialogTaskDel, uiTask},
        data() {
            return {
                tasks: [],
            };
        },
        methods: {
            addTask() {
                const wg = wgDialogTaskAdd.get();
                wg.displayDialog();
            },
            async loadTasks() {
                this.tasks = [];
                const trx = await idb.startTransaction([idbTask, idbGraveyard], false);
                /** @type {Gtm_Mob_Front_IDb_Store_Task.Dto[]} */
                const tasks = await idb.readSet(trx, idbTask);
                for (const task of tasks) {
                    /** @type {Gtm_Mob_Front_Dto_Task.Dto} */
                    const dto = dtoTask.createDto();
                    dto.bid = task.bid;
                    dto.dateCreated = task.dateCreated;
                    dto.dateDue = task.dateDue;
                    dto.desc = task.desc;
                    dto.id = task.id;
                    dto.status = task.status;
                    dto.title = task.title;
                    this.tasks.push(dto);
                }
                trx.commit();
            }
        },
        async mounted() {
            wgHome.set(this);
            await this.loadTasks();
        }
    };
}
