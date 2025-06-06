import Foundation

struct Item: Codable {
    let id: String
    let name: String
    let quantity: String
    let isPurchased: Bool
    let groupId: String
    let addedBy: String
    let createdAt: String?
}
