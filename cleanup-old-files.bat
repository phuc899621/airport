@echo off
echo ========================================
echo   CLEANUP: Remove Old JS/JSX Files
echo ========================================
echo.

echo Step 1: Finding .jsx files in frontend/src...
dir /s /b frontend\src\*.jsx

echo.
echo Step 2: Finding .js files in frontend/src/services...
dir /s /b frontend\src\services\*.js

echo.
echo Step 3: Removing .jsx files...
for /r frontend\src %%f in (*.jsx) do (
    echo Deleting: %%f
    del "%%f"
)

echo.
echo Step 4: Removing .js files in services...
del frontend\src\services\*.js 2>nul

echo.
echo Step 5: Cleanup documentation files...
del BACKUP_INSTRUCTIONS.md 2>nul
del CHECK_PR_STATUS.md 2>nul
del FINAL_STEPS.md 2>nul
del GITHUB_MERGE_GUIDE.md 2>nul
del GIT_SUCCESS_SUMMARY.md 2>nul
del MERGE_PR_NOW.md 2>nul
del RESOLVE_CONFLICTS.md 2>nul
del SIMPLE_PULL_SOLUTION.md 2>nul
del auto-resolve-conflicts.bat 2>nul
del backup-project.bat 2>nul
del exclude-backup.txt 2>nul
del quick-fix.bat 2>nul

echo.
echo Step 6: Cleanup .vs folder (Visual Studio cache)...
rmdir /s /q .vs 2>nul

echo.
echo Step 7: Cleanup root node_modules (if not needed)...
echo Note: Keeping root node_modules for now

echo.
echo ========================================
echo   CLEANUP COMPLETE!
echo ========================================
echo.
echo Removed:
echo - All .jsx files in frontend/src
echo - All .js files in frontend/src/services
echo - Documentation files
echo - .vs folder
echo.
echo Next: Run 'git status' to see changes
echo.
pause
