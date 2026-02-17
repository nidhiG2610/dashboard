<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register'])->name('api.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.login');



// Protected routes
Route::middleware('auth:api')->group(function () {
    // Route::get('/user', [AuthController::class, 'user']);
    // Route::post('/logout', [AuthController::class, 'logout']);
});

