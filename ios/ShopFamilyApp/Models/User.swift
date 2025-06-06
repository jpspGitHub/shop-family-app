import Foundation

struct User: Codable {
    let id: String
    let name: String
    let email: String
    let googleId: String?
    let avatar: String?
    let phone: String?
    let locale: String?
    let timezone: String?
    let lastLogin: String?
    let lastLogout: String?
    let active: Bool
    let createdAt: String?
}
