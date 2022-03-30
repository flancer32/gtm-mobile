/**
 * Front request to post new task from front to back.
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Shared_Event_Front_Task_Post_Request';

// MODULE'S CLASSES
/**
 * @memberOf Gtm_Mob_Shared_Event_Front_Task_Post_Request
 */
class Dto {
    static namespace = NS;
    /**
     * UTC date when task was created in IDB.
     * @type {Date}
     */
    dateCreated;
    /**
     * UTC date when task should be completed.
     * @type {Date}
     */
    dateDue;
    /**
     * Task description.
     * @type {string}
     */
    desc;
    /**
     * Backend ID for related graveyard.
     * @type {number}
     */
    graveyardBid;
    /**
     * Base64 encoded image.
     * @type {string}
     */
    image;
    /**
     * Frontend ID for the task.
     * @type {number}
     */
    taskFid;
    /**
     * Task title.
     * @type {string}
     */
    title;
    /**
     * Task UUID.
     * @type {string}
     */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class Gtm_Mob_Shared_Event_Front_Task_Post_Request {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // VARS
        const ATTR = dtoBase.getAttributes();

        // FUNCS
        /**
         * @param {Gtm_Mob_Shared_Event_Front_Task_Post_Request.Dto} [data]
         * @return {Gtm_Mob_Shared_Event_Front_Task_Post_Request.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.dateCreated = castDate(data?.dateCreated);
            res.dateDue = castDate(data?.dateDue);
            res.desc = castString(data?.desc);
            res.graveyardBid = castInt(data?.graveyardBid);
            res.image = castString(data?.image);
            res.taskFid = castInt(data?.taskFid);
            res.title = castString(data?.title);
            res.uuid = castString(data?.uuid);

            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: Gtm_Mob_Shared_Event_Front_Task_Post_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: Gtm_Mob_Shared_Event_Front_Task_Post_Request.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
         */
        this.createDto = function (data) {
            const res = dtoBase.createDto({[ATTR.META]: data?.[ATTR.META]});
            res.meta.name = NS;
            res.data = createData(data?.[ATTR.DATA]);
            // noinspection JSValidateTypes
            return res;
        }

        this.getEventName = () => NS;
    }
}
