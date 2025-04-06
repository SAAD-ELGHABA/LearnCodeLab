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
        // Schema::create('collections', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('title');
        //     $table->text('question');
        //     $table->text('description');
        //     $table->text('code');
        //     $table->string('language'); 
        //     $table->string('id_user'); 
        //     $table->timestamps(); 
        // });
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('question');
            $table->text('description');
            $table->text('code');
            $table->string('language'); 
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->timestamps(); 
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collections');
    }
};
