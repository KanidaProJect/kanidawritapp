from flask import Flask, request, jsonify, send_file, send_from_directory
import sys
import os

# ✅ เพิ่ม path ของโฟลเดอร์ modules
sys.path.append(os.path.join(os.path.dirname(__file__), 'modules'))

from modules.module_useragent.plugin import Plugin as UserAgent

app = Flask(__name__)

# ✅ API หลัก
@app.route('/api/process', methods=['POST'])
def process_request():
    try:
        input_data = request.json
        user_agent = UserAgent()
        result = user_agent.run(input_data=input_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ หน้าแรก index.html
@app.route('/')
def index():
    return send_file(os.path.join(BASE_DIR, 'public', 'index.html'))

# ✅ favicon.ico
@app.route('/favicon.ico')
def favicon():
    return send_file('favicon.ico')

# ✅ override static route: JS
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

# ✅ override static route: icons
@app.route('/icons/<path:filename>')
def serve_icons(filename):
    return send_from_directory('icons', filename)

# ✅ Run app บน Render (Web Service)
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port, debug=True)
