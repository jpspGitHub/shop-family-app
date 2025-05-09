package com.thaya.shop_family.auth

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.thaya.shop_family.session.UserSession

object AuthManager {
    private val auth: FirebaseAuth = FirebaseAuth.getInstance()

    val currentUser: FirebaseUser?
        get() = auth.currentUser

    fun signOut() {
        auth.signOut()
    }

    fun getUserSession(): UserSession? {
        val user = auth.currentUser ?: return null

        UserSession.name = user.displayName ?: "Sin nombre";
        UserSession.email = user.email ?: "Sin email";
        UserSession.photoUrl = user.photoUrl?.toString();
        return UserSession;
    }
}
