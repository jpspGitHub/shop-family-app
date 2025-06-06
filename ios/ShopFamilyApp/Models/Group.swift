import Foundation

struct Group: Codable {
    let id: String
    let name: String
    let members: [User]
    let createdAt: String?
}
