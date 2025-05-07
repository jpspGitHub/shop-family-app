package com.thaya.shop_family.auth

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser

object AuthManager {
    private val auth: FirebaseAuth = FirebaseAuth.getInstance()

    val currentUser: FirebaseUser?
        get() = auth.currentUser

    fun signOut() {
        auth.signOut()
    }

    fun getUserSession(): UserSession? {
        val user = auth.currentUser ?: return null
        return UserSession(
            name = user.displayName ?: "Sin nombre",
            email = user.email ?: "Sin email",
            photoUrl = user.photoUrl?.toString()
        )
    }
}
