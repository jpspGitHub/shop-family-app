import Foundation

final class APIClient {
    static let shared = APIClient()
    private let baseURL = URL(string: "http://localhost:5001/api/")!
    private var session: URLSession { .shared }

    var authToken: String? {
        SessionManager.shared.fetchAuthToken()
    }

    private func makeRequest(path: String, method: String = "GET", body: Data? = nil) -> URLRequest {
        var request = URLRequest(url: baseURL.appendingPathComponent(path))
        request.httpMethod = method
        if let token = authToken {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        if let body = body {
            request.httpBody = body
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        }
        return request
    }

    func login(googleToken: String, completion: @escaping (Result<UserProfile, Error>) -> Void) {
        let requestBody = ["token": googleToken]
        let bodyData = try? JSONSerialization.data(withJSONObject: requestBody)
        let request = makeRequest(path: "auth/login", method: "POST", body: bodyData)

        session.dataTask(with: request) { data, response, error in
            if let error = error {
                return completion(.failure(error))
            }
            guard let data = data else {
                return completion(.failure(NSError(domain: "io.shopfamily", code: -1)))
            }
            do {
                let profile = try JSONDecoder().decode(UserProfile.self, from: data)
                completion(.success(profile))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }

    func getUserProfile(completion: @escaping (Result<User, Error>) -> Void) {
        let request = makeRequest(path: "users/me")
        session.dataTask(with: request) { data, response, error in
            if let error = error {
                return completion(.failure(error))
            }
            guard let data = data else {
                return completion(.failure(NSError(domain: "io.shopfamily", code: -1)))
            }
            do {
                let user = try JSONDecoder().decode(User.self, from: data)
                completion(.success(user))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }

    func logout(completion: @escaping (Bool) -> Void) {
        let request = makeRequest(path: "auth/logout", method: "POST")
        session.dataTask(with: request) { _, response, _ in
            if let http = response as? HTTPURLResponse, http.statusCode == 200 {
                completion(true)
            } else {
                completion(false)
            }
        }.resume()
    }
}
