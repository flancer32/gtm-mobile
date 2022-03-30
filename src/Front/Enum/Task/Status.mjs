/**
 * Enumeration for status of a task.
 */
const Gtm_Mob_Front_Enum_Task_Status = {
    NEW: 'NEW', // task is created on the front and saved in IDB only
    SENT: 'SENT', // task is sent to backend
}

Object.freeze(Gtm_Mob_Front_Enum_Task_Status);
export default Gtm_Mob_Front_Enum_Task_Status;
