package com.thaya.shop_family.models

import com.thaya.shop_family.models.UserGroup

data class Group(
    val _id: String,
    val name: String,
    val members: List<UserGroup>,
    val createdAt: String
)
