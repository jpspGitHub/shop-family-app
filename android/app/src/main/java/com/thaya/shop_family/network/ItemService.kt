package com.thaya.shop_family.network

import com.thaya.shop_family.models.Item
import retrofit2.Response
import retrofit2.http.*

interface ItemService {
    @GET("items/{groupId}")
    suspend fun getItems(@Path("groupId") groupId: String): Response<List<Item>>

    @POST("items")
    suspend fun addItem(@Body body: Map<String, String>): Response<Item>

    @DELETE("items/{itemId}")
    suspend fun deleteItem(@Path("itemId") itemId: String): Response<Void>
}
