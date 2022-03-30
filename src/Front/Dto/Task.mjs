/**
 * DTO for UI task.
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_Dto_Task';

/**
 * @memberOf Gtm_Mob_Front_Dto_Task
 * @type {Object}
 */
const ATTR = {
    BID: 'bid',
    DATE_CREATED: 'dateCreated',
    DATE_DUE: 'dateDue',
    DESC: 'desc',
    ID: 'id',
    STATUS: 'status',
    TITLE: 'title',
};

// MODULE'S CLASSES
/**
 * @memberOf Gtm_Mob_Front_Dto_Task
 */
class Dto {
    static namespace = NS;
    /** @type {number} */
    bid;
    /** @type {Date} */
    dateCreated;
    /** @type {Date} */
    dateDue;
    /** @type {string} */
    desc;
    /** @type {number} */
    id;
    /** @type {Gtm_Mob_Front_Enum_Task_Status} */
    status;
    /** @type {string} */
    title;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto_IMeta
 */
export default class Gtm_Mob_Front_Dto_Task {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castEnum|function} */
        const castEnum = spec['TeqFw_Core_Shared_Util_Cast.castEnum'];
        /** @type {typeof Gtm_Mob_Front_Enum_Task_Status} */
        const STATUS = spec['Gtm_Mob_Front_Enum_Task_Status$'];

        // DEFINE INSTANCE METHODS
        /**
         * @param {Gtm_Mob_Front_Dto_Task.Dto} [data]
         * @return {Gtm_Mob_Front_Dto_Task.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.bid = castInt(data?.bid);
            res.dateCreated = castDate(data?.dateCreated);
            res.dateDue = castDate(data?.dateDue);
            res.desc = castString(data?.desc);
            res.id = castInt(data?.id);
            res.status = castEnum(data?.status, STATUS);
            res.title = castString(data?.title);
            return res;
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }

}

// finalize code components for this es6-module
Object.freeze(ATTR);
