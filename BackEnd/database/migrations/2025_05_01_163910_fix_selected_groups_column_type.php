<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixSelectedGroupsColumnType extends Migration
{
    public function up()
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->json('selectedGroups')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->longText('selectedGroups')->nullable()->change();
        });
    }
}
