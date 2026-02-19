<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin;
use App\Http\Controllers\Setup\SetupController;

Route::middleware(['web'])->group(function(){
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('admin.login');

    Route::prefix('admin')->group(function () {
        Route::get('/signup', [AuthController::class, 'showRegistrationForm'])->name('admin.signup');
        Route::get('/reset-password', [AuthController::class, 'showResetPasswordForm'])->name('admin.reset-password');
        Route::post('/login', [AuthController::class, 'login'])->name('admin.save-login');
        Route::post('/signup', [AuthController::class, 'register'])->name('admin.register');
    }); 

    Route::middleware(['auth' , 'role:admin'])->group(function(){ 
        Route::get('email/verify', [AuthController::class, 'showVerifyEmailPage'])->name('verification.notice');
        Route::get('email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify')->middleware(('signed'));
        // @to do resend verification
        // Route::post('/email/verification-notification', function (Request $request) {
        // $request->user()->sendEmailVerificationNotification();
        
        //     return back()->with('message', 'Verification link sent!');
        // })->middleware(['auth', 'throttle:6,1'])->name('verification.send');
        Route::middleware('verified')->group(function(){
            Route::get('/details', [AuthController::class, 'showCompanyDetails'])->name('details');
            Route::post('/setup',[SetupController::class, 'runCommand'])->name('setup');

            Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
            Route::get('/business', [Admin\BusinessController::class, 'index'])->name('business');
            Route::get('/tasks', [Admin\TasksController::class, 'index'])->name('tasks');
            Route::get('/notes', [Admin\NotesController::class, 'index'])->name('notes');
            Route::get('/calendar', [Admin\CalendarController::class, 'index'])->name('calendar');
            Route::get('/messages', [Admin\MessagesController::class, 'index'])->name('messages');
            Route::get('/files', [Admin\FilesController::class, 'index'])->name('files');
            Route::get('/user', [AuthController::class, 'user'])->name('user');
            Route::get('help', [Admin\HelpController::class, 'index'])->name('help');
        });
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/registration-completed', [AuthController::class, 'RegistrationCompleted'])->name('registration-completed');
        Route::post('/save-company-details', [AuthController::class, 'saveCompanyDetails'])->name('save-company-details');
    });
});