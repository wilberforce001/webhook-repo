from flask import Flask, request, jsonify 
from database import save_event 

app = Flask(__name__)

@app.route('/webhook', methods=['POST']) # Define a route /webhook that listens for HTTP POST requests
def webhook():
    data = request.json # extracts the JSON payload sent by GitHub
    event_type = request.headers.get('X-GitHub-Event') # Extracts the GitHub event type from the X-GitHub-Event header. This header indicates the type of event (e.g., push, pull_request, merge).  

    if event_type in ['push', 'pull_request', 'merge']:
        save_event(data, event_type)
        return jsonify({"message": "Event received"}), 200
    else: 
        return jsonify({"message": "Event ignored"}), 400
    
if __name__ == '__main__':
    app.run(debug=True)