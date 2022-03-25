/**
 * Plugin initialization function.
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Back_Plugin_Init';

export default function Factory(spec) {
    // DEPS
    /** @type {Gtm_Mob_Back_Defaults} */
    const DEF = spec['Gtm_Mob_Back_Defaults$'];
    /** @type {TeqFw_Di_Shared_Container} */
    const container = spec['TeqFw_Di_Shared_Container$'];
    /** @type {TeqFw_Core_Shared_Api_ILogger} */
    const logger = spec['TeqFw_Core_Shared_Api_ILogger$$']; // instance

    // FUNCS

    // MAIN
    logger.setNamespace(NS);
    Object.defineProperty(init, 'namespace', {value: NS});
    return init;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
