/**
 * Message input widget.
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
    /** @type {Gtm_Mob_Front_Widget_Home_Dialog_Task_Add} */
    const wgDialogTaskView = spec['Gtm_Mob_Front_Widget_Home_Dialog_Task_Add$'];
    /** @type {TeqFw_Core_Shared_Util_Date.addDays|function} */
    const addDays = spec['TeqFw_Core_Shared_Util_Date.addDays'];
    /** @type {TeqFw_Core_Shared_Util_Format.date|function} */
    const date = spec['TeqFw_Core_Shared_Util_Format.date'];

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
            <q-btn color="primary" :label="$t('btn.save')" padding="sm" v-close-popup/>
            <q-btn color="primary" :label="$t('btn.cancel')" padding="sm" v-close-popup/>
        </q-card-actions>

    </q-card>
</q-dialog>
`;
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
                fldDateDue: date(addDays(7)),
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
            }
        },
        async mounted() {
            wgDialogTaskView.set(this);
            this.optsGraveyard = [
                {label: 'Al Dana 1 Cemetery', value: '01'},
                {label: 'Cornish Graveyard', value: '02'},
                {label: 'Madinat Zayed', value: '03'},
            ];
        },
    };
}
