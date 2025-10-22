<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu', function (Blueprint $table) {
            $table->id('id_menu');
            $table->string('nom_plat');
            $table->text('description')->nullable();
            $table->decimal('prix', 8, 2);
            $table->string('categorie');
            $table->string('image')->nullable();
            $table->unsignedBigInteger('id_gerant')->nullable();
            $table->boolean('disponible')->default(true);
            $table->timestamp('date_ajout')->useCurrent();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu');
    }
};
