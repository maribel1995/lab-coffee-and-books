window.onload = () => {
    const ironhackSP = {
        lat: -23.56173216,
        lng: -46.6623271
    };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: ironhackSP
    });

    const getPlace = () => {
        axios.get(`/places/api/${id}`)
            .then(response => {
                place(response.data.place, map);
            })
            .catch(error => {
                console.log(error);
            })
    }
    getPlace();
};

place = (place, map) => {
        const placeLocation = {
            lat: place.location.coordinates[1],
            lng: place.location.coordinates[0]
        }

        const pin = new google.maps.Marker({
            position: placeLocation,
            map:map,
            title: place.name
        });
}