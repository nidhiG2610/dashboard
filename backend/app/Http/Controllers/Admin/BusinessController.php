<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class BusinessController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Business',
            [
                'title' => 'Business',
                'user' => Auth::user()
            ]
        );
    }
}
