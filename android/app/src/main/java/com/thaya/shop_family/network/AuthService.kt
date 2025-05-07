package com.thaya.shop_family.network

import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

data class GoogleTokenRequest(val token: String)

data class AuthResponse(
    val token: String,
    val user: UserDto
)

data class UserDto(
    val name: String,
    val email: String,
    val avatar: String?
)

interface AuthService {
    @POST("auth/google-login")
    fun loginWithGoogle(@Body request: GoogleTokenRequest): Call<AuthResponse>
}
