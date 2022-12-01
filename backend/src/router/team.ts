import { Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import Team from '../models/Team';
import Repository from '../repository/db';
import { Messages } from '../constants/messages';

const MAX_LIMIT = 200
const DEFAULT_PAGE = 1
export const getTeams = async (request: Request, response: Response): Promise<void> => {
    try {
        const repository = Repository.db;
        const page: number = Number(request.query.page as string) || DEFAULT_PAGE;
        const limit: number = Number(request.query.limit as string) || MAX_LIMIT;
        const filter: string = request.query.filter as string

        const offset = (limit * (page - 1))
        if (Number.isNaN(offset)) throw new Error(Messages.invalidQueryParams)
        console.log(filter, limit, offset);

        const teams: Team[] = await repository.all<Team[]>('SELECT * FROM teams WHERE name LIKE ? LIMIT ? OFFSET ?', `%${filter}%`, limit, offset);
        // less efficient
        const { total } = await repository.get('SELECT COUNT(*) AS total FROM teams WHERE name LIKE ?', [`%${filter}%`]);

        const teamsResponse = {
            total: total,
            data: teams
        };
        response.json(teamsResponse);
    } catch (error) {
        console.log(error);
        if (error.message === Messages.invalidQueryParams) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: 'there was an error while getting teams' });
        }
    }
};

export const getTeam = async (request: Request, response: Response): Promise<void> => {
    try {
        const repository = Repository.db;

        const team = await repository.get<Team>('SELECT * FROM teams WHERE id = ?', [request.params.id]);

        response.json(team);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: `there was an error while getting team with id ${request.params.id}` });
    }
};

export const createTeam = async (request: Request, response: Response): Promise<void> => {
    try {
        const errors = validationResult(request)
        if (!errors.isEmpty()) errors.throw()

        const repository = Repository.db;

        const { repeatedTeam } = await repository.get('SELECT COUNT(*) as repeatedTeam FROM teams WHERE name = ?', [request.body.name]);

        if (repeatedTeam) throw new Error(Messages.repeatedTeam)

        const { lastID } = await repository.run(`INSERT INTO teams (name, logo) VALUES (?, ?)`, [request.body.name, request.body.logo]);
        response.status(201).send({ id: lastID });
    } catch (error) {
        console.log(`${error} ${request.body.name}`);
        if (error?.array) {
            const errorMessages = error.array().map((err: ValidationError) => err.msg).join(", ");
            response.status(400).json({ error: errorMessages });
        } else if (error.message === Messages.repeatedTeam) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: `there was an error while creating the team${request.body.name}` });
        }
    }
};

export const updateTeam = async (request: Request, response: Response): Promise<void> => {
    try {
        const errors = validationResult(request)
        if (!errors.isEmpty()) errors.throw()

        const repository = Repository.db;

        const { repeatedTeamName } = await repository.get('SELECT COUNT(*) as repeatedTeamName FROM teams WHERE name = ?', [request.body.name]);

        if (repeatedTeamName) throw new Error(Messages.repeatedTeamName)
        await repository.run('UPDATE teams SET name = ?, logo = ? WHERE ID = ?', [request.body.name, request.body.logo, request.params.id]);

        response.status(204).send();
    } catch (error) {
        console.log(`${error} ${request.body.name}`);
        if (error?.array) {
            const errorMessages = error.array().map((err: ValidationError) => err.msg).join(", ");
            response.status(400).json({ error: errorMessages });
        } else if (error.message === Messages.repeatedTeamName) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: `there was an error while updating the team${request.body.name}` });
        }
    }
};

