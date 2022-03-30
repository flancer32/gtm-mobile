/**
 * Process reports about task posts from backend
 */
export default class Gtm_Mob_Front_Hand_Task_Post_Report {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Web_Front_App_Event_Bus} */
        const eventsFront = spec['TeqFw_Web_Front_App_Event_Bus$'];
        /** @type {Gtm_Mob_Shared_Event_Back_Task_Post_Response} */
        const esbPost = spec['Gtm_Mob_Shared_Event_Back_Task_Post_Response$'];
        /** @type {TeqFw_Web_Front_App_Store_IDB} */
        const idb = spec['Gtm_Mob_Front_IDb_Main$']; // get as singleton, type as interface
        /** @type {Gtm_Mob_Front_IDb_Store_Task} */
        const idbTask = spec['Gtm_Mob_Front_IDb_Store_Task$'];
        /** @type {Gtm_Mob_Front_Widget_Home} */
        const wgHome = spec['Gtm_Mob_Front_Widget_Home$'];
        /** @type {typeof Gtm_Mob_Front_Enum_Task_Status} */
        const STATUS = spec['Gtm_Mob_Front_Enum_Task_Status$'];

        // VARS

        // MAIN
        eventsFront.subscribe(esbPost.getEventName(), onEvent);
        logger.setNamespace(this.constructor.name);
        logger.info(`Process ${this.constructor.name} is subscribed to events.`);

        // FUNCS
        /**
         * @param {Gtm_Mob_Shared_Event_Back_Task_Post_Response.Dto} data
         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
         */
        async function onEvent({data, meta}) {
            // FUNCS

            // MAIN
            // decrypt message body
            const trx = await idb.startTransaction([idbTask]);
            /** @type {Gtm_Mob_Front_IDb_Store_Task.Dto} */
            const found = await idb.readOne(trx, idbTask, data.fid);
            if (found) {
                found.bid = data.bid;
                found.status = STATUS.POSTED;
                await idb.updateOne(trx, idbTask, found);
                wgHome.get().loadTasks();
            }
            trx.commit();
        }

    }
}
