export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Erro desconhecido");
        }

        return await response.json(); 
    }
    catch (error) {
        console.error("Erro na requisição:", error);
        throw error; 
    }
};
