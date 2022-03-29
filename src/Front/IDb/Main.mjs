/**
 * Main IndexedDB for the application.
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Front_IDb_Main';
const IDB_VERSION = 1;
/**
 * Factory to create connector to application level IDB
 * @param spec
 * @return {TeqFw_Web_Front_App_Store_IDB}
 */
export default function (spec) {
    /** @type {TeqFw_Web_Front_App_Store_IDB} */
    const idb = spec['TeqFw_Web_Front_App_Store_IDB$$']; // new instance
    /** @type {Gtm_Mob_Front_IDb_Store_Task} */
    const idbTask = spec['Gtm_Mob_Front_IDb_Store_Task$'];
    /** @type {Gtm_Mob_Front_IDb_Store_Graveyard} */
    const idbGraveyard = spec['Gtm_Mob_Front_IDb_Store_Graveyard$'];


    // DEFINE WORKING VARS / PROPS
    const GRAVEYARD_A = idbGraveyard.getAttributes();
    const GRAVEYARD_E = idbGraveyard.getEntityName();
    const TASK_A = idbTask.getAttributes();
    const TASK_E = idbTask.getEntityName();
    const TASK_I = idbTask.getIndexes();

    // FUNCS
    /**
     * Factory to pin 'db' in the scope and create function to upgrade DB structure on opening.
     * @param {IDBDatabase} db
     * @return {(function(*): void)|*}
     */
    function fnUpgradeDb(db) {
        // VARS
        const autoIncrement = true;
        const multiEntry = true;
        const unique = true;

        // MAIN

        // /graveyard
        if (!db.objectStoreNames.contains(GRAVEYARD_E)) {
            const store = db.createObjectStore(GRAVEYARD_E, {keyPath: GRAVEYARD_A.BID});
            store.add({[GRAVEYARD_A.BID]: 1, [GRAVEYARD_A.NAME]: 'Al Dana 1 Cemetery'});
            store.add({[GRAVEYARD_A.BID]: 2, [GRAVEYARD_A.NAME]: 'Cornish Graveyard'});
            store.add({[GRAVEYARD_A.BID]: 3, [GRAVEYARD_A.NAME]: 'Madinat Zayed'});
        }

        // /task
        if (!db.objectStoreNames.contains(TASK_E)) {
            const store = db.createObjectStore(TASK_E, {keyPath: TASK_A.ID, autoIncrement});
            store.createIndex(TASK_I.BY_BID, TASK_A.BID, {unique});
        }
        // // /contact
        // if (!db.objectStoreNames.contains(E_CONTACT)) {
        //     const store = db.createObjectStore(E_CONTACT, {keyPath: A_CONTACT.ID, autoIncrement});
        //     store.createIndex(I_CONTACT.BY_BACK_ID, A_CONTACT.ID_ON_BACK, {unique});
        // }
        // // /msg
        // if (!db.objectStoreNames.contains(E_MSG)) {
        //     const store = db.createObjectStore(E_MSG, {keyPath: A_MSG.ID, autoIncrement});
        //     store.createIndex(I_MSG.BY_UUID, A_MSG.UUID, {unique});
        //     store.createIndex(I_MSG.BY_BAND, [A_MSG.BAND_REF, A_MSG.DATE]);
        // }
    }

    // MAIN
    idb.init(NS, IDB_VERSION, fnUpgradeDb);

    return idb;
}
