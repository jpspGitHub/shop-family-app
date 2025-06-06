import UIKit
import FirebaseAuth

class LoginViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground
        setupGoogleButton()
    }

    private func setupGoogleButton() {
        let button = UIButton(type: .system)
        button.setTitle("Sign in with Google", for: .normal)
        button.addTarget(self, action: #selector(signInTapped), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(button)
        NSLayoutConstraint.activate([
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            button.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func signInTapped() {
        // TODO: Implement Google Sign-In flow using FirebaseAuth
        // On success, obtain idToken and send to backend
    }

    private func sendTokenToBackend(_ idToken: String) {
        APIClient.shared.login(googleToken: idToken) { result in
            DispatchQueue.main.async {
                switch result {
                case .success(let profile):
                    SessionManager.shared.saveAuthToken(profile.token)
                    self.navigateToHome()
                case .failure:
                    self.showError()
                }
            }
        }
    }

    private func navigateToHome() {
        let vc = HomeViewController()
        navigationController?.setViewControllers([vc], animated: true)
    }

    private func showError() {
        let alert = UIAlertController(title: "Error", message: "No se pudo iniciar sesión", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}
