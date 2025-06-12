package com.thaya.shop_family.network

import com.thaya.shop_family.models.Group
import retrofit2.Response
import retrofit2.http.*

interface GroupService {
    @GET("groups")
    suspend fun getGroups(): Response<List<Group>>

    @POST("groups/{groupId}/add-member")
    suspend fun addMember(
        @Path("groupId") groupId: String,
        @Body body: Map<String, String>
    ): Response<Group>

    @DELETE("groups/{id}")
    suspend fun deleteGroup(@Path("id") id: String): Response<Void>
}
