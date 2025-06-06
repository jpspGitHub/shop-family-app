# 📱 Shop Family App - iOS Frontend

Esta carpeta contiene una implementación inicial de la aplicación iOS escrita en **Swift**. Tiene como objetivo replicar la funcionalidad básica de la app Android: autenticación con Google, manejo de sesión, obtención del perfil del usuario y navegación sencilla.

## 🚀 Requisitos
- Xcode 15 o superior
- iOS 15+
- Swift Package Manager
- Firebase configurado y archivo `GoogleService-Info.plist`

## 📁 Estructura del proyecto
```
ShopFamilyApp/
├── Models/           # Modelos de datos (User, Group, Item)
├── Network/          # Lógica de red y servicios
├── Session/          # Gestión de tokens con UserDefaults
└── Views/            # ViewControllers principales
```

## 🔧 Configuración inicial
1. Abrir la carpeta `ios` en Xcode y crear un nuevo proyecto **App** llamado `ShopFamilyApp`.
2. Copiar las carpetas `Models`, `Network`, `Session` y `Views` dentro del proyecto.
3. Agregar `GoogleService-Info.plist` (descargado de Firebase) al proyecto.
4. Instalar Firebase mediante Swift Package Manager (`https://github.com/firebase/firebase-ios-sdk`).
5. Construir y ejecutar en un simulador o dispositivo real.

> Este proyecto es solo una base de referencia y deberá completarse según las necesidades de la app.

