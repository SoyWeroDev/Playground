<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crear la tabla plantas.
     */
    public function up(): void
    {
        Schema::create('plantas', function (Blueprint $table) {
            $table->id();
            $table->integer('x_coord');
            $table->integer('y_coord');
            $table->integer('etapa')->default(0);
            $table->timestamp('ultima_vez_regada')->nullable();

            // Una sola planta por celda
            $table->unique(['x_coord', 'y_coord']);
        });
    }

    /**
     * Eliminar la tabla plantas.
     */
    public function down(): void
    {
        Schema::dropIfExists('plantas');
    }
};
