import uvicorn
import os
import sys
print("Hello, World!")

def start_matt_app():
    print("Starting Matt's app...")
    # start in background
    os.system("cd matts-server && node server.js &")
def start_sofia_app():
    print("Starting Sofia's app...")
    uvicorn.run("sofias_server.app:app", host="0.0.0.0", port=8001, reload=True)

def main():
    start_matt_app()
    start_sofia_app()

if __name__ == "__main__":
    main()