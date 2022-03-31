/**
 * Handler to save tasks posted by fronts into RDB.
 *
 * @namespace Gtm_Mob_Back_Hand_Task_Post
 */
export default class Gtm_Mob_Back_Hand_Task_Post {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Api_ILogger} */
        const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Db_Back_RDb_IConnect} */
        const rdb = spec['TeqFw_Db_Back_RDb_IConnect$'];
        /** @type {TeqFw_Db_Back_Api_RDb_ICrudEngine} */
        const crud = spec['TeqFw_Db_Back_Api_RDb_ICrudEngine$'];
        /** @type {Gtm_Base_Back_RDb_Schema_Task} */
        const rdbTask = spec['Gtm_Base_Back_RDb_Schema_Task$'];
        /** @type {TeqFw_Core_Back_App_Event_Bus} */
        const eventsBack = spec['TeqFw_Core_Back_App_Event_Bus$'];
        /** @type {TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal} */
        const portalFront = spec['TeqFw_Web_Back_App_Server_Handler_Event_Reverse_Portal$'];
        /** @type {Gtm_Mob_Shared_Event_Front_Task_Post_Request} */
        const esfPost = spec['Gtm_Mob_Shared_Event_Front_Task_Post_Request$'];
        /** @type {Gtm_Mob_Shared_Event_Back_Task_Post_Response} */
        const esbPost = spec['Gtm_Mob_Shared_Event_Back_Task_Post_Response$'];
        /** @type {typeof Gtm_Base_Shared_Enum_Task_Status} */
        const STATUS = spec['Gtm_Base_Shared_Enum_Task_Status$'];
        /** @type {Gtm_Base_Back_Act_Upload_Save.act|function} */
        const actSave = spec['Gtm_Base_Back_Act_Upload_Save$'];

        // VARS
        const A_TASK = rdbTask.getAttributes();

        // MAIN
        logger.setNamespace(this.constructor.name);
        eventsBack.subscribe(esfPost.getEventName(), onRequest)

        // FUNCS
        /**
         * @param {Gtm_Mob_Shared_Event_Front_Task_Post_Request.Dto} data
         * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
         * @return {Promise<void>}
         */
        async function onRequest({data, meta}) {
            // FUNCS
            /**
             * @param {number} bid
             * @param {Gtm_Mob_Shared_Event_Front_Task_Post_Request.Dto} data
             * @param {TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto} meta
             * @return {Promise<void>}
             */
            async function respond(bid, data, meta) {
                const event = esbPost.createDto();
                event.meta.frontUUID = meta.frontUUID;
                event.data.bid = bid;
                event.data.fid = data.taskFid;
                portalFront.publish(event);
            }

            // MAIN
            const trx = await rdb.startTransaction();
            try {
                /** @type {Gtm_Base_Back_RDb_Schema_Task.Dto} */
                const dto = rdbTask.createDto();
                dto.date_created = castDate(data?.dateCreated);
                dto.date_due = castDate(data?.dateDue);
                dto.desc = data?.desc;
                dto.graveyard_ref = data?.graveyardBid;
                if(data?.image) {
                    const {id} = await actSave({trx, base64: data?.image});
                    dto.image_ref = id;
                }
                dto.status = STATUS.NEW;
                dto.title = data?.title;
                dto.uuid = data?.uuid;
                const {[A_TASK.ID]: bid} = await crud.create(trx, rdbTask, dto);
                await trx.commit();
                // send response event to the front
                respond(bid, data, meta);
            } catch (error) {
                await trx.rollback();
                logger.error(error);
            }
        }
    }
}
