package com.thaya.shop_family.ui.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider
import com.thaya.shop_family.BuildConfig
import com.thaya.shop_family.R
import com.thaya.shop_family.databinding.FragmentLoginBinding
import com.thaya.shop_family.network.GoogleTokenRequest
import com.thaya.shop_family.network.RetrofitClient
import com.thaya.shop_family.session.UserSession
import com.thaya.shop_family.utils.SessionManager
import com.thaya.shop_family.data.AppDatabase
import com.thaya.shop_family.data.UserProfileEntity
import kotlinx.coroutines.launch

class LoginFragment : Fragment() {

    private var _binding: FragmentLoginBinding? = null
    private val binding get() = _binding!!

    private lateinit var googleSignInClient: GoogleSignInClient
    private lateinit var firebaseAuth: FirebaseAuth
    private lateinit var sessionManager: SessionManager

    private val launcher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
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

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentLoginBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        sessionManager = SessionManager(requireContext())
        firebaseAuth = FirebaseAuth.getInstance()

        if (sessionManager.fetchAuthToken() != null) {
            if(findNavController().currentDestination?.id != R.id.homeFragment){
                findNavController().navigate(R.id.action_loginFragment_to_homeFragment)
            }
        }

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(BuildConfig.GOOGLE_CLIENT_ID)
            //.requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .build()

        googleSignInClient = GoogleSignIn.getClient(requireContext(), gso)

        binding.googleSignInButton.setOnClickListener {
            launcher.launch(googleSignInClient.signInIntent)
        }
    }

    private fun firebaseAuthWithGoogle(account: GoogleSignInAccount) {
        val credential = GoogleAuthProvider.getCredential(account.idToken, null)
        firebaseAuth.signInWithCredential(credential)
            .addOnCompleteListener(requireActivity()) { task ->
                if (task.isSuccessful) {
                    handleSuccessLogin()
                } else {
                    showErrorDialog("Error de autenticación con Firebase.")
                }
            }
    }

    private fun handleSuccessLogin() {
        FirebaseAuth.getInstance().currentUser?.getIdToken(true)
            ?.addOnSuccessListener { result ->
                val firebaseIdToken = result.token
                lifecycleScope.launch {
                    sendTokenToBackend(firebaseIdToken)
                    sessionManager.saveAuthToken(UserSession.jwtToken.orEmpty())
                    findNavController().navigate(R.id.action_loginFragment_to_homeFragment)
                }
            }
            ?.addOnFailureListener {
                Log.e("ID_TOKEN", "Error al obtener token", it)
            }
    }

    private suspend fun sendTokenToBackend(token: String?) {
        try {
            val request = GoogleTokenRequest(token.orEmpty())
            val response = RetrofitClient.authService.login(request)
            if(response.isSuccessful) {
                val profile = response.body();
                val user = profile?.user;
                UserSession.jwtToken = profile?.token
                UserSession.userId = user?._id
                val db = AppDatabase.get(requireContext())
                db.userProfileDao().saveProfile(
                    UserProfileEntity(
                        id = user?._id ?: "0",
                        name = user?.name.toString(),
                        email = user?.email.toString(),
                        avatar = user?.avatar
                    )
                )
            } else {
                showErrorDialog("Error de autenticación")
            }

        } catch (e: Exception) {
            Log.e("BACKEND", "Error en login", e)
            showErrorDialog("Error de autenticación")
        }
    }

    private fun showErrorDialog(message: String) {
        AlertDialog.Builder(requireContext())
            .setTitle("Error")
            .setMessage(message)
            .setPositiveButton("OK", null)
            .show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
