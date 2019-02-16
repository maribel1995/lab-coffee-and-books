const express = require('express');
const router = express.Router();
const Place = require('../models/place');

/* GET home page */
router.get('/', (req, res, next) => {
  Place.find({}, (error, placesFromDB) => {
    if (error) {
      next(error);
    } else {
      res.render('places/index', {
        places: placesFromDB
      });
    }
  })
});

// GET => new place
router.get('/new', (req, res, next) => {
  res.render('places/new');
});

//POST => create and save new place
router.post('/', (req, res, next) => {
  let location = {
    type:'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  }

  const newPlace = new Place({
    name: req.body.name,
    type: req.body.type,
    location: location
  });

  newPlace.save((error) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/places');
    }
  })
});



//GET => form pre-filled to update the place
router.get('/:place_id/edit', (req, res, next) => {
  Place.findById(req.params.place_id, (error, place) => {
    if (error) {
      next(error);
    } else {
      res.render('places/update', {
        place
      })
    }
  });
});

//POST => save updates
router.post('/:place_id', (req, res, next) => {
  Place.findById(req.params.place_id, (error, place) => {
    if (error) {
      next(error);
    } else {
      let location = {
        type:'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      }

      place.name = req.body.name;
      place.type = req.body.type;
      place.location = location;

      place.save(error => {
        if(error){
          next(error);
        }else{
          res.redirect(`/places/${req.params.place_id}`)
        }
      });
    }
  });
});

//DELETE => remove a place
router.get('/:place_id/delete', (req, res, next) => {
  Place.remove({_id:req.params.place_id}, (error,place) => {
    if(error){
      next(error);
    }else{
      res.redirect('/places')
    }
  })
})

// api get all places
router.get('/api', (req, res, next) => {
  Place.find({}, (error, allPlacesFromDB) => {
    if(error) {
      next(error);
    }else{
      res.status(200).json({places: allPlacesFromDB});
    }
  })
})

//api get places by id
router.get('/api/:id', (req,res, next) => {
  let placeId = req.params.id;
  Place.findById({_id: placeId}, (error, onePlaceFromDB) => {
    if(error){
      next(error);
    }else{
      res.status(200).json({place: onePlaceFromDB});
    }
  })
})

//GET => get details of one place
router.get('/:place_id', (req, res, next) => {
  Place.findById(req.params.place_id, (error, place) => {
    if (error) {
      next(error);
    } else {
      res.render('places/show', {
        place: place
      });
    }
  });
});


module.exports = router;