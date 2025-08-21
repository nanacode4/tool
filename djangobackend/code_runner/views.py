from rest_framework.decorators import api_view
import subprocess
from rest_framework.response import Response
from rest_framework import status
import io
import sys
import traceback

@api_view(['POST'])
def run_code(request):
    code = request.data.get("code", "")
    language = request.data.get("language", "")

    if not code or not language:
        return Response({"error": "Missing code or language"}, status=400)

    try:
        if language == "java":
            filename = "Code.java"
            compile_cmd = ["javac", filename]
            run_cmd = ["java", "Code"]
        elif language == "python":
            filename = "script.py"
            compile_cmd = None  # Python does not require compilation
            run_cmd = ["python3", filename]
        elif language == "cpp":
            filename = "program.cpp"
            output_file = "program"
            compile_cmd = ["g++", filename, "-o", output_file]
            run_cmd = ["./" + output_file]
        else:
            return Response({"error": "Unsupported language"}, status=400)

        # Write the user's code into a file
        with open(filename, "w") as f:
            f.write(code)

        # If the language requires compilation (Java, C++), compile the code first
        if compile_cmd:
            compile_process = subprocess.run(compile_cmd, capture_output=True, text=True)
            if compile_process.returncode != 0:
                return Response({"error": compile_process.stderr.strip()}, status=400)

        # Execute the compiled or interpreted code and capture standard output and errors
        run_process = subprocess.run(run_cmd, capture_output=True, text=True)
        output = run_process.stdout.strip()
        error = run_process.stderr.strip()

        # Handle Python output type validation
        if language == "python" and output:
            try:
                # Check only if the output is a numeric or structured data format
                if output.replace(".", "", 1).isdigit() or output.startswith("[") or output.startswith("{"):
                    result = eval(output)
                    if not isinstance(result, int):
                        raise TypeError(f"Expected return type int, but got {type(result).__name__}")
            except (SyntaxError, NameError, TypeError, ValueError) as e:
                return Response({"error": str(e), "output": ""})

        return Response({
            "output": output,
            "error": error
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)



#  Practice Validation API (for Python variable practice)
@api_view(['POST'])
def validate_exercise(request):
    code = request.data.get("code", "")
    old_stdout = sys.stdout
    redirected_output = sys.stdout = io.StringIO()

    feedback = []
    test_passed = True

    try:
        exec_env = {}
        exec(code, exec_env)

        # 1. Variable existence and type checking
        for var_name, expected_type in [("name", str), ("age", int), ("height", float)]:
            if var_name not in exec_env:
                feedback.append({
                    "message": f"Variable '{var_name}' is missing.",
                    "success": False
                })
                test_passed = False
            elif not isinstance(exec_env[var_name], expected_type):
                actual_type = type(exec_env[var_name]).__name__
                feedback.append({
                    "message": f"Variable '{var_name}' should be {expected_type.__name__}, but got {actual_type}.",
                    "success": False
                })
                test_passed = False
            else:
                feedback.append({
                    "message": f"Variable '{var_name}' is of correct type {expected_type.__name__}.",
                    "success": True
                })

        # 2. Check the output
        output = redirected_output.getvalue().strip()
        expected_phrase = "My name is"
        if expected_phrase not in output:
            feedback.append({
                "message": f"Output should include phrase: '{expected_phrase}'.",
                "success": False
            })
            test_passed = False
        else:
            feedback.append({
                "message": f"Output contains required phrase: '{expected_phrase}'.",
                "success": True
            })

        # 3. Check if the variable value appears in the output
        for var_name in ["name", "age", "height"]:
            if var_name in exec_env:
                if str(exec_env[var_name]) not in output:
                    feedback.append({
                        "message": f"Value of '{var_name}' not found in output.",
                        "success": False
                    })
                    test_passed = False
                else:
                    feedback.append({
                        "message": f"Output includes value of '{var_name}'.",
                        "success": True
                    })

        return Response({
            "success": test_passed,
            "results": feedback
        }, status=status.HTTP_200_OK)

    except Exception:
        sys.stdout = old_stdout
        error_trace = traceback.format_exc()
        return Response({
            "success": False,
            "results": [
                {
                    "message": "Runtime error:\n" + error_trace,
                    "success": False
                }
            ]
        }, status=status.HTTP_400_BAD_REQUEST)
    finally:
        sys.stdout = old_stdout
