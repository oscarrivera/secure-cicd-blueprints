# Cómo usar estos blueprints

## Composites

Están en `.github/actions/`. En un repositorio propio, copia el directorio o referencia este repo (con pin) si lo publicas como reusable.

```yaml
permissions:
  contents: read

jobs:
  node:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - uses: ./.github/actions/node-quality
        with:
          working-directory: .
```

PHP: instala el runtime **en el llamante**. Este repo no incorpora `shivammathur/setup-php` (terceros, superficie amplia). Si lo usas, fíjalo por SHA tras revisarlo y luego llama a `php-quality`.

```yaml
  php:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # setup PHP aquí, pin por SHA
      - uses: ./.github/actions/php-quality
        with:
          working-directory: .
```

## Escaneo de secretos

No hay binario de Gitleaks en el árbol. Opciones:

1. Copiar el job de `workflows/secret-scan-job.yml` a tu workflow (`gitleaks/gitleaks-action@v2`).
2. Usar el composite `.github/actions/secret-scan` pasando `github-token`.

Revisa el action de Gitleaks (código, releases, permisos). En producción sustituye `@v2` por el SHA del commit. Las organizaciones de GitHub suelen necesitar `GITLEAKS_LICENSE`.

Checkout con `fetch-depth: 0` para que el historial entre en el scan.

## Pin de acciones

Las plantillas usan etiquetas mayores (`actions/checkout@v4`) para que el ejemplo siga resolviendo. **La práctica recomendada es pin por SHA**:

```yaml
- uses: actions/checkout@<sha-completo-40-chars>
```

Consulta el SHA actual en el repo de cada action antes de pegarlo. Un tag `v4` se puede mover; un SHA no.

## Workflow de ejemplo

`.github/workflows/example-node.yml` es el blueprint (reusable + `workflow_dispatch`). `.github/workflows/ci.yml` es el que corre en cada push de **este** repositorio y ejecuta `examples/node-app`.

## App de ejemplo

`examples/node-app` es una librería mínima (`sum`) con `node:test`, para que `npm ci` / `npm test` / `npm audit` tengan un sujeto real.
