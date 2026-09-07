# Política de secretos

## Qué cuenta como secreto

Claves de API, tokens de CI, cadenas de conexión, certificados privados, `SERVICE_API_KEY`, licencias de herramientas de escaneo. Un valor en `.env.example` vacío no es un secreto; el mismo nombre con valor en un log de Actions sí lo es.

## Dónde viven

- GitHub Actions: `secrets` del repositorio o de la organización. Nunca `env:` con el valor en claro en el YAML.
- Local: gestor de secretos o `.env` ignorado. El ejemplo versionado no lleva valores.
- Prohibido: issues, wikis, artefactos de test, capturas, ramas de fork con `--include-secrets`.

## Rotación

Si un secreto aparece en git, se considera comprometido: rotar, invalidar el commit en el historial (filter o `git revert` no basta si el objeto sigue alcanzable), avisar a quien dependa de él.

## Escaneo

El job de Gitleaks (plantilla en `workflows/secret-scan-job.yml`) es un control de regresión, no una autorización para pegar secretos «un momento». Fail closed: un hallazgo bloquea el merge.

## Permisos

El token del job usa `contents: read` por defecto. No concedas `write` a un action de terceros para «que el scan funcione».
