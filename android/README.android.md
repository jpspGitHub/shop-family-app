# 📱 Shop Family App - Android Frontend

Este archivo explica cómo configurar y ejecutar la app Android nativa desarrollada en Kotlin, que forma parte del ecosistema de la app Shop Family.

---

## 🚀 Requisitos

- Android Studio Hedgehog (o superior)
- SDK mínimo: API 24+
- Kotlin DSL habilitado (gradle.kts)
- Firebase configurado
- Archivo `google-services.json`

---

## 📁 Estructura del proyecto

```
app/
├── src/main/java/com/thaya/shop_family
│   ├── ui/              # Activities principales (Login, Home)
│   ├── auth/            # Manejo de sesión y modelo de usuario
│   ├── network/         # Retrofit + servicios
│   └── ...
├── res/
│   ├── layout/          # XML de interfaces
│   ├── drawable/        # Íconos, fondos
│   └── menu/            # Archivos para la barra inferior
└── google-services.json
```
Además se incluyen los módulos `data` y `domain` para separar la capa de datos y la lógica de negocio.

---

## 🔧 Configuración inicial

1. Clonar el repositorio:
```bash
git clone https://github.com/jpspGitHub/shop-family-app.git
```

2. Abrir el proyecto en Android Studio.

3. Agregar `google-services.json` en la carpeta:
```
app/google-services.json
```

> Lo podés descargar desde [Firebase Console > Configuración del proyecto > Tu app Android]

4. Verificá que `default_web_client_id` esté generado:
```kotlin
getString(R.string.default_web_client_id)
```

5. Agregar el `SHA-1` en Firebase para que Google Sign-In funcione correctamente.
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

6. Sincronizar proyecto con Gradle.

---

## 🔐 Login con Google (Firebase)

- Se realiza en `LoginActivity`
- Usa `FirebaseAuth` y `GoogleSignInClient`
- El `idToken` se obtiene con:
```kotlin
FirebaseAuth.getInstance().currentUser?.getIdToken(true)
```
- Luego se envía al backend vía Retrofit

---

## 🧪 Pruebas

- Probá en emulador con Google Play o dispositivo real
- Verificá permisos de Internet en `AndroidManifest.xml`
- Verificá que `MainActivity` no esté configurado como `LAUNCHER`

---

## 📝 Tareas pendientes

- Mejorar interfaz para grupos e ítems

---

> Última actualización: mayo 2025
