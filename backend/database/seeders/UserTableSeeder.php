<?php

namespace Database\Seeders;

use App\Models\User;
use App\Contracts\HasTable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder implements HasTable
{
    public function getTableName(): string
    {
        return 'users';
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(5)->create();
    }
}
