package com.thaya.shop_family.network

import com.thaya.shop_family.models.User
//import com.thaya.shop_family.models.UserProfile
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET

interface UserService {
    @GET("users/me")
    fun getUserProfile(): Call<User>
}
