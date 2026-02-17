<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Inertia\Response as InertiaResponse;
use Inertia\Inertia;
use App\Models\Company;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $request = $request->validated();
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $token = $user->createToken('auth_token')->accessToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function signin(): InertiaResponse
    {
        return Inertia::render('Authentication/SignIn' , [
            'title' => 'Sign In'
        ]);
    }

    public function signUp(): InertiaResponse
    {
        return Inertia::render('Authentication/SignUp' , [
            'title' => 'Sign Up'
        ]);
    }

    public function resetPassword(): InertiaResponse
    {
        return Inertia::render('Authentication/ResetPassword' , [
            'title' => 'Reset Password'
        ]);
    }

    public function login(LoginRequest $request)
    {
        $requestData = $request->validated();

        $user = User::where('email', $requestData['email'])->first();
        if(\Auth::attempt($requestData)){
            $this->setSession($user);
            return redirect()->route('dashboard');
        }
       
        return redirect()->back()->withErrors([
            'email' => 'The provided credentials are incorrect.',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function saveCompanyDetails(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'employees' => 'required|integer',
            'business_type' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'website' => 'required|url|max:255',
        ]);

        // Save the company details to the database or perform any other necessary actions
        try {
            $company  = new Company();
            $company->company_name = $request->input('company_name');
            $company->employees = $request->input('employees');
            $company->business_type = $request->input('business_type');
            $company->phone = $request->input('phone');
            $company->website = $request->input('website');
            $company->save();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to save company details.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Company details saved successfully.',
        ]);
    }

    private function setSession($user){
        session(['user' => $user]);
    }
}