<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ressource extends Model
{
   protected $fillable = [
    'file',
    'type',
    'title',
   ];
}
