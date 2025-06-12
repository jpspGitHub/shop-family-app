package com.thaya.shop_family.models

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class User(
    @SerializedName("_id") val id: String,
    val name: String,
    val email: String,
    val googleId: String,
    val avatar: String,
    val phone: String,
    val locale: String,
    val timezone: String,
    val lastLogin: String,
    val lastLogout: String,
    val active: Boolean,
    val createdAt: String
) : Serializable
