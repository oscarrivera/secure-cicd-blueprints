# Seguridad

## Secretos en Actions

No incrustes tokens en workflows. Usa `secrets.*`. El token del job debe nacer con `contents: read` salvo que un paso concreto justifique más, y entonces en ese job solamente.

## Acciones de terceros

`gitleaks/gitleaks-action` no es de GitHub. Antes de activarlo en una org: lectura del repo, revisión de releases, pin por SHA, licencia si aplica. Un action con `pull-requests: write` no entra en estas plantillas.

## Informe

Aviso privado de GitHub. Un secreto filtrado se rota; no se discute el valor en un issue.
