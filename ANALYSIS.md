# Análisis del Proyecto Android

Después de revisar el código Kotlin del directorio `android`, se identificaron las siguientes observaciones de posibles **bugs** y **mejoras**:

## Posibles Bugs
1. **Nullability en `RetrofitClient`**: el encabezado `Authorization` siempre se agrega aunque `UserSession.jwtToken` sea `null`, lo que podría enviar `"Bearer null"` en algunas llamadas.
2. **Manejo de errores limitado** en `LoginActivity` y `HomeActivity` al realizar llamadas de red. En algunos casos sólo se muestra un `Toast` sin registrar detalles de la respuesta.
3. **Validación de sesión incompleta**: al iniciar `HomeActivity` sólo se verifica que exista un token en `SharedPreferences`, pero no se comprueba su expiración.
4. **Dependencia de Firebase**: si el usuario revoca el acceso desde Google, la app no maneja adecuadamente el cierre de sesión remoto.

### Propuestas de solución
1. **Encabezado condicional**: agregar el token de sesión sólo cuando exista para evitar cadenas nulas.
2. **Manejo de errores con `try/catch` y logs** usando corrutinas para capturar excepciones.
3. **Verificar expiración del token** decodificando el JWT o consultando al backend antes de permitir el acceso.
4. **Desvincular la sesión de Firebase** al detectar códigos 401 provenientes del backend y forzar un `signOut()`.

## Mejoras Sugeridas
1. **Usar corrutinas y Retrofit con `suspend`** para simplificar el manejo asíncrono y poder utilizar `try/catch`.
2. **Implementar Jetpack Navigation** para una navegación más limpia entre pantallas.
3. **Persistir el perfil del usuario** en una base de datos local (Room) para acceso offline.
4. **Cobertura de pruebas**: sólo existe un test de ejemplo. Se recomienda agregar pruebas de ViewModel o de integración de servicios.
5. **Modularizar** el proyecto separando capas (data, domain, presentation) para facilitar el mantenimiento.

---

# Proyecto iOS en Swift

En el directorio `ios/ShopFamilyApp` se incluye una estructura básica en Swift que replica la lógica principal del proyecto Android:
- **Autenticación** con Google (placeholder con FirebaseAuth).
- **Gestión de sesión** mediante `UserDefaults` (`SessionManager`).
- **Servicios de red** (`APIClient`) que consumen las mismas rutas del backend.
- **Pantallas de Login y Home** (`LoginViewController` y `HomeViewController`).

Para usar este código se debe crear un proyecto Xcode y copiar estas carpetas, siguiendo las instrucciones del archivo `ios/README.ios.md`.
