window.onload = () => {
    const ironhackSP = {
        lat: -23.56173216,
        lng: -46.6623271
    };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: ironhackSP
    });

    const getPlaces = () => {
        axios.get("/places/api")
            .then(response => {
                places(response.data.places, map);
            })
            .catch(error => {
                console.log(error);
            })
    }
    getPlaces();
};

places = (places, map) => {
    places.forEach(place => {
        const placeLocation = {
            lat: place.location.coordinates[1],
            lng: place.location.coordinates[0]
        }

        const pin = new google.maps.Marker({
            position: placeLocation,
            map:map,
            title: place.name
        });
    });
}