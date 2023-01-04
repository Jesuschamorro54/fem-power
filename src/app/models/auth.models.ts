export interface UserData {
    User: User,
    Profile: Profile,
}


export interface Profile {
    Fundation: Fundation,
    Woman: Woman,
    Company: Company
}


export interface Fundation {
    description: string,
    mision: string,
    vision: string,
    rural_zone: string,
    entity_type: string,
}


export interface Woman {
    description: string,
    workplace: string,
    employment_status: string,
    rural_zone: string,
    performance: string,
    age: number,
    aspiration: string
}

export interface Company {
    description: string,
    mision: string,
    vision: string   
}


export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    image: string,
    cellphone?: string,
    role: string,
    date_create?: string,
    fuente: string,
    active: number
}