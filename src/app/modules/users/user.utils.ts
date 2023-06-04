let lastUserId = 0 ;

export const generateUserId =() =>{
    lastUserId ++
    return String(lastUserId).padStart(5,"0")
}