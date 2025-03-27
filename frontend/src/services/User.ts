export const createUser = async (name: string, email: string, password: string) => {
    try {
        const response = await fetch("http://localhost:3000/user/create", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
        })

        if(!response.ok){
           throw new Error("Erro na requisição:" + response.statusText);
        }

        return await response.json();
    }
    catch (error) {
        throw new Error ("Erro na requisição:" + error);
    }
}

export const currentUser = async () =>{
    try{
        const response = await fetch("http://localhost:3000/me", {
            method: "GET",
            credentials: "include"
        })
    
        if(!response.ok){
            throw new Error("Erro na requisição:" + response.statusText);
        }
    
        const data = await response.json();
        console.log("Usuário logado:", data);
        return data;
    }
    catch(error){
        throw new Error("Erro na requisição:" + error);
    }
}

