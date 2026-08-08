<?php

use App\Http\Controllers\PlantaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Jardin Botanico Virtual
|--------------------------------------------------------------------------
|
| GET  /api/plantas     -> Lista todas las plantas
| POST /api/interactuar -> Plantar, regar o matar una planta
|
*/

Route::get('/plantas', [PlantaController::class, 'index']);
Route::post('/interactuar', [PlantaController::class, 'interactuar']);
