package com.thaya.shop_family.models

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Group(
    @SerializedName("_id") val id: String,
    val name: String,
    val members: List<Member>,
    val createdAt: String
) : Serializable
