

export interface UseAuthParams {
    email:string,
    password:string,
}

export default function useAuth<UseAuthParams>(params:UseAuthParams){
    let isAuth = false;
    return {...params,isAuth}
}