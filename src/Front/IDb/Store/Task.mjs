/**
 * Task data stored in IDB.
 *
 * @namespace Gtm_Mob_Front_IDb_Store_Task
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_IDb_Store_Task';
/**
 * Entity name (unique among all other IDB entities of the app).
 * @type {string}
 */
const ENTITY = '/task';

/**
 * @memberOf Gtm_Mob_Front_IDb_Store_Task
 * @type {Object}
 */
const ATTR = {
    BID: 'bid', // backendId: related ID on backend
    DATE_CREATED: 'dateCreated',
    DATE_DUE: 'dateDue',
    DESC: 'desc',
    GRAVEYARD_BID: 'graveyardBid',
    ID: 'id',
    IMAGE: 'image',
    STATUS: 'status',
    TITLE: 'title',
};

/**
 * @memberOf Gtm_Mob_Front_IDb_Store_Task
 */
const INDEX = {
    BY_BID: 'by_bid'
}

/**
 * @memberOf Gtm_Mob_Front_IDb_Store_Task
 */
class Dto {
    static namespace = NS;
    /**
     * ID for the same object in RDB on back.
     * @type {number}
     */
    bid;
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
     * Local ID for this object in IDB.
     * @type {number}
     */
    id;
    /**
     * Base64 encoded image.
     * @type {string}
     */
    image;
    /** @type {Gtm_Mob_Front_Enum_Task_Status} */
    status;
    /**
     * Task title.
     * @type {string}
     */
    title;
}

/**
 * @implements TeqFw_Web_Front_Api_Store_IEntity
 */
export default class Gtm_Mob_Front_IDb_Store_Task {
    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castEnum|function} */
        const castEnum = spec['TeqFw_Core_Shared_Util_Cast.castEnum'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {typeof Gtm_Mob_Front_Enum_Task_Status} */
        const STATUS = spec['Gtm_Mob_Front_Enum_Task_Status$'];

        /**
         * @param {Gtm_Mob_Front_IDb_Store_Task.Dto} [data]
         * @return {Gtm_Mob_Front_IDb_Store_Task.Dto}
         */
        this.createDto = function (data) {
            const res = Object.assign(new Dto(), data);
            res.bid = castInt(data?.bid);
            res.dateCreated = castDate(data?.dateCreated) || new Date();
            res.dateDue = castDate(data?.dateDue);
            res.desc = castString(data?.desc);
            res.graveyardBid = castInt(data?.graveyardBid);
            res.id = castInt(data?.id);
            res.image = castString(data?.image);
            res.status = castEnum(data?.status, STATUS);
            res.title = castString(data?.title);
            return res;
        }

    }

    /**
     * @return {typeof Gtm_Mob_Front_IDb_Store_Task.ATTR}
     */
    getAttributes = () => ATTR;

    getAttrNames = () => Object.values(ATTR);

    getEntityName = () => ENTITY;

    /**
     * @return {typeof Gtm_Mob_Front_IDb_Store_Task.INDEX}
     */
    getIndexes = () => INDEX;

    getPrimaryKey = () => [ATTR.ID];

    getKeysForIndex = (index) => {
        if (index === INDEX.BY_BID) return [ATTR.BID];
        return this.getPrimaryKey();
    }
}
