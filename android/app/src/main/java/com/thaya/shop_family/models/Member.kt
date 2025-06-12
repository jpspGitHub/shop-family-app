package com.thaya.shop_family.models

import java.io.Serializable

data class Member(
    val user: String,
    val role: String
) : Serializable
