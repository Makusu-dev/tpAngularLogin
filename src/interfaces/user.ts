export interface User  {
    email: string,
    password: string,
    roles: string[]
}

//TODO: Passer a une gestion par roles et non par un booléen isAdmin
export interface LoggedUser  {
    email: string,
    token: string,
    roles: string[]
}
