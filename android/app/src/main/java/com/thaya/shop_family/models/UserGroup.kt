package com.thaya.shop_family.models

import com.thaya.shop_family.models.User
import java.io.Serializable

data class UserGroup(
    val user: User,
    val role: String
) : Serializable
