package com.thaya.shop_family.network

import com.thaya.shop_family.session.UserSession
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2:5001/api/"

    private val authInterceptor = Interceptor { chain ->
        val builder = chain.request().newBuilder()
        UserSession.jwtToken?.let { token ->
            builder.addHeader("Authorization", "Bearer $token")
        }
        chain.proceed(builder.build())
    }

    private val client = OkHttpClient.Builder()
        .addInterceptor(authInterceptor)
        .build()

    val authService: AuthService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(AuthService::class.java)
    }

    private fun authRetrofit(): Retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(client)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val userService: UserService by lazy {
        authRetrofit().create(UserService::class.java)
    }

    val groupService: GroupService by lazy {
        authRetrofit().create(GroupService::class.java)
    }

    val itemService: ItemService by lazy {
        authRetrofit().create(ItemService::class.java)
    }


}
