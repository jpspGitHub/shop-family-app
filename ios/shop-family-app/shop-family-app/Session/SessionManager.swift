import Foundation

final class SessionManager {
    static let shared = SessionManager()
    private let defaults = UserDefaults.standard
    private let tokenKey = "user_token"

    func saveAuthToken(_ token: String) {
        defaults.set(token, forKey: tokenKey)
    }

    func fetchAuthToken() -> String? {
        defaults.string(forKey: tokenKey)
    }

    func clearAuthToken() {
        defaults.removeObject(forKey: tokenKey)
    }
}
