<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Planta extends Model
{
    /**
     * No usar timestamps de Laravel (created_at, updated_at).
     * Usamos nuestro propio campo ultima_vez_regada.
     */
    public $timestamps = false;

    /**
     * Campos asignables masivamente.
     */
    protected $fillable = [
        'x_coord',
        'y_coord',
        'etapa',
        'ultima_vez_regada',
    ];

    /**
     * Casts de atributos.
     */
    protected $casts = [
        'ultima_vez_regada' => 'datetime',
        'x_coord' => 'integer',
        'y_coord' => 'integer',
        'etapa' => 'integer',
    ];
}
