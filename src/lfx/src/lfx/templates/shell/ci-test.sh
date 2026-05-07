#!/usr/bin/env bash
# ci-test.sh
#
# PURPOSE
#   Run pytest flow-integration tests against a live Langflow instance
#   using the langflow-sdk `flow_runner` fixture.
#
# USAGE
#   chmod +x ci-test.sh
#   ./ci-test.sh
#
# ENVIRONMENT VARIABLES — connection (pick one approach)
#
#   Approach A: direct URL + key (simplest)
#     IDRFLOW_URL        URL of the target Langflow instance.
#                         e.g. https://staging.langflow.example.com
#     IDRFLOW_API_KEY    API key for that instance.
#
#   Approach B: named environment from a discovered config
#     IDRFLOW_ENV                 Name of the environment block in the config.
#                                  e.g. staging
#     IDRFLOW_ENVIRONMENTS_FILE   Optional explicit path to the environments config.
#                                  If unset, lfx/langflow-sdk auto-discovers:
#                                  .lfx/environments.yaml, idrflow-environments.toml,
#                                  then ~/.config/idrflow/environments.toml.
#     <api_key_env var>            The env var named in api_key_env inside the
#                                  config block, e.g. IDRFLOW_STAGING_API_KEY.
#
#   The TOML format (see also ci-push.sh):
#
#     [environments.staging]
#     url        = "https://staging.langflow.example.com"
#     api_key_env = "IDRFLOW_STAGING_API_KEY"
#
# ENVIRONMENT VARIABLES — behaviour
#   TESTS_DIR        Directory containing test files.  Default: tests/
#   PYTEST_MARKERS   Markers to pass to -m.  Default: integration
#   PYTEST_ARGS      Extra arguments forwarded verbatim to pytest.
#   SDK_VERSION      langflow-sdk PEP 508 version specifier suffix appended
#                    directly to the package name, e.g. ">=0.4,<1" or "==1.2.3".
#                    Default: installs latest.
#
# SKIPPING
#   When neither IDRFLOW_URL nor IDRFLOW_ENV is set the tests auto-skip
#   (the flow_runner fixture detects no connection).  This means the script
#   exits 0 even when run on a branch that lacks the necessary secrets.
#
# EXIT CODES
#   0  All tests passed (or skipped due to missing connection)
#   1  One or more tests failed
#
# INTEGRATIONS
#   Jenkins:          sh 'ci-test.sh'
#   CircleCI:         - run: bash ci-test.sh
#   Bitbucket:        - bash ci-test.sh
#   Azure Pipelines:  - script: bash ci-test.sh

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────── #

TESTS_DIR="${TESTS_DIR:-tests/}"
PYTEST_MARKERS="${PYTEST_MARKERS:-integration}"
PYTEST_ARGS="${PYTEST_ARGS:-}"
SDK_VERSION="${SDK_VERSION:-}"
IDRFLOW_ENV="${IDRFLOW_ENV:-}"
IDRFLOW_ENVIRONMENTS_FILE="${IDRFLOW_ENVIRONMENTS_FILE:-}"

# ── Install dependencies ───────────────────────────────────────────────────── #

# Normalise SDK_VERSION: if it looks like a bare version (starts with a digit),
# prepend "==" so the pip specifier is valid.
if [[ -n "${SDK_VERSION}" && "${SDK_VERSION}" =~ ^[0-9] ]]; then
  SDK_VERSION="==${SDK_VERSION}"
fi

echo "==> Installing langflow-sdk[testing] and pytest ..."
pip install --quiet \
  "langflow-sdk[testing]${SDK_VERSION}" \
  pytest

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
  # Derive variable names from the env name (uppercased, hyphens → underscores)
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

# ── Run tests ─────────────────────────────────────────────────────────────── #

# Build pytest command
PYTEST_CMD=(pytest "${TESTS_DIR}" -v --tb=short)

if [[ -n "${PYTEST_MARKERS}" ]]; then
  PYTEST_CMD+=(-m "${PYTEST_MARKERS}")
fi

if [[ -n "${IDRFLOW_ENV}" ]]; then
  PYTEST_CMD+=(--idrflow-env "${IDRFLOW_ENV}")
  [[ -n "${IDRFLOW_ENVIRONMENTS_FILE}" ]] && export IDRFLOW_ENVIRONMENTS_FILE
elif [[ -n "${IDRFLOW_URL:-}" ]]; then
  PYTEST_CMD+=(--idrflow-url "${IDRFLOW_URL}")
  [[ -n "${IDRFLOW_API_KEY:-}" ]] && PYTEST_CMD+=(--idrflow-api-key "${IDRFLOW_API_KEY}")
fi

# Append any extra user-supplied args
# shellcheck disable=SC2206
[[ -n "${PYTEST_ARGS}" ]] && PYTEST_CMD+=(${PYTEST_ARGS})

echo "==> Running: ${PYTEST_CMD[*]}"
"${PYTEST_CMD[@]}"
