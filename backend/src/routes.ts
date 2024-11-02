import { Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { SteamGameController } from './controllers/game/SteamGameController';
import { CreateGameController } from './controllers/game/CreateGameController';
import { ListByCategoryController } from './controllers/game/ListByCategoryController';

import { AddOrUpdateUserGameController } from './controllers/userGame/AddOrUpdateUserGameController';
import { ListUserGamesController } from './controllers/userGame/ListUserGamesController';
import { RemoveUserGameController } from './controllers/userGame/RemoveUserGameController';
import { GetUserGameDetailsController } from './controllers/userGame/GetUserGameDetailsController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();
const steamGameController = new SteamGameController();

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// -- ROTAS STEAM GAMES --
router.get('/steam-games', isAuthenticated, steamGameController.fetchGames); // Listar todos os jogos da Steam
router.get('/steam-games/:appid', isAuthenticated, steamGameController.fetchGameDetails); // Detalhes de um jogo específico
router.get('/popular-games', isAuthenticated, steamGameController.fetchPopularGames); // Detalhes de jogos populares

// -- ROTAS CATEGORY - GAME --
router.post('/game', isAuthenticated, new CreateGameController().handle);
router.get('/category/game', isAuthenticated, new ListByCategoryController().handle);

// -- ROTAS USER-GAME --
router.post('/user-game', isAuthenticated, new AddOrUpdateUserGameController().handle); 
router.get('/user-games', isAuthenticated, new ListUserGamesController().handle); 
router.delete('/user-game', isAuthenticated, new RemoveUserGameController().handle);
router.get('/user-game/:gameId', isAuthenticated, new GetUserGameDetailsController().handle); 

export { router };
