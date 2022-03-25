/**
 * Plugin finalization function.
 */
// MODULE'S VARS
const NS = 'Gtm_Mob_Back_Plugin_Stop';

export default function Factory(spec) {
    // DEPS
    /** @type {TeqFw_Db_Back_RDb_IConnect} */
    const connect = spec['TeqFw_Db_Back_RDb_IConnect$'];

    // COMPOSE RESULT
    async function exec() {
        await connect.disconnect();
    }

    Object.defineProperty(exec, 'namespace', {value: NS});
    return exec;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
