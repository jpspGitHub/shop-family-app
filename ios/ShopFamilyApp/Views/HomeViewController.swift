import UIKit

class HomeViewController: UIViewController {

    private var user: User?

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        title = "Home"
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Logout", style: .plain, target: self, action: #selector(logoutTapped))
        fetchProfile()
    }

    private func fetchProfile() {
        APIClient.shared.getUserProfile { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let user):
                    self.user = user
                    self.showUser()
                case .failure:
                    break
                }
            }
        }
    }

    private func showUser() {
        guard let user = user else { return }
        let label = UILabel()
        label.text = "\(user.name) - \(user.email)"
        label.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(label)
        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func logoutTapped() {
        APIClient.shared.logout { success in
            DispatchQueue.main.async {
                if success {
                    SessionManager.shared.clearAuthToken()
                    self.navigationController?.setViewControllers([LoginViewController()], animated: true)
                }
            }
        }
    }
}
