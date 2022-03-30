/**
 * Container to access UI widget as singleton.
 */
export default class Gtm_Mob_Front_Widget_Home_Dialog_Task_Delete {
    constructor() {
        // VARS
        /** @type {Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete.IUiComp} */
        let _store;

        // INSTANCE METHODS
        /**
         * @param {Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete.IUiComp} data
         */
        this.set = function (data) {
            _store = data;
        }

        /**
         * @return {Gtm_Mob_Front_Ui_Home_Dialog_Task_Delete.IUiComp}
         */
        this.get = function () {
            return _store;
        }
    }
}
