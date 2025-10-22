<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('point_fidelites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('points_gagnes')->default(0);
            $table->integer('points_utilises')->default(0);
            $table->string('source')->nullable(); // 'commande', 'parrainage', 'bonus'
            $table->foreignId('commande_id')->nullable()->constrained()->onDelete('set null');
            $table->text('description')->nullable();
            $table->date('date_expiration')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('point_fidelites');
    }
};
