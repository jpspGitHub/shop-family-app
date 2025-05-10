package com.thaya.shop_family.ui

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider
import com.thaya.shop_family.R
import com.thaya.shop_family.databinding.ActivityLoginBinding
//import com.thaya.shop_family.models.UserProfile
import com.thaya.shop_family.network.GoogleTokenRequest
import com.thaya.shop_family.network.RetrofitClient
import com.thaya.shop_family.network.UserProfile
import com.thaya.shop_family.session.UserSession
import com.thaya.shop_family.utils.SessionManager
import retrofit2.Call


class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var googleSignInClient: GoogleSignInClient
    private lateinit var firebaseAuth: FirebaseAuth
    private lateinit var sessionManager: SessionManager

    private val launcher = registerForActivityResult(
        androidx.activity.result.contract.ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val task = GoogleSignIn.getSignedInAccountFromIntent(result.data)
        try {
            val account = task.getResult(Exception::class.java)
            firebaseAuthWithGoogle(account)
        } catch (e: Exception) {
            showErrorDialog("No se pudo iniciar sesión. Intenta nuevamente.")
            Log.e("AUTH", "Sign-in failed", e)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        sessionManager = SessionManager(this)
        firebaseAuth = FirebaseAuth.getInstance()

        // Si ya hay un token, navegar al Home directamente
        if (sessionManager.fetchAuthToken() != null) {
            navigateToHome()
        }

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        binding.googleSignInButton.setOnClickListener {
            val signInIntent = googleSignInClient.signInIntent
            launcher.launch(signInIntent)
        }
    }

    private fun navigateToHome() {
        val intent = Intent(this, HomeActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun firebaseAuthWithGoogle(account: GoogleSignInAccount) {
        val credential = GoogleAuthProvider.getCredential(account.idToken, null)
        firebaseAuth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    handlingSuccessLogIn();
                } else {
                    showErrorDialog("Error de autenticación con Firebase.")
                }
            }
    }

    private fun handlingSuccessLogIn(){
        FirebaseAuth.getInstance().currentUser?.getIdToken(true)
            ?.addOnSuccessListener { result ->
                val firebaseIdToken = result.token
                Log.d("ID_TOKEN", "Firebase token: $firebaseIdToken")

                sendTokenToBackend(
                    firebaseIdToken,
                    onSuccess = {
                        navigateToHome()
                        if (UserSession.jwtToken != null) {
                            sessionManager.saveAuthToken(UserSession.jwtToken.toString())
                        }

                    },
                    onFailure = {
                        showErrorDialog("Error de autenticación con Firebase.")

                    }
                )
            }
            ?.addOnFailureListener {
                Log.e("ID_TOKEN", "Error al obtener token", it)
            }
    }

    private fun sendTokenToBackend(token: String?, onSuccess: () -> Unit, onFailure: () -> Unit) {
        val request = GoogleTokenRequest(token.orEmpty())
        val call = RetrofitClient.authService.loginWithGoogle(request)

        call.enqueue(object : retrofit2.Callback<UserProfile> {
            override fun onResponse(call: Call<UserProfile>, response: retrofit2.Response<UserProfile>) {
                if (response.isSuccessful) {
                    val result = response.body()
                    Log.i("BACKEND", "Token backend: ${result?.token}")
                    Log.i("BACKEND", "Usuario: ${result?.user?.name}, ${result?.user?.email}")
                    UserSession.jwtToken = result?.token;
                    UserSession.userId = result?.user?._id;
                    onSuccess();
                } else {
                    Log.e("BACKEND", "Error en respuesta: ${response.code()}")
                    onFailure();
                }
            }

            override fun onFailure(call: Call<UserProfile>, t: Throwable) {
                Log.e("BACKEND", "Error al conectar", t)
                onFailure();
            }
        })
    }

    private fun showErrorDialog(message: String) {
        AlertDialog.Builder(this)
            .setTitle("Error")
            .setMessage(message)
            .setPositiveButton("OK", null)
            .show()
    }
}
