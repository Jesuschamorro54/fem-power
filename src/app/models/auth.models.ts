export const imageDefault = "https://fempower-public.s3.amazonaws.com/photoDefault.jpg";

export interface UserData {
    User: User,
    Profile: Profile,
}


export interface Profile {
    id?: string,
    description: string,
    fundation: string
    workplace: string,
    employment_status: string,
    performance: string,
    age: number,
    aspiration: string,
    mision: string,
    vision: string,
    rural_zone: string,
    entity_type: string,
    cover: string,
    coverUrl?: string
}


export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    image: string,
    imageUrl?: string,
    cover?: string,
    cellphone?: string,
    role: string,
    date_create?: string,
    fuente: string,
    active: number
}

export interface DataRegister {
    email: string;
    password: string;
    name: string;
    code?: string;
    fundation_code: string;
    type?: string;
    cellphone?: string;
    certificate: string;
}

export interface DataLogin {
    email: string,
    password: string,
    country?: string
}

export const user_empty = {
    id: "",
    name: "",
    email: "",
    password: "",
    image: "",
    cover: "",
    cellphone: "",
    role: "",
    date_create: "",
    fuente: "",
    active: 1
}

export const profile_empty = {
    description: "",
    fundation: "",
    workplace: "",
    employment_status: "",
    performance: "",
    age: 0,
    aspiration: "",
    mision: "",
    vision: "",
    rural_zone: "",
    entity_type: "",
    cover: ""
}