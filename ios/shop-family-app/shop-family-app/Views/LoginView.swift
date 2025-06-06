import SwiftUI
import FirebaseAuth

struct LoginView: View {
    @State private var isLoading = false
    @State private var showError = false
    @State private var navigate = false

    var body: some View {
        VStack {
            Spacer()
            Button("Sign in with Google") {
                signInTapped()
            }
            .disabled(isLoading)
            Spacer()
            NavigationLink("", destination: HomeView(), isActive: $navigate)
                .hidden()
        }
        .alert("Error", isPresented: $showError) {
            Button("OK", role: .cancel) { }
        } message: {
            Text("No se pudo iniciar sesión")
        }
    }

    private func signInTapped() {
        // TODO: Implement Google Sign-In using FirebaseAuth
        // On success, obtain idToken and call sendTokenToBackend(idToken)
    }

    private func sendTokenToBackend(_ idToken: String) {
        isLoading = true
        APIClient.shared.login(googleToken: idToken) { result in
            DispatchQueue.main.async {
                isLoading = false
                switch result {
                case .success(let profile):
                    SessionManager.shared.saveAuthToken(profile.token)
                    navigate = true
                case .failure:
                    showError = true
                }
            }
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView { LoginView() }
    }
}
