/**
 * Back response to post new task from front to back.
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Shared_Event_Back_Task_Post_Response';

// MODULE'S CLASSES
/**
 * @memberOf Gtm_Mob_Shared_Event_Back_Task_Post_Response
 */
class Dto {
    static namespace = NS;
    /**
     * Task's ID on backend.
     * @type {number}
     */
    bid;
    /**
     * Task's ID on frontend.
     * @type {number}
     */
    fid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IEvent
 */
export default class Gtm_Mob_Shared_Event_Back_Task_Post_Response {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Shared_App_Event_Trans_Message} */
        const dtoBase = spec['TeqFw_Web_Shared_App_Event_Trans_Message$'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];

        // VARS
        const ATTR = dtoBase.getAttributes();

        // FUNCS
        /**
         * @param {Gtm_Mob_Shared_Event_Back_Task_Post_Response.Dto} [data]
         * @return {Gtm_Mob_Shared_Event_Back_Task_Post_Response.Dto}
         */
        function createData(data) {
            const res = new Dto();
            res.bid = castInt(data?.bid);
            res.fid = castInt(data?.fid);
            return res;
        }

        // INSTANCE METHODS
        /**
         * @param {{data: Gtm_Mob_Shared_Event_Back_Task_Post_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}} [data]
         * @return {{data: Gtm_Mob_Shared_Event_Back_Task_Post_Response.Dto, meta: TeqFw_Web_Shared_App_Event_Trans_Message_Meta.Dto}}
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
