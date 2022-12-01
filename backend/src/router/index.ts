import express from 'express';
import { healthcheck } from "./healthcheck";
import { getTeams, getTeam, updateTeam, createTeam } from "./team"
import { Messages } from '../constants/messages';
const { body, query } = require('express-validator');


const router = express.Router();

router.get('/healthcheck', healthcheck);

router.get(
  '/teams',
  query("page").isNumeric(),
  query("limit").isNumeric(),
  getTeams);
router.get('/teams/:id', getTeam);
router.post(
  '/teams',
  body("id")
    .isEmpty()
    .withMessage(Messages.idNotRequired),
  body("name")
    .notEmpty()
    .withMessage(Messages.nameRequired),
  body("logo")
    .notEmpty()
    .withMessage(Messages.logoRequired)
    .isURL()
    .withMessage(Messages.invalidUrl),
  createTeam);

router.put('/teams/:id',
  body("id")
    .isEmpty()
    .withMessage(Messages.idNotRequired),
  body("name")
    .notEmpty()
    .withMessage(Messages.nameRequired),
  body("logo")
    .notEmpty()
    .withMessage(Messages.logoRequired)
    .isURL()
    .withMessage(Messages.invalidUrl),
  updateTeam);

export default router
