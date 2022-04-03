const SeriesService = require('../services/serie.service');
const SerieModel = require('../models/serie.model');
const service = new SeriesService();
const express = require('express');
const serieRoutes = express.Router();

serieRoutes.post('/serie', async (req, res) => {
  try {
    const serie = SerieModel(req.body);
    const data = await service.createSerie(serie);
    res.status(201).json({ data });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

serieRoutes.get('/', async (req, res) => {
  try {
    const data = await service.listSeries();
    res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

serieRoutes.get('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const data = await service.showSerie(serieId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

serieRoutes.get('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const data = await service.showSerie(serieId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

serieRoutes.put('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const { serie, number_seasons, number_lenguage, original_lenguage, features_seasons } = req.body;
    const data = await service.editSerie(
      serieId,
      serie,
      number_seasons,
      number_lenguage,
      original_lenguage,
      features_seasons
    );
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

serieRoutes.delete('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const data = await service.removeSerie(serieId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

/*obtener serie donde actue un actor especifico*/
serieRoutes.get('/actor/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const data = await service.findActor(name);
    res.status(200).json({data});
  } catch (error) {
    next(error);
  }
});

/*obtener con serie por fecha de estreno*/
serieRoutes.get('/fecha/:fecha', async (req, res,next) => {
  try {
    const { fecha } = req.params;
    const data = await service.findByFecha(fecha);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

module.exports = serieRoutes;
