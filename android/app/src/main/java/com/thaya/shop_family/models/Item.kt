package com.thaya.shop_family.models

import com.google.gson.annotations.SerializedName
import java.io.Serializable

data class Item(
    @SerializedName("_id") val id: String,
    val name: String,
    val quantity: String,
    val isPurchased: Boolean,
    val groupId: String,
    val addedBy: String,
    val createdAt: String
) : Serializable
