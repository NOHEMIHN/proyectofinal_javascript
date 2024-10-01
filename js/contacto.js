
// Inicializa el mapa centrado en la ubicación de la empresa
var map = L.map('map').setView([40.416775, -3.703790], 13); // Coordenadas de Madrid

// Capa base: OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Coordenadas de la empresa
var empresaCoords = [40.416775, -3.703790];

// Agrega un marcador en la ubicación de la empresa
var marker = L.marker(empresaCoords).addTo(map)
    .bindPopup('Nuestra empresa está aquí.')
    .openPopup();

fetch('https://ipinfo.io/json?token=051b6e6c1aec3b')
.then(response => response.json())
.then(data => {
    var loc = data.loc.split(',');
    var clienteCoords = [parseFloat(loc[0]), parseFloat(loc[1])];
    L.marker(clienteCoords).addTo(map)
    .bindPopup('Usted está aquí.')
    .openPopup();
    L.Routing.control({
        waypoints: [
            L.latLng(clienteCoords), // Ubicación del cliente
            L.latLng(empresaCoords)  // Ubicación de la empresa
        ],
        language: 'es',
        routeWhileDragging: true,
        createMarker: function() { return null; }, // Elimina los marcadores adicionales
        lineOptions: {
            styles: [{ color: 'red', opacity: 0.6, weight: 4 }]
        },
        addWaypoints: false,
        show: false, //Evita mostrar las instrucciones en el panel
        showAlternatives: false, // No muestra rutas alternativas
        fitSelectedRoutes: true, // Ajusta el mapa a la ruta seleccionada
        collapsible: true 
    }).addTo(map);
})
.catch(err => console.error(err));

