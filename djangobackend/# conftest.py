import pytest

def pytest_ignore_collect(path, config):
    # Ignore all tests.py files in the root directory of the app
    if path.basename == "tests.py" and path.dirname.endswith(("accounts", "code_runner", "discuss", "feedback", "learning_path", "quiz")):
        return True
    return False
