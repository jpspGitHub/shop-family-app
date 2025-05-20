package com.thaya.shop_family.models

import com.thaya.shop_family.models.User

data class UserGroup(
    val user: User,
    val role: String
)
