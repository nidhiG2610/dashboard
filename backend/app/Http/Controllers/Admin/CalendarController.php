<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CalendarController extends Controller
{
    public function index()
    {
        return Inertia::render('Calendar',
            [
                'title' => 'Calendar',
                'user' => Auth::user()
            ]
        );
    }
}
