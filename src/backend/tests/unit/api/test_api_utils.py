from unittest.mock import patch

from langflow.api.utils import get_suggestion_message, remove_api_keys
from langflow.api.utils.core import extract_global_variables_from_headers
from langflow.services.database.models.flow.utils import get_outdated_components
from langflow.utils.version import get_version_info


def test_get_suggestion_message():
    # Test case 1: No outdated components
    assert get_suggestion_message([]) == "The flow contains no outdated components."

    # Test case 2: One outdated component
    assert (
        get_suggestion_message(["component1"])
        == "The flow contains 1 outdated component. We recommend updating the following component: component1."
    )

    # Test case 3: Multiple outdated components
    outdated_components = ["component1", "component2", "component3"]
    expected_message = (
        "The flow contains 3 outdated components. "
        "We recommend updating the following components: component1, component2, component3."
    )
    assert get_suggestion_message(outdated_components) == expected_message


def test_get_outdated_components():
    # Mock data
    flow = "mock_flow"
    version = get_version_info()["version"]
    mock_component_versions = {
        "component1": version,
        "component2": version,
        "component3": "2.0",
    }
    # Expected result
    expected_outdated_components = ["component3"]

    with patch(
        "langflow.services.database.models.flow.utils.get_components_versions", return_value=mock_component_versions
    ):
        # Call the function with the mock flow
        result = get_outdated_components(flow)
        # Assert the result is as expected
        assert result == expected_outdated_components


def test_remove_api_keys():
    """Test that remove_api_keys properly removes API keys and handles various template structures.

    This test validates the fix for the bug where remove_api_keys would crash when
    encountering template values without 'name' keys (e.g., Note components with
    only backgroundColor).
    """
    # Test case 1: Flow with API key that should be removed
    flow_with_api_key = {
        "data": {
            "nodes": [
                {
                    "data": {
                        "node": {
                            "template": {
                                "api_key": {
                                    "name": "api_key",
                                    "value": "secret-123",
                                    "password": True,
                                },
                                "openai_api_key": {
                                    "name": "openai_api_key",
                                    "value": "sk-abc123",
                                    "password": True,
                                },
                            }
                        }
                    }
                }
            ]
        }
    }

    result = remove_api_keys(flow_with_api_key)
    assert result["data"]["nodes"][0]["data"]["node"]["template"]["api_key"]["value"] is None
    assert result["data"]["nodes"][0]["data"]["node"]["template"]["openai_api_key"]["value"] is None

    # Test case 2: Flow with Note component (no 'name' key) - this is the bug fix
    flow_with_note = {
        "data": {
            "nodes": [
                {
                    "data": {
                        "node": {
                            "template": {
                                "backgroundColor": {"value": "#ffffff"},  # No 'name' key
                                "text": {"value": "Test note"},  # No 'name' key
                            }
                        }
                    }
                }
            ]
        }
    }

    # This should not raise an error (the bug that was fixed)
    result = remove_api_keys(flow_with_note)
    # Values should be preserved since they're not API keys
    assert result["data"]["nodes"][0]["data"]["node"]["template"]["backgroundColor"]["value"] == "#ffffff"
    assert result["data"]["nodes"][0]["data"]["node"]["template"]["text"]["value"] == "Test note"

    # Test case 3: Mixed flow with both API keys and template values without 'name'
    mixed_flow = {
        "data": {
            "nodes": [
                {
                    "data": {
                        "node": {
                            "template": {
                                "backgroundColor": {"value": "#ffffff"},  # No 'name' key
                                "api_token": {
                                    "name": "api_token",
                                    "value": "token-xyz",
                                    "password": True,
                                },
                                "regular_field": {
                                    "name": "regular_field",
                                    "value": "keep-this",
                                },
                            }
                        }
                    }
                }
            ]
        }
    }

    result = remove_api_keys(mixed_flow)
    # backgroundColor should be preserved (no 'name' key)
    assert result["data"]["nodes"][0]["data"]["node"]["template"]["backgroundColor"]["value"] == "#ffffff"
    # API token should be removed
    assert result["data"]["nodes"][0]["data"]["node"]["template"]["api_token"]["value"] is None
    # Regular field should be kept
    assert result["data"]["nodes"][0]["data"]["node"]["template"]["regular_field"]["value"] == "keep-this"

    # Test case 4: Flow with auth_token (password field but not password=True)
    flow_with_non_password_api = {
        "data": {
            "nodes": [
                {
                    "data": {
                        "node": {
                            "template": {
                                "api_key": {
                                    "name": "api_key",
                                    "value": "should-not-be-removed",
                                    "password": False,  # Not a password field
                                },
                            }
                        }
                    }
                }
            ]
        }
    }

    result = remove_api_keys(flow_with_non_password_api)
    # Should NOT be removed because password is False
    assert result["data"]["nodes"][0]["data"]["node"]["template"]["api_key"]["value"] == "should-not-be-removed"

    # Test case 5: Empty flow
    empty_flow = {"data": {"nodes": []}}
    result = remove_api_keys(empty_flow)
    assert result == empty_flow

    # Test case 6: Nodes without data.node.template structure (regression)
    # remove_api_keys must not crash on nodes missing the full structure.
    sparse_flow = {
        "data": {
            "nodes": [
                {"id": "bare-node"},
                {"id": "null-data", "data": None},
                {"id": "no-node-key", "data": {"something": "else"}},
                {"id": "null-node", "data": {"node": None}},
                {"id": "no-template", "data": {"node": {"display_name": "Foo"}}},
                {"id": "null-template", "data": {"node": {"template": None}}},
            ],
            "edges": [],
        }
    }
    result = remove_api_keys(sparse_flow)
    # All nodes survive untouched
    assert len(result["data"]["nodes"]) == 6
    assert result["data"]["nodes"][0]["id"] == "bare-node"
    assert result["data"]["nodes"][1]["data"] is None


class TestExtractGlobalVariablesFromHeaders:
    def test_new_prefix_extracts_variables(self):
        headers = {
            "X-IDRFLOW-GLOBAL-VAR-API_KEY": "secret",
            "X-IDRFLOW-GLOBAL-VAR-USER_ID": "user123",
            "Content-Type": "application/json",
        }
        result = extract_global_variables_from_headers(headers)
        assert result == {"API_KEY": "secret", "USER_ID": "user123"}

    def test_new_prefix_case_insensitive(self):
        headers = {
            "x-idrflow-global-var-my_var": "value1",
            "X-Idrflow-Global-Var-Other": "value2",
        }
        result = extract_global_variables_from_headers(headers)
        assert result == {"MY_VAR": "value1", "OTHER": "value2"}

    def test_old_prefix_not_recognized(self):
        headers = {
            "X-LANGFLOW-GLOBAL-VAR-API_KEY": "secret",
            "X-LANGFLOW-GLOBAL-VAR-USER_ID": "user123",
        }
        result = extract_global_variables_from_headers(headers)
        assert result == {}

    def test_mixed_old_and_new_only_new_extracted(self):
        headers = {
            "X-IDRFLOW-GLOBAL-VAR-NEW_VAR": "new-value",
            "X-LANGFLOW-GLOBAL-VAR-OLD_VAR": "old-value",
        }
        result = extract_global_variables_from_headers(headers)
        assert result == {"NEW_VAR": "new-value"}
        assert "OLD_VAR" not in result

    def test_empty_headers(self):
        result = extract_global_variables_from_headers({})
        assert result == {}

    def test_no_matching_headers(self):
        headers = {"Authorization": "Bearer token", "Accept": "application/json"}
        result = extract_global_variables_from_headers(headers)
        assert result == {}
