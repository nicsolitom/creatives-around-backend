const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');
const User = require('../models/User');

class UserService {
  constructor(app, secured) {
    this.router = express.Router();
    this.app = app;
    this.secured = secured;
  }
  setupRouter() {
    // GET USER
    this.router.get('/', this.secured, async (req, res) => {
      try {
        const user = await User.findById(req.user.id, { password: 0 }).lean();
        res.status(200).json(user || {});
      } catch (error) {}
    });
    // ADD USER
    this.router.post('/', async (req, res) => {
      try {
        const { password } = req.body;
        const user = new User({
          ...req.body,
          password: bcrypt.hashSync(password, 10),
        });
        await user.save();
        res.redirect('/');
      } catch (error) {
        next(err);
      }
    });
    // GET USERS
    this.router.post('/all', this.secured, async (req, res) => {
      try {
        const { pageIndex, pageSize, maxDistance } = req.body;
        // WE NEED TO CONSTRUCT OUR QUERY BASED ON FILTER
        const query = {};
        // WE DONT WANT TO SEE OUR OWN PROFILE IN RESULTS
        query._id = { $ne: req.user._id };
        // TODO FETCH BY DISTANCE
        const users = await User.find(query, { password: 0 }).lean();
        res.status(200).json(users);
      } catch (error) {
        next(err);
      }
    });
    // UPDATE USER
    this.router.patch('/', this.secured, async (req, res) => {
      const { body } = req;
      const decoded = await this.decodeLocation(body.location);
      console.log(decoded);
      body.location = {
        ...body.location,
        city: decoded.address.state,
        street: decoded.address.road,
        district: decoded.address.city_district, // OR suburb
        code: decoded.address.postcode,
        house: decoded.address.house_number,
        country: decoded.address.country,
      };
      await User.updateOne({ _id: req.user.id }, { $set: body }).exec();
      res.send('User updated');
    });
    this.app.use('/api/user', this.router);
  }
  // DECODE LOCATION
  async decodeLocation(location) {
    const { lat, lon } = location;
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
    );
    const humanReadable = response.data;
    return humanReadable;
  }
}

module.exports = UserService;
