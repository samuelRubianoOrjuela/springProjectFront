const URL_API = "http://localhost:8080/";
const myHeaders = new Headers({
    "Content-Type": "application/json"
});
const login = async (newDict) => {
    let correct;
    for (let i in newDict){
        if (newDict[i].length > 0){
            correct = true;
        } else{
            correct = false;
            alert('Debes llenar toda la información para continuar');
            break;
        }
    }
    if (correct){
        try {
            const response = await fetch(`${URL_API}login`, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(newDict),
            });
            if (!response.ok) {
                alert("Error: Usuario o contraseña incorrecta");
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            const valid = {
                "data": data,
                "access": true
            }
            return valid; 
        } catch (error) {
            console.error('Hubo un problema con la petición Fetch:', error);
        }
    }
}

export {
    login
}