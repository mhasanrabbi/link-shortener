<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $input = $request->validated();

        $user = User::create([
            'name' => Arr::get($input, 'name'),
            'email' => Arr::get($input, 'email'),
            'password' => Hash::make(Arr::get($input, 'password')),
        ]);

        return response()->json([
            'success' => true,
            'data' => new AuthResource($user),
            'message' => 'Registered successfully!',
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $input = $request->validated();
        $user = User::where('email', $input['email'])->first();

        if (empty($user)) {
            $response = [
                'success' => false,
                'message' => 'User not found!'
            ];

            return response()->json($response);
        }

        if(Hash::check($input['password'], $user->password)){
            $response = [
                'success' => true,
                'data' => new AuthResource($user),
                'message' => 'Login successfully!'
            ];

            return response()->json($response, 200);
        } else {
            throw ValidationException::withMessages([
                'error' => 'Wrong email or password!'
            ]);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => __('Logged out successfully')
        ], 200);
    }
}
