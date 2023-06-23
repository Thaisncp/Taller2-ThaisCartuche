const URLN = "http://localhost:3006/api"

export const InicioSesion = async (data) => {
    var cabeceras = {
        "Accept": 'aplication/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URLN + "/sesion", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify(data)
    })).json();
    console.log("DATOS"+datos);
    return datos;
}

export const Marca = async (key) => {
    const cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(URLN + "/autos/marca", {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const Autos = async (key) => {
    const cabeceras={"X-API-TOKEN":key};
    const datos = await (await fetch(URLN + "/autos/listar",{
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}

export const ModificarAuto = async (key,data) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key,
        "Accept": 'aplication/json'
    };
    const datos = await (await fetch(URLN + "/autos/modificar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const GuardarAuto = async (data, key) => {
    const headers = {
        "Content-Type": 'application/json',
        "X-API-TOKEN": key        
    };
    const datos = await (await fetch(URLN + "/auto/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}
export const ObtenerAuto = async (id, key) => {
    var cabeceras = { "X-API-TOKEN": key };
    const datos = await (await fetch(`${URLN}/autos/obtener/${id}`, {
        method: "GET",
        headers: cabeceras
    })).json();
    return datos;
}