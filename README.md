# secure-cicd-blueprints

Plantillas de GitHub Actions para calidad y un scan de secretos. Fail closed: un test rojo, un `npm audit` en high/critical o un hallazgo de Gitleaks detienen el merge. No hay aplicación de producto; solo composites, un job de ejemplo y una librería mínima para que el CI de **este** repo sea real.

## Filosofía

- **Fail closed.** Ausencia de herramienta no se traduce en un job verde silencioso salvo cuando el proyecto ni siquiera es PHP (`composer.json` ausente). Node sin tests que fallen el script es un fallo del `package.json`, no del blueprint.
- **Pin por SHA en producción.** Aquí las acciones de GitHub van por etiqueta mayor (`actions/checkout@v4`, `actions/setup-node@v4`) para que el ejemplo clone y ejecute sin mantener un SHA a mano. Un tag se mueve; el SHA de 40 caracteres no. Cuando copies el YAML, sustituye el tag por el commit publicado que hayas revisado.
- **Sin actions de terceros con permisos anchos.** El default del workflow es `permissions: contents: read`. No se pide `contents: write` ni `pull-requests: write` «por si el linter comenta». Gitleaks es la excepción documentada: es un action ajeno, se revisa, se fija SHA, y el job no le entrega más que lectura.
- **Claves fuera del YAML.** Véase [docs/politica-secretos.md](docs/politica-secretos.md).

## Contenido

| Ruta | Uso |
| --- | --- |
| `.github/actions/node-quality` | `npm ci`, `npm test`, `npm audit --audit-level=high` |
| `.github/actions/php-quality` | `composer validate`; PHPUnit si hay `vendor/bin/phpunit` |
| `.github/actions/secret-scan` | Envuelve `gitleaks/gitleaks-action@v2` |
| `workflows/secret-scan-job.yml` | El mismo scan como job para copiar |
| `.github/workflows/example-node.yml` | Blueprint reusable |
| `.github/workflows/ci.yml` | CI de este repo sobre `examples/node-app` |
| `examples/node-app` | Librería `sum` + test |

Guía de copia: [docs/como-usar.md](docs/como-usar.md).

## Licencia

MIT. Véase `LICENSE`.
