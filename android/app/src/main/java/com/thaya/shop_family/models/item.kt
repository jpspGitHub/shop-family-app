package com.thaya.shop_family.models

import java.io.Serializable

data class Item(
    val _id: String,
    val name: String,
    val quantity: String,
    val isPurchased: Boolean,
    val groupId: String,
    val addedBy: String,
    val createdAt: String
) : Serializable
