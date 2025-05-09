package com.thaya.shop_family.models

import com.thaya.shop_family.models.User

data class Group(
    val _id: String,
    val name: String,
    val members: List<User>,
    val createdAt: String
)
