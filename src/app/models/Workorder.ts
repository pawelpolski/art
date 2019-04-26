

export interface Workorder {
    wo?: string;
    wo_id?: string;
    taurus_wo?: string;
    date?: any;
    codes?: any[];
    description?: string;
    equipments?: any[];
    returns?: string[];
    type?: string;
    netia_type?: string;
    wo_type?: string;
    status?: string;
    location?: any;
    client?: string;
    range?: string;
    value?: number;
    tech_code?: string;
    lastChange?: any;
    calendar?: string;
    city?: string;
    street?: string;
    home?: string;
    locale?: string;
    codesString?: any;
    equipmentsString?: any;
    returnsString?: any;
    checked?: string;
    checkedBy?: string;
    sended?: boolean;
    toRemove?: boolean;
    probablyReturns?: string[];
    removedDesc?: string;
    ttDesc?: string;
    wo_netia?: string;
    cpeActivated?: boolean;
    operation?: string;
    locations?: string[];
    files?: string[];
    monthAndYear?: string;
    telephones?: string[];
}
