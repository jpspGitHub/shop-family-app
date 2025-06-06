import SwiftUI

struct HomeView: View {
    @State private var user: User?

    var body: some View {
        VStack {
            if let user = user {
                Text("\(user.name) - \(user.email)")
                    .padding()
            } else {
                ProgressView()
            }
        }
        .navigationTitle("Home")
        .toolbar {
            Button("Logout") {
                logoutTapped()
            }
        }
        .onAppear(perform: fetchProfile)
    }

    private func fetchProfile() {
        APIClient.shared.getUserProfile { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let user):
                    self.user = user
                case .failure:
                    break
                }
            }
        }
    }

    private func logoutTapped() {
        APIClient.shared.logout { success in
            DispatchQueue.main.async {
                if success {
                    SessionManager.shared.clearAuthToken()
                    user = nil
                }
            }
        }
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView { HomeView() }
    }
}
