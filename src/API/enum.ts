export enum Projects {
    by_prject = 1,
    objects = 2,
    RD = 3,
    MTO = 4,
    CMR = 5,
    shedule = 6,
    MiM = 7,
    worker = 8,
    attachments = 9,
    budget = 10,
    financing = 11,
    panoramas = 12,
    cameras = 13,
    orders = 14,
    counterparties = 15
}

export const ProjectsNames: {
    [key in keyof typeof Projects]: string
} = {
    by_prject: "По проекту",
    objects: "Объекты",
    RD: "РД",
    MTO: "МТО",
    CMR: "СМР",
    shedule: "График",
    MiM: "МиМ",
    worker: "Рабочие",
    attachments: "Капвложения",
    budget: "Бюджет",
    financing: "Финансирование",
    panoramas: "Панорамы",
    cameras: "Камеры",
    orders: "Поручения",
    counterparties: "Контрагенты"
}