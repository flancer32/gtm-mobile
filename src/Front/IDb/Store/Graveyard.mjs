/**
 * Graveyard data stored in IDB.
 *
 * @namespace Gtm_Mob_Front_IDb_Store_Graveyard
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_IDb_Store_Graveyard';
/**
 * Entity name (unique among all other IDB entities of the app).
 * @type {string}
 */
const ENTITY = '/graveyard';

/**
 * @memberOf Gtm_Mob_Front_IDb_Store_Graveyard
 * @type {Object}
 */
const ATTR = {
    BID: 'bid', // backendId: related ID on backend
    NAME: 'name',
};

/**
 * @memberOf Gtm_Mob_Front_IDb_Store_Graveyard
 */
const INDEX = {}

/**
 * @memberOf Gtm_Mob_Front_IDb_Store_Graveyard
 */
class Dto {
    static namespace = NS;
    /**
     * ID for the same object in RDB on back.
     * @type {number}
     */
    bid;
    /**
     * Graveyard name.
     * @type {string}
     */
    name;
}

/**
 * @implements TeqFw_Web_Front_Api_Store_IEntity
 */
export default class Gtm_Mob_Front_IDb_Store_Graveyard {
    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castInt|function} */
        const castInt = spec['TeqFw_Core_Shared_Util_Cast.castInt'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        /**
         * @param {Gtm_Mob_Front_IDb_Store_Graveyard.Dto} [data]
         * @return {Gtm_Mob_Front_IDb_Store_Graveyard.Dto}
         */
        this.createDto = function (data) {
            const res = Object.assign(new Dto(), data);
            res.bid = castInt(data?.bid);
            res.name = castString(data?.name);
            return res;
        }

    }

    /**
     * @return {typeof Gtm_Mob_Front_IDb_Store_Graveyard.ATTR}
     */
    getAttributes = () => ATTR;

    getAttrNames = () => Object.values(ATTR);

    getEntityName = () => ENTITY;

    /**
     * @return {typeof Gtm_Mob_Front_IDb_Store_Graveyard.INDEX}
     */
    getIndexes = () => INDEX;

    getPrimaryKey = () => [ATTR.BID];

    getKeysForIndex = () => {
        return this.getPrimaryKey();
    }
}
