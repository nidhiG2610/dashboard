<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\Company;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\In;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Authentication & Registration Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. You're free to explore it.
    |
    */


    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    /**
     * Create a new authentication controller instance.
     */
    public function __construct()
    {
        //$this->middleware('guest', ['except' => 'logout']);
    }

    public function showRegistrationForm(): InertiaResponse
    {
        return Inertia::render('Authentication/SignUp', [
            'title' => 'Sign Up'
        ]);
    }

    public function showLoginForm(): InertiaResponse
    {
        return Inertia::render('Authentication/SignIn', [
            'title' => 'Sign In'
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | Registration @todo fix this for failed validation
    |--------------------------------------------------------------------------
    */
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        if ($validated) {
            $user = $this->create($request->all());

            event(new Registered($user));

            if ($user) {
                return [
                    'success' => true,
                    'redirect' => route('verification.notice', ['id' => $user->id, 'hash' => sha1($user->email)])
                ];
            }
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

            // set session
            $this->setSession(Auth::user());


            // check if email is already verified, if not send email again.
            if (!Auth::user()->email_verified_at) {
                Auth::user()->sendEmailVerificationNotification();
            }

            return response()->json([
                'success' => true,
                'redirect' => $this->redirectTo
            ]);
        }

        return response()->json([
            'success' => false,
            'errors' => [
                'email' => 'The provided credentials do not match our records.',
            ]
        ]);
    }

    public function showResetPasswordForm(): InertiaResponse
    {
        return Inertia::render('Authentication/ResetPassword', [
            'title' => 'Reset Password'
        ]);
    }

    public function showForgotPasswordForm(): View
    {
        return view('auth.forgot-password');
    }

    public function RegistrationCompleted(): InertiaResponse
    {
        return Inertia::render('Authentication/RegistrationCompleted', [
            'title' => 'Registration Completed'
        ]);
    }


    public function resetPassword(Request $request)
    {
        // Handle the password reset logic here
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        return redirect(route('admin.login'));
    }

    public function showVerifyEmailPage(): InertiaResponse|RedirectResponse
    {
        if (Auth::user()->hasVerifiedEmail()) {
            return redirect()->route('details');
        }

        return Inertia::render('Authentication/VerifyEmail', [
            'title' => 'Verify Email'
        ]);
    }

    public function verifyEmail(EmailVerificationRequest $request, $id, $hash): RedirectResponse
    {
        $request->fulfill();

        return redirect()->route('details');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role_id' => Role::where('name', 'admin')->first()->id,
        ]);
    }

    public function showCompanyDetails(Request $request): InertiaResponse
    {
        return Inertia::render('Authentication/Details', [
            'title' => 'Details'
        ]);
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

        $user = User::find(Auth::id());
        try {
            $company  = new Company();
            $company->company_name = $request->input('company_name');
            $company->employees = $request->input('employees');
            $company->business_type = $request->input('business_type');
            $company->phone = $request->input('phone');
            $company->website = $request->input('website');
            $company->save();
            // attach the company to the user
            $user->companies()->attach($company->id);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to save company details.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Company details saved successfully.',
            'redirect' => route('dashboard')
        ]);
    }

    private function setSession($user)
    {
        session(['user' => $user]);
    }
}
