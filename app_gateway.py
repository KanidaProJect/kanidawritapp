from flask import Flask, request, jsonify, send_file, send_from_directory
import sys
import os
import json

# ✅ เพิ่ม path ของโฟลเดอร์ modules
sys.path.append(os.path.join(os.path.dirname(__file__), 'modules'))
from modules.module_useragent.plugin import Plugin as UserAgent

# ✅ กำหนด BASE_DIR ให้ใช้ได้
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ✅ โหลด spec.json มาใช้เป็นกติกากลาง
with open(os.path.join(BASE_DIR, "spec.json")) as f:
    spec = json.load(f)

app = Flask(__name__)

# ✅ API หลัก
@app.route('/api/process', methods=['POST'])
def process_request():
    try:
        data = request.json or {}
        rules = spec["endpoints"]["/api/process"]["request"]

        # ตรวจว่า key ตรงตาม spec.json
        if "input_data" not in data:
            return jsonify({"error": "Missing input_data"}), 400

        # เรียกใช้ UserAgent plugin
        user_agent = UserAgent()
        result = user_agent.run(input_data=data["input_data"])

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ หน้าแรก index.html
@app.route('/')
def index():
    return send_file(os.path.join(BASE_DIR, 'public', 'index.html'))

# ✅ favicon.ico
@app.route('/favicon.ico')
def favicon():
    return send_file(os.path.join(BASE_DIR, 'public', 'favicon.ico'))

# ✅ manifest.json
@app.route('/manifest.json')
def manifest():
    return send_from_directory(os.path.join(BASE_DIR, 'public'), 'manifest.json')

# ✅ override static route: JS
@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'js'), filename)

# ✅ override static route: icons
@app.route('/icons/<path:filename>')
def serve_icons(filename):
    return send_from_directory(os.path.join(BASE_DIR, 'public', 'icons'), filename)

# ✅ Run app บน Render (Web Service)
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port, debug=True)
