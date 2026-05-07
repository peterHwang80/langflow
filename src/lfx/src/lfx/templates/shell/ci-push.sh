#!/usr/bin/env bash
# ci-push.sh
#
# PURPOSE
#   Push (upsert) Langflow flow JSON files to a remote Langflow instance
#   using `lfx push`.  Stable flow IDs mean re-running always converges.
#
# USAGE
#   chmod +x ci-push.sh
#   export IDRFLOW_URL=https://staging.langflow.example.com
#   export IDRFLOW_API_KEY=<your-api-key>
#   ./ci-push.sh
#
# ENVIRONMENT VARIABLES — connection (pick one approach)
#
#   Approach A: direct URL + key (simplest)
#     IDRFLOW_URL        URL of the target Langflow instance.
#     IDRFLOW_API_KEY    API key for that instance.
#
#   Approach B: named environment from a discovered config
#     IDRFLOW_ENV                 Name of the environment block.
#                                  e.g. staging  or  production
#     IDRFLOW_ENVIRONMENTS_FILE   Optional explicit path to the environments config.
#                                  If unset, lfx/langflow-sdk auto-discovers:
#                                  .lfx/environments.yaml, idrflow-environments.toml,
#                                  then ~/.config/idrflow/environments.toml.
#     <api_key_env var>            The env var named in api_key_env inside the
#                                  config block.  Must be exported separately.
#
#   The TOML format:
#
#     [environments.staging]
#     url         = "https://staging.langflow.example.com"
#     api_key_env  = "IDRFLOW_STAGING_API_KEY"
#
#     [environments.production]
#     url         = "https://langflow.example.com"
#     api_key_env  = "IDRFLOW_PROD_API_KEY"
#
# ENVIRONMENT VARIABLES — behaviour
#   FLOWS_DIR            Directory containing flow JSON files.
#                        Default: flows/
#   IDRFLOW_PROJECT     Project (folder) name on the remote instance.
#                        Default: (no project — flows go to the default folder)
#   IDRFLOW_PROJECT_ID  Project UUID.  Takes precedence over IDRFLOW_PROJECT.
#   DRY_RUN              Set to "true" to show what would be pushed without
#                        making any changes.  Default: false
#   LFX_VERSION          lfx PEP 508 version specifier suffix appended directly
#                        to the package name, e.g. ">=0.4,<1" or "==1.2.3".
#                        Default: installs latest.
#
# EXIT CODES
#   0  All flows pushed (or dry-run completed) successfully
#   1  One or more flows failed to push
#
# INTEGRATIONS
#   Jenkins:          sh 'ci-push.sh'
#   CircleCI:         - run: bash ci-push.sh
#   Bitbucket:        - bash ci-push.sh
#   Azure Pipelines:  - script: bash ci-push.sh

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────── #

FLOWS_DIR="${FLOWS_DIR:-flows/}"
IDRFLOW_ENV="${IDRFLOW_ENV:-}"
IDRFLOW_ENVIRONMENTS_FILE="${IDRFLOW_ENVIRONMENTS_FILE:-}"
IDRFLOW_URL="${IDRFLOW_URL:-}"
IDRFLOW_API_KEY="${IDRFLOW_API_KEY:-}"
IDRFLOW_PROJECT="${IDRFLOW_PROJECT:-}"
IDRFLOW_PROJECT_ID="${IDRFLOW_PROJECT_ID:-}"
DRY_RUN="${DRY_RUN:-false}"
LFX_VERSION="${LFX_VERSION:-}"

# Normalise LFX_VERSION: if it looks like a bare version (starts with a digit),
# prepend "==" so the pip specifier is valid.
if [[ -n "${LFX_VERSION}" && "${LFX_VERSION}" =~ ^[0-9] ]]; then
  LFX_VERSION="==${LFX_VERSION}"
fi

# ── Install lfx ───────────────────────────────────────────────────────────── #

echo "==> Installing lfx${LFX_VERSION:+ ${LFX_VERSION}} ..."
pip install --quiet "lfx${LFX_VERSION}" langflow-sdk

# ── Discover or build environments file for Approach B ────────────────────── #

if [[ -n "${IDRFLOW_ENV}" && -z "${IDRFLOW_ENVIRONMENTS_FILE}" ]]; then
  if [[ -f ".lfx/environments.yaml" ]]; then
    IDRFLOW_ENVIRONMENTS_FILE=".lfx/environments.yaml"
  elif [[ -f ".lfx/environments.yml" ]]; then
    IDRFLOW_ENVIRONMENTS_FILE=".lfx/environments.yml"
  elif [[ -f "idrflow-environments.toml" ]]; then
    IDRFLOW_ENVIRONMENTS_FILE="idrflow-environments.toml"
  elif [[ -f "${HOME}/.config/idrflow/environments.toml" ]]; then
    IDRFLOW_ENVIRONMENTS_FILE="${HOME}/.config/idrflow/environments.toml"
  fi
fi

if [[ -n "${IDRFLOW_ENV}" && -z "${IDRFLOW_ENVIRONMENTS_FILE}" ]]; then
  ENV_UPPER="${IDRFLOW_ENV^^}"
  ENV_UPPER="${ENV_UPPER//-/_}"
  URL_VAR="IDRFLOW_${ENV_UPPER}_URL"
  KEY_VAR="IDRFLOW_${ENV_UPPER}_API_KEY"

  IDRFLOW_ENVIRONMENTS_FILE="idrflow-environments.toml"
  echo "==> Writing ${IDRFLOW_ENVIRONMENTS_FILE} for environment '${IDRFLOW_ENV}' ..."
  printf '[environments.%s]\nurl = "%s"\napi_key_env = "%s"\n' \
    "${IDRFLOW_ENV}" \
    "${!URL_VAR:-}" \
    "${KEY_VAR}" \
    > "${IDRFLOW_ENVIRONMENTS_FILE}"
fi

# ── Build lfx push command ────────────────────────────────────────────────── #

PUSH_CMD=(lfx push --dir "${FLOWS_DIR}")

if [[ -n "${IDRFLOW_ENV}" ]]; then
  PUSH_CMD+=(--env "${IDRFLOW_ENV}")
  [[ -n "${IDRFLOW_ENVIRONMENTS_FILE}" ]] && export IDRFLOW_ENVIRONMENTS_FILE
elif [[ -n "${IDRFLOW_URL}" ]]; then
  PUSH_CMD+=(--target "${IDRFLOW_URL}")
  [[ -n "${IDRFLOW_API_KEY}" ]] && PUSH_CMD+=(--api-key "${IDRFLOW_API_KEY}")
else
  echo "ERROR: set IDRFLOW_ENV (Approach B) or IDRFLOW_URL (Approach A)" >&2
  exit 1
fi

if [[ -n "${IDRFLOW_PROJECT_ID}" ]]; then
  PUSH_CMD+=(--project-id "${IDRFLOW_PROJECT_ID}")
elif [[ -n "${IDRFLOW_PROJECT}" ]]; then
  PUSH_CMD+=(--project "${IDRFLOW_PROJECT}")
fi

[[ "${DRY_RUN}" == "true" ]] && PUSH_CMD+=(--dry-run)

# ── Push ──────────────────────────────────────────────────────────────────── #

echo "==> Pushing flows from ${FLOWS_DIR} ..."
[[ "${DRY_RUN}" == "true" ]] && echo "    (dry run — no changes will be made)"
echo "==> Running: ${PUSH_CMD[*]}"
"${PUSH_CMD[@]}"

echo "==> Done."
