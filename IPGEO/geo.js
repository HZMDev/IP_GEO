const btnSearch = document.getElementById('btnSearch');
const textToSearch = document.getElementById('form1');
const ipText = document.getElementById("ip")
const countryText = document.getElementById("country")
const countryCodeText = document.getElementById("countryCode")
const regionAndCityText = document.getElementById("regionAndCity")
const zipCodeText = document.getElementById("zipCode")
const latLong = document.getElementById("latLong")
const timezone = document.getElementById("timeZone")
const currency = document.getElementById("currency")
const isp = document.getElementById("isp")
const continent = document.getElementById("continent")

function getIPInformation(ip) {
    const obtenerDatos = async () => {
        try {
            const respuesta = await fetch(`https://api.techniknews.net/ipgeo/` + ip);
            console.log(respuesta);

            if (respuesta.status === 200) {
                const datos = await respuesta.json();
                return datos
            } else if (respuesta.status === 401) {
                console.log('Key incorrecta');
            } else if (respuesta.status === 404) {
                console.log('La IP que buscas no existe');
            } else {
                console.log('Hubo un error');
            }

        } catch (error) {
            console.log(error);
        }

    }
    return obtenerDatos()
}


btnSearch.addEventListener('click', async () => {
    let text = textToSearch.value
    if (!text || !ValidateIPaddress(text)) {
        return
    }
    showData(textToSearch.value)
});

function ValidateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    alert("You have entered an invalid IP address!")
    return (false)
}


function chargeData(info) {
    ipText.innerHTML = info.ip
    countryText.innerHTML = info.country
    countryCodeText.innerHTML = info.countryCode
    regionAndCityText.innerHTML = info.regionName + ", " + info.city
    zipCodeText.innerHTML = info.zip
    latLong.innerHTML = info.lat + ", " + info.lon
    timezone.innerHTML = info.timezone
    currency.innerHTML = info.currency
    isp.innerHTML = info.isp
    continent.innerHTML = info.continent
}

async function showData(ip) {
    let info = await getIPInformation(ip)
    chargeData(info)
}
window.onload = async () => {
    await showData("")
}