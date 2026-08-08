<?php

namespace App\Http\Controllers;

use App\Models\Planta;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PlantaController extends Controller
{
    /**
     * Devuelve todas las plantas en la cuadricula.
     */
    public function index()
    {
        return response()->json(Planta::all());
    }

    /**
     * Maneja la interaccion con una celda:
     * - Si esta vacia: planta una semilla (etapa 0)
     * - Si tiene planta y pasaron >= 30s: riega (sube etapa, max 4)
     * - Si tiene planta y pasaron < 30s: la planta muere (se elimina)
     */
    public function interactuar(Request $request)
    {
        $request->validate([
            'x' => 'required|integer|min:0|max:9',
            'y' => 'required|integer|min:0|max:9',
        ]);

        $x = $request->input('x');
        $y = $request->input('y');

        $planta = Planta::where('x_coord', $x)
                        ->where('y_coord', $y)
                        ->first();

        // Celda vacia: plantar semilla
        if (!$planta) {
            $planta = Planta::create([
                'x_coord' => $x,
                'y_coord' => $y,
                'etapa' => 0,
                'ultima_vez_regada' => Carbon::now(),
            ]);

            return response()->json([
                'accion' => 'plantada',
                'planta' => $planta,
            ], 201);
        }

        // Calcular segundos desde el ultimo riego
        $segundos = Carbon::parse($planta->ultima_vez_regada)->diffInSeconds(Carbon::now());

        // Riego prematuro: la planta muere
        if ($segundos < 30) {
            $planta->delete();

            return response()->json([
                'accion' => 'muerta',
                'mensaje' => 'La planta fue regada antes de 30 segundos y murio.',
            ]);
        }

        // Riego exitoso: subir etapa (max 4) y actualizar timestamp
        if ($planta->etapa < 4) {
            $planta->etapa += 1;
        }

        $planta->ultima_vez_regada = Carbon::now();
        $planta->save();

        return response()->json([
            'accion' => $planta->etapa >= 4 ? 'max' : 'regada',
            'planta' => $planta,
        ]);
    }
}
