package com.thaya.shop_family.network

// import com.thaya.shop_family.models.UserProfile
import com.thaya.shop_family.models.User
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

data class UserProfile(
    val token: String,
    val user: User
)

data class GoogleTokenRequest(val token: String)

interface AuthService {
    @POST("auth/login")
    suspend fun login(@Body request: GoogleTokenRequest): UserProfile

    @POST("auth/logout")
    suspend fun logout(@Header("Authorization") token: String)
}
