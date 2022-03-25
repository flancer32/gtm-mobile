/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Gtm_Mob_Front_Defaults {
    /** @type {Gtm_Mob_Shared_Defaults} */
    SHARED;

    constructor(spec) {
        this.SHARED = spec['Gtm_Mob_Shared_Defaults$'];
        Object.freeze(this);
    }
}
