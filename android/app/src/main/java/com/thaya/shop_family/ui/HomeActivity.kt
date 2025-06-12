package com.thaya.shop_family.ui

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.google.firebase.auth.FirebaseAuth
import com.thaya.shop_family.R
import com.thaya.shop_family.auth.AuthManager
import com.thaya.shop_family.databinding.ActivityHomeBinding
import com.thaya.shop_family.network.RetrofitClient
import retrofit2.Call
import android.util.Log
import android.widget.Toast
import com.thaya.shop_family.models.User
import com.thaya.shop_family.network.UserProfile
//import com.thaya.shop_family.models.UserProfile
import com.thaya.shop_family.session.UserSession
import com.thaya.shop_family.utils.SessionManager
import retrofit2.Callback
import retrofit2.Response
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch



class HomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityHomeBinding
    private val auth = FirebaseAuth.getInstance()
    private lateinit var sessionManager: SessionManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)


        sessionManager = SessionManager(this)

        if (sessionManager.fetchAuthToken() == null) {
            navigateToLogin()
        } else {
            UserSession.jwtToken = sessionManager.fetchAuthToken()
        }
        // Verificar si el usuario ya está autenticado
//        if (UserSession.jwtToken != null) {
//            fetchUserProfile()
//        } else {
//            Toast.makeText(this, "Usuario no autenticado", Toast.LENGTH_SHORT).show()
//        }
        val session = AuthManager.getUserSession()

        binding.userNameTextView.text = session?.name
        binding.userEmailTextView.text = session?.email

        Glide.with(this)
            .load(session?.photoUrl)
            .circleCrop()
            .into(binding.userAvatarImageView)

        binding.bottomNav.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_logout -> {
                    logout();
                    true
                }
                else -> true // Dummy items
            }
        }
    }

    private fun logout() {
        val token = sessionManager.fetchAuthToken()
        if (token != null) {
            lifecycleScope.launch {
                try {
                    val response = RetrofitClient.authService.logout("Bearer $token")
                    if (response.isSuccessful) {
                        auth.signOut()
                        sessionManager.clearAuthToken()
                        navigateToLogin()
                    } else {
                        Toast.makeText(this@HomeActivity, "Error al cerrar sesión", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@HomeActivity, "Fallo en la red", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun navigateToLogin() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun fetchUserProfile() {
        lifecycleScope.launch {
            try {
                val response = RetrofitClient.userService.getUserProfile()
                if (response.isSuccessful) {
                    val userProfile = response.body()
                    userProfile?.let {
                        binding.userNameTextView.text = it.name
                        binding.userEmailTextView.text = it.email
                        Glide.with(this@HomeActivity)
                            .load(it.avatar)
                            .into(binding.userAvatarImageView)
                        Log.d("Profile", "Usuario: ${it.name}")
                    }
                } else {
                    Log.e("Profile", "Error: ${response.errorBody()?.string()}")
                    Toast.makeText(this@HomeActivity, "Error al obtener perfil", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                Log.e("Profile", "Fallo la llamada: ${e.message}")
                Toast.makeText(this@HomeActivity, "Error de red", Toast.LENGTH_SHORT).show()
            }
        }
    }

}
