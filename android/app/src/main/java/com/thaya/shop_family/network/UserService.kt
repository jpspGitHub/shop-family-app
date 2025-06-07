package com.thaya.shop_family.network

import com.thaya.shop_family.models.User
import retrofit2.Response
//import com.thaya.shop_family.models.UserProfile
import retrofit2.http.GET

interface UserService {
    @GET("users/me")
    suspend fun getUserProfile(): Response<User>
}
